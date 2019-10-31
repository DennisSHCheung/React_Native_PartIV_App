import React, { Component } from 'react';
//import { BarChart, Grid, XAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

import Warning from './Warning.js';
import Header from './Header.js';

import { BarChart, PieChart } from 'react-native-chart-kit';

class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            standing: 0,
            sitting: 0,
            lying: 0,
            sleeping: 0,
            other: 0,
            fetchData: '',
            username: navigation.getParam('username', "Dennis"),
            url: navigation.getParam('url', "none"),
            firstLoaded: true
        }
    }

    componentDidMount() {
        const activity = setInterval(() => {
            this.updateData();
        }, 3000)
        this.setState({ fetchData: activity });
    }

    /* Not really being called right now */
    componentWillUnmount() {
        const activity = this.state.fetchData;
        clearInterval(activity);
        this.setState({ fetchData: '' });
    }

    /* */
    updateData = () => {
        fetch(`${this.state.url}/userPose?username=${this.state.username}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(result => {
            return (result.json())
        })
        .then(result => {
            this.setState({
                standing: result.standing,
                sitting: result.sitting,
                lying: result.lying,
                sleeping: result.resting,
                other: result["not identified"]
            })
        })
    } 

    render() {
        const { standing, sitting, lying, sleeping, other } = this.state;
        const fill = 'rgb(134, 65, 244)';
        const data = [ standing, sitting, lying, sleeping, other];
        const labels = ["Standing", "Sitting", "Lying", "Sleeping", "Other"];

        const chartData = {
            labels: ["Standing", "Sitting", "Lying", "Resting", "Other"],
            datasets: [{
                data:[215, 23, 54, 500, 13]
                //data: [standing, sitting, lying, sleeping, other]
            }]
        }

        const screenWidth = Math.round(Dimensions.get('window').width);
        const chartConfig = {
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(24,24,24, ${opacity})`,
            strokeWidth: 2 // optional, default 3
        }

        const pieData = [
            { name: "Standing", value: 215, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 12 },
            { name: 'Sitting', value: 23, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 12 },
            { name: 'Lying', value: 54, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 12 },
            { name: 'Resting', value: 500, color: '#33FF66', legendFontColor: '#7F7F7F', legendFontSize: 12 },
            { name: 'Other', value: 13, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 12 }
        ]

        return (
            <View style={{flex: 1}}>
                <View style={{padding:50}}>
                    <Header>
                        {this.state.username}
                    </Header>
                </View>
                <View>
                    <PieChart
                        data={pieData}
                        width={screenWidth}
                        height={200}
                        chartConfig={chartConfig}
                        accessor="value"
                        backgroundColor="transparent"
                     
                     />
                </View>
                <View style={{marginTop:10}}>
                    <BarChart
                        data={chartData}
                        width={screenWidth}
                        height={200}
                        yAxisLabel={''}
                        chartConfig={chartConfig}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			justifyContent: 'center',
            marginBottom: 100
		}
	}
);

export default DetailsScreen;