import React, { Component } from 'react';
import { 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    View, 
    StyleSheet,
    Platform,
    Text 
} from 'react-native';

const Buttons = (props) => {

	const button = (
		<View style={styles.btn}>
			<Text style={{color: 'black'}}>{props.children}</Text>
		</View>
	);

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress = {props.onPress}>
                { button }
            </TouchableNativeFeedback>
        );
    }
    else {
        return (
            <TouchableOpacity onPress = {props.onPress}>
                { button }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
	btn: {
		backgroundColor: '#5A91C7',
		borderWidth: 1,
		borderColor: 'black',
		height: 70,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Buttons;