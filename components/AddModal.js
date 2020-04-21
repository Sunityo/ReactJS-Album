
import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

import {insertNewAlbumToServer} from "../Networking/Server";

var screen = Dimensions.get('window');
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newAlbumName: '',
            newCategory: '',
            newSong: ''
        };
    }
    showAddModal = () => {
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal closed");
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>New Album information</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ newAlbumName: text })}
                    placeholder="Enter new Album name"
                    value={this.state.newAblumName}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        borderBottomWidth: 1
                    }}

                    onChangeText={(text) => this.setState({ newSong: text })}
                    placeholder="Enter new songs list"
                    value={this.state.newSong}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 20,
                        borderBottomWidth: 1
                    }}

                    onChangeText={(text) => this.setState({ newCategory: text })}
                    placeholder="Enter new Category"
                    value={this.state.newCategory}
                />
                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen'
                    }}
                    onPress={() => {
                        if (this.state.newAlbumName.length == 0 || this.state.newSong.length == 0 || this.state.newCategory.length == 0) {
                            alert("You must enter new details");
                            return;
                        }
                        const newKey = this.generateKey(24);
                        const newAlbum = {
                            _id: newKey,
                            albumName: this.state.newAlbumName,
                            cover: "https://upload.wikimedia.org/wikipedia/en/1/1c/Old_Town_Road_cover.jpg",
                            category: this.state.newCategory,
                            songs: this.state.newSong
                        };
                        //flatListData.push(newAlbum);
                        //this.props.parentFlatList.refreshFlatList(newKey);
                        insertNewAlbumToServer(newAlbum).then((error) => {
                           if (error === 'false'){
                               this.props.parentFlatList.refreshDataFromServer();
                           }
                        });
                        this.refs.myModal.close();
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }
}