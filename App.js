import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen/HomeScreen'


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    }
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
      },
    }
  },
);

export default createAppContainer(AppNavigator);