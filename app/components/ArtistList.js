import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
} from 'react-native';

import ArtistBox from './ArtistBox';

export default class App extends Component<Props> {
  render() {
    return (
      <FlatList
        data={this.props.artists}
        renderItem={({ item }) => <ArtistBox artist={item} />}
        keyExtractor={item => item.key}
      />
    );
  }
}