import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider'; // Adjust path as needed
import { TrainerType } from '../types/trainer_type';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { CoustumerType } from '../types/coustumer_type';

const StatisticAdmin: React.FC = () => {
  const [trainers, setalltrainers] = useState<TrainerType[]>([]);
  const [costumers, setAllCostumers] = useState<CoustumerType[]>([]);
  const navigation = useNavigation();
  const { getAllUsers } = useContext(TrainerContext);
  const { getAllCostumers, allCostumers } = useContext(CoustumerContext);
  const [totalearning,settotalearning] = useState(0);
  const [ totalsessions, settotalsessions] = useState(0);




  useEffect(() => {
    fetchTrainers();
    fetchCostumers();
    console.log('users: ', trainers);
    console.log('costumers: ', costumers);
    console.log('totalearning: ', totalearning);
  }, []);
  const fetchTrainers = async () => { // Show loading spinner
    try {
      const trainers = await getAllUsers();
      if (trainers) {
        setalltrainers([...trainers]);
        let sum = 0
        for (let i = 0; i < trainers.length; i++) {
          if(trainers[i].trainingSchedule){
            sum += trainers[i].trainingSchedule.length;
          }
        }
        settotalsessions(sum);
        console.log('totalearning: ', totalearning);
        console.log('totalsessions: ', totalsessions);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } 
  };

  const fetchCostumers = async () => {
    try {
      const costumers = await getAllCostumers();
      if (costumers) {
        setAllCostumers(costumers);
      }
    } catch (error) {
      console.error("Failed to fetch costumers", error);
    } 
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Statistics</Text>
      <ScrollView>
        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Total Users: {trainers.length + costumers.length}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Active Trainers: {trainers.length || 0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Total Sessions: {totalsessions || 0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Total Earnings: ${trainers.length || 0}</Text>
        </View>
        {/* Add more statistics as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(2,71,56,0.8)',
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statTitle: {
    fontSize: 18,
    color: '#333',
  },
});

export default StatisticAdmin;
