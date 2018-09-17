import { AsyncStorage } from 'react-native';
import buffer from 'buffer';
import _ from 'lodash';

const AuthToken = 'token';
const UserId = 'user'; 

export default class AuthService  {
    constructor(){

    };
    LogOff(){
        AsyncStorage.multiRemove([AuthToken, UserId]);
    }

    GetAuthInfo(cb){
 
         AsyncStorage.multiGet([AuthToken, UserId], (err, val)=> {
            if(err){
                return cb(err);
            }else{
                 authInfo = {
                    token : JSON.parse(  val[0][1] ),
                    user : val[1][1] 
                }
                 
                return cb(null, authInfo);
            }
        });
    }


    Login(creds, cb){
        let b = new buffer.Buffer(creds.username + ':' + creds.password);
        let encodedAuth = b.toString('base64');
 
        fetch('https://api.github.com/user', {

            headers: {
                'Authorization' : 'Basic ' + encodedAuth
            }
        })
        .then((response)=>{
 
            if(response.status >= 200 && response.status < 300){
                return response;
            }
            else if( response.status == 401){
                throw {
                    errMsg: "That username and password combination did not work!"
                } 
            }
            else {
                throw {
                    errMsg: "We experienced an unexpected issue!"
                } 
            }
            
        })
        .then((response)=>{
            return response.json();
        })
        .then((results)=>{
             AsyncStorage.multiSet([
                [AuthToken, JSON.stringify(results)],
                [UserId, encodedAuth]
            ], (err)=> {
                if(err){
                    throw {
                        errMsg: "We experienced an unexpected issue!"
                    }                 
                }
                return cb({success: true, errMsg : '', token: JSON.stringify(results)});
            })
          
        })
        .catch((err)=> {
            return cb({success: false, errMsg : err.errMsg});
        })
        .finally(()=>{
         });
 
    }
}

