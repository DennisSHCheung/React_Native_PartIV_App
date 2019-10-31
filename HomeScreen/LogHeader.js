import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LogHeader = (props) => {

	const header = (

		<View style={style.border}>
			<Text style={{fontSize: 20, marginLeft:2}}>
				{props.username}'s recent activities
			</Text>
		</View>

	);

	return header;
}

const style = StyleSheet.create({

	border: {
		borderBottomWidth: 0.2, 
		width: '100%',
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1
	}

});

export default LogHeader;