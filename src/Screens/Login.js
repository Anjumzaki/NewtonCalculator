import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Font from 'expo-font';
import axios from 'axios';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            Password: '',
            msg: "",
            loading: false

        };
    }
    login() {
        // console.log("login")
        this.setState({loading: true})
        axios
            .post('http://192.168.0.105:3000/login',{
                userName: this.state.userName,
                password: this.state.Password
            })
            .then((response) => { 
                console.log("resp1",response.data)
                if(response.data === "match"){
                    this.props.navigation.navigate('MainTabs')
                    this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
                    }))
                    this.setState({loading: false})

                }else if(response.data === "wrong"){
                    this.setState({msg: "password is incorrect"})
                }
            }).catch((error) => { 
            console.log("mongodb get register error",error)
            this.setState({msg: "login info is incorrect"})
            })
        // this.props.navigation.navigate('MainTabs')
        // this.props.navigation.dispatch(StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        // }))
    }

    render() {
        console.log("state", this.state)
        return (

            <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.forms
                                }
                                onChangeText={userName => this.setState({ userName })}
                                value={this.state.userName}
                                placeholder="User Name"
                                keyboardType="default"
                                returnKeyType="next"
                            />

                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={styles.forms
                                }
                                onChangeText={Password => this.setState({ Password })}
                                value={this.state.Password}
                                placeholder="Password"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry={true}
                            />
                        </View>


                        <TouchableOpacity onPress={() =>
                            this.login()
                        } style={styles.regButton} >
                            <Text style={styles.regButton1} >{this.state.loading ? 
                                <Image
                                 source={require('../../assets/Spin-1s.gif')}
                                 style={{width: 30, height: 30}} 
                               />: "Login" }  </Text>
                        </TouchableOpacity>
                        <View>
                            <Text>
                                {this.state.msg}
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.reg1}>  Don't have an account? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={styles.reg} >Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <Button
                            title="Go to Sign up"
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        /> */}
                </KeyboardAwareScrollView>
            </ImageBackground>

        );
    }
}
const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 10

    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    ImageStyle1: {
        padding: 10,
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        height: 10,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    forms: {
        fontSize: 19,
        padding: 8,
        width: Dimensions.get('window').width - 105,
        borderBottomWidth: 1,
        borderColor: 'white',
        height: 50,
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    regButton1: { 
        fontSize: 22, 
        fontFamily: 'open-sans-simple',
        color:'white'
    },
    regButton: { 
        fontFamily: 'open-sans-simple',
        width: Dimensions.get('window').width - 105,
        alignItems:'center',
        backgroundColor:'#ff1358',
        padding:10,
        borderRadius:100,
        marginTop:60
        
    },
    reg:{ 
        textDecorationLine: 'underline', 
        color: '#ff1358',
        
        fontFamily:'open-sans-simple',
        fontSize:20
     },
     reg1:{
        fontFamily:'open-sans-simple',
        color:'white',
        fontSize:20

     }

});