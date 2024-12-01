import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { TrainerContext } from '../context/TrainerContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

type RouteParams = {
    clientType?: number;
    trainerEmail?: string;
};

export default function FindTrainer() {
    const { GetTrainerPosts, GetAllTrainers, AddCostumerToArr } = useContext(TrainerContext);
    const { addTrainer, currentCoustumer } = useContext(CoustumerContext);
    const navigation = useNavigation();
    const [localTrainers, setLocalTrainers] = useState<any[]>([]);
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const clientType = route.params?.clientType;

    const TrainersRawData = async () => {
        try {
            GetAllTrainers();
            const storedTrainers = await AsyncStorage.getItem('allTrainer');
            if (storedTrainers) {
                const trainersArray = JSON.parse(storedTrainers);
                if (Array.isArray(trainersArray)) {
                    setLocalTrainers(trainersArray);
                }
            }
        } catch (error) {
            console.error('Error loading trainers from AsyncStorage:', error);
        }
    };

    const addTrainerToList = async (email: string) => {
        try {
            addTrainer(email);
            AddCostumerToArr(email, currentCoustumer.email);
        } catch (error) {
            console.error('Error adding trainer to list:', error);
        }
    };

    const showPosts = (trainerEmail: string) => {
        try {
            navigation.navigate('Posts', { clientType, trainerEmail });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        TrainersRawData();
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

    const renderTrainer = ({ item }: { item: any }) => (
        <Animatable.View style={styles.trainerContainer} animation="fadeInUp" duration={1200}>
            <Image source={{ uri: item.image }} style={styles.trainerImage} />
            <View style={styles.trainerInfo}>
                <Text style={styles.trainerName}>
                    {item.first_name} {item.last_name}
                </Text>
                <Text style={styles.trainerExperience}>Experience: {item.experience || 0} years</Text>
                <Text style={styles.trainerAge}>Age: {item.dob ? calculateAge(item.dob) : 'N/A'}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.viewPostsButton]} onPress={() => showPosts(item.email)}>
                        <Icon name="eye" size={20} color="#fff" />
                        <Text style={styles.buttonText}>View Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={() => {}}>
                        <Icon name="thumbs-up" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.followButton]} onPress={() => addTrainerToList(item.email)}>
                        <Icon name="plus" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Follow</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    );

    if (!localTrainers || localTrainers.length === 0) {
        return (
            <Animatable.Text animation="fadeIn" style={styles.noDataText}>
                No trainers found
            </Animatable.Text>
        );
    }

    return (
        <FlatList
            style={styles.container}
            data={localTrainers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTrainer}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 15,
        backgroundColor: '#f5f5f5',
    },
    trainerContainer: {
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    trainerImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 15,
    },
    trainerInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    trainerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    trainerExperience: {
        fontSize: 14,
        color: '#777',
    },
    trainerAge: {
        fontSize: 14,
        color: '#777',
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    viewPostsButton: {
        backgroundColor: '#007BFF',
    },
    likeButton: {
        backgroundColor: '#28a745',
    },
    followButton: {
        backgroundColor: '#ffc107',
    },
    buttonText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    noDataText: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginTop: 50,
    },
});
