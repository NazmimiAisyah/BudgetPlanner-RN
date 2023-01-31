import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Components/config";

export default function SignUp({ navigation, GlobalState }) {
    const {
      email, setEmail,
        password, setPassword,
      confirmPassword, setConfirmPassword,
    errorMessage, setErrorMessage
    } = GlobalState;
 
    useEffect(() => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
  }, []);


    const handleSignUp = () => {
        if (!email || !password || !confirmPassword) {
        setErrorMessage('Please fill all fields.');
        } else if (password !== confirmPassword) {
        setErrorMessage('The password confirmation does not match.');
        } else {
        // Perform sign up action
            setErrorMessage('');
            createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // your code

            alert("Successfully sign up! Please login");
            setPassword('');
            setConfirmPassword('');
            navigation.navigate('Login')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setErrorMessage(errorMessage);
            // ..
        });
        }
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
              onChangeText={text => setConfirmPassword(text) }
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity
        style={[
          styles.signUpButton,
          { backgroundColor: (!email || !password || !confirmPassword) ? 'grey' : 'blue' }
        ]}
        onPress={handleSignUp}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        <View style={styles.signUpContainer}>
        <Text style={styles.dontHaveAccountText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: 'grey',
    borderWidth: 1,
    },
  signUpButton: {
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'white',
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
  errorMessage: {
    color: 'red',
  },
});