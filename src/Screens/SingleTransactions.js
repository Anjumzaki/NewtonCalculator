import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, Picker, CheckBox, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import TransCard from './TransCard'
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import axios from 'axios';

export default class SingleTransaction extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            transctions: null,
            date: '',
        };
    }
    componentWillMount() {
        this.setState({ date: this.props.navigation.getParam('sectedDate').dateString ,transctions: this.props.navigation.getParam('transctions')  },this.renderTrans())
    }
    renderTrans = () => {
        console.log(this.state.date, 'I am the date')
        // var sortedTrans = [];
        // for(var i = 0 ; i < allTrans.length; i++){
        //    var inside =  allTrans[0]
        //    if(inside.soldDate == allDate){
        //        sortedTrans.push(inside)
        //        console.log(inside.soldDate)
        //        console.log(allDate)
        //        console.log('I am here')
        //    }
        // }
    }

    render() {
        console.log(this.state.date,'check Date')
        console.log(this.state.transctions)
        console.log(this.state.transctions[0].soldDate == this.state.date)
        return (
            <KeyboardAwareScrollView>
                <View >
                  
                    {this.state.transctions
                        !== null &&
                        this.state.transctions.map((transc, index) => this.state.date == transc.soldDate || this.state.date == transc.payDate ? <TransCard transc={transc} key={index} /> : console.log(transc.payDate,transc.soldDate,'Dates',this.state.date) ) 
                        }
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
    },

    cardHead: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    cardHead1: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    head1: {
        color: '#3f3fb9',
        alignSelf: 'center',
        fontSize: 19

    }
});

