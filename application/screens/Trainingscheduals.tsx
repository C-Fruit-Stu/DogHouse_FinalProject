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
    const { currentCoustumer, getAllCostumerSchedules, addSchedule } = useContext(CoustumerContext);
    const { currentTrainer, getAllTrainersSchedules, addPayment } = useContext(TrainerContext);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [trainerScheduleVisible, setTrainerScheduleVisible] = useState(clientType === 1);
    const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; dotColor: string; selectedColor: string }>>({});
    const [trainersSchedules, setTrainersSchedules] = useState<TrainingSchedule[]>([]);
    const [displayedSchedules, setDisplayedSchedules] = useState<TrainingSchedule[]>([]);

    const normalizeDate = (date: string): string => {
        if (date.includes("/")) {
            return date; // Already in DD/MM/YYYY
        }
        if (date.includes("-")) {
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        }
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
        return ""; // Return empty string for invalid dates
    };

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                let schedules: TrainingSchedule[] = [];
                const savedMarkedDates = await AsyncStorage.getItem("MarkedDates");
                const localMarkedDates = savedMarkedDates ? JSON.parse(savedMarkedDates) : {};
    
                if (clientType === 2) {
                    // Fetch customer training schedules and mark them blue
                    if (currentCoustumer?.trainingSchedule) {
                        const customerSchedules = currentCoustumer.trainingSchedule.map((schedule: TrainingSchedule) => ({
                            ...schedule,
                            date: normalizeDate(schedule.date),
                        }));
                        schedules = [...schedules, ...customerSchedules];
    
                        customerSchedules.forEach((schedule: TrainingSchedule) => {
                            localMarkedDates[normalizeDateToISO(schedule.date)] = {
                                marked: true,
                                dotColor: "blue",
                                selectedColor: "blue",
                            };
                        });
                    }
    
                    // Fetch trainer schedules and mark them green
                    const trainerSchedules = await getAllTrainersSchedules(currentCoustumer?.HisTrainer || []);
                    if (trainerSchedules) {
                        const trainerSchedulesFormatted = trainerSchedules.map((schedule: any) => ({
                            ...schedule,
                            date: normalizeDate(schedule.date),
                        }));
                        schedules = [...schedules, ...trainerSchedulesFormatted];
    
                        trainerSchedulesFormatted.forEach((schedule: any) => {
                            if (!localMarkedDates[normalizeDateToISO(schedule.date)]) {
                                localMarkedDates[normalizeDateToISO(schedule.date)] = {
                                    marked: true,
                                    dotColor: "green",
                                    selectedColor: "green",
                                };
                            }
                        });
                    }
                }
    
                setTrainersSchedules(schedules);
                setMarkedDates(localMarkedDates);
                await AsyncStorage.setItem("MarkedDates", JSON.stringify(localMarkedDates));
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
                            await addPayment(schedule.trainerEmail, normalizeDateToISO(schedule.date), schedule.price);
                            await addSchedule(schedule, currentCoustumer?.email);

                            const updatedSchedules = trainersSchedules.filter(
                                (item) =>
                                    item.date !== schedule.date ||
                                    item.trainerEmail !== schedule.trainerEmail
                            );
                            setTrainersSchedules(updatedSchedules);

                            setMarkedDates((prev) => ({
                                ...prev,
                                [normalizeDateToISO(schedule.date)]: { marked: true, dotColor: "blue", selectedColor: "blue" },
                            }));
                        } catch (error) {
                            console.error("Error processing action:", error);
                            Alert.alert("Error", "Something went wrong while processing the action.");
                        }
                    },
                },
            ]
        );
    };

    const renderTrainerSchedule = () => (
        <FlatList
            data={trainersSchedules}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
                <View style={styles.listItemContainer}>
                    <Text style={styles.listItem}>
                        {item.name} at {item.time}, ${item.price} (Date: {item.date})
                    </Text>
                </View>
            )}
        />
    );

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

    const closeModal = () => {
        setModalVisible(false);
        setSelectedDate(null);
    };

    if (trainerScheduleVisible && clientType === 1) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Trainer's Schedule</Text>
                {renderTrainerSchedule()}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {clientType === 1 ? "Trainer: View Training Schedule" : "Customer: View Available Dates"}
            </Text>
            <Calendar
                onDayPress={(date: any) => {
                    const normalizedDate = normalizeDate(date.dateString);
                    setSelectedDate(normalizedDate);
                    const filteredSchedules = trainersSchedules.filter(
                        (schedule) => schedule.date === normalizedDate
                    );
                    setDisplayedSchedules(filteredSchedules);
                    setModalVisible(true);
                }}
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
