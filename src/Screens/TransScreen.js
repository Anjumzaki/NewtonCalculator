import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, Picker, CheckBox, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'


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
            volume: '',
            msg: "",
            downPay: '',
            spiff: '',
            note: '',
            commission: '0.0',
            bonus: '0.0',
            commType: '%',
            bonusPer: '',
            bonusType: '%',
            pmdDeduction: false,
            payDate: '',
            soldDate: ''
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

    saveTrasc(){
        console.log("ceck",this.state.commission >= 0,this.state.bonus >= 0,this.state.pmdDeduction >= 0)
        if( this.state.payDate.dateString &&
            this.state.name &&
            this.state.contact &&
            this.state.volume &&
            this.state.downPay &&
            this.state.spiff &&
            this.state.note 
            // this.state.commPer >= 0 &&
            // this.state.bonusPer >= 0 &&
            // this.state.pmdDeduction >= 0 
            // (this.state.commission === 0 &&
            // this.state.bonus === 0 &&
            // this.state.pmdDeduction === 0
            // )
            ){
                console.log("In call")
                axios.post('http://192.168.1.3:3000/post/transaction',{
                            payDate: this.state.payDate.dateString,
                            name: this.state.name,
                            contact: this.state.contact,
                            volume: this.state.volume,
                            downPayment:this.state.downPay,
                            spiff:this.state.spiff,
                            note:this.state.note,
                            commission: this.state.commission,
                            bonus: this.state.bonus,
                            pmdDeduction: this.state.pmdDeduction,
                            soldDate:this.state.soldDate.dateString
                        }).then(resp =>console.log(resp))
                        .catch(err => console.log(err))  
            }else{
                console.log("iN ELSEEEEE")
                if(!this.state.payDate){
                    this.setState({msg: "Please Enter Date"})
                }else if(!this.state.name){
                    this.setState({msg: "Please Enter Name"})
                }else if(!this.state.contact){
                    this.setState({msg: "Please Enter Contact"})
                }else if(!this.state.volume){
                    this.setState({msg: "Please Enter Volume"})
                }else if(!this.state.downPay){
                    this.setState({msg: "Please Enter Down pay"})
                }else if(!this.state.spiff){
                    this.setState({msg: "Please Enter Spiff"})
                }else if(!this.state.note){
                    this.setState({msg: "Please Enter Note"})
                }else if(!(this.state.commission >= 0)){
                    this.setState({msg: "Please Enter Commission"})
                }else if(!(this.state.bonus  >= 0)){
                    this.setState({msg: "Please Enter Bonus"})
                }else if(!(this.state.pmdDeduction  >= 0)){
                    this.setState({msg: "Please Enter Podium/Mentor/Deduction"})
                }
            }
    }
    render() {
        console.log("state", this.state)
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                    <View style={styles.SectionStyle}>
                        <DatePicker
                            style={styles.forms}
                            date={this.state.payDate} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="Pay date"
                            allowFontScaling={false}
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateText: {
                                    fontSize: 19,
                                    color: 'black'
                                },
                                dateInput: {
                                    borderWidth: 0,
                                    placeholderTextColor: 'black',
                                    alignItems: 'flex-start',
                                    color: 'black',
                                    position: 'relative',
                                    paddingBottom: 8
                                },
                                dateTouchBody: {
                                    color: 'black',

                                },
                                placeholderText: {
                                    fontSize: 19,
                                    color: 'gray'
                                }
                            }}
                            onDateChange={payDate => {
                                this.setState({ payDate });
                            }}
                        />

                    </View>
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
                            placeholder="Contact#"
                            keyboardType="default"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.forms}
                            onChangeText={volume => this.setState({ volume })}
                            value={this.state.volume}
                            placeholder="Volume"
                            keyboardType="number-pad"
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
                    <View>
                    <View style={styles.commSection}>
                        <Text style={{fontWeight:'bold', marginRight:10}} >Commision</Text>
                        <Text style={{fontSize:22}}>{this.state.commission >=0 ? this.state.commission : "0.0"}</Text>
                        <TextInput
                            style={{width:100,marginLeft:20,padding:10}}
                            onChangeText={commPer => {
                                var calc;
                                if(this.state.commType === "%"){
                                    
                                    calc= (commPer * this.state.volume)/100
                                }else{
                                    calc = commPer
                                }
                                this.setState({ commPer, commission: calc, commission1: calc })
                            }}
                            value={this.state.commPer}
                            placeholder="Commision "
                            keyboardType="number-pad"
                            returnKeyType="next"
                        />
                        <Picker
                            selectedValue={this.state.commType}
                            style={{height: 50, width: 105}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({commType: itemValue, commission: '', commPer: ''})
                            }>
                            <Picker.Item label="" value="" />
                            <Picker.Item label="Fixed" value="Fixed" />
                            <Picker.Item label="%" value="%" />
                            </Picker>
                    </View>
                     <View style={styles.commSection}>
                        <Text  style={{fontWeight:'bold', marginRight:10}} >Bonus</Text>
                        <Text style={{fontSize:22}}>{this.state.bonus >=0 ? this.state.bonus : "0.0"}</Text>
                        <TextInput
                              style={{width:100,marginLeft:20,padding:10}}
                            onChangeText={bonusPer =>  { 
                                var calc;
                                if(this.state.bonusType === "%"){
                                    calc= (bonusPer * this.state.volume)/100
                                }else{
                                    calc = bonusPer
                                }
                                this.setState({ bonusPer, bonus: calc })
                            }}
                            value={this.state.bonusPer}
                            placeholder="Bonus"
                            keyboardType="number-pad"
                            returnKeyType="next"
                        />
                        <Picker
                            selectedValue={this.state.bonusType}
                            style={{height: 50, width: 105}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({bonusType: itemValue, bonus: '', bonusPer: ''})
                            }>
                            <Picker.Item label="" value="" />
                            <Picker.Item label="Fixed" value="Fixed" />
                            <Picker.Item label="%" value="%" />
                            </Picker>
                     </View>
                     <View style={styles.commSection}>
                        <Text>PMD</Text>
                        <Text>{this.state.pmdDeduction >=0 ? this.state.pmdDeduction : "0.0"}</Text>
                        <TextInput
                             style={{width: Dimensions.get('window').width - 300}}
                            onChangeText={pmdDeductionPer =>  { 
                                var calc;
                                if(this.state.pmdDeductionType === "%"){
                                    calc= (pmdDeductionPer * this.state.volume)/100
                                    this.setState({commission: this.state.commission1 - calc})
                                    if(this.state.commission < 0){
                                        this.setState({pmdDeductionPer: 0, msg: "Commission cannot be less than zero"})
                                    }
                                }else{
                                    calc = pmdDeductionPer
                                    this.setState({commission: this.state.commission1 - calc})
                                }
                                this.setState({ pmdDeductionPer, pmdDeduction: calc })
                            }}
                            value={this.state.pmdDeductionPer}
                            placeholder="Podium/Mentor/Deduction"
                            keyboardType="number-pad"
                            returnKeyType="next"
                        />
                        <Picker
                            selectedValue={this.state.bonusType}
                            style={{height: 50, width: 105}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({bonusType: itemValue, bonus: '', bonusPer: ''})
                            }>
                            <Picker.Item label="" value="" />
                            <Picker.Item label="Fixed" value="Fixed" />
                            <Picker.Item label="%" value="%" />
                            </Picker>
                     </View>
                </View>
                <View>
                    <Text style={{textAlign: "center", color: "red"}}>{this.state.msg}</Text>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => this.saveTrasc()}>
                        <Text style={{color:'white'}}>Save</Text>
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
        borderRadius:10
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
    saveBtn:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,

        backgroundColor:'#0b5f99',
        color:'white',
        borderRadius:10,
        marginBottom:30
    }        
});