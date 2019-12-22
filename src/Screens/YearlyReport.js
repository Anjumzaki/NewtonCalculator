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

class YearlyReport extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            selectedYear: '2019',
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
        axios.get('http://192.168.0.105:3000/get/all/transactions/'+this.props.user)
        .then(resp => {
            // console.log(resp.data)
            this.setState({transctions: resp.data})
        })
        .catch(err => console.log(err))
    }
    render() {
        console.log("state", this.state)
        return (
            <KeyboardAwareScrollView>
                <View >
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
                    </View>
                    
                    {this.state.transctions !== null ? this.state.transctions.map((transc, index) => <TransCard transc={transc} key={index}/>): null}
                    


                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    myDrops: {
        width: Dimensions.get('window').width / 3,
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
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: "#0b5f99",
        borderWidth: 1,
        margin: 10
    },
    forms: {
        padding: 10,
        backgroundColor: '#fff',
        color: '#0b5f99',
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 3)) - 75,
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
        color: '#0b5f99',
        alignSelf: 'center',
        fontSize: 19

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
)(YearlyReport);