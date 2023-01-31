import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Components/config";

export default function Login({ navigation, GlobalState }) {
    const {
      email, setEmail,
      password, setPassword
    } = GlobalState;
 

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //your code

        alert("Sucessfully signed in!");
        navigation.navigate('Main');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  };

  

  function signOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        keyboardType='default'
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize='none'
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signUpLink: {
    alignItems: 'center',
  },
  signUpLinkText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  dontHaveAccountText: {
    color: 'grey',
  },
  signUpText: {
    color: 'blue',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});