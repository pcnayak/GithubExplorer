import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TabBarIOS,
    NavigatorIOS
} from 'react-native';
 
import Feed from './Feed';
import Search from './Search';

export default class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            
            selectedTab: 'Feed'
        }
    }
    render(){
        const username = this.props.navigation.getParam('username', 'None');
   
        return (
                 <TabBarIOS style={styles.container}>
                    <TabBarIOS.Item
                        title="Repos"
                        selected={this.state.selectedTab == 'Feed'}
                        icon={require('../images/inbox.png')}
                        onPress={()=> this.setState({selectedTab: 'Feed'})}
                    >
                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        initialRoute={{
                            component: Feed,
                            title: 'Repos'
                        }}
                    />
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        title="Search"
                        selected={this.state.selectedTab == 'Search'}
                        icon={require('../images/search.png')}
                        onPress={()=> this.setState({selectedTab: 'Search'})}
                    >
                        <NavigatorIOS
                            style={{
                                flex: 1
                            }}
                            initialRoute={{
                                component: Search,
                                title: 'Search'
                            }}
                        />
                    </TabBarIOS.Item>
                </TabBarIOS>
        );
    }
 }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
  
});
  
