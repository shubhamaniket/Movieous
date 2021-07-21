import React from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,TransitionPresets,CardStyleInterpolators} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './Screens/HomeScreen';
import {DrawerContent} from './Screens/DrawerContent';
import TopRated from './Screens/TopRated';
import Popular from './Screens/Popular';
import Upcoming from './Screens/Upcoming';
import SearchMovie from './Screens/SearchMovie';
import DisplayScreen from './Screens/DisplayScreen';
import DisplayTwo from './Screens/DisplayTwo';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function StackScreens({navigation}){
  return(
    <Stack.Navigator screenOptions={{
      cardStyleInterpolator : CardStyleInterpolators.forHorizontalIOS,
      transitionSpec : {
        open : config,
        close : config
      }
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
        headerRight : () => (
          <TouchableOpacity onPress={()=>{navigation.navigate('SearchMovie')}} style={{padding:10}}>
            <Ionicons name="ios-search" size={32} color="#fff" />
          </TouchableOpacity>
        ),
        title : 'Movieous',
        headerTitleAlign : 'center',
        headerStyle : {
          backgroundColor : '#333'
        },
        headerTintColor : '#fff'
      }}/>
      <Stack.Screen name="TopRated" component={TopRated} options={{
        title : 'Top Rated',
        headerTitleAlign : 'center',
        headerStyle : {
          backgroundColor : '#333'
        },
        headerTintColor : '#fff'
      }}/>
      <Stack.Screen name="Popular" component={Popular} options={{
        title : 'Popular',
        headerTitleAlign : 'center',
        headerStyle : {
          backgroundColor : '#333'
        },
        headerTintColor : '#fff'
      }}/>
      <Stack.Screen name="Upcoming" component={Upcoming} options={{
        title : 'Upcoming',
        headerTitleAlign : 'center',
        headerStyle : {
          backgroundColor : '#333'
        },
        headerTintColor : '#fff'
      }}/>
      <Stack.Screen name="SearchMovie" component={SearchMovie} options={{
        title : 'Search',
        headerTitleAlign : 'center',
        headerStyle : {
          backgroundColor : '#333'
        },
        headerTintColor : '#fff'
      }}/>
      <Stack.Screen name="DisplayScreen" component={DisplayScreen} options={{
        headerStyle : {
          backgroundColor : '#333'
        },
        headerTransparent:true,
        title : '',
        headerTintColor : '#fff'
      }}/>
      <Stack.Screen name="DisplayTwo" component={DisplayTwo} options={{
        headerStyle : {
          backgroundColor : '#333'
        },
        headerTransparent:true,
        title : '',
        headerTintColor : '#fff'
      }}/>
    </Stack.Navigator>
  );
}
export default class App extends React.Component{
  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator drawerStyle={{
          backgroundColor: '#f2f2ff',
          width: 240,
        }} drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="HomeScreen" component={StackScreens}/>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}