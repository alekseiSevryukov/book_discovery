import React, {ReactElement} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import SearchScreen from './screens/SearchScreen';
import BookScreen from './screens/BookScreen';

const MainStack = createNativeStackNavigator();

const Navigation = (): ReactElement => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          title: 'Book Discovery',
          headerTitleAlign: 'center',
        }}>
        <MainStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <MainStack.Screen name="SignInScreen" component={SignInScreen} />
        <MainStack.Screen name="SearchScreen" component={SearchScreen} />
        <MainStack.Screen name="BookScreen" component={BookScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
