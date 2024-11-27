import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Button,
    Dimensions,
    Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';

type RouteParams = {
    clientType?: number;
};

type TrainingSchedule = {
    name: string;
    date: string;
    time: string;
    price: number;
};

export default function CustomScreen() {
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const clientType = route.params?.clientType;

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; dotColor: string }>>({});
    const [trainersSchedules, setTrainersSchedules] = useState<TrainingSchedule[]>([]);
    const [displayedSchedules, setDisplayedSchedules] = useState<TrainingSchedule[]>([]);

    // Mock data for testing
    const mockTrainersSchedules = [
        { name: "Session 1", date: "2024-12-01", time: "10:00", price: 100 },
        { name: "Session 2", date: "2024-12-03", time: "14:00", price: 120 },
        { name: "Session 3", date: "2024-12-03", time: "16:00", price: 150 },
    ];

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                if (clientType === 2) {
                    // Fetch "HisTrainers" from AsyncStorage or API
                    const hisTrainers = JSON.parse((await AsyncStorage.getItem("HisTrainers")) || "[]");

                    if (hisTrainers.length === 0) {
                        Alert.alert("No Trainers Found", "You have no trainers associated.");
                        return;
                    }

                    // Mock fetching data for each trainer (replace with real API call)
                    let allSchedules: TrainingSchedule[] = [];
                    for (const trainerEmail of hisTrainers) {
                        // Example: Fetch schedules by trainer email
                        // const trainerSchedules = await fetchTrainerSchedules(trainerEmail); // Replace with real fetch function
                        const trainerSchedules = mockTrainersSchedules; // Mock data
                        allSchedules = [...allSchedules, ...trainerSchedules];
                    }

                    setTrainersSchedules(allSchedules);

                    // Create marked dates
                    const newMarkedDates: Record<string, { marked: boolean; dotColor: string }> = {};
                    allSchedules.forEach((schedule) => {
                        newMarkedDates[schedule.date] = { marked: true, dotColor: "green" };
                    });
                    setMarkedDates(newMarkedDates);
                }
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };

        fetchSchedules();
    }, [clientType]);

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

    const renderList = () => {
        return (
            <FlatList
                data={displayedSchedules}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={({ item }) => (
                    <Text style={styles.listItem}>
                        {item.name} at {item.time}, ${item.price}
                    </Text>
                )}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {clientType === 1
                    ? "Trainer: Select a Training Date"
                    : "Customer: View Available Dates"}
            </Text>
            <Calendar
                onDayPress={handleDatePress}
                markedDates={{
                    ...markedDates,
                    [selectedDate || ""]: { selected: true, selectedColor: clientType === 1 ? "blue" : "green" },
                }}
                theme={{
                    selectedDayBackgroundColor: clientType === 1 ? "blue" : "green",
                    todayTextColor: "red",
                    arrowColor: "black",
                    monthTextColor: "black",
                    textDayFontWeight: "600",
                }}
            />

            {/* Modal to display list on date selection */}
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
        paddingTop:50,
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
    listItem: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});
