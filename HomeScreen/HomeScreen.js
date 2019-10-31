import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, ScrollView, 
    TouchableOpacity, 
    TouchableNativeFeedback,
    Modal,
    Switch } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import LogHeader from './LogHeader.js';
import SettingButton from './SettingButton.js';
import Spinner from 'react-native-loading-spinner-overlay';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            username: navigation.getParam('username', "Dennis"),
            logList: '',
            loading: true,
            tableHead: ['Posture', 'Timestamp'],
            fetchData: '',
            modal: false,
            image: '',
            imageLoading: false,
            setting: false,
            url: navigation.getParam('url', "none"),
            cameraOn: false,
            saveImage: false,
            fallingCount: 0,
            isFalling: false,
            cameraurl: '',
            oldTime: ''
        }
    }

    componentDidMount() {
        const activity = setInterval(() => {
            fetch(`${this.state.url}/userRecords?username=${this.state.username}`, {
                method: "GET",
                headers: { "Content-Type" : "application/json" }
            })
            .then(res => {
                return (res.json());
            })
            .then(res => {
                /* res contains id, username, pose, available and timestamp*/
                this.setState({ logList: res, loading: false });
            })
        }, 3000);
        this.setState({ fetchData: activity });

        /* Collect url for camera */
        fetch(`https://p4-hoster.herokuapp.com/allLogs`, {
            method: "GET",
            headers: { "Content-Type" : "application/json" }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            res.forEach((data, index) => {
                if (res[index].type === "camera") {
                    console.log(res[index].url);
                    this.setState({ cameraurl: res[index].url });
                }
            });
        });
    }

    componentWillUnmount() {
        const activity = this.state.fetchData;
        clearInterval(activity);
        this.setState({ fetchData: '' });
    }

    closeModal = () => {
        this.setState({ image: '', modal: false });
    }

    onPressButton = (id) => {
        this.setState({ imageLoading: true });
        fetch(`${this.state.url}/getImage?username=${this.state.username}&id=${id}`, {
            method: "GET",
            headers: { "Content-Type" : "application/json" }
        })
        .then(res => {
            return (res.json());
        })
        .then(res => {
            const image = (
                <TouchableNativeFeedback onPress={()=>{this.closeModal()}}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Image style={{height:"100%", width: "100%"}} source={{uri: `data:image/png;base64,${res.file}`}} />
                    </View> 
                </TouchableNativeFeedback>     
            );
            this.setState({ image: image, modal: true, imageLoading: false });
        })
    }
   
    selectSetting = () => {
        this.setState({ setting: true });
    }

    toggleCamera = (value) => {
        this.setState(prevState => ({ cameraOn: !prevState.cameraOn }));
        console.log(this.state.cameraOn, "camera");
        if (this.state.cameraOn === false) {
            fetch(`${this.state.cameraurl}/OnCamera`, {
                method: "get"
            })
            .then(res => {
                if (res.ok) {
                    console.log("Camera on");
                }
            })
        } else {
            fetch(`${this.state.cameraurl}/OffCamera`, {
                method: "get"
            })
            .then(res => {
                if (res.ok) {
                    console.log("Camera off");
                }
            })
        }
    }

    toggleSaveImage = (value) => {
        this.setState({ saveImage: value });
        if (this.state.saveImage === false) {
            fetch(`${this.state.cameraurl}/SaveImage`, {
                method: "get"
            })
            .then(res => {
                if (res.ok) {
                    console.log("Image saved");
                }
            })
        } else {
            fetch(`${this.state.cameraurl}/SendImage`, {
                method: "get"
            })
            .then(res => {
                if (res.ok) {
                    console.log("Stopped saving image");
                }
            })
        }
    }

    closeSettingModal = () => {
        this.setState({ setting: false });
    }

    render() {
        let list = this.state.logList;
        list = Array.from(list).reverse();
        const data = Array.from(list).map((data, index) => {
            if (list[index].available === 1) {
                const posture = (
                    <View style={{marginLeft:5}}>
                        <Text style={{color:"blue"}}>{list[index].pose}</Text>
                    </View>
                );
                const button = (
                    <TouchableNativeFeedback onPress={()=>{this.onPressButton(list[index].id)}}>
                        { posture }
                    </TouchableNativeFeedback>
                );
                return ([button, list[index].timestamp]);
            } 
            return ([list[index].pose, list[index].timestamp]);
        });

        /* Fall detection */
        // let length = list[Array.from(list).length];
        // /* New element */
        // if (this.state.oldTime !== list[length-1].timestamp) {
        //     if (list[length-1].pose === "lying" && !this.state.isFalling) {
        //         this.setState({ isFalling: true, fallingCount: 1 });
        //     } else if ((list[length-1].pose === "lying" || list[length-1].pose === "unknown") && this.state.isFalling) {
        //         let count = this.state.fallingCount + 1;
        //         this.setState({ fallingCount: count });
        //     } else {
        //         this.setState({ isFalling: false, fallingCount: 0 });
        //     } 
        //     if (this.state.fallingCount > 5) {
        //         Vibration.vibrate(1000);
        //     }        
        //     this.setState({ oldTime: list[length-1].timestamp});
        // }   

        return (
            <View style={{flex: 1, marginLeft: 5}}>
               
               {/* Displays selected image */}
               <Modal
                    transparent={true}
                    visible={this.state.modal}
                >
                    {this.state.image}
                </Modal>

                {/* Displays a loading circle */}
                <Modal
                    transparent={true}
                    visible={this.state.imageLoading}
                >
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Spinner
                            visible={true}
                            textContent={'Loading...'}
                            textStyle={{textAlign:'center', color:'#fff'}}
                        />
                    </View>
                </Modal>

                {/* Displays a setting screen */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.setting}
                    onRequestClose={this.closeSettingModal}
                >
                    <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:'#00000080'}}>
                        <View style={{height:'20%', width:'60%', backgroundColor:'#fff', padding:20, justifyContent:'center', alignItems:'center'}}>
                            <View style={{width:'80%', justifyContent:'center', alignItems:'center'}}>
                                <Text>Camera status</Text>
                                <Switch
                                    value={this.state.cameraOn}
                                    onValueChange={this.toggleCamera}
                                />
                            </View>
                            <View style={{width:'80%', justifyContent:'center', alignItems:'center'}}>
                                <Text>Save image</Text>
                                <Switch
                                    value={this.state.saveImage}
                                    onValueChange={this.toggleSaveImage}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
              
                {/* Header view */}
                <View style={styles.top}>
                    <View style={{width:'60%'}}>
                        <LogHeader username={this.state.username} />
                    </View>
                    <View style={{width:'30%'}}>
                        <SettingButton selectSetting={this.selectSetting} />
                    </View>
                </View>

                {/* Table view */}
                <View style={styles.body}>
                    {this.state.loading?
                        <ActivityIndicator 
                            size="large"
                            color="#0000ff"
                        />
                        :                        
                        <ScrollView style={styles.container}>
                            <Table borderStyle={{borderWidth: 0.3, borderColor: '#c8e1ff'}}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                                <Rows data={data} textStyle={styles.text}/>
                            </Table>
                        </ScrollView>      
                    }
                </View>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 8,
        paddingTop: 5, 
        backgroundColor: '#fff',
        width: "95%"
    },
    head: { 
        height: 40, 
        backgroundColor: '#f1f8ff' 
    },
    text: { 
        margin: 6 
    },
    top: {
        height: '12%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});


export default HomeScreen;