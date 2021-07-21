import React from 'react';
import {View,StyleSheet,Text,FlatList,Image,ActivityIndicator,ScrollView,Dimensions,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
const {width,height} = Dimensions.get('window');
  
console.disableYellowBox = true

export default class HomeScreen extends React.Component{
    state = {
        toprated : [],
        popular : [],
        upcoming : [],
        loading : true
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=en-US')
        .then((res)=>res.json())
        .then((response)=>this.setState({
            toprated : response.results,
        }))
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US')
        .then((res)=>res.json())
        .then((response)=>this.setState({
            popular : response.results,
        }))
        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&language=en-US')
        .then((res)=>res.json())
        .then((response)=>this.setState({
            upcoming : response.results,
            loading : false
        }))
    }
    render(){
        if(this.state.loading){
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#333'}}>
                    <ActivityIndicator size="large" color="#fff"/>
                </View>
            );
        }
        else{
            return(
                <View style={{flex:1,backgroundColor:'#333'}}>
                    <ScrollView style={{flex:1}}>
                    <View style={styles.toprated}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Top Rated</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('TopRated')}>
                                <Text style={{fontSize:14,color:'yellow'}}>View More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.movielist}>
                        <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.toprated}
                        renderItem={({item})=>{
                            return(
                                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayScreen',{
                                    id : item.id
                                })}>
                                    <View style={styles.moviecard}>
                                        <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{height:'100%',width:'100%',borderRadius:15}}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }}
                        />
                    </View>
                    <View style={styles.toprated}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Popular</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Popular')}>
                            <Text style={{fontSize:14,color:'yellow'}}>View More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.movielist}>
                        <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.popular}
                        renderItem={({item})=>{
                            return(
                                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayScreen',{
                                    id : item.id
                                })}>
                                    <View style={styles.moviecard}>
                                        <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{height:'100%',width:'100%',borderRadius:15}}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }}
                        />
                    </View>
                    <View style={styles.toprated}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Upcoming</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Upcoming')}> 
                                <Text style={{fontSize:14,color:'yellow'}}>View More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.movielist,{marginBottom:20}]}>
                        <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.upcoming}
                        renderItem={({item})=>{
                            return(
                                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayScreen',{
                                    id : item.id
                                })}>
                                    <View style={styles.moviecard}>
                                        <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={{height:'100%',width:'100%',borderRadius:15}}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }}
                        />
                    </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    toprated : {
        alignSelf : 'flex-start',
        padding : 25,
        flexDirection : 'row'
    },
    movielist : {
        marginLeft:25
    },
    moviecard : {
        height:170,
        width:120,
        backgroundColor:'#fff',
        marginRight:15,
        borderRadius:15
    }
})