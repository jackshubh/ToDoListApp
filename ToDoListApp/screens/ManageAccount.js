import {View, TextInput, Text} from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {updatePassword, deleteUser} from '@react-native-firebase/auth';
import CommonButton from '../components/CommonButton';

export default function ManageAccount({navigation}) {
  let [newPassword, setNewPassword] = React.useState('');
  let [currentPassword, setCurrentPassword] = React.useState('');
  let [errorMessage, setErrorMessage] = React.useState('');
  let logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.popToTop();
      });
  };

  let updateUserPassword = () => {
    auth()
      .signInWithEmailAndPassword(auth().currentUser.email, currentPassword)
      .then(userCredential => {
        const user = userCredential.user;
        updatePassword(user, newPassword)
          .then(() => {
            setNewPassword('');
            setErrorMessage('');
            setCurrentPassword('');
          })
          .catch(error => {
            setErrorMessage(error.message);
          });
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  let deleteUserAndToDos = () => {
    if (currentPassword === '') {
      setErrorMessage('Must enter current password to delete account');
    } else {
      auth()
        .signInWithEmailAndPassword(auth().currentUser.email, currentPassword)
        .then(userCredential => {
          const user = userCredential.user;

          let batch = firestore().batch();

          const q = firestore()
            .collection('todos')
            .where('userId', '==', user.uid);
          q.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              batch.delete(doc.ref);
            });

            batch.commit();

            deleteUser(user)
              .then(() => {
                navigation.popToTop();
              })
              .catch(error => {
                setErrorMessage(error.message);
              });
          });
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="Current Password"
        value={currentPassword}
        secureTextEntry={true}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="New Password"
        value={newPassword}
        secureTextEntry={true}
        onChangeText={setNewPassword}
      />
      <CommonButton title="Update Password" onPress={updateUserPassword} />
      <CommonButton title="Delete User" onPress={deleteUserAndToDos} />
      <CommonButton title="Logout" onPress={logout} />
      <CommonButton title="Back to ToDos" onPress={() => navigation.pop()} />
    </View>
  );
}
