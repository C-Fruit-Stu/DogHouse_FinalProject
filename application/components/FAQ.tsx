import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  { question: 'What is this app about?', answer: 'This app helps trainers manage their schedules, clients, and more.' },
  { question: 'How do I reset my password?', answer: 'Go to the login page and click on "Forgot Password".' },
  { question: 'Can I access the app offline?', answer: 'Some features work offline, but full functionality requires an internet connection.' },
  { question: 'How do I contact support?', answer: 'You can reach us via the "Support" page in the app.' },
  { question: 'Is my data secure?', answer: 'Yes, we use the latest encryption standards to secure your data.' },
];



export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const animation = new Animated.Value(0);

  const toggleExpand = (index: number) => {
    if (index === expandedIndex) {
      // Collapse the currently expanded item
      setExpandedIndex(null);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Expand the selected item
      setExpandedIndex(index);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Frequently Asked Questions</Text>
        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.icon}>
                {expandedIndex === index ? '-' : '+'}
              </Text>
            </TouchableOpacity>
            {expandedIndex === index && (
                <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
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
  faqItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1DBD7B',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  answerContainer: {
    padding: 15,
    backgroundColor: '#1DBD7B',
  },
  answer: {
    fontSize: 14,
    color: '#1DBD7B',
    fontWeight: 'bold',
  },
});
