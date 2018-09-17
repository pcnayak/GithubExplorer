
import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
 
import Login from './components/Login';
import Dashboard from './components/Dashboard';

/*
 export default class App extends Component{
   render() {
    return (
       <Login appName ={"Github Browser!!"}></Login>
    );
  }
}
*/

 export default createStackNavigator({
    login: {screen: Login},
    dashboard: {
      screen: Dashboard,
      navigationOptions: () => ({
        title: "Dashboard",
        headerBackTitle: "Home"

      }),  
    }
 })