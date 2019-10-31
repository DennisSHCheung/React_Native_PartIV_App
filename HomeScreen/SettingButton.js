import React from 'react';
import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native';

const SettingButton = (props) => {

	const button = (
		<View style={style.setting}>
			<TouchableNativeFeedback onPress={props.selectSetting}>
				<Image 
					source={require('../assets/setting.png')}
					style={{width:25, height:25}}
				/>				
			</TouchableNativeFeedback>
		</View>
	);

	return button;
}

const style = StyleSheet.create({
	setting: {
		alignItems: 'flex-end'
	}
});

export default SettingButton;