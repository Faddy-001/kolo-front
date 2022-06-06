import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { CdTimerComponent, TimeInterface } from 'angular-cd-timer';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EditnameFieldComponent } from './editname-field/editname-field.component';
import { ProjectDescComponent } from '../project-desc/project-desc.component';
import {PrebookingComponent} from '../edit-lead/prebooking/prebooking.component';
import { ViewPreBookingsComponent } from './view-pre-bookings/view-pre-bookings.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { AddProfessionComponent } from 'src/app/profession/add-profession/add-profession.component';
const moment = _moment


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
declare var $: any;

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }

  ]

})


export class EditLeadComponent implements OnInit {

  EditLeadForm:FormGroup;
  name: string = '';
  @ViewChild('basicTimer', { static: true })
  basicTimer!: CdTimerComponent;
  startTimer: boolean = false
  timerInfo = '';
  stopbtn: boolean = false;
  startbtn: boolean = false;
  colSize: number = 4;
  followUpCol:number=4;
  row2Col: number = 4;
  mode_of_intrestClass: string = 'block';
  Catagory: string = 'block';
  Expected_Visit_Date: string = 'block';
  Follow_Up_Date: string = 'block';
  Call_Duration: string = 'flex';
  col6size: number = 6;
  remarkmdsize:number=6;
  Status: string = 'block';
  col7size: number = 6;
  projectData:any;
  projects:any;
  userData:any;
  users:any;
  CreUser:any=[];
  salesManager:any=[];
  allProfession:any;
  professions:any;
  id = this.activatedRoute.snapshot.params['id'];
  leadsData:any;
  leadData:any;
  fName: string = '';
  mName: string = '';
  lName: string = '';
  nameString: any;
  dialogValue!: string;
  callDuration:any='block'
 showhrs: any;
  showmin: any;
  showsec: any;
  showtimer: any;
  oneprojects:any=[];
  oneproject:any=[];
  projectName:any=[];
  projectPropertyType:any=[];
  new1p:any=[];
  pId:any;
  resumebtn: boolean = false;
  Statuss: string = 'flex';
  showBtn:string='none';
  disableAreaOfIntrest:boolean=true;
  newAreaofIntrest:any=[]
  showprebooking:boolean=true;
  callingTime:any;
  isProceedtoBook:boolean=false;
  isDisabled:boolean=true;
  filterById:any=[];
  getPermission:any;
  logindata:any;
  userId:any;
  features:any;
  leadFeature:any;
  propertyType:any;
  propertyTypeArr:any=[];
  date:any=null;
  userProjects: any;
  userProjectId: any;
  minFollowupDate: any;
  minExpectedVisitDate: any;
  errorShow: any;
  errorMsg: string | undefined;
  pausebtn: boolean = false;
  autoTimer: any = 'block';
  callManually: any = 'none';
  manually: boolean = true;
  editTimer:boolean = false;
  Callothers: string = 'none';

  constructor(private formbuilder: FormBuilder, public dialog: MatDialog, private mainService: MainService,
    private route: Router,  private activatedRoute: ActivatedRoute, private toastr: ToastrService) {       
      
    this.EditLeadForm = this.formbuilder.group({
      project_id: [null, Validators.required],
      cre_user_id: [null, Validators.required],
      sales_exec_user_id: [null, Validators.required],
      call_duration: [],
      phone: [null,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      alternate_contact_no: [null,[ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      first_name: [null, Validators.required],
      middle_name: [''],
      last_name: [''],
      contactability: [''],
      mode_of_interest: [''],
      profession_id: [],
      current_location: [''],
      living_mode: [''],
      area_of_interest: [''],
      buying_purpose: [''],
      required_plot_size: [''],
      budget: [''],
      category: [''],
      status: [''],
      follow_up_date: [''],
      expected_visit_date: [''],
      lead_source: [''],
      video_sent: [''],
      remark: [null, Validators.required]
    })
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

    contactibilityControlChanged(){
      const MOIcontrol = this.EditLeadForm.get('mode_of_interest');
      const categoryControl = this.EditLeadForm.get('category');
      const follow_up_dateControl = this.EditLeadForm.get('follow_up_date');
      const expectedVDateControl = this.EditLeadForm.get('expected_visit_date');

      this.EditLeadForm.get('contactability')?.valueChanges.subscribe((res)=>{
        if(res == 'Conversation'){
          MOIcontrol?.setValidators([Validators.required])
            
          this.EditLeadForm.get('mode_of_interest')?.valueChanges.subscribe((res)=>{
            if(res == 'Interested'){
              categoryControl?.setValidators([Validators.required])
              this.EditLeadForm.get('status')?.valueChanges.subscribe((res)=>{
                if(res == 'Visit'){
                  follow_up_dateControl?.clearValidators();
                  expectedVDateControl?.setValidators([Validators.required])
                }
                else{
                  follow_up_dateControl?.setValidators([Validators.required])
                  expectedVDateControl?.clearValidators();
                }
                follow_up_dateControl?.updateValueAndValidity();
                expectedVDateControl?.updateValueAndValidity();
              })
            }
            else{
              categoryControl?.clearValidators();
            }
            categoryControl?.updateValueAndValidity();
          })
        }
        else if(res == 'Not Connected'){
          MOIcontrol?.clearValidators();
          categoryControl?.clearValidators();

          this.EditLeadForm.get('status')?.valueChanges.subscribe((mode)=>{
            if(mode == 'Visit'){
              follow_up_dateControl?.clearValidators();
              expectedVDateControl?.setValidators([Validators.required])
            }
            else{
              follow_up_dateControl?.setValidators([Validators.required])
              expectedVDateControl?.clearValidators();
            }
            follow_up_dateControl?.updateValueAndValidity();
            expectedVDateControl?.updateValueAndValidity();
          })
        }
        else{          
          MOIcontrol?.clearValidators();
          categoryControl?.clearValidators();
          follow_up_dateControl?.clearValidators();
          expectedVDateControl?.clearValidators();
        }
        MOIcontrol?.updateValueAndValidity();
        categoryControl?.updateValueAndValidity();
        follow_up_dateControl?.clearValidators();
        expectedVDateControl?.clearValidators();        
      })
    }

 

  
  step: any;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  color = 'accent';
  checked = false;
  disabled = false;
  sub:any;
  ngOnInit(): void {
          
          // get feature
          this.getPermission = localStorage.getItem('user_info')
          this.logindata = JSON.parse(this.getPermission)
          this.userId = this.logindata.id;
          
          this.mainService.getUser(this.userId).subscribe((res:any)=>{
            this.userData = res;
            this.features = this.userData.user.Role.Feature_Access_Permissions;
            this.leadFeature = this.features.filter((data:any)=>{
              return data.Feature.name == 'Leads';
            })
          })
      this.getUncalleds();
      this.Projects();
      this.Users();
      this.getProfession();
   
      this.mainService.getLead(this.id).subscribe((result)=>{
        this.leadsData=result
        this.leadData=this.leadsData.lead
              
        //get Today's Date 
        this.date = moment(new Date(), "DD//MM/YYYY");
        if (this.leadData.follow_up_date) {
          if (moment(this.leadData.follow_up_date, "DD/MM/YYYY") > this.date) {
            this.minFollowupDate = this.date;
          } else {
            this.minFollowupDate = moment(this.leadData.follow_up_date, "DD/MM/YYYY");  
          }          
        } else {
          this.minFollowupDate = this.date;
          //this.leadData.follow_up_date = null;
        }
        if (this.leadData.expected_visit_date) {
          if (moment(this.leadData.expected_visit_date, "DD/MM/YYYY") > this.date) {
            this.minExpectedVisitDate = this.date;
          } else {
            this.minExpectedVisitDate = moment(this.leadData.expected_visit_date, "DD/MM/YYYY");
          }          
        } else {
          this.minExpectedVisitDate = this.date;
          //this.leadData.expected_visit_date = null;
        }

        this.pId=this.leadData.Project?this.leadData.Project.id:null
        this.projectName = this.leadData.Project?this.leadData.Project.name:null;
        $('.Projectbtn').html(this.projectName);
        $(".Projectbtn").prop("value", this.pId);
        if(this.leadData.status == 'Visit'){
          this.isProceedtoBook = true;
        }
        else{
          this.isProceedtoBook = false;
        }
        // if(this.leadData.Pre_Bookings!=''){
      if(this.leadData.Pre_Bookings){
         this.showprebooking=false
         this.new1p=[];
         this.mainService.getProject(this.pId).subscribe((res) => {                              
           this.oneprojects = res
           this.oneproject = this.oneprojects.project
           this.projectName = this.oneproject.name
           this.projectPropertyType = this.oneproject.PropertyTypes
           $('.Projectbtn').html(this.projectName);
           $(".Projectbtn").prop("value", this.pId);
           this.new1p=[];
             this.projectPropertyType.forEach((data:any) => {
               this.new1p.push({
                 id:data.id,
                 name:data.name
               })         
             });
             this.new1p.length==0?$("#emptyErr").fadeIn(): $("#emptyErr").fadeOut()
         })
        }
         if(this.pId!=null){
          this.disableAreaOfIntrest=false
         }
     
         this.newAreaofIntrest=[];
        if(this.leadData?this.leadData.area_of_interest:null){
          for(var i of this.leadData.area_of_interest){
          this.newAreaofIntrest.push(i?i.id:null)  
        } 
        }
        
        this.EditLeadForm = this.formbuilder.group({
          project_id: [ this.leadData.Project?this.leadData.Project.id:null, Validators.required],
          cre_user_id: [this.leadData.cre_user_id, Validators.required],
          sales_exec_user_id: [this.leadData.sales_exec_user_id, Validators.required],
          call_duration: [this.leadData.call_duration],
          phone: [this.leadData.phone,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          alternate_contact_no: [this.leadData.alternate_contact_no,[ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          first_name: [this.leadData.first_name, Validators.required],
          middle_name: [this.leadData.middle_name],
          last_name: [this.leadData.last_name],
          contactability: [this.leadData.contactability, Validators.required],
          mode_of_interest: [this.leadData.mode_of_interest, Validators.required],
          profession_id: [this.leadData.profession_id],
          current_location: [this.leadData.current_location],
          living_mode: [this.leadData.living_mode],
          area_of_interest: [this.newAreaofIntrest],
          buying_purpose: [this.leadData.buying_purpose],
          required_plot_size: [this.leadData.required_plot_size],
          budget: [this.leadData.budget],
          category: [this.leadData.category, Validators.required],
          status: [this.leadData.status==""?'Lead':this.leadData.status, Validators.required],
          follow_up_date: [this.leadData.follow_up_date ? moment(this.leadData.follow_up_date, "DD/MM/YYYY") : ''],
          expected_visit_date: [this.leadData.expected_visit_date ? moment(this.leadData.expected_visit_date, "DD/MM/YYYY") : ''],
          lead_source: [this.leadData.lead_source],
          video_sent: [this.leadData.video_sent],
          remark: [null, Validators.required]
    
        })
        if(this.leadData.lead_source == "Others")
        {
          this.Callothers = "block";
        }
        this.contactibilityControlChanged();
  
        const categoryControl = this.EditLeadForm.get('category'); 
        const follow_up_dateControl = this.EditLeadForm.get('follow_up_date');
        const expectedVDateControl = this.EditLeadForm.get('expected_visit_date');
  
        if(this.leadData.contactability == 'Conversation'){
          this.EditLeadForm.get('mode_of_interest')?.valueChanges.subscribe((res)=>{
            if(res == 'Interested'){
              categoryControl?.setValidators([Validators.required])
            }
            else{
              categoryControl?.clearValidators();
            }
            categoryControl?.updateValueAndValidity();
            
          })
          
          if(this.leadData.mode_of_interest == 'Not Interested'){
            categoryControl?.clearValidators();
            this.Catagory='none';
            this.Status='none';
            this.Follow_Up_Date='none';
            this.Expected_Visit_Date = 'none';
            this.col6size=12
          }
          else{
            this.EditLeadForm.get('status')?.valueChanges.subscribe((res)=>{
              if(res == 'Visit'){
                expectedVDateControl?.setValidators([Validators.required])
                follow_up_dateControl?.clearValidators();
              }
              else{
                 follow_up_dateControl?.setValidators([Validators.required])
                expectedVDateControl?.clearValidators();
              }
               follow_up_dateControl?.updateValueAndValidity();
               expectedVDateControl?.updateValueAndValidity();
            
            })
            categoryControl?.setValidators([Validators.required]);
                this.Call_Duration='flex';
                this.mode_of_intrestClass='block';
                this.Status='block';
                this.Catagory='block';
          if(this.EditLeadForm.get('status')?.value=='Visit'){
            this.Follow_Up_Date='none';
            this.Expected_Visit_Date='block';
            this.col6size=12
            this.col7size=4
            follow_up_dateControl?.clearValidators();
            expectedVDateControl?.setValidators([Validators.required])
          }
          else{
            this.Follow_Up_Date='block';
            this.Expected_Visit_Date='none'
            this.col6size=12
            follow_up_dateControl?.setValidators([Validators.required]);
            expectedVDateControl?.clearValidators();
          } 
          }
          categoryControl?.updateValueAndValidity();
          follow_up_dateControl?.updateValueAndValidity();
          expectedVDateControl?.updateValueAndValidity();
    
        }
        else if(this.leadData.contactability == 'Not Connected'){
          this.EditLeadForm.get('status')?.valueChanges.subscribe((res)=>{
            if(res == 'Visit'){
              follow_up_dateControl?.clearValidators();
              expectedVDateControl?.setValidators([Validators.required])
            }
            else{
              follow_up_dateControl?.setValidators([Validators.required])
              expectedVDateControl?.clearValidators();
            }
            follow_up_dateControl?.updateValueAndValidity();
          expectedVDateControl?.updateValueAndValidity();
          })
          this.Call_Duration='none';
          this.Catagory='none';
          this.mode_of_intrestClass='none';
          this.Status='block';
          if(this.EditLeadForm.get('status')?.value=='Visit'){
            this.Expected_Visit_Date='block';
            this.Follow_Up_Date='none';
            this.col6size=12
            this.col7size=4
            follow_up_dateControl?.clearValidators();
            expectedVDateControl?.setValidators([Validators.required]);
          }
          else{
            this.Follow_Up_Date='block';
            this.Expected_Visit_Date='none';
            this.col6size=12
            follow_up_dateControl?.setValidators([Validators.required]);
            expectedVDateControl?.clearValidators();
          }
        }
        else if(this.leadData.contactability == 'Not Matched'){
          this.Call_Duration='flex';
          this.Status='none';
          this.Follow_Up_Date='none';
          this.Expected_Visit_Date='none';
          this.Catagory='none';
          this.mode_of_intrestClass='none';
          this.col6size=4;
        }
      
        //   if(this.leadData.mode_of_interest == 'Not Interested'){
        //     this.Catagory='none';
        //     this.Status='none';
        //     this.Follow_Up_Date='none';
        //    this.Expected_Visit_Date='none'
        //    this.col6size=12;
        //   }
        //   else if(this.leadData.status=='Lead' || this.leadData.status=='Call' || this.leadData.status=='Meet'){
        //     this.Follow_Up_Date='block';
        //   this.Expected_Visit_Date='none';
        //   this.col6size=12;
        
        // }
        // else if(this.leadData.status=='Visit'){        
        //   this.Expected_Visit_Date='block';
        //   this.Follow_Up_Date='none';
        //   this.col6size=12;
        //   this.col7size=4;
        // }
        // else{
        //   this.Expected_Visit_Date='none';
        //   this.Follow_Up_Date='none';
        // }
       
        // if(this.leadData.status == "Visit")
        //  {
        //      this.showBtn='flex';
        //  }
        this.fName=this.leadData.first_name;
        this.mName=this.leadData.middle_name;
        this.lName=this.leadData.last_name;
        this.callDuration=this.leadData.call_duration
      },
      (err)=>{
        console.log(err); 
      })


  }

  uncalledRes:any;
  uncalledData:any;
  getUncalleds(){

  }

  //get Today's Date
  
    getTodaysDate(e: any)
    {
        this.date =moment(e.value._d);
    }
  
  
  
  openEditNameField(){

    const dialogRef = this.dialog.open(EditnameFieldComponent, {
      data: {id:this.id,fname: this.fName,mname:this.mName,lname:this.lName}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.nameString = result;
      this.fName = this.nameString.fname;
      this.mName = this.nameString.mname;
      this.lName = this.nameString.lname;
      
      this.EditLeadForm.get('first_name')?.setValue(this.fName);
      this.EditLeadForm.get('middle_name')?.setValue(this.mName);
      this.EditLeadForm.get('last_name')?.setValue(this.lName);

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
      
      this.users.forEach((data: any) => {
        if (data.Role.name == 'Sales Executive') {
          this.salesManager.push({
            id: data.id,
            name: data.name
          })
        }
      })
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

  openDialog() {
    const dialogRef = this.dialog.open(ActivityLogComponent, {
      width: '800px',
      height:'800px',
      data: {id:this.id}
    });
    console.log(this.id);
    dialogRef.afterClosed().subscribe((result: any) => {
    });
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
  //  this.showmin = data.minutes ? data.minutes : '00';
  //  this.showsec = data.seconds ? data.seconds : '00';
    this.showtimer = `${this.showhrs}:${this.showmin}:${this.showsec}`;
    if(this.showtimer!='00:00:00'){
    this.EditLeadForm.get('call_duration')?.setValue(this.showtimer);
    }
  }
  doActionBasicTimer(action: String) {
    this.callDuration="none";
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
    if(e.value == 'Not Connected'){
      this.Call_Duration='none';
      this.Catagory='none';
      this.mode_of_intrestClass='none';
      this.Status='block';
      if(this.EditLeadForm.get('status')?.value=='Visit'){
        this.Expected_Visit_Date='block';
        this.Follow_Up_Date='none';
        this.col7size = 4
        this.col6size=12
      }
      else{
        this.Follow_Up_Date='block';
        this.Expected_Visit_Date='none';
        this.col6size=12
      }
    }
    else if(e.value=='Not Matched'){
      this.Call_Duration='flex';
      this.Status='none';
      this.Follow_Up_Date='none';
      this.Expected_Visit_Date='none';
      this.Catagory='none';
      this.mode_of_intrestClass='none';
      this.col6size=4;
      this.doActionBasicTimer('start')
    }
    else if(e.value == 'Conversation'){
      this.Call_Duration='flex';
      this.mode_of_intrestClass='block';
      this.Status='block';
      this.Catagory='block';
      if(this.EditLeadForm.get('status')?.value=='Visit'){
        this.Expected_Visit_Date='block';
        this.Follow_Up_Date='none';
        this.col6size=12
      }
      else{
        this.Follow_Up_Date='block';
        this.Expected_Visit_Date='none';
        this.col6size=12
      }
      this.doActionBasicTimer('start')
    }
  }

  MOI(e:any){
    if(e.value == 'Not Interested'){
      this.Catagory='none';
      this.Status='none';
      this.Follow_Up_Date='none';
      this.Expected_Visit_Date = 'none';
      this.col6size=12
    }
    else{
      const getStatus = this.EditLeadForm.get('status')?.value;
      if(getStatus == 'Visit'){
        this.Expected_Visit_Date = 'block'
      }
      else{
        this.Follow_Up_Date = 'block'
      }
      this.Catagory='block';
      this.Status='block';
      // this.Follow_Up_Date='block';
    }
  
  }

  showMsg() {
        if (this.disableAreaOfIntrest == true) {
          $("#areaOfIntrestErr").fadeIn();
        }
      }
    
  GetProject(e:any){
    $("#areaOfIntrestErr").fadeOut();
    this.disableAreaOfIntrest=false;
    if(e.value==""){
      $('.Projectbtn').html("");
      $(".Projectbtn").prop("value", e.value);
    }else{
      this.new1p=[];
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

  }

  OpenProject(e: any) {
    this.pId = e.target.value
    const dialogRef = this.dialog.open(ProjectDescComponent, {
      data: { id: this.pId }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  status(e: any) {
    if(e.value == 'Visit'){
      this.Follow_Up_Date='none';
      this.Expected_Visit_Date='block';
      this.col7size=4;
      this.showBtn='flex';
      this.isProceedtoBook = true;
    }
    else if(e.value=='Lead' || e.value=='Call' || e.value=='Meet'){
      this.Follow_Up_Date='block';
      this.Expected_Visit_Date='none';
      this.isProceedtoBook = false;
    }
    else{
      this.Follow_Up_Date='none';
      this.Expected_Visit_Date='none';
      this.col6size=4;
      this.isProceedtoBook = false;
    }
  }

  openPrebooking() {
    if (this.EditLeadForm.valid) {
      const dialogRef = this.dialog.open(PrebookingComponent, {
        width: '600px',height:'500px',
        data: {id:this.id}
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  lastIndex:any;
  leadvalue:any
  continueUpdate = ( () => {
    let counter = 0;
    const sp =   this.route.url.split('/');

     this.lastIndex = sp.pop();

    this.mainService.getUncalledLeads().subscribe((res)=>{
      this.uncalledRes = res;
      this.uncalledData = this.uncalledRes.leads;

      this.filterById =  this.uncalledData.map((data:any)=>{
        return data.id;
      })
      
    this.filterById.map((data:any,pos:any)=>{      
       if(data == this.lastIndex){
         counter = pos
       }
     }) 
     
    })
    return  () => {
      this.leadvalue = this.EditLeadForm.value;
      this.mainService.updateLead(this.filterById[counter], this.leadvalue).subscribe((result)=>{
        this.updatedLead = result;
       this.toastr.success(this.updatedLead.message)
    },
      (error)=>{
       console.log(error);  
       })
      counter += 1; 
      counter %= this.filterById.length
      
      if(this.id!=this.filterById[counter]){
        return this.route.navigateByUrl('layout/lead/lead/uncalled-leads/edit-lead'+'/'+this.filterById[counter])
            .then(() => {
              window.location.reload();
            });
      }
      else{
       return this.route.navigateByUrl('layout/lead/lead/uncalled-leads')
        
      }
    }
  })();

  followUpRes:any;
  TodayfollowUpData:any;
  filterLeadById:any;
  continueTodayFollowUpUpdate = ( () => {
   
    let counter = 0;
    const sp =   this.route.url.split('/');
    this.lastIndex = sp.pop();
    this.mainService.getTodaysFollwUpLeads().subscribe((res)=>{
      this.followUpRes = res;
      this.TodayfollowUpData = this.followUpRes.leads;
      this.filterLeadById =  this.TodayfollowUpData.map((data:any)=>{
        return data.id;
      })
      
    this.filterLeadById.map((data:any,pos:any)=>{      
       if(data == this.lastIndex){
         counter = pos
       }
     }) 
        
    })
    return  () => {
      this.leadvalue = this.EditLeadForm.value;
      this.mainService.updateLead(this.filterLeadById[counter], this.leadvalue).subscribe((result)=>{
        this.updatedLead = result;
       this.toastr.success(this.updatedLead.message)
    },
      (error)=>{
       console.log(error);  
       })
      counter += 1; 
      counter %= this.filterLeadById.length
      
      if(this.id != this.filterLeadById[counter]){
        // return this.route.navigate(['layout/lead/lead/todays-follow-up/edit-lead'+'/'+this.filterLeadById[counter]])
        //         .then(() => {
        //           window.location.reload();
        //         });
        return this.route.navigateByUrl('layout/lead/lead/todays-follow-up/edit-lead'+'/'+this.filterLeadById[counter])
        .then(() => {
          window.location.reload();
        });
      }
      else{
       return this.route.navigateByUrl('layout/lead/lead/todays-follow-up')
        
      }
    }
  })();

  updatedLead:any;
 submit(value:any){
     if (value.expected_visit_date._d == "Invalid Date") {
    delete value.expected_visit_date
   }
   if (value.follow_up_date._d == "Invalid Date") {
    delete value.follow_up_date        
   }
  if (this.EditLeadForm.valid) {
    const sp =   this.route.url.split('/');
    const NewArr = sp.filter((item,i) => i !== 0 && i !== sp.length-1)
    const matchedUrl = NewArr.join('/');

    if(matchedUrl == 'layout/lead/lead/uncalled-leads/edit-lead'){
      this.continueUpdate();
    } else if(matchedUrl == 'layout/lead/lead/todays-follow-up/edit-lead') {
      this.continueTodayFollowUpUpdate();
      //this.ngOnInit();
    } else {
      this.mainService.updateLead(this.id,value).subscribe((result)=>{
      this.updatedLead = result;
      this.toastr.success(this.updatedLead.message)
      this.route.navigateByUrl('/layout/lead/lead');
   },
    (error)=>{
      console.log(error);  
      this.errorShow=error;
      this.errorMsg=this.errorShow.error.error.phone;
      this.toastr.error(this.errorMsg);

    })
   }
  }
}

viewPreBookings(){
  const dialogRef = this.dialog.open(ViewPreBookingsComponent, {
    width: '400px',
    data: {prebooking:this.leadData.Pre_Bookings}
  });
  
}
}


