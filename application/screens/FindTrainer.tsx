import { View, Text, Image, Button, FlatList, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { TrainerContext } from '../context/TrainerContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FindTrainer() {
    const { GetTrainerPosts,GetAllTrainers } = useContext(TrainerContext);
    const navigation = useNavigation();
    const [localTrainers, setLocalTrainers] = useState<any[]>([]); // Ensure this is always an array

    // Load trainers from AsyncStorage
    const TrainersRawData = async () => {
        try {
            GetAllTrainers();
            const storedTrainers = await AsyncStorage.getItem('allTrainer');
            if (storedTrainers) {
                const trainersArray = JSON.parse(storedTrainers);

                if (Array.isArray(trainersArray)) {
                    setLocalTrainers(trainersArray); // Set the local state with trainers from AsyncStorage
                    console.log("Loaded trainers from AsyncStorage:", trainersArray);
                } else {
                    console.error("Data in AsyncStorage is not an array");
                }
            } else {
                console.log("No trainers found in AsyncStorage");
            }
        } catch (error) {
            console.error('Error loading trainers from AsyncStorage:', error);
        }
    };

    // Fetch posts by trainer email and navigate to Posts screen
    const showPosts = async (email: string) => {
        try {
            const posts = await GetTrainerPosts(email); // Fetch posts by trainer's email
            if (posts && posts.length > 0) {
                navigation.navigate('Posts', { posts, trainerEmail: email });
            } else {
                console.log("No posts found for this trainer");
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        TrainersRawData(); // Load trainers from AsyncStorage
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
                    <Text style={styles.trainerExperience}>Experience: {item.experience || 0} years</Text>
                    <Text style={styles.trainerAge}>Age: {item.dob ? calculateAge(item.dob) : 'N/A'}</Text>
                    <View style={styles.buttonsContainer}>
                        <Button title="ViewPosts" onPress={() => showPosts(item.email)} />
                        <Button title="Like" onPress={() => { }} />
                        <Button title="Follow" onPress={() => { }} />
                    </View>
                </View>
            </View>
        );
    };

    if (!localTrainers || localTrainers.length === 0) {
        return <Text>No trainers found</Text>;
    }

    return (
        <FlatList
            data={localTrainers}
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
        elevation: 2,
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
