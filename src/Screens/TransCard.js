import React from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";

export default class TransCard extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            userName: '',
            Password: '',
            msg: ""
        };
    }
    componentDidMount() {
        console.log("card",this.props.transc)
    }
    render() {
        return (
            <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
                <CardItem style={styles.cardHead1} >
                    <View>
                        <Text style={styles.head}>Sold Date: </Text>
                        <Text style={styles.head1}> {this.props.transc.payDate}</Text>
                    </View>
                    <View>
                        <Text style={styles.head}>Pay Date: </Text>
                        <Text style={styles.head1}>{this.props.transc.payDate}</Text>
                    </View>
                </CardItem>
                <CardItem style={styles.cardHead} >
                    <Text style={styles.head}>Name: </Text>
                    <Text style={styles.head1}>{this.props.transc.name} </Text>
                </CardItem>
                <CardItem style={styles.cardHead} >
                    <Text style={styles.head}>Contact: </Text>
                    <Text style={styles.head1}>{this.props.transc.contact} </Text>
                </CardItem>
                <CardItem style={styles.cardHead1} >
                    <View>
                        <Text style={styles.head}>Volume: </Text>
                        <Text style={styles.head1}> {this.props.transc.volume} $</Text>
                    </View>
                    <View>
                        <Text style={styles.head}>Downpayment: </Text>
                        <Text style={styles.head1}> {this.props.transc.downPayment} %</Text>
                    </View>
                    <View>
                        <Text style={styles.head}>Spiff: </Text>
                        <Text style={styles.head1}> {this.props.transc.spiff} $</Text>
                    </View>
                </CardItem>
                <CardItem style={styles.cardHead1} >
                    <View>
                        <Text style={styles.head}>Bonus: </Text>
                        <Text style={styles.head1}> {this.props.transc.bonus} %</Text>
                    </View>
                    <View>
                        <Text style={styles.head}>Commission: </Text>
                        <Text style={styles.head1}> {this.props.transc.commission} $</Text>
                    </View>

                    <View>
                        <Text style={styles.head}>PMD: </Text>
                        <Text style={styles.head1}> {this.props.transc.pmdDeduction} $</Text>
                    </View>
                </CardItem>

                <CardItem>
                    <Text>{this.props.transc.note}</Text>
                </CardItem>
            </Card>

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
        color: '#0b5f99',
        fontSize: 19

    }
});