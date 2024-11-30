import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { CoustumerType } from '../types/coustumer_type';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { TrainerType } from '../types/trainer_type';

export default function UpdateEmail() {
  const { currentCoustumer, updateEmail } = useContext(CoustumerContext);
  const { currentTrainer, updateEmailTrainer } = useContext(TrainerContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email format';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setIsLoading(true); // Start loading animation
      try {
        if (currentCoustumer) {
          const customer: CoustumerType = {
            ...currentCoustumer,
            email: values.email,
          };
          if (await updateEmail(customer)) {
            Alert.alert('Success', 'Email updated successfully');
            navigation.navigate('BackToPre');
          }
        }
        if (currentTrainer) {
          const trainerUpdate: TrainerType = {
            ...currentTrainer,
            email: values.email,
          };
          if (await updateEmailTrainer(trainerUpdate)) {
            Alert.alert('Success', 'Email updated successfully');
            navigation.navigate('BackToPre');
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to update email');
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#022438" />
        ) : (
          <>
            <Text style={styles.header}>Update Your Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.error}>{formik.errors.email}</Text>
            )}
            <TouchableOpacity onPress={formik.handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  container: {
    width: 320,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(29, 189, 123, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    height: 45,
    backgroundColor: '#022438',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
