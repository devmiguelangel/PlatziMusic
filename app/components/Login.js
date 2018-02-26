/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

export default class Login extends Component {
  // 
  handleLogin = (error, result) => {
    if (error) {
      console.warn("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then(() => {
        this.props.navigation.navigate('ArtistList')
        /* (data) => {
          alert(data.accessToken.toString())
        } */
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Bienvenidos a PlatziMusic
        </Text>

        <LoginButton
          readPermissions={["public_profile", "email"]}
          onLoginFinished={this.handleLogin}
          onLogoutFinished={() => alert("logout.")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 50
  }
});