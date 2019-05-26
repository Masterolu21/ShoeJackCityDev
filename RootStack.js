import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import SignInScreen from './App/screens/SignInScreen';
import Account from './App/screens/Account';
import Inventory from './App/screens/Inventory';
import Settings from './App/screens/Settings';
import SignUp from './App/screens/SignUp';
import ForgotScreen from './App/screens/ForgotScreen';
import Tournament from './App/screens/Tournament';
import TournamentRsvp from './App/screens/TournamentRsvp';
import Shop from './App/screens/Shop';
import Game from './App/screens/Game';

const routes = {
  SignInScreen: {
    screen: SignInScreen
  },
  Account: {
    screen: Account
  },
  Tournament: {
    screen: Tournament
  },
  TournamentRsvp: {
    screen: TournamentRsvp
  },
  Shop: {
    screen: Shop
  },
  Game: {
    screen: Game
  },
  SignUp: {
    screen: SignUp
  },
  ForgotScreen: {
    screen: ForgotScreen
  },
  Settings: {
    screen: Settings
  },
  Inventory: {
    screen: Inventory
  }
};

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
  }
}

const AppStack = createStackNavigator(routes, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  },
  initialRouteName: 'SignInScreen'
});
const AuthStack = createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AppStack,
    App: AppStack,
    Auth: AuthStack
    // AuthLoading: AppStack,
    // Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
