import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CoustumerContext } from '../context/CoustumerContextProvider';

const TrainingSchedules = () => {
    const { currentCoustumer, setCurrentCoustumer } = useContext(CoustumerContext);
    const navigation = useNavigation();

    const handleDeleteDate = (date : any) => {
        const updatedSchedule = currentCoustumer.trainingSchedule.filter((training : any) => training.date !== date);
        setCurrentCoustumer({
            ...currentCoustumer,
            trainingSchedule: updatedSchedule,
        });
    };

    const renderTrainingItem = ({ item } : any) => (
        <View style={styles.trainingItem}>
            <Text style={styles.textTime}>{item.date}</Text>
            <TouchableOpacity onPress={() => handleDeleteDate(item.date)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={styles.welcome}>Hello, {currentCoustumer.first_name}</Text>
                <Text style={styles.sectionTitle}>Completed Trainings</Text>
            </View>
            <FlatList
                data={currentCoustumer.trainingSchedule}
                renderItem={renderTrainingItem}
                keyExtractor={(item) => item.date}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        padding: 8,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        marginTop: 30
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    welcome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 50, // Adjusted to account for back button
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    titleContainer: {
        marginTop: 50,
    },
    trainingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    textTime: {
        color: 'black',
        fontSize: 18,
        flex: 1,
    },
    deleteButton: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TrainingSchedules;
