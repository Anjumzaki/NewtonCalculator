import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Font from 'expo-font';
import axios from 'axios';
import * as validator from 'email-validator';
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";

class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            Password: '',
            confirmPass: '',
            msg: "",
            loading: false,
            fontLoaded: false,
        };
    }

    signup() {
        this.setState({ loading: true })
        if (this.state.userName) {
            if (this.state.userName.length > 5) {
                if (this.state.email) {
                    if (validator.validate(this.state.email)) {
                        if (this.state.Password) {
                            if (this.state.Password == this.state.confirmPass) {
                                axios
                                    .post('https://intense-harbor-45607.herokuapp.com/register', {
                                        userName: this.state.userName,
                                        email: this.state.email,
                                        password: this.state.Password,
                                    })
                                    .then((response) => {
                                        this.props.userAsync(response.data.response._id)

                                        if (response.data.resp === "registered") {
                                            this.props.navigation.navigate('MainTabs')
                                            this.props.navigation.dispatch(StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
                                            }))
                                            this.setState({ loading: false })

                                        } else if (response.data.resp === "exist") {
                                            this.setState({ msg: "username already exist" })
                                        }
                                    }).catch((error) => {
                                        this.setState({ msg: "signup info is incorrect" })
                                    })
                            }
                            else {
                                this.setState({
                                    msg: 'Confirm Password is not same'
                                })
                            }
                        }
                        else {
                            this.setState({
                                msg: 'Please enter your password'
                            })
                        }
                    }
                    else {
                        this.setState({
                            msg: 'Please Enter Correct Email'
                        })
                    }
                }
                else {
                    this.setState({
                        msg: 'Please enter your Email'
                    })
                }
            }
            else {
                this.setState({
                    msg: 'User Name have to be more than 6 characters'
                })
            }
        }

        else {
            this.setState({
                msg: 'Please enter your User Name'
            })
        }
        this.setState({
            loading: false
        })
    }

    render() {
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
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                placeholder="Email"
                                keyboardType="email-address"
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
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.forms
                                }
                                onChangeText={confirmPass => this.setState({ confirmPass })}
                                value={this.state.confirmPass}
                                placeholder="Confirm Password"
                                keyboardType="default"
                                returnKeyType="next"
                                secureTextEntry={true}
                            />
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: '#ff1358', marginTop: 20, fontSize: 17 }}>
                                {this.state.msg}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() =>
                            this.signup()
                        } style={styles.regButton} >
                            <Text style={styles.regButton1} >{this.state.loading ?
                                <Image
                                    source={require('../../assets/Spin-1s.gif')}
                                    style={{ width: 30, height: 30 }}
                                /> : "REGISTER"}  </Text>


                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.reg1}>  Already have an Account </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={styles.reg} >Login </Text>
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
        color: 'white'
    },
    regButton: {
        fontFamily: 'open-sans-simple',
        width: Dimensions.get('window').width - 105,
        alignItems: 'center',
        backgroundColor: '#ff1358',
        padding: 10,
        borderRadius: 100,
        marginTop: 60

    },
    reg: {
        textDecorationLine: 'underline',
        color: '#ff1358',

        fontFamily: 'open-sans-simple',
        fontSize: 20
    },
    reg1: {
        fontFamily: 'open-sans-simple',
        color: 'white',
        fontSize: 20

    }

});


const mapStateToProps = state => ({
    user: state.user.userId,
});
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators(
        {
            userAsync
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);