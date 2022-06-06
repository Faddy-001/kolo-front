import { Component, OnInit, ViewChild } from '@angular/core';
import { CdTimerComponent, TimeInterface } from 'angular-cd-timer';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NameFieldComponent } from "./name-field/name-field.component";
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { ProjectDescComponent } from '../project-desc/project-desc.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { features } from 'process';
import { AddProfessionComponent } from 'src/app/profession/add-profession/add-profession.component';
// import * as _moment from 'moment';
// const moment = _moment
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { LOADIPHLPAPI } from 'dns';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
  
};

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }

  ]
})
export class AddLeadComponent implements OnInit {
  @ViewChild('basicTimer', { static: true })
  basicTimer!: CdTimerComponent;
  startTimer: boolean = false;
  timerInfo = '';
  firstN: string = '';
  middleN: string = '';
  lastN: string = '';
  size: number = 3;
  clicks = 0
  calldClass: string = "none"
  StatusMOI: string = "none"
  StatusFUD: string = "";
  mode_of_intrestClass: string = "none"
  
  M_O_I: string = "none"
  AddLeadForm!: FormGroup;
  status = [
    { value: 'Lead' },
    { value: 'Call' },
    { value: 'Meet' },
    { value: 'Visit' },
  ]
  stopbtn: boolean = false;
  startbtn: boolean = true;
  public selectedval = this.status[0].value;
  projectName: string = "";
  nameString: any;
  fName: string = '';
  mName: string = '';
  lName: string = '';
  colSize: number = 4;
  row2Col: number = 4;
  projectData: any;
  projects: any = [];
  oneprojects: any;
  oneproject: any;
  pName: any;
  pId: any;
  userData: any;
  users: any;
  CreUser: any = [];
  salesManager: any = [];
  dialogValue!: string;
  leadResult: any;
  showhrs: any;
  showmin: any;
  showsec: any;
  showtimer: any;
  professionName: string = "";
  professionNames: string = "";
  allProfession: any;
  professions: any;
  Callduration_PH: string = "";
  FullName: any;
  fNm: string = '';
  mNm: string = '';
  lNm: string = '';
  new1p:any=[]
  projectPropertyType:any=[]
  disableAreaOfIntrest:boolean=true;
  callDuration: any = 'block';
  creAndSales:any=[];
  filterCRE:any=[];
  filterSalesMan:any=[];
  resumebtn: boolean = false;
  colSizeDuration:number=2;
  colSizeBtn:number=1;
  actionBtn:string='none';
  date:any=null;
  getPermission: any;
  logindata: any;
  userId: any;
  userProjects: any;
  userProjectId: any;
  errorShow: any;
  errorMsg: any;
  manually: boolean = true;
  classStyle:string="cursor";
  inputValue:string="";
  readonly:boolean=true;
  callManually: any = 'none';
  autoTimer: any = 'block';
  Callothers: string = 'none';
  pauseTime: number = 0;
  pausebtn: boolean = false;
  editTimer: boolean = false;
  



  constructor(private formbuilder: FormBuilder, public dialog: MatDialog, private mainService: MainService,
    private route: Router, private toastr: ToastrService) {

      this.timerInfo = '';
    this.AddLeadForm = this.formbuilder.group({
      project_id: [null, Validators.required],
      cre_user_id: [null, Validators.required],
      sales_exec_user_id: [null, Validators.required],
      call_duration: [],
      phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      alternate_contact_no: [null],
      first_name: [null, Validators.required],
      middle_name: [null],
      last_name: [null],
      contactability: [null, Validators.required],
      mode_of_interest: [null],
      profession_id: [null],
      current_location: [null],
      living_mode: [null],
      area_of_interest: [null],
      buying_purpose: [null],
      required_plot_size: [null],
      budget: [null],
      category: [null],
      status: ['Lead'],
      follow_up_date: [null],
      expected_visit_date: [null],
      // lead_source: [null],
      lead_source: [null, Validators.required],
      video_sent: [null],
      remark: [null, Validators.required]
    })
  }
  
  ngOnInit(): void {
    this.Projects();
    this.Users();
    this.getProfession();
    //this.date=new Date();
    this.date = moment(new Date(), "DD//MM/YYYY");
  }

  getTodaysDate(e: any)
   {
      this.date = e.value._d;
   }

  addProfession(){
    const dialogRef = this.dialog.open(AddProfessionComponent,{
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getProfession();
    });
  }
 
  Projects() {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    if (this.logindata.role == 'Super Admin' || this.logindata.role == 'Admin') {
      this.mainService.getProjects().subscribe((res) => {
        this.userProjects = res;
        this.projectData = this.userProjects.projects;
        this.projects=this.projectData;
      })
    }
    else {
      this.mainService.getUser(this.userId).subscribe((res: any) => {
        this.userProjects = res.projects;
        this.projects=this.userProjects;
      })
    }
    // this.mainService.getProjects().subscribe((result) => {
    //   this.projectData = result;
    //   this.projects = this.projectData.projects;
    // })
  }

  Users() {
    this.mainService.getUsers().subscribe((result) => {
      this.userData = result;
      this.users = this.userData.user;
      for (let i = 0; i < this.users.length; i++) {
        for (let j = 0; j < this.users[i].Role.Feature_Access_Permissions.length; j++) { 
          if (this.users[i].Role.Feature_Access_Permissions[j].Feature.name == 'Leads' && this.users[i].Role.Feature_Access_Permissions[j].create == true) {
            this.CreUser.push({
              id: this.users[i].id,
              name: this.users[i].name
            })
            break;
          }
        }
      }
      
      // this.users.forEach((data: any) => {
      //   if (data.Role.name == 'CRE') {
      //     this.CreUser.push({
      //       id: data.id,
      //       name: data.name
      //     })
      //   }
      // })
      this.users.forEach((data: any) => {
        if (data.Role.name == 'Sales Executive') {
          this.salesManager.push({
            id: data.id,
            name: data.name
          })
        }
      })

      this.creAndSales = this.CreUser.concat(this.salesManager);

      const getLoggedinUser = JSON.parse(localStorage.getItem('user_info') || '{}');

      //filter CRE
     this.filterCRE =  this.CreUser.filter((item:any)=>{
       return item.name == getLoggedinUser.name;
      });
      
      if(this.filterCRE.length > 0){
        this.AddLeadForm.get('cre_user_id')?.setValue(this.filterCRE[0].id);
      }
      else{
        this.AddLeadForm.get('cre_user_id')?.setValue(null);
      }

      //filter sales manager
      this.filterSalesMan = this.salesManager.filter((item:any)=>{
        return item.name == getLoggedinUser.name;
      })

      if(this.filterSalesMan.length > 0){
        this.AddLeadForm.get('sales_exec_user_id')?.setValue(this.filterSalesMan[0].id);
      }
      else{
        this.AddLeadForm.get('sales_exec_user_id')?.setValue(null);
      }
    })  
  }

  getProfession() {
    this.mainService.getProfessions().subscribe(result => {
      this.allProfession = result;
      this.professions = this.allProfession.professions;
    },
      err => {
        console.log(err);
    })
  }

  openNameField() {
    const dialogRef = this.dialog.open(NameFieldComponent, {
      data: {
        fNm: this.fName,
        mNm: this.mName,
        lNm: this.lName
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.nameString = result;
      this.fName = this.nameString.fname;
      this.mName = this.nameString.mname;
      this.lName = this.nameString.lname;
      this.dialogValue = result.data;
      this.AddLeadForm.get('first_name')?.setValue(this.fName);
      this.AddLeadForm.get('middle_name')?.setValue(this.mName);
      this.AddLeadForm.get('last_name')?.setValue(this.lName);
      this.FullName = this.fName + ' ' + this.mName + ' ' + this.lName;
    });
  }


  submit(value: any) {
    console.log(value);
    //this.doActionBasicTimer('stop');
    this.mainService.addLead(value).subscribe(result => {
      this.leadResult = result;
      this.toastr.success(this.leadResult.message);
      this.route.navigateByUrl('/layout/lead/lead');
    }, err => {
        console.log(err);
      this.errorShow = err;
      this.errorMsg = this.errorShow.error.error.phone;
      this.toastr.error(this.errorMsg);
    })
  }

 

 
  onStop(data: any) {
    this.showhrs = data.hours ? data.hours : '00';
    if(data.minutes < 10)
      {
         this.showmin ='0' + data.minutes ? '0' + data.minutes : '00';
      }
    else
      {
         this.showmin = data.minutes ? data.minutes : '00';
      }

    if(data.seconds < 10)
      {
         this.showsec ='0' + data.seconds ? '0' + data.seconds : '00';
      }
    else
      {
         this.showsec = data.seconds ? data.seconds : '00';
      }
    this.showtimer = `${this.showhrs}:${this.showmin}:${this.showsec}`;
    this.AddLeadForm.get('call_duration')?.setValue(this.showtimer);
    //this.pauseTime = this.AddLeadForm.value.call_duration;
    
      //console.log(this.AddLeadForm.value.call_duration);
   
      
  }

  doActionBasicTimer(action: String) {
    //this.classStyle = "cursor";
   // this.inputValue = "none";
   // this.readonly = true;
    

   // this.startTimer = false;
   // this.manually = true;
  
    this.callDuration="none"
    switch (action) {
      case 'start':
        this.basicTimer.start();
        this.stopbtn = true
        this.startbtn = false
        this.resumebtn= true;
        this.pausebtn= false;

        console.log("start");
        break;
      case 'reset':
        this.basicTimer.reset();
        this.startbtn = true
        this.stopbtn = false
        this.pausebtn= false;
        this.resumebtn= false;
        console.log("reset");
        break;
       case 'pause':
          this.basicTimer.stop();
          this.startbtn = false
          this.stopbtn = false
          this.resumebtn= false;
          this.pausebtn= true;
          console.log("pause");
          break;
        case 'resume':
          this.basicTimer.resume();
          this.stopbtn = true
        this.startbtn = false
        this.resumebtn= true;
        this.pausebtn= false;
          console.log("resume");
          break;
      default:
        
        this.basicTimer.stop();
        this.startbtn = true
        this.stopbtn = false
        this.resumebtn= false;
        this.pausebtn= false;
        console.log("stop");
        break;
    }
  }

  manuallyTime(e: any)
  {
    this.manually = false;
    this.editTimer = true;
    
    if ( this.manually == false) 
    {
      this.doActionBasicTimer('stop');
      this.autoTimer = "none";
      this.callManually = "flex";
    }
    else 
    {
      console.log("auto");
      this.doActionBasicTimer('start');
      this.autoTimer = "block";
      this.callManually = "none";
    
    }
    //this.startTimer = false;
  }

Others(e: any){
   
 if (e.value == "Others") {

    this.Callothers = "block"
    console.log("hi");
    
  }
  else {
    this.Callothers = "none"
    console.log("block");
  }
}

  TimerStart(e: any)
  {
    this.manually == true;
    this.editTimer = false;
    this.autoTimer = "block";
    this.callManually = "none";
    this.doActionBasicTimer('start');
  }

  Contactibility(e: any) {
    const MOIcontrol = this.AddLeadForm.get('mode_of_interest');
    const categoryControl = this.AddLeadForm.get('category');
    const followUpDateControl = this.AddLeadForm.get('follow_up_date');
    const expectedVDate = this.AddLeadForm.get('expected_visit_date');
    if (e.value == "Conversation") {
      this.colSize = 3;
      this.row2Col = 3;
      this.calldClass = "block"
      this.mode_of_intrestClass = "block"
      this.actionBtn='flex'
      this.doActionBasicTimer('start')
      MOIcontrol?.setValidators([Validators.required]);
      //this.Callduration_PH="";
      this.AddLeadForm.get('mode_of_interest')?.valueChanges.subscribe((res)=>{
        if(res == 'Interested'){
          categoryControl?.setValidators([Validators.required])
          this.AddLeadForm.get('status')?.valueChanges.subscribe((res)=>{
            if(res == 'Visit'){
              expectedVDate?.setValidators([Validators.required]);
              followUpDateControl?.clearValidators();
            }
            else{
              followUpDateControl?.setValidators([Validators.required]);
              expectedVDate?.clearValidators();
            }
            followUpDateControl?.updateValueAndValidity();
            expectedVDate?.updateValueAndValidity();
          })
          if(this.AddLeadForm.get('status')?.value == 'Visit'){
            expectedVDate?.setValidators([Validators.required]);
            followUpDateControl?.clearValidators();
          }
          else{
             followUpDateControl?.setValidators([Validators.required]);
             expectedVDate?.clearValidators();
          }
          followUpDateControl?.updateValueAndValidity();
          expectedVDate?.updateValueAndValidity();
        }
        else{
          categoryControl?.clearValidators();
        }
        categoryControl?.updateValueAndValidity();
       
      })

    }
    else if (e.value == "Not Matched") {
      this.colSize = 3;
      this.row2Col = 4;
      this.calldClass = "block"
      this.mode_of_intrestClass = "none"
      this.doActionBasicTimer('start')
      this.actionBtn='flex'
      MOIcontrol?.clearValidators();
    }
    else {
      this.colSize = 4;
      this.row2Col = 4;
      this.calldClass = "none"
      this.mode_of_intrestClass = "none"
      this.actionBtn='none'
      MOIcontrol?.clearValidators();
      // this.Callduration_PH=""
    }
    MOIcontrol?.updateValueAndValidity();
  }

  ModeOfI(e: any) {
    if (e.value == "Interested") {

      this.M_O_I = "block"
    }
    else {
      this.M_O_I = "none"
    }
  }
  showMsg() {
    if (this.disableAreaOfIntrest == true) {
      $("#areaOfIntrestErr").fadeIn(); 
    }
    
  }

  GetProject(e: any) {
    this.new1p=[];
    // $("#areaOfIntrestErr").fadeOut();
    this.disableAreaOfIntrest=false;
    this.mainService.getProject(e.value).subscribe((result) => {
      this.oneprojects = result
      this.oneproject = this.oneprojects.project
      this.projectName = this.oneproject.name
      this.projectPropertyType = this.oneproject.PropertyTypes
      $('.Projectbtn').html(this.projectName);
      $(".Projectbtn").prop("value", e.value);
        this.projectPropertyType.forEach((data:any) => {
          this.new1p.push({
            id:data.id,
            name:data.name
          })         
        }); 
        this.new1p.length==0?$("#emptyErr").fadeIn(): $("#emptyErr").fadeOut()
    })
  }

  OpenProject(e: any) {
    this.pId = e.target.value
    const dialogRef = this.dialog.open(ProjectDescComponent, {
      data: { id: this.pId }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
