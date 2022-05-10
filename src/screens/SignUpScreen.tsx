import React, {ReactElement, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavigationProp} from '../Navigation';
import restAPI, {API_ENDPOINTS_TYPE, registerUser} from '../axiosConfig';
import {AxiosError, AxiosResponse} from 'axios';
import {setGenericPassword} from 'react-native-keychain';

const SignUpScreen = (): ReactElement => {
  const passwordInputRef = useRef<TextInput>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<MainStackNavigationProp>();

  const onLoginChangeText = (login: string) => setUsername(login);

  const onPasswordChangeText = (password: string) => setPassword(password);

  const onLoginSubmitEditing = () => passwordInputRef.current?.focus();

  const onSignInPress = () => navigation.navigate('SignIn');

  const onSignUpPress = () => {
    setIsLoading(true);
    registerUser({username, password})
      .then(
        (
          response: AxiosResponse<API_ENDPOINTS_TYPE['REGISTER']['SUCCESS']>,
        ) => {
          setGenericPassword(username, response.data.user.token);
          restAPI.defaults.headers.common['Authorization'] =
            response.data.user.token;
          navigation.navigate('Search');
        },
      )
      .catch((error: AxiosError<API_ENDPOINTS_TYPE['REGISTER']['ERROR']>) =>
        Alert.alert('Error', error.response?.data.message),
      )
      .finally(() => setIsLoading(false));
  };

  const buttonStyle = ({pressed}: PressableStateCallbackType) => [
    styles.submitButton,
    pressed && Platform.OS === 'ios' ? styles.submitButtonOpacity : null,
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Pressable onPress={Keyboard.dismiss} style={styles.contentContainer}>
        <Text style={styles.title}>Hello There!</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'username'}
          autoComplete={'username'}
          textContentType={'username'}
          returnKeyType={'next'}
          onChangeText={onLoginChangeText}
          value={username}
          onSubmitEditing={onLoginSubmitEditing}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'password'}
          secureTextEntry={true}
          autoComplete={'password'}
          textContentType={'password'}
          returnKeyType={'send'}
          onChangeText={onPasswordChangeText}
          value={password}
          ref={passwordInputRef}
          onSubmitEditing={onSignUpPress}
        />
        <Pressable
          style={buttonStyle}
          android_ripple={{
            color: 'light-grey',
            borderless: false,
          }}
          onPress={onSignUpPress}>
          <Text>Sign Up</Text>
          {isLoading ? (
            <ActivityIndicator
              size={'small'}
              color={'black'}
              style={{position: 'absolute', right: 10}}
            />
          ) : null}
        </Pressable>
        <Text style={styles.loginText}>or if you already have account</Text>
        <Pressable
          style={buttonStyle}
          android_ripple={{
            color: 'light-grey',
            borderless: false,
          }}
          onPress={onSignInPress}>
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
    flexDirection: 'row',
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
