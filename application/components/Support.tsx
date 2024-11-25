import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Support() {
  const handleContactSupport = () => {
    // Logic to handle contacting support (e.g., navigate to chat, email, or call)
    console.log('Contact support');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Support</Text>
        
        <View style={styles.section}>
          <Text style={styles.subHeader}>Contact Us</Text>
          <Text style={styles.description}>
            Need help? Reach out to our support team for assistance.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your message here"
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactSupport}
          >
            <Text style={styles.contactButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subHeader}>Popular Topics</Text>
          <TouchableOpacity style={styles.topicItem}>
            <Text style={styles.topicText}>How to reset my password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topicItem}>
            <Text style={styles.topicText}>How to update my profile?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topicItem}>
            <Text style={styles.topicText}>What to do if I face login issues?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topicItem}>
            <Text style={styles.topicText}>Can I cancel my subscription?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topicItem}>
            <Text style={styles.topicText}>More FAQs...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  contactButton: {
    backgroundColor: '#1DBD7B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  topicItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topicText: {
    fontSize: 16,
    color: '#1DBD7B',
  },
});
