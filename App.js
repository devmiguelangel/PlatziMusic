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
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Login from './app/components/Login';
import ArtistList from './app/components/ArtistList';
import ArtistDetail from './app/components/ArtistDetail';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu Cmd+M',
});

type Props = {};

const isAndroid = Platform.OS === 'android';

const artistDetailNavigationOptions = {
  title: 'Artist Detail'
};

if (isAndroid) {
  artistDetailNavigationOptions.header = null;
}

const PlatziMusic = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    ArtistList: {
      screen: ArtistList,
      navigationOptions: {
        header: null
      }
    },
    ArtistDetail: {
      screen: ArtistDetail,
      navigationOptions: artistDetailNavigationOptions
    }
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <PlatziMusic />
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
    marginTop: 20
  }
});