import React, {ReactElement} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import SearchScreen from './screens/SearchScreen';
import BookScreen from './screens/BookScreen';

const MainStack = createNativeStackNavigator<MainStackParamList>();

export type MainStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Search: undefined;
  Book: undefined;
};
export type MainStackNavigationProp = NavigationProp<MainStackParamList>;

const Navigation = (): ReactElement => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          title: 'Book Discovery',
          headerTitleAlign: 'center',
        }}
        initialRouteName="SignUp">
        <MainStack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: 'Sign Up',
          }}
        />
        <MainStack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: 'Sign In',
          }}
        />
        <MainStack.Screen name="Search" component={SearchScreen} />
        <MainStack.Screen name="Book" component={BookScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
