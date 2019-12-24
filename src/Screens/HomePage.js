import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Font from 'expo-font';
import axios from 'axios'
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class HomePage extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            Password: '',
            msg: "",
            transctions: null,
            refreshing: true
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
    getdata = () => {
        axios.get('http://192.168.1.2:3000/get/all/transactions/' + this.props.user)
            .then(resp => {
                // console.log(resp.data)
                this.setState({ transctions: resp.data, refreshing: false })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getdata()
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getdata()
    }


    render() {
        const { navigation } = this.props;
        var nextDays = [];
        var payDates = []
        console.log("state", this.state)
        if (this.state.transctions !== null) {
            var trans = this.state.transctions
            for (var i = 0; i < trans.length; i++) {
                nextDays.push(trans[i].soldDate)
                payDates.push(trans[i].payDate)
            }
        }
        var matched = []
        let mark = {};
        for (var i = 0; i < nextDays.length; i++) {
            for (var j = 0; j < nextDays.length; j++) {
                if (nextDays[i] == payDates[j]) {
                    matched.push(nextDays[i])
                }
            }
        }
        nextDays.forEach(day => {
            mark[day] = {  marked: true, selectedDotColor: 'yellow' };
            console.log(day)
        });
        payDates.forEach(day => {
            mark[day] = { selected: true, selectedDotColor: 'yellow' };
        });

        matched.forEach(day => {
            mark[day] = { selected: true, marked: true, selectedDotColor: 'yellow' };
        });

        return (
            // style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                <View >
                    {/* <Calendar
                    // Initially visible month. Default = Date()
                    current={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { console.log('selected day', day) }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => { console.log('selected day', day) }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => (<Arrow />)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                /> */}
                    <CalendarList
                        // Enable horizontal scrolling, default = false
                        horizontal={true}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={true}
                        // Set custom calendarWidth.
                        calendarWidth={Dimensions.get('window').width}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => { this.props.navigation.navigate('SingleTransactions',{sectedDate:day,transctions: this.state.transctions}) }}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => this.props.navigation.navigate('TransScreen', { sectedDate: day })}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => { console.log('month changed', month) }}
                        // Hide month navigation arrows. Default = false
                        hideArrows={false}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        // renderArrow={(direction) => (<Arrow />)}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={true}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={1}
                        // Hide day names. Default = false
                        // Show week numbers to the left. Default = false
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // markingType={'custom'}
                        markedDates={mark}
                    // markedDates={{
                    //     '2019-12-16': {
                    //         customStyles: {
                    //             container: {
                    //                 backgroundColor: 'blue',
                    //                 borderColor: 'red',
                    //                 borderWidth: 5,
                    //                 width: 40,
                    //                 height: 40,
                    //                 borderRadius: 100,
                    //             },
                    //             text: {
                    //                 color: 'white',
                    //                 fontWeight: 'bold',
                    //                 fontSize: 15,
                    //             },
                    //         },
                    //     },
                    //     '2019-12-18': {
                    //         customStyles: {
                    //             container: {
                    //                 backgroundColor: 'blue',
                    //                 borderColor: 'red',
                    //                 borderWidth: 5,
                    //                 width: 40,
                    //                 height: 40,
                    //                 borderRadius: 100,
                    //             },
                    //             text: {
                    //                 color: 'white',
                    //                 fontWeight: 'bold',
                    //                 fontSize: 15,
                    //             },
                    //         },
                    //     },
                    // }}
                    />
                </View>
                <View style={{paddingLeft:20}}>
                    <Text>1-Press to see details</Text>
                    <Text>2-Press and Hold to Add Transaction</Text>
                    <Text>3-Dot  Represents the Sold Date</Text>
                    <Text>4-Blue date Represents the Pay Date</Text>
                </View>
            </ScrollView>
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
)(HomePage);