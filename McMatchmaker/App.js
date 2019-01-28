/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, AsyncStorage, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state={username: 'McMaster Email', password: 'password', success: ''}
  logIn(){
    //
  }
  signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => this.setState({success: 'sign up successful!'}))
      .catch(error => this.setState({success: 'sign up unsuccessful!'}));
      var user = firebase.auth().currentUser();
      user.sendEmailVerification().then(function() {
        this.setState({success: 'sign up successful!'})
      }).catch(function(error) {
        // An error happened.
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./Images/mcmatchmakerlogo.png')} style={{ width: 300, height:150 }} />
        <Text style={{fontFamily: 'LANENAR_', fontSize:25, justifyContent: 'center', marginBottom: 20}}>Find your McMaster match today!</Text>
        <TextInput 
        style={{fontFamily: 'LANENAR_', borderWidth: 0.5, borderRadius: 7, width: 250, borderColor: 'grey', fontSize: 20, color: '#a8a8a8'}} 
        editable = {true} 
        onFocus={() => {
          if (this.state.username == 'McMaster Email'){
          this.setState({username: ''})
        }}}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        />
        <TextInput 
        style={{fontFamily: 'LANENAR_', borderWidth: 0.5, borderRadius: 7, width: 250, borderColor: 'grey', fontSize: 20, color: '#a8a8a8', marginTop: 1}} 
        editable = {true} 
        onFocus={() => {
          if (this.state.password == 'password'){
          this.setState({password: ''})
        }}}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        secureTextEntry
        />
        <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity
         onPress={this.logIn()}
         style={{
           marginTop: 20,
          justifyContent: 'center',
          borderColor: 'grey',
          borderRadius: 7,
          borderWidth: 0.5,
          width: 100,
          height: 50,
          alignItems: 'center'
         }}>
         <Text
         style={{
           color:'grey',
           fontFamily: 'LANENAR_',
           fontSize: 20,
           marginRight: 10
         }}> Log In</Text></TouchableOpacity>
         <TouchableOpacity
         onPress={this.signUp.bind(this)}
         style={{
           marginTop: 20,
          justifyContent: 'center',
          borderColor: 'grey',
          borderRadius: 7,
          borderWidth: 0.5,
          width: 100,
          height: 50,
          alignItems: 'center',
          marginLeft: 10
         }}>
         <Text
         style={{
           color:'grey',
           fontFamily: 'LANENAR_',
           fontSize: 20,
           marginRight: 10
         }}> Sign Up</Text></TouchableOpacity>
         </View>
        <Text>{this.state.success}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: 'Lane - Narrow',
    fontSize: 30
  },
});
