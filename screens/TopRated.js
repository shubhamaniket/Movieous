import React from 'react';
import {View,StyleSheet,Text,Image,ScrollView,ActivityIndicator,TouchableWithoutFeedback, TouchableWithoutFeedbackBase} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
  

export default class TopRated extends React.Component{
    state = {
        pagetwo : [],
        pagethree : [],
        pagefour : [],
        pagefive : [],
        loading : true
    }
    async componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=en-US&page=2')
        .then((res)=>res.json())
        .then((response)=>this.setState({
            pagetwo : response.results,
        }))
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=en-US&page=3')
        .then((res)=>res.json())
        .then((response)=>this.setState({
            pagethree : response.results,
        }))
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=en-US&page=4')
        .then((res)=>res.json())
        .then((response)=>this.setState({
            pagefour : response.results,
        }))
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=en-US&page=5')
        .then((res)=>res.json())
        .then((response)=>this.setState({
            pagefive : response.results,
            loading : false
        }))
    }
    render(){
        if(this.state.loading){
            return(
                <View style={[styles.container,{justifyContent:'center'}]}>
                    <ActivityIndicator size="large" color="#fff"/>
                </View>
            );
        }
        else{
            return(
                <View style={styles.container}>
                    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.pagetwo}
                    numColumns={3}
                    renderItem={({item})=>{
                        return(
                            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayScreen',{
                                id : item.id
                            })}>
                            <View style={styles.card}>
                                <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{height:'100%',width:'100%'}}/>
                            </View>
                            </TouchableWithoutFeedback>
                        );
                    }}
                    />
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.pagethree}
                    numColumns={3}
                    renderItem={({item})=>{
                        return(
                            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayScreen',{
                                id : item.id
                            })}>
                            <View style={styles.card}>
                                <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{height:'100%',width:'100%'}}/>
                            </View>
                            </TouchableWithoutFeedback>
                        );
                    }}
                    />
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.pagefour}
                    numColumns={3}
                    renderItem={({item})=>{
                        return(
                            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayScreen',{
                                id : item.id
                            })}>
                            <View style={styles.card}>
                                <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{height:'100%',width:'100%'}}/>
                            </View>
                            </TouchableWithoutFeedback>
                        );
                    }}
                    />
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.pagefive}
                    numColumns={3}
                    renderItem={({item})=>{
                        return(
                            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayScreen',{
                                id : item.id
                            })}>
                            <View style={styles.card}>
                                <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{height:'100%',width:'100%'}}/>
                            </View>
                            </TouchableWithoutFeedback>
                        );
                    }}
                    />
                    </ScrollView>
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
        padding : 10
    },
    card : {
        height : 170,
        width : 110,
        alignSelf : 'center',
        backgroundColor : '#fff',
        marginRight:6,
        marginBottom:15
    }
})