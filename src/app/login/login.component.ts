import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  LoginErr:string="";
  newerr:string="";
  userErr:string="";
  hide = true;
  @ViewChild("pwd", { static: false }) pwd: any;
  constructor(private fb: FormBuilder, private auth: AuthenticationService, 
    private router: Router) { 
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]

    })
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    console.log("password==>",this.pwd.nativeElement.type);
    
  }


  features:any;
  permissionArr:any=[];
  permission:any;
  perm:any;
  login(userdata:any){
 this.auth.LoginUser(userdata).subscribe(
  (res:any)=>{
    this.features = res.user.Role.Feature_Access_Permissions
    this.permission = res.user.Role.Feature_Access_Permissions;
    this.perm = this.permission.map((data:any)=>{
      return data.Feature.name;
    })
    this.auth.setPermission(this.perm);
    this.auth.setToken(res.token);
    let loginPermissions = {
      "id": res['user']['id'],
      "name": res['user']['name'],
      "email": res['user']['email'],
      "role": res['user']['Role']['name'],
      "phone": res['user']['phone'],
      "project": res['user']['Projects'],
      "gender": res['user']['gender']
    }
    localStorage.setItem('user_info', JSON.stringify(loginPermissions))
    this.router.navigateByUrl('/layout/dashboard');
  },
   err=>{
     if(!err['error']['error']['username']){
      this.LoginErr= err['error']['error']
     }
     else{
      this.userErr=err['error']['error']['username']
      this.newerr=err['error']['error']['password']
     }
  })
  }
  @HostListener("document:keydown", ["$event"]) onKeydownHandlers(event: KeyboardEvent) {
    if (event.keyCode == 13) {
        if(this.pwd.nativeElement.type==='password'){
          this.pwd.nativeElement.focus()
        }
    }
  }
}