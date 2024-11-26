import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useFormik } from 'formik';
import { TrainerContext } from '../context/TrainerContextProvider';
import { useNavigation } from '@react-navigation/native';

const UpdatePassword: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { currentTrainer,UpdatePassword } = useContext(TrainerContext);
  const { currentCoustumer } = useContext(TrainerContext);
  const navigation = useNavigation();
  const validate = (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    const errors: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {};
    
    if (!values.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!values.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (values.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters';
    }
    
    if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if(currentTrainer){
        if(values.newPassword === currentTrainer.password){
            errors.newPassword = 'New password cannot be the same as the current password';
          }
    }
    if(currentCoustumer){
        if(values.newPassword === currentCoustumer.password){
            errors.newPassword = 'New password cannot be the same as the current password';
          }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: async (values) => {
        if(currentTrainer){
            if(await UpdatePassword(currentTrainer._id,values.newPassword)){
                Alert.alert("Password Updated");
                navigation.navigate('BackToPre');
            }
        }
    //   try {
    //     console.log('Updating password with values:', values);
    //     setMessage('Password updated successfully!');
    //   } catch (error) {
    //     setMessage('Failed to update password. Please try again.');
    //   }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Password</Text>
      {message && (
        <Text style={[styles.message, message.includes('success') ? styles.success : styles.error]}>
          {message}
        </Text>
      )}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={formik.values.currentPassword}
          onChangeText={formik.handleChange('currentPassword')}
          onBlur={formik.handleBlur('currentPassword')}
        />
        {formik.touched.currentPassword && formik.errors.currentPassword && (
          <Text style={styles.errorText}>{formik.errors.currentPassword}</Text>
        )}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={formik.values.newPassword}
          onChangeText={formik.handleChange('newPassword')}
          onBlur={formik.handleBlur('newPassword')}
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <Text style={styles.errorText}>{formik.errors.newPassword}</Text>
        )}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
        )}
      </View>
      <Button title="Update Password" onPress={formik.handleSubmit} color="#1dbd7b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});

export default UpdatePassword;
