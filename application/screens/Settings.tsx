import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';

export default function Settings() {
  const navigation = useNavigation();
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Update Info')}
          >
            <Text style={styles.buttonText}>Update Info</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Update Payment')}
          >
            <Text style={styles.buttonText}>Update Payment Method</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Membership Details')}
          >
            <Text style={styles.buttonText}>Membership Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('faq')}
          >
            <Text style={styles.buttonText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('support')}
          >
            <Text style={styles.buttonText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('termcondition')}
          >
            <Text style={styles.buttonText}>Term And Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('updatepassword')}
          >
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
            navigation.navigate('LogIn')}}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding for scrollability
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Background color for the safe area
    paddingTop: 20, // Space from the top
  },
  container: {
    padding: 16, // Add padding inside the container
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1DBD7B', // Green background
    borderRadius: 8, // Rounded corners
    marginVertical: 10, // Space between buttons
    paddingVertical: 15, // Vertical padding for button height
    paddingHorizontal: 20, // Horizontal padding for button width
    alignItems: 'center', // Center text inside the button
  },
  buttonText: {
    fontSize: 18, // Text size
    color: '#fff', // White text color
    fontWeight: '600', // Semi-bold text
  },
});
