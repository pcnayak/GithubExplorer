import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Image,
    StyleSheet
} from 'react-native';
import moment from 'moment' ;

 export default class FeedDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
          rowData:   props.data
        };

    }

    renderRow(rowData){

    }

    render(){
   
        return (
            <View style={styles.mainView}  >    
                <Text style={
                        { paddingTop:20, 
                          paddingBottom: 20, 
                          fontSize:20
                        }
                    }
                >
                    {this.state.rowData.name}
                </Text>
                <Text style={{ fontSize: 15}}>
                    {this.state.rowData.description}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '800'}}>
                    Created: { moment(this.state.rowData.created_at).fromNow()}
                </Text>
                <Text style={{ fontSize: 12 , fontWeight: '800'}}>
                    Updated: {moment(this.state.rowData.updated_at).fromNow() }
                </Text>
            </View>
            
             
        );
    }
 }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 10
 
    } ,
    mainView:{
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});
  
