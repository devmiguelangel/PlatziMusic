/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.Container}>
        <View style={[ styles.Box, styles.BoxRed ]}></View>
        <View style={[ styles.Box, styles.BoxGreen ]}></View>
        <View style={[ styles.Box, styles.BoxCyan ]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Box: {
    width: 100,
    height: 100,
    backgroundColor: 'black'
  },
  BoxRed: {
    flex: 1,
    backgroundColor: 'red'
  },
  BoxGreen: {
    flex: 2,
    alignSelf: 'flex-start',
    backgroundColor: 'green'
  },
  BoxCyan: {
    backgroundColor: 'cyan'
  },
});
