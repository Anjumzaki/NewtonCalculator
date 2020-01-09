import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Font from 'expo-font';
import axios from 'axios';
import Storage from "../Storage";
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
            oldPass: '',
            newPass: '',
            newPass1: '',
            msg: "",
            loading: false,
            userData: {}
        };
    }

    componentDidMount(){
        axios.get('http://192.168.0.102:3000/get/user/'+this.props.user)
        .then(user => this.setState({userData: user.data}))
        .catch(err => console.log(err))
    }
    async setId() {
        await Storage.setItem("userId", { userId: response.data.response._id })
    }
    login() {
        console.log("Login")
        this.setState({ loading: true })
       
        if (this.state.newPass === this.state.newPass1) {
                console.log("Loginpass")

                axios
                    .put('https://intense-harbor-45607.herokuapp.com/changePassword', {
                        oldPass: this.state.oldPass,
                        newPass: this.state.newPass,
                        uid: this.props.user
                    })
                    .then((response) => {
                        console.log("resp1", response.data)
                        
                        if (response.data === "match") {
                           this.setState({msg: "Password changed"})
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'MainTabs' }),],
                            }))
                            this.setState({ loading: false })

                        } else if (response.data === "wrong") {
                            this.setState({ msg: "Old password is incorrect" })
                        }
                    }).catch((error) => {
                        console.log("mongodb get register error", error)
                        this.setState({ msg: "Problem in changing password" })
                    })
                }else {
                this.setState({
                    msg: 'New Password is not matched'
                })
            }
                // this.props.navigation.navigate('MainTabs')
                // this.props.navigation.dispatch(StackActions.reset({
                //     index: 0,
                //     actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
                // }))
            // }
            // else {
            //     this.setState({
            //         msg: 'Please enter your Password'
            //     })
            // }
        // }
        // else {
        //     this.setState({
        //         msg: 'User Name have to be more than 6 characters'
        //     })
        // }
        // }
     
        this.setState({
            loading: false
        })
    }

    render() {
        console.log("state", this.state, this.props.user)
        return (
            <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}>
                        <View>
                            <Text style={{color: "#fff", fontSize: 24}}>{this.state.userData.userName}</Text>

                        </View>
                        <View>
                            <Text style={{color: "#fff", fontSize: 24}}>{this.state.userData.email}</Text>

                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: '#ff1358', marginTop: 20, fontSize: 17 }}>
                                {this.state.msg}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'ChangePassword' }),],
                            }))
                        } style={styles.regButton} >
                            <Text style={styles.regButton1} >{this.state.loading ?
                                <Image
                                    source={require('../../assets/Spin-1s.gif')}
                                    style={{ width: 20, height: 20 }}
                                /> : "Change Password"}  </Text>
                        </TouchableOpacity>
                    </View>
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