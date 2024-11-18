import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Easing, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { CoustumerType } from '../types/coustumer_type';
import { CoustumerContext } from '../context/CoustumerContextProvider';
import { useNavigation } from '@react-navigation/native';

export default function UpdateEmail() {
  const { currentCoustumer,updateEmail } = useContext(CoustumerContext);
  const navigation = useNavigation();
  

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
      console.log('Updated email:', values.email);
      let costumer : CoustumerType ={
        first_name: currentCoustumer.first_name,
        last_name: currentCoustumer.last_name,
        email: values.email,
        password: currentCoustumer.password,
        dob: currentCoustumer.dob,
        location: currentCoustumer.location,
        image: currentCoustumer.image,
        phone: currentCoustumer.phone,
        clientType: currentCoustumer.clientType,
        payment: currentCoustumer.payment,
        dogBreed: currentCoustumer.dogBreed,
        update_details: currentCoustumer.update_details,
        stayLogIn: currentCoustumer.stayLogIn,
      }
      if (currentCoustumer.clientType == '2') {
        console.log('CustomerInfo:', JSON.stringify(costumer, null, 2)); 
        if(await updateEmail(costumer)) {
          Alert.alert("Success", "Email updated successfully");
        }
      }
      else if (currentCoustumer.clientType == '1') {
        console.log('TrainerInfo:', JSON.stringify(costumer, null, 2)); 
        if(await updateEmail(costumer)) {
          Alert.alert("Success", "Email updated successfully");
          navigation.navigate('BackToPre');
        }
      }
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: 1 }]}>
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
      </Animated.View>
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
