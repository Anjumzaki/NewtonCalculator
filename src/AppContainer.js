import React from 'react';
import { View, Text, Button, TouchableHighlight, Image, Platform, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import MainScreen from './Screens/MainScreen'
import CustomSidebarMenu from './CustomSidebarMenu'
import HomePage from './Screens/HomePage';
import TransScreen from './Screens/TransScreen'
import YearlyReport from './Screens/YearlyReport'
import MonthlyReport from './Screens/MonthlyReport'
import ChangeFixed from './Screens/ChangeFixed'
import AddGoal from './Screens/AddGoal'
import SeeGoal from './Screens/SeeGoal'
import SingleTransactions from './Screens/SingleTransactions'
import SingleTransDetails from './Screens/SingleTransDetail'
import YearlyGoal from './Screens/YearlyGoal'

const TransStack = createStackNavigator(
    {
        HomePage: HomePage,
        TransScreen: TransScreen,
        SingleTransactions:SingleTransactions,
        SingleTransDetails:SingleTransDetails
    },
    {
        initialRouteName: 'HomePage',
    }
);
const DrawerNavigator = createDrawerNavigator({
    TransStack,
    MainScreen,
    YearlyReport,
    MonthlyReport,
    ChangeFixed,
    AddGoal,
    YearlyGoal
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#3f3fb9' },
        headerTintColor: 'white',
        headerLeft:
            <TouchableHighlight onPress={() => navigation.openDrawer()}>
                <Image style={{ width: 35, height: 35, marginLeft: 10 }} source={require('../assets/navigation.png')} />
            </TouchableHighlight >
    }),
    initialRouteName: 'TransStack',
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: 'drawerOpen',
    drawerCloseRoute: 'drawerClose',
    drawerToggleRoute: 'drawerToggle',
});

const RootStack = createStackNavigator(
    {
        Login: Login,
        SignUp: SignUp,
        MainTabs: DrawerNavigator
    },
    {
        initialRouteName: 'Login',
    }

);
const AppContainer = createAppContainer(RootStack);
export default AppContainer