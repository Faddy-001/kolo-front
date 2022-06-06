import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPasswordForm:FormGroup;	
  forgetPassSuccess:string="";
  forgetPassError:string="";
  success:any;

  constructor(private fb:FormBuilder,   private router: Router, private auth: AuthenticationService, private toastr: ToastrService) { 
    this.forgotPasswordForm = this.fb.group({
  		username : [null,[Validators.required,Validators.email]]
  	})
  }

  ngOnInit(): void {}

  forgetPass(value: any){
  this.auth.forget_pass(value).subscribe(
    res=>{
      console.log(value);
      
      this.success=res;
      this.toastr.success(this.success.message)
    },
    err=>{
      this.forgetPassError=err['error']['message']
    }
  )
  }
}
