import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { fromTop, zoomOut, flipX } from 'react-navigation-transitions';

import DetailsScreen from './DetailsScreen/DetailsScreen.js';
import HomeScreen from './HomeScreen/HomeScreen.js';
import LoginScreen from './LoginScreen/LoginScreen.js';

const customTransitions = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
    return fromTop();
}

const homeStyle = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
});

const HomeNavigator = createBottomTabNavigator(
    {
        Details: {
            screen: DetailsScreen,
            navigationOptions: {
                tabBarIcon:
                    <Image
                    source={require('./assets/piechart.png')}
                    style={homeStyle.icon}
                    />
            }
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: 
                    (<Image 
                    source={require('./assets/notepad.png')} 
                    style={homeStyle.icon}
                    />),
                title: 'Log'

            }
        }        
    }
);

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Home: {
            screen: HomeNavigator
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        },
        transitionConfig: (nav) => customTransitions(nav)
    }
);

const AppContainer = createAppContainer(AppNavigator);
//const AppContainer = createAppContainer(HomeNavigator);

export default AppContainer;