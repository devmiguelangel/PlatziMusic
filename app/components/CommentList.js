import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
} from 'react-native';

import Comment from './Comment';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;
    
    return (
      <FlatList
        style={styles.commentList}
        data={comments}
        renderItem={({ item }) => {
          return (
            <Comment comment={item} />
          )
        }}
        keyExtractor={item => item.key}
      />
    );
  }
}

const styles = StyleSheet.create({
  commentList: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 10
  }
});