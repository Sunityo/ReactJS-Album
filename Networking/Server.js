
import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput
} from 'react-native';

const apiGetAllAlbum = 'http://10.1.11.254:3000/api/album'
const apiInsertNewAlbum = 'http://10.1.11.254:3000/api/album'
const apiUpdateAlbum = 'http://10.1.11.254:3000/api/album/'+_id
const apiDeleteAlbum = 'http://10.1.11.254:3000/api/album/'+_id

async function getAlbumFromServer(){
    try{
        let response = await fetch(apiGetAllAlbum);
        let responseJson = await response.json();
        return responseJson.message
    } catch (error) {
   // alert(responseJson)
    }
}

//post
async function insertNewAlbumToServer(params){
    try{
        let response = await fetch(apiInsertNewAlbum, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.message;
    }catch(error){

    }
}
async function updateAlbum(params){
    try{
        let response = await fetch(apiUpdateAlbum, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.message;
    }catch(error){

    }
}

async function deleteAlbum(params){
    try{
        let response = await fetch(apiDeleteAlbum, {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.message;
    }catch(error){

    }
}
export {getAlbumFromServer};
export {insertNewAlbumToServer};
export {updateAlbum};
export {deleteAlbum};