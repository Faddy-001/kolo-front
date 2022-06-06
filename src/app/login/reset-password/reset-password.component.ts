import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  err:string="";
  password:FormGroup;
  tokenId:string='';
  success:any;


  constructor(private fb: FormBuilder,  private router: Router,
     private auth: AuthenticationService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.password = this.fb.group({
      password1: [null, [Validators.required]],
      password2: [null, Validators.required]

    })
    this.tokenId = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {}
  submit(value:any){
    if(value.password1==value.password2) {
      this.auth.new_password(value.password1,this.tokenId).subscribe((res)=>{
        this.success=res
        this.toastr.success(this.success.message)
        this.router.navigateByUrl('/login');
      },(err)=>{
        console.log(err);
      });
    } else {
        this.err="please enter same password"
    }
  }
}