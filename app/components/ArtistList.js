import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

import ArtistBox from './ArtistBox';
import { getTopArtists } from './ApiClient';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    }
  }

  showArtistDetail(artist) {
    this.props.navigation.navigate('ArtistDetail', {artist})
  }

  render() {
    getTopArtists().then(data => this.setState({ artists: data }));
    const artists = this.state.artists;

    return (
      <FlatList
        data={this.state.artists}
        renderItem={({ item }) => {
          return(
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.showArtistDetail(item)}>
              <ArtistBox artist={item} />
            </TouchableOpacity>
          )
        }}
        keyExtractor={item => item.key}
      />
    );
  }
}