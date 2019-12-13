import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';

export default class MainScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            name: '',
            contact: '',
            msg: "",
            downPay:'',
            spiff:'',
            note:''
        };
    }
    login() {
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
    componentDidMount() {
        console.log(this.props.navigation.getParam('sectedDate'))
    }
    render() {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.forms}
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                            placeholder="Name"
                            keyboardType="default"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.forms}
                            onChangeText={contact => this.setState({ contact })}
                            value={this.state.contact}
                            placeholder="Contact"
                            keyboardType="default"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.forms}
                            onChangeText={downPay => this.setState({ downPay })}
                            value={this.state.downPay}
                            placeholder="Downpayment %"
                            keyboardType="number-pad"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.forms}
                            onChangeText={spiff => this.setState({ spiff })}
                            value={this.state.spiff}
                            placeholder="Spiff "
                            keyboardType="number-pad"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.forms}
                            onChangeText={note => this.setState({ note })}
                            value={this.state.note}
                            placeholder="Note "
                            keyboardType="default"
                            returnKeyType="next"
                        />
                    </View>
                </View>
                
            </KeyboardAwareScrollView>

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
        borderColor: 'black',
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