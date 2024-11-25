import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsAndConditions({ navigation }: { navigation: any }) {
  const handleAccept = () => {
    // Handle acceptance logic (e.g., navigate, save user agreement status, etc.)
    console.log('Terms and Conditions accepted');
    navigation.goBack(); // Go back or navigate to a different screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Terms and Conditions</Text>

        <Text style={styles.paragraph}>
          Welcome to our app! By accessing or using our services, you agree to be bound by these Terms and Conditions.
          Please read them carefully before proceeding.
        </Text>

        <Text style={styles.subHeader}>1. Use of Services</Text>
        <Text style={styles.paragraph}>
          You agree to use our services only for lawful purposes and in accordance with these terms. Any misuse or
          unauthorized access to our services is strictly prohibited.
        </Text>

        <Text style={styles.subHeader}>2. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content provided in the app, including text, graphics, and logos, is the property of the app owners and
          protected by copyright laws.
        </Text>

        <Text style={styles.subHeader}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          Users are responsible for maintaining the confidentiality of their login credentials and for any activities
          that occur under their account.
        </Text>

        <Text style={styles.subHeader}>4. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          We shall not be liable for any damages or losses arising from the use of our services, including but not
          limited to indirect or consequential damages.
        </Text>

        <Text style={styles.subHeader}>5. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to update or modify these terms at any time. Continued use of the app after changes
          constitutes acceptance of the new terms.
        </Text>

        <Text style={styles.paragraph}>
          If you have any questions or concerns about these terms, please contact us at support@example.com.
        </Text>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptButtonText}>I Accept</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1DBD7B',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1DBD7B',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
  acceptButton: {
    marginTop: 20,
    backgroundColor: '#1DBD7B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
