import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import SearchResults from './SearchResults';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchQuery: ''
        }
    }
    
    render(){
  
            return (
                <View style={styles.container}  >     
                    <TextInput 
                        onChangeText={(text)=> this.setState({searchQuery: text})}
                        style={styles.searchInput} 
                        placeholder="Search Public Repos">
                    </TextInput>
                    <TouchableHighlight 
                        onPress={this.onSearchPressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableHighlight>

                </View>
            );
    }
    onSearchPressed(){
        this.props.navigator.push({
            component: SearchResults,
            title: 'Results',
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });


    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 100,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    searchInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        alignSelf: 'stretch',
        color: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    }
  
});
  
