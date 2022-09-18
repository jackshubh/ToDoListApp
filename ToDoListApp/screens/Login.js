import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import React from 'react';
import auth from '@react-native-firebase/auth';
import CommonButton from '../components/CommonButton';

export default function Login({navigation}) {
  React.useEffect(() => {
    if (auth().currentUser) {
      navigation.navigate('ToDo');
    } else {
      auth().onAuthStateChanged(user => {
        if (user) {
          navigation.navigate('ToDo');
        }
      });
    }
  }, []);

  let [errorMessage, setErrorMessage] = React.useState('');
  let [email, setEmail] = React.useState('');
  let [password, setPassword] = React.useState('');

  let login = () => {
    if (email !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          navigation.navigate('ToDo', {user: userCredential.user});
          setErrorMessage('');
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage('Please enter an email and password');
    }
  };

  return (
    <View style={AppStyles.imageContainer}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={60}>
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightTextInput,
            AppStyles.lightText,
          ]}
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail}
          autoFocus
          keyboardType="email-address"
        />
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightTextInput,
            AppStyles.lightText,
          ]}
          placeholder="Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          textContentType="password"
        />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Don't have an account? </Text>
          <InlineTextButton
            text="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
        <View style={[AppStyles.rowContainer, AppStyles.bottomMargin]}>
          <Text style={AppStyles.lightText}>Forgotten your password? </Text>
          <InlineTextButton
            text="Reset"
            onPress={() => navigation.navigate('ResetPassword')}
          />
        </View>
        <CommonButton title="Login" onPress={login} />
      </KeyboardAvoidingView>
    </View>
  );
}
