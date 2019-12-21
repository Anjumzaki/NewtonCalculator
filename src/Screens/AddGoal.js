import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, Picker, CheckBox, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'


export default class ChangeFixed extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            commission: '',
            bonus: '',
            volume: '',
            spiff: '',
            pmdDeduction: '',
            pmdDeductionType: '%',
            years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            selectedYear: '2020',
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
        this.setState({ soldDate: this.props.navigation.getParam('sectedDate') })
    }

    saveTrasc() {

    }
    render() {
        console.log("state", this.state)
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.myDrops}>
                            <Picker
                                style={styles.myDrop}
                                selectedValue={this.state.selectedyear}
                                style={{ height: 50, width: 105 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ selectedyear: itemValue })
                                }>
                                {this.state.years.map((item, i) => (
                                    <Picker.Item key={i} label={item} value={item} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <Text style={{ textAlign: "center", color: "red" }}>{this.state.msg}</Text>
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
                        onChangeText={commission => this.setState({ commission })}
                        value={this.state.commission}
                        placeholder="Commission "
                        keyboardType="number-pad"
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={styles.forms}
                        onChangeText={bonus => this.setState({ bonus })}
                        value={this.state.bonus}
                        placeholder="Bonus "
                        keyboardType="number-pad"
                        returnKeyType="next"
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                    <View >
                        <TouchableOpacity style={styles.saveBtn} onPress={() => this.saveTrasc()}>
                            <Text style={{ color: 'white' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView >

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
        width: Dimensions.get('window').width - 25,
        borderWidth: 1,
        borderColor: 'black',
        height: 50,
        fontFamily: 'open-sans-bold',
        color: 'black',
        borderRadius: 10
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

    },
    commSection: {
        // display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // width:"100%"
        // marginLeft:30,
        // marginRight: 30
    },
    saveBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#0b5f99',
        color: 'white',
        borderRadius: 10,
        marginBottom: 30
    },
    dropUpText: {
        borderWidth: 1,
        borderColor: '#0b5f99',
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    myDrops: {
        width: Dimensions.get('window').width / 2 - 20,
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: '#0b5f99',
        fontSize: 20,
        borderRadius: 5,
        backgroundColor: '#F6F6F6',
    },
    myDrop: {
        height: 40,
        width: '100%',
        color: '#0b5f99',
    },
});