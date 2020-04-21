
import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';
import {updateAlbum} from "../Networking/Server";

var screen = Dimensions.get('window');
export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumName: '',
            category: '',
            songs: ''
        };
    }
    showEditModal = (editingAlbum, flatlistItem) => {
        this.setState({
            key: editingAlbum._id,
            albumName: editingAlbum.albumName,
            songs: editingAlbum.songs,
            category: editingAlbum.category,
            flatlistItem: flatlistItem
        });
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
                }}>Album's information</Text>
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
                    onChangeText={(text) => this.setState({ albumName: text })}
                    placeholder="Enter album name"
                    value={this.state.albumName}
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

                    onChangeText={(text) => this.setState({ songs: text })}
                    placeholder="Enter song"
                    value={this.state.songs}
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

                    onChangeText={(text) => this.setState({ category: text })}
                    placeholder="Enter category"
                    value={this.state.category}
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
                        if (this.state.albumName.length == 0 || this.state.songs.length == 0 || this.state.category.length == 0) {
                            alert("You must enter details");
                            return;
                        }
                        //Update existing album
                      //  var foundIndex = flatListData.findIndex(item => this.state.key == item.key);
                       // if (foundIndex < 0) {
                       //     return; //not found
                        //}
                       // flatListData[foundIndex].albumName = this.state.albumName;
                        //flatListData[foundIndex].songs = this.state.songs;
                        //flatListData[foundIndex].songs = this.state.category;
                        let params = {
                            _id: this.state.key,
                            albumName: this.state.albumName,
                            songs: this.state.songs,
                            category: this.state.category
                        };
                        updateAlbum(params).then((error) => {
                            if (error === 'false') {
                                this.state.flatListItem.refreshDataFromServer({
                                    _id: this.state.key,
                                    albumName: this.state.albumName,
                                    songs: this.state.songs,
                                    category: this.state.category
                                });
                                this.refs.myModal.close();
                            }
                        }).catch((error) => {
                            this.refs.myModal.close();
                        });
                        //Refresh flatlist item
                        //this.state.flatlistItem.refreshFlatListItem();
                        //this.refs.myModal.close();
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }
}