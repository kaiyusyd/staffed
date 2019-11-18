/**
 * Staffed App Developed by Kai
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { configureStore } from './src/store';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import LandingScreen from './src/screens/LandingScreen';

const MainNavigator = createStackNavigator({
  Splash: { screen: SplashScreen, navigationOptions: () => ({ gesturesEnabled: false }) },
  Login: { screen: LoginScreen, navigationOptions: () => ({ gesturesEnabled: false }) },
  Landing: { screen: LandingScreen, navigationOptions: () => ({ gesturesEnabled: false }) },
},
{
  initialRouteName: 'Splash',
  header: null,
  headerMode: 'none'
});

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.PureComponent {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
