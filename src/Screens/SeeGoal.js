import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import axios from 'axios'

class SeeGoal extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            transactions: null,
            goal: null,
            crBonus:null,
            crSpiff:null,
            crCom:null,
        };
    }
    getdata = () => {
        axios.get('https://intense-harbor-45607.herokuapp.com/get/all/transactions/' + this.props.user)
            .then(resp => {
                // console.log(resp.data)
                var crBonus = 0;
                var crSpiff = 0;
                var crCom = 0;
                this.setState({ transactions: resp.data })
                for(var i = 0 ; i < resp.data.length ; i ++){
                   var myT = resp.data[i]
                   crBonus = crBonus + parseFloat(myT.bonus)
                   crSpiff = crSpiff + parseFloat(myT.spiff) 
                   crCom = crCom + parseFloat(myT.commission)
                }
                this.setState({
                    crBonus,
                    crSpiff,
                    crCom
                })
            })
            .catch(err => console.log(err))

        axios.get('https://intense-harbor-45607.herokuapp.com/get/goal/' + this.props.user + '/' + new Date().getFullYear())
            .then(resp => {
                // console.log(resp.data)
                this.setState({ goal: resp.data })
            })
            .catch(err => console.log(err))

    }
    componentDidMount() {
        this.getdata()
    }
    render() {
        console.log(this.state)
        console.log(this.props.user)
        console.log(this.state.goal)
        // console.log(this.state.transactions.spiff,'Spiff')
        console.log('I am in see goal')
        return (<View>
          
            {this.state.goal !== null && <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
                <CardItem style={styles.cardHead} >
                    <Text style={styles.head}> Your Current Goal For {new Date().getFullYear()} </Text>
                </CardItem>
                <CardItem style={styles.cardHead1} >

                    <View>
                        <Text style={styles.head}>Spiff: </Text>
                        <Text style={styles.head1}> $ {this.state.goal.spiff} </Text>
                    </View>
                </CardItem>
                <CardItem style={styles.cardHead1} >
                    <View>
                        <Text style={styles.head}>Bonus: </Text>
                        {/* {console.log(this.state.transactions.bonus,'i am in render')}
                   {console.log(this.state.transactions,'i am in render')} */}
                        <Text style={styles.head1}> $ {this.state.goal.bonus} </Text>
                    </View>
                    <View>
                        <Text style={styles.head}>Commission: </Text>
                        <Text style={styles.head1}>$ {this.state.goal.commission} </Text>
                    </View>
                </CardItem>
                {/* 
           <CardItem>
               <Text>{this.props.transc.note}</Text>
           </CardItem> */}
            </Card>
            }
              {this.state.goal !== null && <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
                <CardItem style={styles.cardHead} >
                    <Text style={styles.head}>Your Current Balance </Text>
                </CardItem>
                <CardItem style={styles.cardHead1} >

                    <View>
                        <Text style={styles.head}>Spiff: </Text>
                        <Text style={styles.head1}> $ {this.state.crSpiff} </Text>
                    </View>
                </CardItem>
                <CardItem style={styles.cardHead1} >
                    <View>
                        <Text style={styles.head}>Bonus: </Text>
                        {/* {console.log(this.state.transactions.bonus,'i am in render')}
                   {console.log(this.state.transactions,'i am in render')} */}
                        <Text style={styles.head1}> $ {this.state.crBonus} </Text>
                    </View>
                    <View>
                        <Text style={styles.head}>Commission: </Text>
                        <Text style={styles.head1}>$ {this.state.crCom} </Text>
                    </View>
                </CardItem>
            </Card>
            }
                     {this.state.goal !== null && <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
                <CardItem style={styles.cardHead} >
                    <Text style={styles.head}>Your Remaining Balance from goal </Text>
                </CardItem>
                <CardItem style={styles.cardHead1} >

                    <View>
                        <Text style={styles.head}>Spiff: </Text>
                        <Text style={styles.head1}> $ {  parseFloat(this.state.goal.spiff) - parseFloat(this.state.crSpiff ) }  </Text>
                    </View>
                </CardItem>
                <CardItem style={styles.cardHead1} >
                    <View>
                        <Text style={styles.head}>Bonus: </Text>
                        {/* {console.log(this.state.transactions.bonus,'i am in render')}
                   {console.log(this.state.transactions,'i am in render')} */}
                        <Text style={styles.head1}> $ {parseFloat(this.state.goal.bonus) - parseFloat(this.state.crBonus)  } </Text>
                    </View>
                    <View>
                        <Text style={styles.head}>Commission: </Text>
                        <Text style={styles.head1}>$ { parseFloat(this.state.goal.commission) - parseFloat(this.state.crCom)} </Text>
                    </View>
                </CardItem>
            </Card>
            }
        </View>

        );
    }
}
const styles = StyleSheet.create({
    myDrops: {
        width: Dimensions.get('window').width / 3,
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
        padding: 10,
        backgroundColor: '#fff',
        color: '#3f3fb9',
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 3)) - 75,
        fontSize: 18,
    },
    head: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
        alignSelf: 'center'
    },

    cardHead: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    cardHead1: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    head1: {
        color: '#3f3fb9',
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
)(SeeGoal);