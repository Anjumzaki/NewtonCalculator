import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, Picker, CheckBox, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import TransCard from './TransCard'
import {CardItem} from 'native-base'
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import axios from 'axios';

class MonthlyReport extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            years: ['All', '2020', '2021', '2022', '2023', '2024', '2025'],
            selectedyear: 'All',
            months: ['All','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", "Dec"],
            selectedMonth: 'All',
            selectedMonthNo: 'All',
            transctions: null,
            filteredTransctions: null
        };
    }
    login() {
    
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }
    componentDidMount() {

        axios.get('https://intense-harbor-45607.herokuapp.com/get/all/transactions/' + this.props.user)
            .then(resp => {
                this.setState({ transctions: resp.data, filteredTransctions: resp.data })

            })
            .catch(err => console.log(err))
    }
    
    render() {
        var key = this.state.seName;
        var serachedTractions = []
        if (this.state.seName) {

            serachedTractions = this.state.transctions.filter(function (transc) {
                return transc.name.toLowerCase().includes(key.toLowerCase())

            });
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", "Dec"]


        return (
            <KeyboardAwareScrollView>
                <View >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.myDrops}>
                            <Picker
                                style={styles.myDrop}
                                selectedValue={this.state.selectedyear}
                                style={{ height: 50, width: 105 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ selectedyear: itemValue })
                                    if(itemValue === 'All'){
                                        if(this.state.selectedMonth === 'All'){
                                            this.setState({filteredTransctions: this.state.transctions})
                                        }else{
                                            var that = this
                                            var filter = this.state.transctions.filter(function(transc) {
                                                var monC=that.state.selectedMonthNo
                                                if(parseInt(that.state.selectedMonthNo) < 10 ){
                                                    monC = "0"+that.state.selectedMonthNo
                                                }
                                                
                                                return  parseInt(transc.soldDate.substring(5,7)) === parseInt(monC);
                                            })
        
                                            this.setState({filteredTransctions: filter})
                                        }
                                    }else{

                                        if(this.state.selectedMonth === 'All'){
                                            var filter = this.state.transctions.filter(function(transc) {
                                               
                                                return transc.soldDate.substring(0,4) == itemValue ;
                                            })
        
                                            this.setState({filteredTransctions: filter})
                                        }else {
                                            var that = this
                                            var filter = this.state.transctions.filter(function(transc) {
                                            var monC=that.state.selectedMonthNo
                                            if(parseInt(that.state.selectedMonthNo) < 10){
                                                monC = "0"+that.state.selectedMonthNo
                                            }
                                            return transc.soldDate.substring(0,4) == itemValue && parseInt(transc.soldDate.substring(5,7)) === parseInt(monC);
                                        })
    
                                        this.setState({filteredTransctions: filter})
                                        }

                                       
                                   } 
                                }}>
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
                                onValueChange={(itemValue, itemIndex) =>{
                                    this.setState({ selectedMonth: itemValue, selectedMonthNo: itemIndex })
                                    var sYear = this.state.selectedyear;
                                    if(sYear === 'All'){
                                        if(itemValue === 'All'){
                                            this.setState({filteredTransctions: this.state.transctions})
                                        }else{
                                        var filter = this.state.transctions.filter(function(transc) {
                                          
                                            return (transc.soldDate.substring(5,7) == itemIndex);
                                        })

                                            this.setState({ filteredTransctions: filter })
                                        }
                                    }else{
                                        if(itemValue === 'All'){
                                            this.setState({filteredTransctions: this.state.transctions})
                                        }else{
                                        var filter = this.state.transctions.filter(function(transc) {
                                          
                                            return (transc.soldDate.substring(5,7) == itemIndex &&  transc.soldDate.substring(0,4) === sYear);
                                        })

                                            this.setState({ filteredTransctions: filter })
                                        }
                                    }
                                }}>
                                {this.state.months.map((item, i) => (
                                    <Picker.Item key={i} label={item} value={item} />
                                ))}
                            </Picker>
                        </View>

                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.forms}
                            placeholderTextColor={'gray'}
                            onChangeText={seName => this.setState({ seName })}
                            value={this.state.seName}
                            placeholder="Search"
                            keyboardType="default"
                            returnKeyType="next"
                        />
                        <Image style={{ padding: 10, marginRight: 10, width: 20, height: 20 }} source={require('../../assets/newICons/042-magnifying-glass.png')} />
                    </View>
                    <View style={{justifyContent:'center'}}>

                   
                    {this.state.seName ? (serachedTractions.length > 0 ? serachedTractions.map((transc, index) => <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate('SingleTransDetails', { transction: transc })}>
                        <CardItem key={index} style={styles.cardHead1} >
                            <View style={styles.cardRow}>
                                <Text style={styles.heada}>{transc.name} </Text>
                                <Text style={styles.headb}>{months[new Date(transc.soldDate).getMonth()]}  {new Date(transc.soldDate).getDate()}</Text>
                                <Text style={styles.headc}>$ {transc.volume} </Text>
                            </View>
                        </CardItem>
                    </TouchableOpacity>) : null) :
                        (this.state.filteredTransctions !== null ? this.state.filteredTransctions.map((transc, index) => <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('SingleTransDetails', { transction: transc })}>
                            <CardItem key={index} style={styles.cardHead1} >
                                <View style={styles.cardRow}>
                                    <Text style={styles.heada}>{transc.name} </Text>
                                    <Text style={styles.headb}>{months[new Date(transc.soldDate).getMonth()]}  {new Date(transc.soldDate).getDate()}</Text>
                                    <Text style={styles.headc}>$ {transc.volume} </Text>
                                </View>
                            </CardItem>
                        </TouchableOpacity>) : null)}
                        </View>

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
    },
    cardHead1: {
        flex: 1,
    },
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
)(MonthlyReport);