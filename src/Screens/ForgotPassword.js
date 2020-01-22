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

class ForgotPassword extends React.Component {
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
            userName: '',
            start: true,
            state0: true,
            state1: false,
            state2: false,
            state3: true,
            state4: false,
            emailChange: false,
            passChange: false,
            user: null,
            emailCheck: '',
            msg: '',
            showEmail: '',
            newEmail: ''
        };
    }
    
    login() {
        this.setState({ loading: true })
       
        if (this.state.newPass === this.state.newPass1) {

                axios
                    .put('https://intense-harbor-45607.herokuapp.com/forgotPassword', {
                        newPass: this.state.newPass,
                        uid: this.state.user._id
                    })
                    .then((response) => {
                        
                        if (response.data.success === "true") {
                           this.setState({msg: "Password changed"})
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Login' }),],
                            }))
                            this.setState({ loading: false })

                        } else if (response.data.error === "true") {
                            this.setState({ msg: "Error" })
                        }
                    }).catch((error) => {
                        this.setState({ msg: "Problem in changing password" })
                    })
                }else {
                this.setState({
                    msg: 'New Password is not matched'
                })
            }
     
        this.setState({
            loading: false
        })
    }

    emailChange() {
        this.setState({ loading: true })
       
        if (this.state.newEmail) {

                axios
                    .put('https://intense-harbor-45607.herokuapp.com/changeEmail', {
                        newEmail: this.state.newEmail,
                        uid: this.state.user._id
                    })
                    .then((response) => {
                        
                        if (response.data.success === "true") {
                           this.setState({msg: "Email changed"})
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Login' }),],
                            }))
                            this.setState({ loading: false })

                        } else if (response.data.error === "true") {
                            this.setState({ msg: "Error" })
                        }
                    }).catch((error) => {
                        this.setState({ msg: "Problem in changing Email" })
                    })
                }else {
                this.setState({
                    msg: 'Enter new Email'
                })
            }
     
        this.setState({
            loading: false
        })
    }

    render() {
        if(this.state.user !== null){
            var str =this.state.user.email;
            // str ="hi aijaz"
            var ind= str.indexOf('@')
            var strc= ''
            for(var i=0; i<ind-2;i++){
                strc= "*"+strc
            }
            var showEmail= strc+str.substring(ind-2,str.length)
        }
        
        return (
            <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}>
                        
                        {this.state.start? (
                            <View>
                                <Text style={{color: "#fff", fontSize: 26}}>What do you want to Change?</Text>
                                <TouchableOpacity style={styles.regButton} onPress={() => this.setState({emailChange: true, start: false})}>
                                    <Text style={styles.regButton1}>Email</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={styles.regButton} onPress={() => this.setState({passChange: true, start: false})}>
                                    <Text  style={styles.regButton1}>Password</Text>
                                </TouchableOpacity>
                            </View>
                        ): null}

                        {this.state.passChange ? (
                        <View>
                        { this.state.state0 ? (
                        <View>
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
                            <View><Text style={{textAlign: "center", color: "red"}}>{this.state.msg}</Text></View>
                            <TouchableOpacity onPress={() =>{
                                    if(this.state.userName){
                                    axios.get('https://intense-harbor-45607.herokuapp.com/get/user/'+this.state.userName)
                                    .then((resp) => {
                                    this.setState({user: resp.data})
                                    if(resp.data !== null){
                                        this.setState({state1: true, state0: false, msg: ''})
                                    }else{
                                        this.setState({msg: "Incorrect userName"})
                                    }
                                    
                                    })
                                    .catch(err => console.log(err))
                                    }else{
                                        this.setState({msg: "Enter user Name"})
                                    }
                                }} style={styles.regButton} >
                                    <Text style={styles.regButton1} > Next </Text>
                             </TouchableOpacity>

                            </View>
                            ): null}

                        {this.state.state1 && this.state.user.email ? (
                        <View>
                            <View style={{display: "flex", flexDirection: "column", color: "#fff"}}>
                                <Text style={{textAlign: "center", color: "#fff", fontSize: 24}}>
                                    Please verify your email:
                                </Text>
                                <Text style={{textAlign: "center", color: "#fff", fontSize: 18}}>
                                   {showEmail}
                                </Text>
                                <TextInput
                                    style={styles.forms
                                    }
                                    onChangeText={emailCheck => this.setState({ emailCheck })}
                                    value={this.state.emailCheck}
                                    placeholder="Enter Email"
                                    keyboardType="default"
                                    returnKeyType="next"
                                />

                            </View>
                            <View><Text style={{textAlign: "center", color: "red"}}>{this.state.msg}</Text></View>
                            <TouchableOpacity onPress={() =>{
                                if(this.state.emailCheck === this.state.user.email){
                                    this.setState({state2: true, state1: false, msg: ''})
                                }else{
                                    this.setState({msg: "Incorrect Email"})
                                }
                                }} style={styles.regButton} >
                                    <Text style={styles.regButton1} > Next </Text>
                             </TouchableOpacity>

                        </View>
                        ): null}



                        {this.state.state2 ? (
                        <View>
                            <View style={styles.SectionStyle}>

                                <TextInput
                                    style={styles.forms
                                    }
                                    onChangeText={newPass => this.setState({ newPass })}
                                    value={this.state.newPass}
                                    placeholder="New Password"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.SectionStyle}>

                                <TextInput
                                    style={styles.forms
                                    }
                                    onChangeText={newPass1 => this.setState({ newPass1 })}
                                    value={this.state.newPass1}
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
                                this.login()
                            } style={styles.regButton} >
                                <Text style={styles.regButton1} >{this.state.loading ?
                                    <Image
                                        source={require('../../assets/Spin-1s.gif')}
                                        style={{ width: 30, height: 30 }}
                                    /> : "Change Password"}  </Text>
                            </TouchableOpacity>
                        </View>
                        ): null}
                        </View>
                        ): null}

                        {this.state.emailChange ?(
                            <View>
                            { this.state.state3 ? (
                        <View>
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
                            <View><Text style={{textAlign: "center", color: "red"}}>{this.state.msg}</Text></View>
                            <TouchableOpacity onPress={() =>{
                                    if(this.state.userName){
                                    axios.get('https://intense-harbor-45607.herokuapp.com/get/user/'+this.state.userName)
                                    .then((resp) => {
                                    this.setState({user: resp.data})
                                    if(resp.data !== null){
                                        this.setState({state4: true, state3: false, msg: ''})
                                    }else{
                                        this.setState({msg: "Incorrect userName"})
                                    }
                                    
                                    })
                                    .catch(err => console.log(err))
                                    }else{
                                        this.setState({msg: "Enter user Name"})
                                    }
                                }} style={styles.regButton} >
                                    <Text style={styles.regButton1} > Next </Text>
                             </TouchableOpacity>

                            </View>
                            ): null}  
                            {this.state.state4 ? (  
                             <View>
                             <View style={styles.SectionStyle}>
 
                                 <TextInput
                                     style={styles.forms
                                     }
                                     onChangeText={newEmail => this.setState({ newEmail })}
                                     value={this.state.newEmail}
                                     placeholder="New Email"
                                     keyboardType="default"
                                     returnKeyType="next"
                                    //  secureTextEntry={true}
                                 />
                             </View>
                            
                             <View>
                                 <Text style={{ textAlign: "center", fontWeight: 'bold', color: '#ff1358', marginTop: 20, fontSize: 17 }}>
                                     {this.state.msg}
                                 </Text>
                             </View>
                             <TouchableOpacity onPress={() =>
                                 this.emailChange()
                             } style={styles.regButton} >
                                 <Text style={styles.regButton1} > Change Email  </Text>
                             </TouchableOpacity>
                         </View>): null}
                         </View>
                        ): null}
                        
                     
                       
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
        width: Dimensions.get('window').width - 80,
        alignItems: 'center',
        backgroundColor: '#ff1358',
        padding: 10,
        borderRadius: 100,
        marginTop: 60,
        justifyContent:'center',
        alignSelf:'center'
    },
    regButton2: {
        fontFamily: 'open-sans-simple',
        // width: Dimensions.get('window').width - 105,
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
)(ForgotPassword);