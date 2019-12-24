import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, Picker, CheckBox, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";


class ChangeFixed extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            commission: '',
            bonus: '',
            commType: '%',
            bonusType: '%',
            pmdDeduction: '',
            pmdDeductionType: '%',
            years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            selectedYear: '2019',
            months: ['Jan', 'Feb', 'Mar', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", "Dec"],
            selectedMonth: '1'
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
        if( this.state.selectedYear &&
            this.state.selectedMonth &&
            this.state.commission &&
            this.state.bonus &&
            this.state.pmdDeduction 
            ){
                console.log("In call")
                axios.post('http://192.168.1.2:3000/post/amount',{
                            selectedYear: this.state.selectedYear,
                            selectedMonth: this.state.selectedMonthNo,
                            commission: this.state.commission,
                            bonus: this.state.bonus,
                            pmdDeduction: this.state.pmdDeduction,
                            userId: this.props.user,
                            commType: this.state.commType,
                            bonusType: this.state.bonusType,
                            pmdDeductionType: this.state.pmdDeductionType
                        }).then(resp =>console.log(resp))
                        .catch(err => console.log(err))  
            }else{
                if(!this.state.selectedYear){
                    this.setState({msg: "Please Enter Year"})
                }else if(!this.state.selectedMonth){
                    this.setState({msg: "Please Enter Month"})
                }else if(!this.state.commission){
                    this.setState({msg: "Please Enter Commission"})
                }else if(!this.state.bonus){
                    this.setState({msg: "Please Enter Bonus"})
                }else if(!this.state.pmdDeduction){
                    this.setState({msg: "Please Enter PMDeduction"})
                }
            } 
    }
    render() {
        console.log("state", this.state)
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                    {/* <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <View>
                            <Text>Podium/Mentor/Deduction</Text>
                        </View>
                        <View>
                            <CheckBox
                            value={this.state.pmdDeduction}
                            onValueChange={() => this.setState({ pmdDeduction: !this.state.pmdDeduction })} />
                         </View>
                    </View> */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.myDrops}>
                                <Picker
                                    style={styles.myDrop}
                                    selectedValue={this.state.selectedYear}
                                    style={{ height: 50, width: 105 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ selectedYear: itemValue })
                                    }>
                                    {this.state.years.map((item, i) => (
                                        <Picker.Item key={i} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.myDrops}>
                                <Picker
                                    style={styles.myDrop}
                                    selectedValue={this.state.selectedMonth}
                                    style={{ height: 50, width: 105 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ selectedMonth: itemValue, selectedMonthNo: itemIndex })
                                    }>
                                    {this.state.months.map((item, i) => (
                                        <Picker.Item key={i} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    <View>
                    
                        <View style={styles.commSection}>
                            <Text style={{ fontWeight: 'bold', marginRight: 10 }} >Commision</Text>
                            <View style={styles.dropUpText}>
                                <TextInput
                                    style={{ width: 100, padding: 5 }}
                                    onChangeText={commission => {
                                        this.setState({ commission })
                                    }}
                                    value={this.state.commission}
                                    placeholder="Commision "
                                    keyboardType="number-pad"
                                    returnKeyType="next"
                                />
                            </View>
                            <Picker
                                selectedValue={this.state.commType}
                                style={{ height: 50, width: 105 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ commType: itemValue, commission: '' })
                                }>
                                <Picker.Item label="" value="" />
                                <Picker.Item label="Fixed" value="Fixed" />
                                <Picker.Item label="%" value="%" />
                            </Picker>
                        </View>
                        <View style={styles.commSection}>
                            <Text style={{ fontWeight: 'bold', marginRight: 10 }} >Bonus</Text>
                            <View style={styles.dropUpText}>
                                <TextInput
                                    style={{ width: 100, padding: 5 }}
                                    onChangeText={bonus => {
                                        this.setState({ bonus })
                                    }}
                                    value={this.state.bonus}
                                    placeholder="bonus "
                                    keyboardType="number-pad"
                                    returnKeyType="next"
                                />
                            </View>
                            <Picker
                                selectedValue={this.state.bonusType}
                                style={{ height: 50, width: 105 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ bonusType: itemValue, bonus: '' })
                                }>
                                <Picker.Item label="" value="" />
                                <Picker.Item label="Fixed" value="Fixed" />
                                <Picker.Item label="%" value="%" />
                            </Picker>
                        </View>
                        <View style={styles.commSection}>
                            <Text style={{ fontWeight: 'bold', marginRight: 10 }} >PMD</Text>
                            <View style={styles.dropUpText}>
                                <TextInput
                                    style={{ width: 100, padding: 5 }}
                                    onChangeText={pmdDeduction => {
                                        this.setState({ pmdDeduction })
                                    }}
                                    value={this.state.pmdDeduction}
                                    placeholder="Podium/Mentor/Deduction "
                                    keyboardType="number-pad"
                                    returnKeyType="next"
                                />
                            </View>
                            <Picker
                                selectedValue={this.state.pmdDeductionType}
                                style={{ height: 50, width: 105 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ pmdDeductionType: itemValue, pmdDeduction: '' })
                                }>
                                <Picker.Item label="" value="" />
                                <Picker.Item label="Fixed" value="Fixed" />
                                <Picker.Item label="%" value="%" />
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <Text style={{ textAlign: "center", color: "red" }}>{this.state.msg}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={styles.saveBtn} onPress={() => this.saveTrasc()}>
                            <Text style={{ color: 'white' }}>Save</Text>
                        </TouchableOpacity>
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

        backgroundColor: '#3f3fb9',
        color: 'white',
        borderRadius: 10,
        marginBottom: 30
    },
    dropUpText: {
        borderWidth: 1,
        borderColor: '#3f3fb9',
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
        borderColor: '#3f3fb9',
        fontSize: 20,
        borderRadius: 5,
        backgroundColor: '#F6F6F6',
    },
    myDrop: {
        height: 40,
        width: '100%',
        color: '#3f3fb9',
    },
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
)(ChangeFixed);