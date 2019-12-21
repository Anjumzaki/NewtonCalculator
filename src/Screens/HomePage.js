import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Font from 'expo-font';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class HomePage extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            Password: '',
            msg: "",
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

    componentDidMount(){
    }

    render() {
        const { navigation } = this.props;
        // console.log(navigation)
        // console.log(JSON.stringify(navigation.getParam('userId', 'NO-ID')))

        console.log("state", this.state)
        return (
            // style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 70 }}
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
                    calendarWidth={Dimensions.get('window').width  }
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {console.log('selected day', day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => this.props.navigation.navigate('TransScreen',{sectedDate: day})}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false
                    hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => (<Arrow />)}
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
              />
            </View>
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