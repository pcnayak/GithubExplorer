import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableHighlight
} from 'react-native';
 
import AuthService from './AuthService';
import FeedDetails from './FeedDetails';


export default class Feed extends Component {
    constructor(props){
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows([]),
        };

    }


    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed(){
        let authService= new AuthService();
        console.log('authInfo.token.login'  + authInfo.token.login);
        console.log('authInfo.usr'  + authInfo.user);

        authService.GetAuthInfo((err, authInfo)=> {
            console.log(authInfo);
            var url = 'https://api.github.com/users/'
                + authInfo.token.login
                + '/repos';

            fetch(url, {
                headers: {
                    'Authorization' : 'Basic ' + authInfo.user
                }
            })
            .then((response)=> response.json())
            .then((responseData)=> {
                 
                this.setState({
                    dataSource: this.state.dataSource
                        .cloneWithRows(responseData),
                    showProgress: false
                });
            })
        });
    }

    pressRow(rowData){
        this.props.navigator.push({
            title: 'Repo Details',
            component: FeedDetails,
            passProps: {
                data: rowData
            }
        });

    }
    renderRow(rowData){
        return(
            <TouchableHighlight
            onPress={()=> this.pressRow(rowData)}
            underlayColor='#ddd'
        >
                <View style={styles.listRowView}>
                    <Text style={styles.listRowImage}>{rowData.language}</Text>

                    <View style={styles.listRowContainer}>
                        <Text style={styles.listRowData}>{rowData.name}</Text>

                        <Text style={styles.listRowData}>{rowData.description}</Text>
                        <Text style={styles.listRowData}>Updated: {rowData.updated_at}</Text>
                    </View>
                </View>
            </TouchableHighlight>

        );
    }
    render(){
   
        return (
            <View style={styles.container}  >    
                 <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                /> 
            </View>
            
             
        );
    }
 }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
 
    },
    listRowView: {       
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    },
    listRowContainer:{
        paddingLeft: 20

    },
    listRowImage:{
        height: 36,
        width: 36,
        borderRadius: 18,
        color: 'red'
    },
    listRowData:{
        backgroundColor: '#fff'    }
  
});
  
