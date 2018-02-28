import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';

import ArtistBox from './ArtistBox';
import { getTopArtists } from './ApiClient';

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      artists: null
    }
  }

  showArtistDetail(artist) {
    this.props.navigation.navigate('ArtistDetail', {artist})
  }

  render() {
    getTopArtists().then(data => this.setState({ artists: data }));
    const artists = this.state.artists;

    return (
      <View style={styles.container}>
        {
          !artists && <ActivityIndicator style={styles.loading} size="large" color="#3c6382" />
        }
        { artists &&
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
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center'
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});