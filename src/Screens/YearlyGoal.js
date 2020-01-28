import React from "react";
import {
  View,
  Text,
  Button,
  Modal,
  Alert,
  TouchableHighlight,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  Picker,
  CheckBox,
  ScrollView,
  ImageBackground
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions, StackActions } from "react-navigation";
import TransCard from "./TransCard";
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
class YearlyGoal extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      eye: true,
      years: ["2020", "2021", "2022", "2023", "2024", "2025"],
      selectedYear: "2020",
      transctions: [],
      goal: [],
      yearlyIncomeGoal: 0,
      modalVisible: false,
      image: null
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
    this.props.navigation.navigate("MainTabs");
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "MainTabs" })]
      })
    );
  }
  componentDidMount() {
    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/all/transactions/yearly/" +
          this.props.user +
          "/" +
          this.state.selectedYear
      )
      .then(resp => {
        // console.log(resp.data)
        this.setState({ transctions: resp.data });
      })
      .catch(err => console.log(err));

    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/goal/" +
          this.props.user +
          "/" +
          this.state.selectedYear
      )
      .then(resp => {
        // console.log(resp.data)
        this.setState({
          goal: resp.data,
          yearlyIncomeGoal:
            parseFloat(resp.data.commission) +
            parseFloat(resp.data.bonus) +
            parseFloat(resp.data.spiff)
        });
      })
      .catch(err => console.log(err));
    this.getPermissionAsync();
  }
  changeDrop = itemValue => {
    this.setState({ selectedYear: itemValue });

    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/all/transactions/yearly/" +
          this.props.user +
          "/" +
          itemValue
      )
      .then(resp => {
        this.setState({ transctions: resp.data });
      })
      .catch(err => console.log(err));

    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/goal/" +
          this.props.user +
          "/" +
          itemValue
      )
      .then(resp => {
        // console.log(resp.data)
        if (resp.data === null) {
          this.setState({
            goal: 0,
            yearlyIncomeGoal: parseFloat(0) + parseFloat(0) + parseFloat(0)
          });
          this.forceUpdate();
        } else {
          this.setState({
            goal: resp.data,
            yearlyIncomeGoal:
              parseFloat(resp.data.commission) +
              parseFloat(resp.data.bonus) +
              parseFloat(resp.data.spiff)
          });
          this.forceUpdate();
        }
      })
      .catch(err => console.log(err));
  };

  changeDrop1 = itemValue => {
    this.setState({ selectedYear: itemValue });

    axios
      .get(
        "https://intense-harbor-45607.herokuapp.com/get/all/transactions/yearly/" +
          this.props.user +
          "/" +
          itemValue
      )
      .then(resp => {
        // console.log(resp.data)
        this.setState({ transctions: resp.data });
      })
      .catch(err => console.log(err));
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      await this.uploadImage(result.uri);
    }
  };

  _deleteImage = async () => {
    axios
      .delete(
        "https://intense-harbor-45607.herokuapp.com/delete/photo/" +
          "bg-" +
          this.props.user +
          "-" +
          new Date().getFullYear() +
          "." +
          "jpg"
      )
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  };

  uploadImage = async uri => {
    let fileType = uri.substring(uri.lastIndexOf(".") + 1);
    let formData = new FormData();
    var myfileName =
      "bg-" + this.props.user + "-" + new Date().getFullYear() + "." + "jpg";
    this.setState({
      myfileName
    });
    // if(this.state.myfileName === ""){
    //   this.setState({msg: "Error in Image Uploading", check: false})
    // }
    formData.append("photo", {
      uri,
      name: myfileName,
      type: `image/${fileType}`
      // name: 'photo.jpg',
      // type: 'image/jpeg',
    });
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };
    fetch("https://intense-harbor-45607.herokuapp.com/upload", options)
      .then(checkStatusAndGetJSONResponse => {
        console.log(
          "server resp",
          JSON.stringify(checkStatusAndGetJSONResponse)
        );
      })
      .catch(err => {
        this.setState({ msg: "Error in Image Uploading" });
      });
  };

  render() {
    if (this.state.transctions.length > 0) {
      var totalVolume = 0,
        totalSpiff = 0,
        totalCommission = 0,
        totalBonus = 0;
      for (var i = 0; i < this.state.transctions.length; i++) {
        // console.log(totalVolume, totalSpiff, totalCommission, totalBonus)

        totalVolume += parseFloat(this.state.transctions[i].volume);
        totalBonus += parseFloat(this.state.transctions[i].bonus);
        totalCommission += parseFloat(this.state.transctions[i].commission);
        totalSpiff += parseFloat(this.state.transctions[i].spiff);
      }
      var totalIncome = totalSpiff + totalCommission + totalBonus;
    }

    const placeholder = {
      label: "2020",
      value: null,
      color: "#9EA0A4"
    };
    var myTransctions = [];
    if (this.state.transctions !== null) {
      var trans = this.state.transctions;
      for (var i = 0; i < this.state.transctions.length; i++) {
        if (
          new Date(trans[i].soldDate).getFullYear() == this.state.selectedYear
        ) {
          myTransctions.push(trans[i]);
          this.state.selectedYear;
        }
      }
    }

    var key = this.state.seName;
    var serachedTractions = [];
    if (this.state.seName) {
      myTransctions = this.state.transctions.filter(function(transc) {
        return transc.name.toLowerCase().includes(key.toLowerCase());
      });
    }
    let Image_Http_URL = "";
    Image_Http_URL = {
      uri:
        "https://intense-harbor-45607.herokuapp.com/getImages/" +
        "bg-" +
        this.props.user +
        "-" +
        new Date().getFullYear() +
        ".jpg"
    };
    console.log(Image_Http_URL)
    return (
      <View style={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={Image_Http_URL}
          // source={require('../../assets/background.png')}
        >
          <KeyboardAwareScrollView
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <View>
              {/* {console.log(this.state.selectedYear, 'i maslect4e')} */}

              <View style={{ flexDirection: "row" }}>
                <View style={styles.myDrops}>
                  <RNPickerSelect
                    style={styles.myDrop}
                    onValueChange={value => this.changeDrop(value)}
                    placeholder={placeholder}
                    items={[
                      { label: "2020", value: "2020" },
                      { label: "2021", value: "2021" },
                      { label: "2022", value: "2022" },
                      { label: "2023", value: "2023" },
                      { label: "2024", value: "2024" }
                    ]}
                  />
                </View>
              </View>
              <View>
                <View  style={{ padding: 20,flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity style={{padding:10,backgroundColor:'#ff1358',borderRadius:5}} onPress={this._pickImage}>
                    <Text style={{color:'white'}}> Pick Image</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={{padding:10,backgroundColor:'#ff1358',borderRadius:5}} onPress={this._deleteImage}>
                    <Text style={{color:'white'}}> Delete Image</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={{ marginLeft: 10, marginRight: 10, padding: 0 ,backgroundColor:'transparent'}}> */}
              <CardItem style={styles.cardHead1}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        width: Dimensions.get("window").width / 2 + 30
                      }}
                    >
                      Yeary Volume Goal:{" "}
                    </Text>
                    <Text style={styles.head1}>
                      $
                      {this.state.goal.volume
                        ? this.numberWithCommas(this.state.goal.volume)
                        : "0.00"}
                    </Text>
                  </View>
                </TouchableHighlight>
              </CardItem>
              <CardItem style={styles.cardHead1}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.head}>Total # of sales: </Text>
                  <Text style={styles.head1}>
                    {this.state.transctions.length
                      ? this.state.transctions.length
                      : "0"}
                  </Text>
                </View>
              </CardItem>
              <CardItem style={styles.cardHead1}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.head}>Current: </Text>
                  <Text style={styles.head1}>
                    ${totalVolume ? this.numberWithCommas(totalVolume) : "0.00"}
                  </Text>
                </View>
              </CardItem>
              <CardItem style={styles.cardHead1}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.head}>Remaining Goal </Text>
                  <Text style={styles.head1}>
                    $
                    {totalVolume && this.state.goal.volume
                      ? this.numberWithCommas(
                          this.state.goal.volume - totalVolume
                        )
                      : "0.00"}
                  </Text>
                </View>
              </CardItem>
              <CardItem style={styles.cardHead1}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.head}>Total Commisions </Text>
                  <Text style={styles.head1}>
                    $
                    {totalCommission
                      ? this.numberWithCommas(Math.round(totalCommission))
                      : "0.00"}
                  </Text>
                </View>
              </CardItem>
              <CardItem style={styles.cardHead1}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.head}>Total Bonus </Text>
                  <Text style={styles.head1}>
                    $
                    {totalBonus
                      ? this.numberWithCommas(Math.round(totalBonus))
                      : "0.00"}
                  </Text>
                </View>
              </CardItem>
              <CardItem style={styles.cardHead1}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.head}>Total Spiff </Text>
                  <Text style={styles.head1}>
                    $
                    {totalSpiff
                      ? this.numberWithCommas(Math.round(totalSpiff))
                      : "0.00"}
                  </Text>
                </View>
              </CardItem>
              <CardItem style={styles.cardHead1}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.head}>Total Income </Text>
                  <Text style={styles.head1}>
                    $
                    {totalIncome
                      ? this.numberWithCommas(Math.round(totalIncome))
                      : "0.00"}
                  </Text>
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
            </View>
            {/* {(this.state.transctions !== null ? myTransctions !== null ?
                        myTransctions.map(
                            (transc, index) => <TransCard transc={transc} key={index} />
                        )
                        : <Text> NO Data in Year {this.state.selectedYear} </Text> : <Text> NO I coming in Year {this.state.selectedYear} </Text>)} */}
            {/* </View> */}

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <View style={{ marginTop: 100 }}>
                <View>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    Change Goal
                  </Text>

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
                      axios
                        .post(
                          "https://intense-harbor-45607.herokuapp.com/edit/goal/" +
                            this.props.user +
                            "/" +
                            this.state.selectedYear +
                            "/" +
                            this.state.goalchange
                        )
                        .then(resp => {
                          this.setModalVisible(!this.state.modalVisible);
                          this.changeDrop1(this.state.selectedYear);
                          axios
                            .get(
                              "https://intense-harbor-45607.herokuapp.com/get/goal/" +
                                this.props.user +
                                "/" +
                                this.state.selectedYear
                            )
                            .then(resp => {
                              console.log("as", resp.data);
                              this.setState({
                                goal: resp.data,
                                yearlyIncomeGoal:
                                  parseFloat(resp.data.commission) +
                                  parseFloat(resp.data.bonus) +
                                  parseFloat(resp.data.spiff)
                              });
                            })
                            .catch(err => console.log(err));
                        });
                    }}
                  >
                    <Text style={styles.saveBtn}>Save</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: "row",

    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#e8f1ff",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  forms1: {
    fontSize: 19,
    padding: 8,
    width: Dimensions.get("window").width - 25,
    height: 50,
    fontFamily: "open-sans-bold",
    color: "black",
    borderRadius: 10
  },
  myDrops: {
    width: Dimensions.get("window").width / 2 - 20,
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#3f3fb9",
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#F6F6F6"
  },
  myDrop: {
    height: 40,
    width: "100%",
    color: "#3f3fb9"
  },
  saveBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#3f3fb9",
    color: "white",
    borderRadius: 10,
    marginBottom: 30,
    textAlign: "center",
    marginHorizontal: 10
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
    color: "black",
    width: Dimensions.get("window").width - 55,
    fontSize: 18
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    width: Dimensions.get("window").width / 2
  },

  cardHead: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  cardHead1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    marginHorizontal: 20
  },
  head1: {
    color: "black",
    alignSelf: "flex-end",
    fontSize: 20,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  user: state.user.userId
});
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      userAsync
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(YearlyGoal);
