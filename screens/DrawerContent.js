import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function DrawerContent(props){
    return(
        <View style={{flex:1,alignItems:'center'}}>
            <Text style={{alignSelf:'center',fontSize:15,marginTop:50}}>Made With <Ionicons name="md-heart" size={20} color="#000" /> By DuoCoders</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    categories : {
        marginTop : 15,
    }
})