
import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight } from 'react-native';
//import { CachedImage, ImageCacheProvider} from 'react-native-cached-image';
import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';

import AddModal from './AddModal';
import EditModal from './EditModal';
import {getAlbumFromServer} from "../Networking/Server";
import {updateAlbum} from "../Networking/Server";

class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow_id: null,
            numberOfRefresh: 0,
            item: {}
        };
    }
    refreshFlatListItem = (changedItem) => {
        this.setState({item: changedItem});
        //this.setState((prevState) => {
          //  return {
            //    numberOfRefresh: prevState.numberOfRefresh + 1
            //};
        //});
    }
    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key });
            },
            right: [
                {
                    onPress: () => {
                        // alert("Update");
                        // this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
                        let selectedItem = this.state.item.name ? this.state.item : this.props.item;
                        this.props.parentFlatList.refs.editModal.showEditModal(selectedItem, this);

                    },
                    text: 'Edit', type: 'primary'
                },
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => {
                                        albumFromServer.splice(this.props.index, 1);
                                        //Refresh FlatList !
                                        this.props.parentFlatList.refreshFlatList(deletingRow);
                                    }},
                            ],
                            { cancelable: true }
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSettings}>
                <View style={{
                    flex: 1,
                    flexDirection:'column',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection:'row',
                        backgroundColor: 'lightgrey'
                    }}>
                        <Image
                            source={{uri: this.props.item.cover}}
                            style={{width: 100, height: 100, margin: 5}}
                        >

                        </Image>
                         <CachedImage
                            source={{uri: this.props.item.cover}}
                            style={{width: 10, height: 100, margin: 5}}
                            >
                        </CachedImage>
                        <View style={{
                            flex: 1,
                            flexDirection:'column',
                            height: 100
                        }}>

                            <Text style={styles.flatListItem}>Album Name: {this.state.item.albumName ? this.props.item.albumName : this.props.item.albumName}</Text>
                            <Text style={styles.flatListItem}>Songs:{this.props.item.category ? this.props.item.category : this.props.item.category}</Text>
                            <Text style={styles.flatListItem}>Category:{this.props.item.songs ? this.props.item.songs : this.props.item.songs}</Text>
                        </View>
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor:'black'
                    }}>

                    </View>
                </View>
            </Swipeout>

        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'black',
        padding: 10,
        fontSize: 16,
    }
});

export default class BasicFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            deletedRow_id: null,
            albumFromServer: []
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    componentDidMount() {
        this.refreshDataFromServer();
    }
    refreshDataFromServer  = () => {
        getAlbumFromServer().then((albums)=> {
            this.setState({albumFromServer: albums});
        }).catch((error) => {
            this.setState({albumFromServer: [] });
        });
    }
    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRow_id: activeKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }
    _onPressAdd () {
        // alert("You add Item");
        this.refs.addModal.showAddModal();
    }
    render() {
        return (
            <View style={{flex: 1, marginTop: Platform.OS === 'android' ? 34 : 34}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent:'flex-end',
                    alignItems: 'center',
                    height: 64}}>
                    <TouchableHighlight
                        style={{marginRight: 10}}
                        onPress={this._onPressAdd}
                    >
                        <Image
                            style={{width: 35, height: 35}}
                            source={require('../icons/icon-add.png')}
                        />
                    </TouchableHighlight>
                </View>
                <FlatList
                    ref={"flatList"}
                   // data={flatListData}
                    data={this.state.albumFromServer}
                    renderItem={({item, index})=>{
                        //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                        return (
                            <FlatListItem item={item} index={index} parentFlatList={this}>

                            </FlatListItem>);
                    }}
                    keyExtractor={(item, index) => item.albumName}
                >

                </FlatList>
                <AddModal ref={'addModal'} parentFlatList={this} >

                </AddModal>
                <EditModal ref={'editModal'} parentFlatList={this}>

                </EditModal>
            </View>
        );
    }
}