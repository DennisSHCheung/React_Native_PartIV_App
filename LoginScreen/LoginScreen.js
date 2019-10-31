import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ActivityIndicator } from 'react-native';
import Buttons from '../Components/Button.js';

class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			error: false,
			loading: false,
			online: false,
			url: ''
		}
	}

	requestSignIn = (url, credentials) => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify(credentials),
			headers: { "Content-Type" : "application/json" }
		})
		.then(res => {
			if (res.ok) {
				this.setState({ error: false, loading: false });
		 		this.props.navigation.navigate('Home', { username: this.state.username, url: this.state.url });
			} else {
				this.setState({ error: true, loading: false });
			}
		})
		.catch(error => {
			console.log("Server Down!");
			this.setState({ loading: false });
		})
	}

	componentWillMount() {
       fetch('https://p4-hoster.herokuapp.com/host', {
            method: "GET"
        })
        .then(res => {
        	res.ok?this.setState({ online: true }):this.setState({ online: false });
            return res.json();
        })
        .then(res => {
            this.setState({ url: res[0].url });
        })
        .catch(error => {
        	console.log("Middleware Server Down!");
        })
	}

	onPressButton = () => {

		if (!this.state.online) return;

		const credentials = { username: this.state.username, password: this.state.password };
		this.setState({ loading: true, error: false });

		// const cherrypiUrl = "https://b782e443.ngrok.io/signin";
		// const herokuUrl = "https://p4-server.herokuapp.com/signin";

		this.requestSignIn(this.state.url, credentials);
	}	
	
	render() {
		return (
			<View style={{flex:1}}>
				<View style={styles.container}>
					<Text style={{fontSize:30}}> Smart Care </Text>
					<TextInput
						style={styles.textBox}
						placeholder="username"
						autoCorrect={false}
						onChangeText={(text) => this.setState({ username: text })}
					/>
					<TextInput 
						style={styles.textBox}
						secureTextEntry={true}
						placeholder="password"
						autoCorrect={false}
						onChangeText={(text) => this.setState({ password: text })}
					/>
					<View style={{height:50}}>
						{this.state.online?
							this.state.error?
								(
									<View style={{flexDirection: 'row'}}>
										<Image 
											source={require('../assets/error.png')} 
											style={{width:20, height:20}}
										/>
										<Text style={{marginLeft:10, fontSize:15}}>
											Incorrect credentials
										</Text>
									</View>
								)
							: 
								(this.state.loading?
									<ActivityIndicator 
										size="small"
										color="#0000ff"
									/>
								: <Text></Text>
								)
						:
							(
								<View style={{flexDirection: 'row'}}>
									<Image 
										source={require('../assets/warning.jpg')} 
										style={{width:20, height:20}}
									/>
									<Text style={{marginLeft:10, fontSize:15}}>
										Server is currently offline
									</Text>
								</View>
							)
						}
					</View>
				</View>
				<Buttons onPress={this.onPressButton}>
					Login
				</Buttons>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	textBox: {
		height: 50,
		width: 250,
		marginBottom: 2,
		textAlign: 'center',
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.8,
		borderBottomWidth: 0,
		shadowRadius: 2,
		elevation: 1
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default LoginScreen;