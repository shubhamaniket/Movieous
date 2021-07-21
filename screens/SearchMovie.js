import React from 'react';
import {View,StyleSheet,Text,Dimensions,TextInput,FlatList, ActivityIndicator,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
const {width,height} = Dimensions.get('window')

export default class SearchMovie extends React.Component{
    state = {
        moviename : '',
        moviedata : [],
        showmovies : false
    }
    handleSubmit = () => {
        this.setState({
            showmovies : true
        })
        if(this.state.moviename === ''){
            alert('Please enter a movie name to continue !')
            this.setState({
                showmovies : false
            })
        }
        else{
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&language=en-US&query=${this.state.moviename}&include_adult=false`)
            .then((res)=>res.json())
            .then((response)=>this.setState({
                moviedata : response.results,
                showmovies : false,
                moviename : ''
            }))
            this.textInput.clear()
        }
    }
    render(){
        if(this.state.showmovies){
            return(
                <View style={styles.container}>
                    <View style={styles.searchbar}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Ionicons name="md-search" size={30} color="#fff" />
                        </View>
                        <View style={{flex:4,justifyContent:'center'}}>
                            <TextInput placeholder="Enter a movie name"
                            placeholderTextColor="#fff"
                            onChangeText={(text)=>this.setState({
                                moviename : text
                            })}
                            style={{color:'#fff',fontSize:18}}
                            />
                        </View>
                        <View style={{flex:0.8,alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.handleSubmit()}>
                                <Ionicons name="md-arrow-forward" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <ActivityIndicator color="#fff" size="large"/>
                    </View>
                </View>
            );
        }
        else{
            return(
                <View style={styles.container}>
                    <View style={styles.searchbar}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Ionicons name="md-search" size={30} color="#fff" />
                        </View>
                        <View style={{flex:4,justifyContent:'center'}}>
                            <TextInput placeholder="Enter a movie name"
                            ref={input => { this.textInput = input }} 
                            placeholderTextColor="#fff"
                            onChangeText={(text)=>this.setState({
                                moviename : text
                            })}
                            style={{color:'#fff',fontSize:18}}
                            />
                        </View>
                        <View style={{flex:0.8,alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.handleSubmit()}>
                                <Ionicons name="md-arrow-forward" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                    numColumns={2}
                    style={{marginTop:15}}
                    data={this.state.moviedata}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayScreen',{
                                id : item.id
                            })}>
                                <View style={{width:170,height:250,marginRight:10,marginBottom:10}}>
                                <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{width:'100%',height:'100%'}}/>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    }}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#333',
        padding : 15
    },
    searchbar : {
        marginTop : 10,
        width : width-50,
        height : 50,
        borderWidth : 1,
        borderColor : '#fff',
        flexDirection : 'row',
        borderRadius : 50
    }
})