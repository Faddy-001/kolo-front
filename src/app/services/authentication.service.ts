import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, subscribeOn } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url="http://localhost:3000/api/"
  //url ="http://3.15.160.127/backend/api/";
  // url = "http://13.58.157.54/dcbackend/api/"    //Dream City Backend
  // url="https://kolonizer.net/kolonizer/api/" //Kolonizer360 domain
  //url="https://kolonizer.net/abdul/api/"     //abdulAleem domain
 // url="https://kolonizer.net/tahir/api/"     //balaji group Domain
  login_url=this.url+'signin';
  logOut_url=this.url+'signOut';
  fforget_pass=this.url+'forgetpassword';
  new_pass=this.url+'newpassword';
  isLogin:any;

  constructor(private http: HttpClient) { }



  public setPermission(perms:[]){
    localStorage.setItem("feature_permission",JSON.stringify(perms));
  }

  public getPermission(){
    return JSON.parse(localStorage.getItem('feature_permission') || '{}');
  }

  public setToken(token:string){
    localStorage.setItem("token",token);
  }

  public getToken(){
    return localStorage.getItem('token')
  }


  public clear(){
    localStorage.clear();
  }


  LoginUser(user:any){
    return this.http.post(this.login_url,user).pipe(
      map(
          (res) => res
      )
    );
    }


  verifyTokenUrl=this.url+'verifytoken';

  verifyToken(token:any){

    return this.http.post(this.verifyTokenUrl, token)
  }


  isLoggedIn() {
    const token = localStorage.getItem('token');

    if (token)
    {
      this.isLogin=true;

      this.verifyToken({token:token}).subscribe(
        (result)=>{
        },
        (error)=>{
          console.log(error['error']['success']);
          if(error['error']['success'] ==  false){
            console.log('no data');
            localStorage.clear();
            window.location.href = "/login";
            this.isLogin=false

          }
        }
      )

    }
    else{
      console.log('no token is available');
      this.isLogin=false

    }
    return this.isLogin;
  }

  signout(){

    let bearerToken = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json' ,
         'Authorization' : 'Bearer '+bearerToken,
        'Accept': '*/*'
      })
    };

    return this.http.get(this.logOut_url,httpOptions);
  }

  forget_pass(value:any){
    return this.http.post(this.fforget_pass,value)
  }
  new_password(passwords:any,tokens:any){
    var token =  {
      token: tokens,
      password: passwords
  };

   return this.http.post(this.new_pass,token)
  }


}

