import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SignInScreen from './App/screens/SignInScreen';
import Account from './App/screens/Account';
import Inventory from './App/screens/Inventory';
import Settings from './App/screens/Settings';
import SignUp from './App/screens/SignUp';
import Search from './App/screens/Search';
import ForgotScreen from './App/screens/ForgotScreen';
import Tournament from './App/screens/Tournament';
import TournamentRsvp from './App/screens/TournamentRsvp';
import Shop from './App/screens/Shop';
import Game from './App/screens/Game';
import LoginScreen from './App/screens/LoginScreen';
import EditBuyingInfo from './App/screens/EditBuyingInfo';
import EditSellingInfo from './App/screens/EditSellingInfo';
import EditPayoutInfo from './App/screens/EditPayoutInfo';
import EditUserInfo from './App/screens/EditUserInfo';
import ShopItems from './App/screens/ShopItems';
import ShopAttack from './App/screens/ShopAttack';
import ShopDefend from './App/screens/ShopDefend';

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
    LoginScreen: {
        screen: LoginScreen
    },
    Settings: {
        screen: Settings
    },
    Inventory: {
        screen: Inventory
    },
    Search: {
      screen: Search
    }
};

class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
    }
}

const AppMainStack = createStackNavigator(routes, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
        header: null
    },
    //initialRouteName: 'LoginScreen',
});

const AppStack = createStackNavigator(
    {
        AppMainStack,
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
        ShopAttack: {
          screen: ShopAttack
        },
        ShopDefend: {
          screen: ShopDefend
        },
        ShopItems: {
          screen: ShopItems
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
        LoginScreen: {
            screen: LoginScreen
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            header: null,
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
