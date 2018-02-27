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

import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA_vfJn9MNrqJ9j0PA3y4GbmiJEz3eWlZ8",
  authDomain: "platzimusic-196421.firebaseapp.com",
  databaseURL: "https://platzimusic-196421.firebaseio.com",
  projectId: "platzimusic-196421",
  storageBucket: "platzimusic-196421.appspot.com",
  messagingSenderId: "1057440979740"
};
firebase.initializeApp(config);

const { FacebookAuthProvider } = firebase.auth;
const firebaseAuth = firebase.auth()

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillMount = () => {
    this.authenticateUSer();
  }

  authenticateUSer = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken } = data;
      const credential = FacebookAuthProvider.credential(accessToken);

      firebaseAuth.signInWithCredential(credential).then((user) => {
        this.setState({ user: user })
        
        this.props.navigation.navigate('ArtistList')
        // console.warn("Sign In Success", user);
        
        // var currentUser = user;
        // Merge prevUser and currentUser data stored in Firebase.
        // Note: How you handle this is specific to your application

        // After data is migrated delete the duplicate user
        /* return user.delete().then(function () {
          // Link the OAuth Credential to original account
          return prevUser.link(credential);
        }).then(function () {
          // Sign in with the newly linked credential
          return firebaseAuth.signInWithCredential(credential);
        }); */
      }).catch((error) => {
        // console.warn("Sign In Error", error);
      });
    });
  }

  handleLogin = (error, result) => {
    if (error) {
      console.warn("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      this.authenticateUSer();
      /* AccessToken.getCurrentAccessToken().then((data) => {
        this.authenticateUSer(data.accessToken)
        this.props.navigation.navigate('ArtistList')
        (data) => {
          alert(data.accessToken.toString())
        }
      }) */
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Bienvenidos a PlatziMusic
        </Text>
        {/*
        <Text style={styles.welcome}>
          {this.state.user && this.state.user.displayName}
        </Text>
        */}

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