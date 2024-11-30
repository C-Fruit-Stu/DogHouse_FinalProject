import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
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
  const { getAllCostumers } = useContext(CoustumerContext);
  const [totalearning, settotalearning] = useState(0);
  const [totalsessions, settotalsessions] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTrainers();
        await fetchCostumers();
      } catch (error) {
        console.error('Error loading data', error);
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchData();
  }, []);

  const fetchTrainers = async () => {
    try {
      const trainers = await getAllUsers();
      if (trainers) {
        setalltrainers([...trainers]);
        let sum = 0;
        for (let i = 0; i < trainers.length; i++) {
          if (trainers[i].trainingSchedule) {
            sum += trainers[i].trainingSchedule.length;
          }
        }
        settotalsessions(sum);
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchCostumers = async () => {
    try {
      const costumers = await getAllCostumers();
      if (costumers) {
        setAllCostumers(costumers);
      }
    } catch (error) {
      console.error('Failed to fetch costumers', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#02713A" />
          <Text style={styles.loaderText}>Loading data...</Text>
        </View>
      ) : (
        <>
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
              <Text style={styles.statTitle}>Total Earnings: ${totalearning || 0}</Text>
            </View>
            {/* Add more statistics as needed */}
          </ScrollView>
        </>
      )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#02713A',
  },
});

export default StatisticAdmin;
