import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Make sure to install and import the correct navigation package
import { Picker } from '@react-native-picker/picker';

const AdminSettings: React.FC = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('light');
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleThemeChange = (value:any) => {
    setTheme(value);
    Alert.alert(`Theme changed to: ${value}`);
  };

  const handleNotificationToggle = () => {
    setEmailNotifications((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Preferences</Text>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>App Theme:</Text>
          <Picker
            selectedValue={theme}
            onValueChange={handleThemeChange}
            style={styles.picker}
          >
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Dark" value="dark" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.notificationContainer}>
          <Text style={styles.label}>Enable Email Notifications</Text>
          <Switch
            value={emailNotifications}
            onValueChange={handleNotificationToggle}
          />
        </View>
      </View>
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
    marginTop: 30,
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
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(2,71,56,0.8)',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    width: 150,
    color: '#333',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

export default AdminSettings;
