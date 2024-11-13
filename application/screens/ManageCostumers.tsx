import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider'; // Adjust path as needed
import { CoustumerType } from '../types/coustumer_type';


interface User {
  id: string;
  first_name: string;
  last_name: string;
}
const ManageCostumers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const { getAllCostumers, allCostumers, DeleteCostumer } = useContext(TrainerContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Show loading spinner
    try {
      const costumers = await getAllCostumers();
      if (costumers) {
        setUsers(allCostumers);
      }
    } catch (error) {
      console.error("Failed to fetch costumers", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = await DeleteCostumer(userId);
    if (confirmDelete) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      Alert.alert("Costumer deleted", `Costumer with ID: ${userId} has been deleted.`);
    } else {
      Alert.alert("Error", `Costumer with ID: ${userId} not found.`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={200} color="#007AFF" />
        <Text style={styles.loadingText}>Loading customers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Manage Customers</Text>

      <FlatList
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.first_name} {item.last_name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteUser(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 20 },
  backButtonText: { color: '#007AFF', fontSize: 18, marginTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: { fontSize: 18 },
  deleteButton: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 5 },
  deleteButtonText: { color: '#fff' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
});

export default ManageCostumers;
