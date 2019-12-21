import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/AppContainer';
import * as Font from 'expo-font';
import store from "./src/store";
import { Provider as StoreProvider } from 'react-redux';

export default class App extends React.Component {
  state={
    fontLoaded:false
  }
  componentDidMount() {
    Font.loadAsync({
        'open-sans-bold': require('./assets/fonts/Lato-Medium.ttf'),
        'open-sans-simple': require('./assets/fonts/Lato-Light.ttf'),

    }).then(()=>{
    this.setState({ fontLoaded: true });
      
    })
}
  render() {
    return (
    this.state.fontLoaded &&   
    <StoreProvider store={store}>
      <AppContainer />
    </StoreProvider>
    ) ;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});