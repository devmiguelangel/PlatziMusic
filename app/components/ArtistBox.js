import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Images from '@assets/images';

export default class ArtistBox extends Component {
  render() {
    const { image, name, likes, comments } = this.props.artist;

    return (
      <View style={styles.artistBox}>
        <Image style={styles.artistBoxImage} source={Images.logo} />
        
        <View style={styles.artistBoxInfo}>
          <Text style={styles.artistBoxName}>{name}</Text>
          <View style={styles.artistBoxRow}>
            <View style={styles.artistBoxIcon}>
              <Icon name="ios-heart-outline" size={30} color="gray" />
              <Text style={styles.artistBoxIconCount}>{likes}</Text>
            </View>
            <View style={styles.artistBoxIcon}>
              <Icon name="ios-text-outline" size={30} color="gray" />
              <Text style={styles.artistBoxIconCount}>{comments}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistBox: {
    margin: 2,
    flexDirection: 'row',
    padding: 2,
    borderColor: '#cccccc',
    borderWidth: 1,
    shadowOpacity: .2,
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowColor: '#7cc5d3',
    elevation: 2
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
