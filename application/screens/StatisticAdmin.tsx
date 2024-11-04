import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider'; // Adjust path as needed

const StatisticAdmin: React.FC = () => {
  const navigation = useNavigation();
  const { fetchStatistics } = useContext(TrainerContext); // Adjust this based on your context
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchStatistics(); // Fetch statistics from your context or API
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch statistics", error);
      }
    };

    getStats();
  }, [fetchStatistics]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Statistics</Text>
      <ScrollView>
        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Total Users: {stats.totalUsers || 0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Active Trainers: {stats.activeTrainers || 0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Total Sessions: {stats.totalSessions || 0}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Total Earnings: ${stats.totalEarnings || 0}</Text>
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
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 310100,
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
