import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { firebaseDatabase, firebaseAuth } from './firebase';

export default class ArtistBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likeCount: 0,
      commentCount: 0,
    }
  }

  componentWillMount = () => {
    const { uid } = firebaseAuth.currentUser;

    this.getArtistRef().on('value', snapshot => {
      const artist = snapshot.val();

      if (artist) {
        this.setState({
          likeCount: artist.likeCount,
          liked: artist.likes && artist.likes[uid]
        });
      }
    });
  }
  
  componentDidMount = () => {
    this.getNumberComments();
  }  

  getNumberComments = () => {
    const { mbid } = this.props.artist;
    const commentsRef = firebaseDatabase.ref(`comments/${mbid}`);

    commentsRef.once('value', snapshot => {
      this.setState({ commentCount: snapshot.numChildren() });
    });
  }

  handleLike = () => {
    // this.setState({ liked: ! this.state.liked });
    this.toggleLike();
  }

  getArtistRef = () => {
    const { mbid } = this.props.artist;

    return firebaseDatabase.ref(`artist/${mbid}`);
  }

  toggleLike = () => {
    const { uid } = firebaseAuth.currentUser;

    this.getArtistRef().transaction(function (artist) {
      if (artist) {
        if (artist.likes && artist.likes[uid]) {
          artist.likeCount--;
          artist.likes[uid] = null;
        } else {
          artist.likeCount++;
          if (!artist.likes) {
            artist.likes = {};
          }
          artist.likes[uid] = true;
        }
      }

      return artist || {
        likeCount: 1,
        likes: {
          [uid]: true
        }
      };
    });
  }

  render() {
    const { image, name } = this.props.artist;
    const { likeCount, commentCount } = this.state;

    const iconLike = this.state.liked ? 
      <Icon name="ios-heart" size={30} color="#ff7675" /> : 
      <Icon name="ios-heart-outline" size={30} color="gray" />;

    return (
      <View style={styles.artistBox}>
        <Image style={styles.artistBoxImage} source={{uri: image}} />

        <View style={styles.artistBoxInfo}>
          <Text style={styles.artistBoxName}>{name}</Text>
          <View style={styles.artistBoxRow}>
            <View style={styles.artistBoxIcon}>
              <TouchableOpacity activeOpacity={0.3} onPress={() => this.handleLike() }>
                {iconLike}
              </TouchableOpacity>
              <Text style={styles.artistBoxIconCount}>{likeCount}</Text>
            </View>
            <View style={styles.artistBoxIcon}>
              <Icon name="ios-text-outline" size={30} color="gray" />
              <Text style={styles.artistBoxIconCount}>{commentCount}</Text>
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
