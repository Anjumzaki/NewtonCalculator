import React from 'react';
import { View, Text, Button, Modal, Alert,TouchableHighlight, Image, TextInput, Dimensions, StyleSheet, Picker, CheckBox, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import TransCard from './TransCard'
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { Container, Header, Content, Card, CardItem, Body } from "native-base";

import { connect } from "react-redux";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
class YearlyGoal extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            years: [ '2020', '2021', '2022', '2023', '2024', '2025'],
            selectedYear: '2020',
            transctions: [],
            goal: [],
            yearlyIncomeGoal: 0,
            modalVisible: false,

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
        axios.get('https://intense-harbor-45607.herokuapp.com/get/all/transactions/yearly/' + this.props.user+'/'+this.state.selectedYear)
        .then(resp => {
            // console.log(resp.data)
            this.setState({ transctions: resp.data })
        })
        .catch(err => console.log(err))

        axios.get('https://intense-harbor-45607.herokuapp.com/get/goal/' + this.props.user+'/'+this.state.selectedYear)
        .then(resp => {
            // console.log(resp.data)
            this.setState({ goal: resp.data, yearlyIncomeGoal: parseFloat(resp.data.commission) + parseFloat(resp.data.bonus) + parseFloat(resp.data.spiff) })
        })
        .catch(err => console.log(err))


    }
    changeDrop = (itemValue) => {
        this.setState({ selectedYear: itemValue })
        console.log('i am chgnes')
        console.log(this.state.selectedYear)
        console.log(itemValue)

        axios.get('https://intense-harbor-45607.herokuapp.com/get/all/transactions/yearly/' + this.props.user+'/'+itemValue)
        .then(resp => {
            this.setState({ transctions: resp.data })
        })
        .catch(err => console.log(err))

    axios.get('https://intense-harbor-45607.herokuapp.com/get/goal/' + this.props.user+'/'+itemValue)
        .then(resp => {
            // console.log(resp.data)
            console.log("ssss",resp.data)
            if(resp.data === null){
                this.setState({ goal: 0, yearlyIncomeGoal: parseFloat(0) + parseFloat(0) + parseFloat(0) })
                this.forceUpdate()
            }else{
                this.setState({ goal: 0, yearlyIncomeGoal: parseFloat(resp.data.commission) + parseFloat(resp.data.bonus) + parseFloat(resp.data.spiff) })
                this.forceUpdate()
            }
            console.log("change state goal",this.state)
        })
        .catch(err => console.log(err))
    }

    changeDrop1 = (itemValue) => {
        this.setState({ selectedYear: itemValue })
        console.log('i am chgnes')
        console.log(this.state.selectedYear)
        console.log(itemValue)

        axios.get('https://intense-harbor-45607.herokuapp.com/get/all/transactions/yearly/' + this.props.user+'/'+itemValue)
        .then(resp => {
            // console.log(resp.data)
            this.setState({ transctions: resp.data })
        })
        .catch(err => console.log(err))
        
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        console.log("stateeeee",this.state, this.props.user)

        if(this.state.transctions.length >0){
        var totalVolume=0, totalSpiff=0, totalCommission=0, totalBonus=0;
        for(var i=0; i<this.state.transctions.length; i++){
            console.log("sssssssssssssssssss")
            // console.log(totalVolume, totalSpiff, totalCommission, totalBonus)

            totalVolume+= parseFloat(this.state.transctions[i].volume);
            totalBonus+= parseFloat(this.state.transctions[i].bonus);
            totalCommission+= parseFloat(this.state.transctions[i].commission);
            totalSpiff+= parseFloat(this.state.transctions[i].spiff);
        }
        console.log(totalVolume, totalSpiff, totalCommission, totalBonus)
        var totalIncome = totalSpiff+ totalCommission+ totalBonus
    }
    
        const placeholder = {
            label: '2020',
            value: null,
            color: '#9EA0A4',
          };
        var myTransctions = []
        if (this.state.transctions !== null) {
            var trans = this.state.transctions
            for (var i = 0; i < this.state.transctions.length; i++) {
                if (new Date(trans[i].soldDate).getFullYear() == this.state.selectedYear) {
                    myTransctions.push(trans[i])
                    console.log('I am amtched')
                    console.log(new Date(trans[i].soldDate).getFullYear())
                    this.state.selectedYear
                }
                else {
                    console.log('i am not')
                    console.log(new Date(trans[i].soldDate).getFullYear())
                }
            }
        }

        var key = this.state.seName;
        var serachedTractions =[]
        if (this.state.seName) {

            myTransctions = this.state.transctions.filter(function (transc) {
                return transc.name.toLowerCase().includes(key.toLowerCase())
                    
            });
        }

        return (
            <KeyboardAwareScrollView>
                <View >
                    {/* {console.log(this.state.selectedYear, 'i maslect4e')} */}

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.myDrops}>
                            <RNPickerSelect style={styles.myDrop}
                                onValueChange={(value) => this.changeDrop(value)}
                                placeholder={placeholder}
                                items={[
                                    { label: '2020', value: '2020' },
                                    { label: '2021', value: '2021' },
                                    { label: '2022', value: '2022' },
                                    { label: '2023', value: '2023' },
                                    { label: '2024', value: '2024' },
                                ]}
                            />
                        </View>
                    </View>
                    <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
                    <CardItem style={styles.cardHead1} >
                    <TouchableHighlight onPress={() => {
                            this.setModalVisible(true);
                        }} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{fontSize:20,width:Dimensions.get('window').width /2 +30}} >Yeary Volume Goal: </Text>
                            <Text style={styles.head1}>${this.state.goal.volume ? this.numberWithCommas(this.state.goal.volume) : "0.00" }</Text>
                        </View>
                    </TouchableHighlight>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total # of sales: </Text>
                            <Text style={styles.head1}>{this.state.transctions.length ? this.state.transctions.length : "0" }</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Current: </Text>
                            <Text style={styles.head1}>${totalVolume ? this.numberWithCommas(totalVolume) : "0.00" }</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Remaining Goal </Text>
                            <Text style={styles.head1}>${totalVolume && this.state.goal.volume ? this.numberWithCommas(this.state.goal.volume - totalVolume) : "0.00" }</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Commisions </Text>
                            <Text style={styles.head1}>${totalCommission ? this.numberWithCommas(totalCommission) : "0.00" }</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Bonus </Text>
                            <Text style={styles.head1}>${totalBonus ? this.numberWithCommas(totalBonus) : "0.00" }</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Spiff </Text>
                            <Text style={styles.head1}>${totalSpiff ? this.numberWithCommas(totalSpiff) : "0.00" }</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Income </Text>
                            <Text style={styles.head1}>${totalIncome ? this.numberWithCommas(totalIncome) : "0.00" }</Text>
                        </View>
                    </CardItem>
                    {/* <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Yearly Income Goal </Text>
                            <Text style={styles.head1}>${this.state.yearlyIncomeGoal ? this.numberWithCommas(this.state.yearlyIncomeGoal) : "0.00" }</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Remaining Income Goal</Text>
                            <Text style={styles.head1}>${this.state.goal.volume && totalIncome ? this.numberWithCommas(this.state.goal.volume - totalIncome): "0.00" }</Text>
                        </View>
                    </CardItem> */}
                </Card>
                    {/* {(this.state.transctions !== null ? myTransctions !== null ?
                        myTransctions.map(
                            (transc, index) => <TransCard transc={transc} key={index} />
                        )
                        : <Text> NO Data in Year {this.state.selectedYear} </Text> : <Text> NO I coming in Year {this.state.selectedYear} </Text>)} */}
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={{marginTop: 100}}>
                        <View>
                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Change Goal</Text>
                        
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.forms1}
                                onChangeText={goalchange => this.setState({ goalchange })}
                                value={this.state.goalchange}
                                placeholder="Goal "
                                keyboardType="number-pad"
                                returnKeyType="next"
                            />
                        </View>

                        <TouchableHighlight
                        // style={{flex: 1, alignItems: "center"}}
                        
                            onPress={() => {

                                axios.post('http://192.168.0.102:3000/edit/goal/'+this.props.user+'/'+this.state.selectedYear+'/'+this.state.goalchange)
                                .then(resp => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    this.changeDrop1(this.state.selectedYear);
                                    axios.get('http://192.168.0.102:3000/get/goal/' + this.props.user+'/'+this.state.selectedYear)
                                    .then(resp => {
                                         console.log("as",resp.data)
                                        this.setState({ goal: resp.data, yearlyIncomeGoal: parseFloat(resp.data.commission) + parseFloat(resp.data.bonus) + parseFloat(resp.data.spiff) })

                                })  
                                .catch(err => console.log(err))

                            })
                            }}>
                            <Text style={styles.saveBtn}>Save</Text>
                        </TouchableHighlight>
                        </View>
                    </View>
                    </Modal>


            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        flexDirection: 'row',

        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#e8f1ff',
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    forms1: {
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
    saveBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#3f3fb9',
        color: 'white',
        borderRadius: 10,
        marginBottom: 30,
        textAlign: "center"
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: "#3f3fb9",
        borderWidth: 1,
        margin: 10
    },
    forms: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        color: '#3f3fb9',
        width: Dimensions.get('window').width - 55,
        fontSize: 18,
    },
    head: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
        width: Dimensions.get('window').width / 2 + 30
    },

    cardHead: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    cardHead1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
    },
    head1: {
        color: '#3f3fb9',
        alignSelf: 'flex-end',
        fontSize: 19,
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
)(YearlyGoal);