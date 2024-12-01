import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { TrainerContext } from '../context/TrainerContextProvider';

export default function AllCostumers() {
  const { currentTrainer, GetTrainerCustomers } = useContext(TrainerContext);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (currentTrainer?.CostumersArr) {
        const fetchedCustomers = currentTrainer?.CostumersArr
        setCustomers(currentTrainer.CostumersArr);
        console.log(customers);
      }
    };
    fetchCustomers();
  }, [currentTrainer]);

  const renderCustomerItem = ({ item }: { item: any }) => (
    <View style={styles.customerCard}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View>
        <Text style={styles.customerEmail}>{item}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trainer's Customers</Text>
      {customers.length > 0 ? (
        <FlatList
          data={customers}
          keyExtractor={(item) => item}
          renderItem={renderCustomerItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noCustomersText}>No customers available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  customerEmail: {
    fontSize: 14,
    color: '#666',
  },
  viewButton: {
    marginLeft: 'auto',
    backgroundColor: '#1DBD7B',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noCustomersText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
});
