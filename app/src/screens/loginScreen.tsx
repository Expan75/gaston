import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { login } from '../api/mock';

const LoginScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const loginUser = () => {
    login('test@test.ca', 'password', true)
    .then(() => navigation.navigate('Home'))
    .catch((e) => setErrorMessage(e.message))
  };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LoginScreen</Text>
      <Button title="Log in" onPress={loginUser}/>
      <Button title="Create account" onPress={() => navigation.navigate('CreateAccount')}/>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default LoginScreen;