import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function MembershipDetails() {
  return (
    <Animatable.View 
      style={styles.container}
      animation="fadeInUp"
      duration={1000}
    >
      <Text style={styles.header}>Membership Details</Text>
      
      {/* Membership Plan Section */}
      <Animatable.View animation="fadeIn" duration={1200} delay={300}>
        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>Gold Membership</Text>
          <Text style={styles.planDescription}>
            Exclusive benefits such as priority support, access to premium content, and special discounts.
          </Text>
          <Text style={styles.planPrice}>$99 / year</Text>
        </View>
      </Animatable.View>

      {/* Upgrade Button */}
      <Animatable.View animation="bounceIn" duration={1000} delay={500}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Upgrade Membership</Text>
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1DBD7B',
    textAlign: 'center',
    marginBottom: 20,
  },
  planContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 30,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  planDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1DBD7B',
  },
  button: {
    backgroundColor: '#1DBD7B',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
