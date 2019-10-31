import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

class Warning extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		if (this.props.limit === true) {
			return (
				<View>
					<Text style={styles.container}>
						<Image source={require('../assets/warning.jpg')} style={styles.warningTest} />
						{this.props.children} has been sitting/lying for too long
					</Text>
				</View>
			)
		} else {
			return (
				<View> 
				</View> 
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		textAlign: 'center',
		paddingTop: 20
	},
	warningTest: {
		width: 20,
		height: 20
	}
});

export default Warning;