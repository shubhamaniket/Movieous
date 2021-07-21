import React from 'react';
import {View,Text,StyleSheet,Dimensions,Image,ScrollView,FlatList,ActivityIndicator,TouchableWithoutFeedback} from 'react-native';
import {WebView} from 'react-native-webview';
const {width,height} = Dimensions.get('window');

export default class DisplayScreen extends React.Component{
    state = {
        data : [],
        videos : [],
        cast : [],
        similar : [],
        loading : true
    }
    async componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.route.params.id}?api_key=YOUR_API_KEY&language=en-US&append_to_response=videos`)
        .then((res)=>res.json())
        .then((response)=>this.setState({
            data : response
        }))
        fetch(`https://api.themoviedb.org/3/movie/${this.props.route.params.id}/videos?api_key=YOUR_API_KEY&language=en-US`)
        .then((res)=>res.json())
        .then((response)=>this.setState({
            videos : response.results,
        }))
        fetch(`https://api.themoviedb.org/3/movie/${this.props.route.params.id}/credits?api_key=YOUR_API_KEY`)
        .then((res)=>res.json())
        .then((response)=>this.setState({
            cast : response.cast,
        }))
        fetch(`https://api.themoviedb.org/3/movie/${this.props.route.params.id}/similar?api_key=YOUR_API_KEY&language=en-US`)
        .then((res)=>res.json())
        .then((response)=>this.setState({
            similar : response.results,
            loading : false
        }))
    }
    render(){
        const item = this.state.data;
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
                    <View style={styles.wall}>
                        <Image style={StyleSheet.absoluteFill} source={{uri : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}} resizeMode="cover" blurRadius={1}/>
                        <View style={styles.card}>
                            <Image style={StyleSheet.absoluteFill} source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} resizeMode="cover"/>
                        </View>
                    </View>
                    <Text style={{alignSelf:'center',marginTop:50,fontSize:20,color:'#fff'}}>{item.original_title}</Text>
                    <View style={{flex:1,padding:10,marginTop:10}}>
                        <View style={{flex:1,padding:10}}>
                            <Text style={{fontSize:18,color:'#fff'}}>Release Date : <Text style={{fontWeight:'bold',fontSize:15}}>{item.release_date}</Text></Text>
                            <Text style={{fontSize:18,marginTop:5,color:'#fff'}}>Tagline : <Text style={{fontWeight:'bold',fontStyle:'italic',fontSize:15}}>"{item.tagline}"</Text></Text>
                        </View>
                        <View style={{flex:1,padding:10}}>
                            <Text style={{fontSize:18,fontWeight:'bold',color:'#fff'}}>Overview</Text>
                            <Text style={{marginTop:6,color:'#fff'}}>{item.overview}</Text>
                        </View>
                        <View style={{flex:1,padding:10}}>
                            <Text style={{fontSize:18,fontWeight:'bold',color:'#fff'}}>Genres</Text>
                            <FlatList
                            numColumns={3}
                            data={item.genres}
                            renderItem={({item})=>{
                                return(
                                    <View style={{width:100,height:30,marginTop:6,alignItems:'center',borderRadius:50,justifyContent:'center',backgroundColor:'yellow',marginRight:10}}>
                                        <Text>{item.name}</Text>
                                    </View>
                                );
                            }}
                            />
                        </View>
                        <View style={{flex:1,padding:10}}>
                            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>Cast</Text>
                            <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.cast}
                            renderItem={({item})=>{
                                return(
                                    <View style={{width:120,marginTop:15,marginRight:10,height:170,backgroundColor:'#fff'}}>
                                        <View style={{flex:5}}>
                                            <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.profile_path}`}} style={StyleSheet.absoluteFill}/>
                                        </View>
                                        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#333'}}>
                                            <Text style={{color:'#fff'}}>{item.name}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                            />
                        </View>
                        <View style={{flex:1,padding:10}}>
                            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>Videos</Text>
                            <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.videos}
                            renderItem={({item})=>{
                                return(
                                    <View style={{width:width-50,marginTop:15,marginRight:10,height:230,backgroundColor:'#fff'}}>
                                        <WebView javaScriptEnabled={true}
                                        domStorageEnabled={true}
                                        source={{uri: `https://www.youtube.com/embed/${item.key}`}}/>
                                    </View>
                                );
                            }}
                            />
                        </View>
                        <View style={{flex:1,padding:10}}>
                            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>Similar Movies</Text>
                            <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.similar}
                            renderItem={({item})=>{
                                return(
                                    <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('DisplayTwo',{
                                        id : item.id
                                    })}>
                                        <View style={{width:120,marginTop:15,marginRight:10,height:170,borderRadius:15}}>
                                            <Image source={{uri : `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={[StyleSheet.absoluteFill,{borderRadius:15}]}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            }}
                            />
                        </View>
                    </View>
                    </ScrollView>
                </View>
        );
        }
    }
}
const styles = StyleSheet.create({
    wall : {
        width : width,
        height : 300,
        backgroundColor:'#fff'
    },
    card : {
        width : 150,
        height : 180,
        alignSelf:'center',
        top : 150
    },
    categories : {
        width : width,
        height : 80,
        alignSelf : 'center',
        marginTop : 20,
        padding : 16
    }
})