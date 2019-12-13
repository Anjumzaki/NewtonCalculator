import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            userName: '',
            Password: '',
            msg: ""
        };
    }
    login(){
        // console.log("login")
        // axios
        //     .post('https://blooming-ridge-94645.herokuapp.com/login',{
        //         userName: this.state.userName,
        //         password: this.state.Password
        //     })
        //     .then((response) => { 
                
        //         console.log("resp1",response.data)
        //         if(response.data === "match"){
        //             this.props.navigation.navigate('MainTabs')
        //             this.props.navigation.dispatch(StackActions.reset({
        //                 index: 0,
        //                 actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        //             }))
        //         }else if(response.data === "wrong"){
        //             this.setState({msg: "password is incorrect"})
        //         }
        //     }).catch((error) => { 
        //     console.log("mongodb get register error",error)
        //     this.setState({msg: "login info is incorrect"})
        //     })
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        console.log("state",this.state)
        return (
            <Text>Main Screen</Text>
        );
    }
}