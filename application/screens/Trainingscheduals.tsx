import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Button,
    Alert,
    Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, RouteProp } from "@react-navigation/native";
import { TrainerContext } from "../context/TrainerContextProvider";
import { CoustumerContext } from "../context/CoustumerContextProvider";

type RouteParams = {
    clientType?: number;
};

type TrainingSchedule = {
    name: string;
    date: string; // Format: DD/MM/YYYY
    time: string;
    price: number;
    trainerEmail?: string;
};

export default function TrainingSchedules() {
    const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
    const clientType = route.params?.clientType;
    const { currentCoustumer, addSchedule } = useContext(CoustumerContext);
    const { getAllTrainersSchedules, addPayment } = useContext(TrainerContext);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; dotColor: string; selectedColor: string }>>({});
    const [allSchedules, setAllSchedules] = useState<TrainingSchedule[]>([]);
    const [displayedSchedules, setDisplayedSchedules] = useState<TrainingSchedule[]>([]);

    // Normalize date format
    const normalizeDate = (date: string): string => {
        if (date.includes("/")) {
            return date; // Already in DD/MM/YYYY
        }
        if (date.includes("-")) {
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        }
        console.warn("Unexpected date format:", date);
        return ""; // Return empty string for invalid dates
    };

    const normalizeDateToISO = (date: string): string => {
        if (date.includes("-")) {
            return date; // Already in YYYY-MM-DD
        }
        if (date.includes("/")) {
            const [day, month, year] = date.split("/");
            return `${year}-${month}-${day}`;
        }
        console.warn("Unexpected date format:", date);
        return ""; // Return empty string for invalid dates
    };

    const clearStorageOnReload = async () => {
        await AsyncStorage.removeItem("TrainersSchedules");
    };

    useEffect(() => {
        clearStorageOnReload();
    }, []);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                let schedules: TrainingSchedule[] = [];
                const marked: Record<string, { marked: boolean; dotColor: string; selectedColor: string }> = {};

                if (clientType === 2) {
                    // Add schedules from currentCoustumer to calendar (blue)
                    if (currentCoustumer?.trainingSchedule) {
                        const customerSchedules = currentCoustumer.trainingSchedule.map((schedule: TrainingSchedule) => ({
                            ...schedule,
                            date: normalizeDate(schedule.date),
                        }));

                        schedules = [...schedules, ...customerSchedules];

                        customerSchedules.forEach((schedule: TrainingSchedule) => {
                            marked[normalizeDateToISO(schedule.date)] = {
                                marked: true,
                                dotColor: "blue",
                                selectedColor: "blue",
                            };
                        });
                    }

                    // Add schedules from AsyncStorage to calendar (green)
                    const storedSchedules = await AsyncStorage.getItem("TrainersSchedules");
                    if (storedSchedules) {
                        const asyncSchedules = JSON.parse(storedSchedules).map((schedule: TrainingSchedule) => ({
                            ...schedule,
                            date: normalizeDate(schedule.date),
                        }));

                        schedules = [...schedules, ...asyncSchedules];

                        asyncSchedules.forEach((schedule: TrainingSchedule) => {
                            marked[normalizeDateToISO(schedule.date)] = {
                                marked: true,
                                dotColor: "green",
                                selectedColor: "green",
                            };
                        });
                    }
                    else {
                        const allTrainersSchedules = await getAllTrainersSchedules();
                        await AsyncStorage.setItem("TrainersSchedules", JSON.stringify(allTrainersSchedules));
                        if (allTrainersSchedules) {
                            const asyncSchedules = allTrainersSchedules.map((schedule: TrainingSchedule) => ({
                                ...schedule,
                                date: normalizeDate(schedule.date),
                            }));

                            schedules = [...schedules, ...asyncSchedules];

                            asyncSchedules.forEach((schedule: TrainingSchedule) => {
                                marked[normalizeDateToISO(schedule.date)] = {
                                    marked: true,
                                    dotColor: "green",
                                    selectedColor: "green",
                                };
                            });
                        }
                    }
                }

                setAllSchedules(schedules);
                setMarkedDates(marked);
            } catch (error) {
                console.error("Error in fetchSchedules:", error);
            }
        };

        fetchSchedules();
    }, [clientType, currentCoustumer, getAllTrainersSchedules]);

    const handleAction = async (schedule: TrainingSchedule) => {
        Alert.alert(
            "Confirm Training",
            `If you accept the training it will cost you $${schedule.price} and it will be transferred automatically to the trainer.\n\nName: ${schedule.name}\nDate: ${schedule.date}\nTime: ${schedule.time}`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Confirm",
                    onPress: async () => {
                        try {
                            // Change the date color to blue first
                            setMarkedDates((prev) => ({
                                ...prev,
                                [normalizeDateToISO(schedule.date)]: {
                                    marked: true,
                                    dotColor: "blue",
                                    selectedColor: "blue",
                                },
                            }));

                            await addPayment(schedule.trainerEmail, normalizeDateToISO(schedule.date), schedule.price);
                            const success = await addSchedule(schedule, currentCoustumer?.email);

                            if (success) {
                                console.log("Schedule successfully added to customer.");
                            } else {
                                console.warn("Failed to add schedule to customer.");
                            }

                            const updatedSchedules = allSchedules.filter(
                                (item) =>
                                    item.date !== schedule.date ||
                                    item.trainerEmail !== schedule.trainerEmail
                            );

                            setAllSchedules(updatedSchedules);

                            await AsyncStorage.setItem("TrainersSchedules", JSON.stringify(updatedSchedules));
                        } catch (error) {
                            console.error("Error processing action:", error);
                            Alert.alert("Error", "Something went wrong while processing the action.");
                        }
                    },
                },
            ]
        );
    };

    const handleDatePress = (date: any) => {
        const normalizedDate = normalizeDate(date.dateString);
        setSelectedDate(normalizedDate);
        const filteredSchedules = allSchedules.filter(
            (schedule: TrainingSchedule) => schedule.date === normalizedDate
        );
        setDisplayedSchedules(filteredSchedules);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedDate(null);
    };

    const renderList = () => (
        <FlatList
            data={displayedSchedules}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
                <View style={styles.listItemContainer}>
                    <Text style={styles.listItem}>
                        {item.name} at {item.time}, ${item.price} (Trainer: {item.trainerEmail})
                    </Text>
                    <Button title="Accept" onPress={() => handleAction(item)} color="#1DBD7B" />
                </View>
            )}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {clientType === 1 ? "Trainer: Select a Training Date" : "Customer: View Available Dates"}
            </Text>
            <Calendar
                onDayPress={handleDatePress}
                markedDates={markedDates}
                theme={{
                    selectedDayBackgroundColor: clientType === 1 ? "blue" : "green",
                    todayTextColor: "red",
                    arrowColor: "black",
                    monthTextColor: "black",
                    textDayFontWeight: "600",
                }}
            />

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={closeModal} />
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>
                        {selectedDate ? `Selected Date: ${selectedDate}` : "No Date Selected"}
                    </Text>
                    {renderList()}
                    <Button title="Close" onPress={closeModal} color="#1DBD7B" />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 16,
        backgroundColor: "#fff",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        position: "absolute",
        bottom: 0,
        width: Dimensions.get("window").width,
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    listItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    listItem: {
        fontSize: 16,
    },
});
