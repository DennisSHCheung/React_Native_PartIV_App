import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = (props) => {

	return (
		<View>
			<Text style={{fontSize: 15, textAlign: 'center'}}>{props.children}'s daily activities:</Text>
		</View>
	)

}

export default Header;