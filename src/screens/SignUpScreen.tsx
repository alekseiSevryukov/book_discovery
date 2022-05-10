import React, {ReactElement} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

const SignUpScreen = (): ReactElement => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Pressable onPress={Keyboard.dismiss} style={styles.contentContainer}>
        <Text style={styles.title}>Hello There!</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'login'}
          autoComplete={'username-new'}
          textContentType={'username'}
          returnKeyType={'next'}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'password'}
          secureTextEntry={true}
          autoComplete={'password-new'}
          textContentType={'newPassword'}
          returnKeyType={'send'}
        />
        <Pressable
          style={({pressed}) => [
            styles.submitButton,
            pressed && Platform.OS === 'ios'
              ? styles.submitButtonOpacity
              : null,
          ]}
          android_ripple={{
            color: 'light-grey',
            borderless: false,
          }}>
          <Text>Sign Up</Text>
        </Pressable>
        <Text style={styles.loginText}>or if you already have account</Text>
        <Pressable
          style={({pressed}) => [
            styles.submitButton,
            pressed && Platform.OS === 'ios'
              ? styles.submitButtonOpacity
              : null,
          ]}
          android_ripple={{
            color: 'light-grey',
            borderless: false,
          }}>
          <Text>Sign In</Text>
        </Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  submitButton: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    marginBottom: 10,
    opacity: 1,
  },
  submitButtonOpacity: {
    opacity: 0.5,
  },
  loginText: {
    marginBottom: 10,
  },
});

export default SignUpScreen;
