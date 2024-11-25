import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { CoustumerContext } from '../context/CoustumerContextProvider';

export default function LogIn() {
  const { LogInTrainer,setcurrentTrainer,currcurrentTrainer } = useContext(TrainerContext);
  const { LogInCoustumer,setCurrentCoustumer,currentCoustumer } = useContext(CoustumerContext);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [formKey, setFormKey] = useState(0); // State to control the key prop for resetting
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigation = useNavigation();



  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      const loggingUser = {
        email: values.email,
        password: values.password
      }

      setLoading(true); // Start loading when submitting

      if(loggingUser.email === 'Admin@gmail.com' && loggingUser.password === 'admin123'){
        resetForm();
        setLoading(false); // Stop loading once the action is complete
        navigation.navigate('Admin');
        setFormKey(formKey + 1); // Increment the key to force re-render
        return
      }

      console.log("Client loggingUser:", loggingUser);
      const isTrainerLoggedIn = await LogInTrainer({ ...loggingUser });
      console.log("isTrainerLoggedIn: ", isTrainerLoggedIn)

      if (!isTrainerLoggedIn) {
        const isCoustumerLoggedIn = await LogInCoustumer({ ...loggingUser });
        console.log("isCoustumerLoggedIn: ", isCoustumerLoggedIn)
        if (!isCoustumerLoggedIn) {
          alert('Wrong email or password');
          resetForm();
          setLoading(false); // Stop loading if login fails
          setFormKey(formKey + 1); // Increment the key to force re-render
          return;
        }
        let clientType = 2;
        resetForm();
        setLoading(false); // Stop loading once the action is complete
        navigation.navigate("BackToPre", { clientType });
        return;
      }
      let clientType = 1;
      resetForm();
      setLoading(false); // Stop loading once the action is complete
      navigation.navigate("BackToPre", { clientType });
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View key={formKey}> {/* This key will reset the form upon submission */}
          <Image
            source={(require('../assets/2.png'))}
            style={styles.mainImage}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ?
          <Text style={styles.error}>{formik.errors.email}</Text>
          : null}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Enter Your Password"
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            secureTextEntry={!visiblePassword}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}
          >
            <Image
              source={{ uri: visiblePassword ? 'https://icon2.cleanpng.com/20180424/pxq/kisspng-computer-icons-cross-eye-5adf65ca6e96c2.927735901524590026453.jpg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_KjU4cWc-z6DWOwvoC06bAS_wA4MzgIQJiw&s' }}
              style={styles.check}
            />
          </TouchableOpacity>
        </View>
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.error}>{formik.errors.password}</Text>
        ) : null}

        <View style={styles.buttonNext}>
          <TouchableOpacity onPress={() => formik.handleSubmit()} style={styles.link}>
            <Text style={styles.TextButton}>Next</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="rgba(7,140,101,0.6)" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  mainImage: {
    height: 220,
    width: 300,
    borderRadius: 20,
    marginTop: 50
  },
  input: {
    height: 40,
    borderColor: 'rgba(2,71,56,0.8)',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 15,
    width: 300,
    borderRadius: 15,
    marginBottom: 5
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(2,71,56,0.8)',
    borderWidth: 1,
    borderRadius: 15,
    width: 300,
    marginTop: 15,
    paddingHorizontal: 8,
  },
  inputPassword: {
    flex: 1,
    height: 40,
  },
  toggleButton: {
    marginLeft: 10,
  },
  check: {
    width: 20,
    height: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  buttonNext: {
    backgroundColor: 'rgba(7,140,101,0.6)',
    width: '40%',
    height: 50,
    borderRadius: 15,
    marginTop: 30,
  },
  TextButton: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },
  link: {
    height: 50,
  },
  loadingContainer: {
    marginTop: 20,
  }
});
