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
    const { addTrainer,currentCoustumer } = useContext(CoustumerContext);
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
        } catch (error) {
            console.error('Error adding trainer to list:', error);
        }
        try{
            console.log('trainerEmail ====>>>', email);

            console.log('currentCoustumer.email ====>>>', currentCoustumer.email);
            AddCostumerToArr(email, currentCoustumer.email);
        }catch(error){
            console.error('Error adding trainer to list:', error);
        }
    }

    const showPosts = async (trainerEmail: string) => {
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

    const renderTrainer = ({ item }: { item: any }) => {
        return (
            <Animatable.View style={styles.trainerContainer} animation="fadeInUp" duration={1000}>
                <Image source={{ uri: item.image }} style={styles.trainerImage} />
                <View style={styles.trainerInfo}>
                    <Text style={styles.trainerName}>
                        {item.first_name} {item.last_name}
                    </Text>
                    <Text style={styles.trainerExperience}>Experience: {item.experience || 0} years</Text>
                    <Text style={styles.trainerAge}>Age: {item.dob ? calculateAge(item.dob) : 'N/A'}</Text>
                    <View style={styles.buttonsContainer}>
                        <Animatable.View animation="bounceIn" duration={1500}>
                            <TouchableOpacity style={[styles.button, styles.viewPostsButton]} onPress={() => showPosts(item.email)}>
                                <Icon name="eye" size={20} color="#fff" style={styles.icon} />
                                <Text style={styles.buttonText}>View Posts</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View animation="zoomIn" duration={1500}>
                            <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={() => { }}>
                                <Icon name="thumbs-up" size={20} color="#fff" style={styles.icon} />
                                <Text style={styles.buttonText}>Like</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <Animatable.View animation="fadeIn" duration={1500}>
                            <TouchableOpacity style={[styles.button, styles.followButton]} onPress={() => addTrainerToList(item.email)}>
                                <Icon name="plus" size={20} color="#fff" style={styles.icon} />
                                <Text style={styles.buttonText}>Follow</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </View>
            </Animatable.View>
        );
    };

    if (!localTrainers || localTrainers.length === 0) {
        return <Text>No trainers found</Text>;
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
    container:{
        marginTop:50
    },
    trainerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    trainerImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginRight: 20,
        borderWidth: 3,
        borderColor: '#ddd',
    },
    trainerInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    trainerName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    trainerExperience: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    trainerAge: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    viewPostsButton: {
        backgroundColor: '#007BFF',
        height: 40
    },
    likeButton: {
        backgroundColor: '#28a745',
    },
    followButton: {
        backgroundColor: '#ffc107',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        marginRight: 5,
    },
});
