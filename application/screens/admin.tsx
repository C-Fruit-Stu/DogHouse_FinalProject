import { View, Text, ScrollView, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Admin = () => {
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.header}>Admin Dashboard</Text>

    <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Managetrainers')}>
        <Icon name="people-outline" size={30} color="rgba(2,71,56,1)" />
        <Text style={styles.cardText}>Manage Trainers</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ManageCostumers')}>
        <Icon name="people-outline" size={30} color="rgba(2,71,56,1)" />
        <Text style={styles.cardText}>Manage Costumers</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('StatisticAdmin')}>
        <Icon name="stats-chart-outline" size={30} color="rgba(2,71,56,1)" />
        <Text style={styles.cardText}>View Statistics</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('LogIn')}>
        <Icon name="log-out-outline" size={30} color="rgba(2,71,56,1)" />
        <Text style={styles.cardText}>Logout</Text>
    </TouchableOpacity>
</ScrollView>
  )
}

export default Admin
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F9FA',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 50
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 2,
    },
    cardText: {
        fontSize: 18,
        marginLeft: 10,
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});