import React from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
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
import EditBuyingInfo from './App/screens/EditBuyingInfo';
import EditSellingInfo from './App/screens/EditSellingInfo';
import EditPayoutInfo from './App/screens/EditPayoutInfo';
import EditUserInfo from './App/screens/EditUserInfo';

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
    },
};

class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
    }
}

const AppMainStack = createStackNavigator(routes, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    },
    initialRouteName: 'SignInScreen',
});

const AppStack = createStackNavigator(
    {
        AppMainStack: AppMainStack,
        EditBuyingInfo: {
            screen: EditBuyingInfo
        },
        EditSellingInfo: {
            screen: EditSellingInfo
        },
        EditPayoutInfo: {
            screen: EditPayoutInfo
        },
        EditUserInfo: {
            screen: EditUserInfo
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        },
    }
);

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
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
