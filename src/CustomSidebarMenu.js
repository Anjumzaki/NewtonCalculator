import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    }
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: require('../assets/Blog_gray.png'),
        navOptionName: 'Home',
        screenToNavigate: 'HomePage',
      },
      {
        navOptionThumb: require('../assets/Video_gray.png'),
        navOptionName: 'Yearly Report',
        screenToNavigate: 'Videos',
      },
      {
        navOptionThumb: require('../assets/Contact_Us_gray.png'),
        navOptionName: 'Monthly Report',
        screenToNavigate: 'Contact',
      },

      {
        navOptionThumb: require('../assets/Blog_gray.png'),
        navOptionName: 'Change Ammounts',
        screenToNavigate: 'BlogPosting',
      },
      {
        navOptionThumb: require('../assets/Video_gray.png'),
        navOptionName: 'Add Goal  ',
        screenToNavigate: 'VideoPosting',
      },
    ];
  }
  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }
  closeAndLogout() {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate('Login')
    this.props.navigation.closeDrawer()
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style={{ backgroundColor: '#0b5f99', width: '100%', margin: 0, alignItems: 'center', padding: 20 }}>
          <Image
            source={require('../assets/applogo.png')}
            style={{ width: 185, height: 150}}
            resizeMode={'contain'}
          />
        </View>
       
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <TouchableOpacity onPress={() => {
              global.currentScreenIndex = key;
              this.props.navigation.navigate(item.screenToNavigate);
            }}
              key={key}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: global.currentScreenIndex === key ? '#0b5f99' : '#ffffff',
                }}

              >
                <View style={{ marginRight: 10, marginLeft: 20 }}>
                  <Image source={item.navOptionThumb} style={{ width: 30, height: 30 }} color="#808080" />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: global.currentScreenIndex === key ? 'white' : 'black',
                  }}
                >
                  {item.navOptionName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => this.openModal()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: '#ffffff',
              }}

            >
              <View style={{ paddingRight: 10, paddingLeft: 20 }}>
                <Image source={require('../assets/logout_Gray.png')} style={{ width: 30, height: 30 }}  />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ff7400',
  },
  contentTitle:{
    fontSize:23
  },
  yesOrNO: {
    marginLeft: 20,
     marginRight: 20,
      marginTop: 30,
      borderRadius:20,
      width:50
  }
});