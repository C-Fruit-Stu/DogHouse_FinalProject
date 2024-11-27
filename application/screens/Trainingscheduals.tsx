import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Button,
    Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';


type RouteParams = {
    clientType?: number;
};

type TrainingSchedule = {
    name: string;
    date: string;
    time: string;
    price: number;
    trainerEmail?: string; // Include trainer's email in the schedule
};

export default function CustomScreen() {
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const clientType = route.params?.clientType;
    const{currentCoustumer} = useContext(CoustumerContext);
    const { getAllTrainersSchedules } = useContext(TrainerContext);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; dotColor: string }>>({});
    const [trainersSchedules, setTrainersSchedules] = useState<TrainingSchedule[]>([]);
    const [displayedSchedules, setDisplayedSchedules] = useState<TrainingSchedule[]>([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            if (clientType === 2) {
                try {

                    // Fetch schedules from the context function
                    const schedules = await getAllTrainersSchedules(currentCoustumer.hisTrainers); // Replace with your context call
                    if (schedules) {
                        const schedulesWithTrainerInfo = schedules.result.map((schedule: TrainingSchedule) => ({
                            ...schedule,
                        }));
                        await AsyncStorage.setItem("TrainersSchedules", JSON.stringify(schedulesWithTrainerInfo));
                        setTrainersSchedules(schedulesWithTrainerInfo);

                        // Mark dates in the calendar
                        const newMarkedDates: Record<string, { marked: boolean; dotColor: string }> = {};
                        schedulesWithTrainerInfo.forEach((schedule:TrainingSchedule) => {
                            newMarkedDates[schedule.date] = { marked: true, dotColor: "green" };
                        });
                        setMarkedDates(newMarkedDates);
                    }
                } catch (error) {
                    console.error("Error fetching schedules:", error);
                }
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

    const renderList = () => (
        <FlatList
            data={displayedSchedules}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
                <Text style={styles.listItem}>
                    {item.name} at {item.time}, ${item.price} (Trainer: {item.trainerEmail})
                </Text>
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
    listItem: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});
