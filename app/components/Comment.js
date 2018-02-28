import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';

comment = (props) => {
  const { comment } = props;

  return (
    <View style={styles.comment}>
      <Text>{comment.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    padding: 8,
    margin: 3,
    backgroundColor: '#c7ecee',
    borderRadius: 5,
  }
});

export default comment;