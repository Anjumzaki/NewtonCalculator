import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, Picker, CheckBox, ScrollView } from 'react-native';
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
            years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            selectedYear: '',
            transctions: null
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
        console.log(this.props)
        axios.get('https://intense-harbor-45607.herokuapp.com/get/all/transactions/' + this.props.user)
            .then(resp => {
                // console.log(resp.data)
                this.setState({ transctions: resp.data })
            })
            .catch(err => console.log(err))
    }
    changeDrop = (itemValue) => {
        this.setState({ selectedYear: itemValue })
        console.log('i am chgnes')
        console.log(this.state.selectedYear)
        console.log(itemValue)
    }
    render() {
        const placeholder = {
            label: 'Year',
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
                                    { label: '2019', value: '2019' },
                                    { label: '2020', value: '2020' },
                                    { label: '2021', value: '2021' },
                                    { label: '2022', value: '2022' },
                                    { label: '2023', value: '2023' },
                                    { label: '2024', value: '2024' },
                                ]}
                            />
                            {/* <Picker
                                style={styles.myDrop}
                                selectedValue={this.state.selectedyear}
                                style={{ height: 50, width: 105 }}
                                onValueChange={(itemValue, itemIndex) =>
                                   this.setState({selectedYear:itemValue})
                                }>
                                    <Picker.Item  label='2020' value='2020' />
                                    <Picker.Item  label='2021' value='2021' />
                                    <Picker.Item  label='2022' value='2022' />
                                    <Picker.Item  label='2023'  value='2023' />
                                    <Picker.Item  label='2019' value='2019' />
                                                                    {/* {this.state.years.map((item, i) => (
                                    <Picker.Item key={i} label={item} value={item} />
                                ))} 
                            </Picker> */}
                        </View>
                    </View>
                    <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{fontSize:20,width:Dimensions.get('window').width /2 +30}} >Yeary Volume Goal: </Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Current: </Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Remaining Goal </Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Commisions </Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Bonus </Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Spiff </Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Income </Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Yearly Income Goal </Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Remaining Income Goal</Text>
                            <Text style={styles.head1}>asd</Text>
                        </View>
                    </CardItem>
                </Card>
                    {/* {(this.state.transctions !== null ? myTransctions !== null ?
                        myTransctions.map(
                            (transc, index) => <TransCard transc={transc} key={index} />
                        )
                        : <Text> NO Data in Year {this.state.selectedYear} </Text> : <Text> NO I coming in Year {this.state.selectedYear} </Text>)} */}
                </View>
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