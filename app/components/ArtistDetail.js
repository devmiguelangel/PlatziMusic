import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import ArtistBox from "./ArtistBox";
import CommentList from "./CommentList";
import { firebaseDatabase } from './firebase';

export default class ArtistDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: null,
			text: '',
			comments: []
		};
	}

	componentWillMount = () => {
		const { params } = this.props.navigation.state;
		const { artist } = params;

		this.setState({ artist });
	}

	componentDidMount = () => {
		this.getCommentsRef().on('child_added', this.getComments);
	}

	componentWillUnmount = () => {
		this.getCommentsRef().off('child_added', this.getComments);
	}

	getComments = (data) => {
		this.setState({
			comments: this.state.comments.concat({
				key: data.key,
				text: data.val().text
			})
		});
		
		// addCommentElement(postElement, data.key, data.val().text, data.val().author);
	}

	getCommentsRef = () => {
		const { mbid } = this.state.artist;

		return firebaseDatabase.ref(`comments/${mbid}`);
	}
	
	handleSendComment = () => {
		const { text } = this.state;
		const commentsRef = this.getCommentsRef();

		const comment = commentsRef.push();
		comment.set({ text });

		this.setState({ text: '' });
	}

	render() {
		const { artist, comments } = this.state;

		return (
			<View style={styles.container}>
				<ArtistBox artist={artist} />
				<Text style={styles.commentTitle}>Comentarios</Text>
				<CommentList comments={comments} />
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.inputComment}
						onChangeText={(text) => this.setState({ text })}
						value={this.state.text}
						placeholder="Opina sobre este artista"
					/>
					<TouchableOpacity activeOpacity={0.3} onPress={() => this.handleSendComment()}>
						<Icon name="ios-send" size={30} color="#0984e3" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	commentTitle: {
		paddingHorizontal: 10,
		marginVertical: 5,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#535c68'
	},
	inputContainer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		paddingHorizontal: 10,
	},
	inputComment: {
		flex: 1,
		height: 50
	}
});
