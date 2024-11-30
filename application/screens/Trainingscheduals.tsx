import React, { useState, useEffect, useContext } from 'react';
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
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';

type RouteParams = {
    clientType?: number;
};

type TrainingSchedule = {
    name: string;
    date: string; // Server-provided format
    time: string;
    price: number;
    trainerEmail?: string;
};

export default function TrainingSchedules() {
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const clientType = route.params?.clientType;
    const { currentCoustumer, addSchedule } = useContext(CoustumerContext);
    const { getAllTrainersSchedules, addPayment } = useContext(TrainerContext);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; dotColor: string; selectedColor: string }>>({});
    const [trainersSchedules, setTrainersSchedules] = useState<TrainingSchedule[]>([]);
    const [displayedSchedules, setDisplayedSchedules] = useState<TrainingSchedule[]>([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const storedSchedules = await AsyncStorage.getItem("TrainersSchedules");
                let schedules = [];

                if (storedSchedules) {
                    console.log("Loaded TrainersSchedules from AsyncStorage:", JSON.parse(storedSchedules));
                    schedules = JSON.parse(storedSchedules);

                    setTrainersSchedules(schedules);

                    // Mark dates in the calendar
                    const newMarkedDates: Record<string, { marked: boolean; dotColor: string; selectedColor: string }> = {};
                    schedules.forEach((schedule: TrainingSchedule) => {
                        newMarkedDates[schedule.date] = {
                            marked: true,
                            dotColor: "green",
                            selectedColor: "green",
                        };
                    });
                    setMarkedDates(newMarkedDates);
                } else if (clientType === 2) {
                    console.log("Fetching schedules from server...");
                    const response = await getAllTrainersSchedules(currentCoustumer?.HisTrainer);
                    schedules = response?.result || [];

                    await AsyncStorage.setItem("TrainersSchedules", JSON.stringify(schedules));
                    console.log("New TrainersSchedules saved to AsyncStorage:", schedules);

                    setTrainersSchedules(schedules);

                    // Mark dates in the calendar
                    const newMarkedDates: Record<string, { marked: boolean; dotColor: string; selectedColor: string }> = {};
                    schedules.forEach((schedule: TrainingSchedule) => {
                        newMarkedDates[schedule.date] = {
                            marked: true,
                            dotColor: "green",
                            selectedColor: "green",
                        };
                    });
                    setMarkedDates(newMarkedDates);
                }

                // Include currentCoustumer's accepted schedules
                if (currentCoustumer?.trainingSchedule[0].name !== "") {
                    const customerDates: Record<string, { marked: boolean; dotColor: string; selectedColor: string }> = {};
                    currentCoustumer.trainingSchedule.forEach((schedule: TrainingSchedule) => {
                        customerDates[schedule.date] = {
                            marked: true,
                            dotColor: "blue",
                            selectedColor: "blue",
                        };
                    });
                    setMarkedDates((prev) => ({ ...prev, ...customerDates }));
                }
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };

        fetchSchedules();
    }, [clientType, currentCoustumer, getAllTrainersSchedules]);

    const handleAction = async (schedule: TrainingSchedule) => {
        Alert.alert(
            "Confirm Training",
            `If you accept the training it will cost you $${schedule.price} and it will be transferred automatically to the trainer.\n\nName: ${schedule.name}\nTime: ${schedule.time}\nPrice: $${schedule.price}`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Confirm",
                    onPress: async () => {
                        try {
                            // Add payment to trainer
                            await addPayment(schedule.trainerEmail, schedule.price);

                            // Add schedule to customer context
                            await addSchedule(schedule);

                            // Update AsyncStorage
                            const updatedSchedules = trainersSchedules.filter((item) => item !== schedule);
                            await AsyncStorage.setItem("TrainersSchedules", JSON.stringify(updatedSchedules));
                            setTrainersSchedules(updatedSchedules);

                            // Mark selected date blue
                            setMarkedDates((prev) => ({
                                ...prev,
                                [schedule.date]: { marked: true, dotColor: "blue", selectedColor: "blue" },
                            }));

                            console.log("Updated TrainersSchedules:", updatedSchedules);
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
        setSelectedDate(date.dateString);
        const filteredSchedules = trainersSchedules.filter((schedule) => schedule.date === date.dateString);
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
                    <Button
                        title="Accept"
                        onPress={() => handleAction(item)}
                        color="#1DBD7B"
                    />
                </View>
            )}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {clientType === 1
                    ? "Trainer: Select a Training Date"
                    : "Customer: View Available Dates"}
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
                        {selectedDate
                            ? `Selected Date: ${selectedDate}`
                            : "No Date Selected"}
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
