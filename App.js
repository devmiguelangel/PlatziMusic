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
  FlatList,
} from 'react-native';

import ArtistBox from './app/components/ArtistBox';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu Cmd+M',
});

type Props = {};

export default class App extends Component<Props> {
  render() {
    const artist = {
      image: 'david-bowie-02.png',
      name: 'David Bowie',
      likes: 200,
      comments: 76,
    }

    return (
      <FlatList
        data={Array(500).fill(artist)}
        renderItem={({ item }) => <ArtistBox artist={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20
  },
  artistBox: {
    flexDirection: 'row',
    padding: 2,
    borderColor: '#cccccc',
    borderWidth: 1
  },
  artistBoxInfo: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  artistBoxImage: {
    width: 150,
    height: 150
  },
  artistBoxName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444'
  },
  artistBoxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 15,
  },
  artistBoxIcon: {
    flex: 1,
    alignItems: 'center'
  },
  artistBoxIconCount: {
    color: 'gray'
  }
});
