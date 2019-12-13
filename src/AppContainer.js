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

const TransStack = createStackNavigator(
    {
        HomePage: HomePage,
        TransScreen: TransScreen,
    },
    {
        initialRouteName: 'HomePage',
    }
);
const DrawerNavigator = createDrawerNavigator({
    TransStack,
    MainScreen,
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
        headerStyle: { backgroundColor: '#4868dc' },
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
        initialRouteName: 'SignUp',
    }

);
const AppContainer = createAppContainer(RootStack);
export default AppContainer