@ -0,0 +1,91 @@
import { View, Text, Image, Button, FlatList, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { TrainerContext } from '../context/TrainerContextProvider';

export default function FindTrainer() {
    const { allTrainer, GetAllTrainers } = useContext(TrainerContext);

    useEffect(() => {
        GetAllTrainers();
    }, []);

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const renderTrainer = ({ item }: { item: any }) => {
        return (
            <View style={styles.trainerContainer}>
                <Image source={{ uri: item.image }} style={styles.trainerImage} />
                <View style={styles.trainerInfo}>
                    <Text style={styles.trainerName}>
                        {item.first_name} {item.last_name}
                    </Text>
                    <Text style={styles.trainerExperience}>Experience: {item.experience} years</Text>
                    <Text style={styles.trainerAge}>Age: {calculateAge(item.dob)}</Text>
                    <View style={styles.buttonsContainer}>
                        <Button title="View" onPress={() => { }} />
                        <Button title="Message" onPress={() => { }} />
                        <Button title="Follow" onPress={() => { }} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={allTrainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTrainer}
        />
    );
}

const styles = StyleSheet.create({
    trainerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        elevation: 2, // Adds shadow for Android
    },
    trainerImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    trainerInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    trainerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    trainerExperience: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    trainerAge: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});