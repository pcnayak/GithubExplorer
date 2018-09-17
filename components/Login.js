import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import buffer from 'buffer';
import AuthService from './AuthService';
import Dashboard from './Dashboard';

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false,
            username: '',
            password: '',
            errMsg: '',
            success: false,
            isLoggedIn: false,
            token:''
        }

        let authService= new AuthService();

        authService.GetAuthInfo((err, authInfo)=> {
   
            if(authInfo)    {
                 this.setState({
                 isLoggedIn: true,
                 token: authInfo.token,
                 username : authInfo.user
                })              
            }
            
            if (this.state.isLoggedIn){
                this.props.navigation.navigate('dashboard', {
                    username: authInfo.user,
                    token: authInfo.token,
                });
                
            }
            
          
        });
    }
    
     
    
    render(){
  
            return (
                <View style={styles.container}  >     
                    <Image style={styles.logo} source={require('../images/Octocat.png')} />
                    <Text style={styles.heading}>Github Browser!</Text>
                    <TextInput 
                        onChangeText={(text)=> this.setState({username: text})}
                        style={styles.loginInput} 
                        placeholder="Github username">
                    </TextInput>
                    <TextInput 
                        onChangeText={(text)=> this.setState({password: text})}
                        style={styles.loginInput} 
                        placeholder="Github password" 
                        secureTextEntry = {true} >
                    </TextInput>
                    <TouchableHighlight 
                        onPress={this.onLoginPressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableHighlight>

                    
                    <Text style={styles.error}>{this.state.errMsg} </Text>

                    <ActivityIndicator animating={this.state.showProgress}
                        style={styles.loader}
                        size="large">
                    </ActivityIndicator>

                </View>
            );
    }
    onLoginPressed(){
        this.setState({showProgress : true});
        let authService= new AuthService();
        authService.Login({
            username: this.state.username,
            password: this.state.password
        },  (results)=> {
            this.setState({
                showProgress: false,
                success : results.success,
                errMsg: results.errMsg,
                isLoggedIn: true,
                token: results.token

            })     

            if(results.success){
                this.props.navigation.navigate(
                    'dashboard'
                );
            }
        });


    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height:55
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
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
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    } 

});
  
