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

declare var $: any;




@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss'],

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
  errorMsg: any;
  errorShow: any;

  constructor(private formbuilder: FormBuilder, public dialog: MatDialog, private mainService: MainService,
    private route: Router,  private activatedRoute: ActivatedRoute, private toastr: ToastrService) { 
      
    this.EditLeadForm = this.formbuilder.group({
      project_id: [null, Validators.required],
      cre_user_id: [null, Validators.required],
      sales_exec_user_id: [null, Validators.required],
      call_duration: [],
      phone: [null,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
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
      remark: [null]

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

  ngOnInit(): void {
    this.Projects();
    this.Users();
    this.getProfession();
    console.log(this.id);

    this.mainService.getLead(this.id).subscribe((result)=>{
      console.log(result);
      this.leadsData=result
      this.leadData=this.leadsData.lead
      this.pId=this.leadData.Project.id   
      if(this.leadData.Pre_Bookings!=''){
       this.showprebooking=false
      }
       if(this.pId!=null){
        this.disableAreaOfIntrest=false
       }
      this.new1p=[];
      this.mainService.getProject(this.pId).subscribe((result) => {
        this.oneprojects = result
        this.oneproject = this.oneprojects.project
        this.projectName = this.oneproject.name
        this.projectPropertyType = this.oneproject.PropertyTypes
        $('.Projectbtn').html(this.projectName);
        $(".Projectbtn").prop("value", this.pId);
        console.log(this.projectPropertyType);
          this.projectPropertyType.forEach((data:any) => {
            this.new1p.push({
              id:data.id,
              name:data.name
            })         
          });
          this.new1p.length==0?$("#emptyErr").fadeIn(): $("#emptyErr").fadeOut()
          console.log(this.new1p);
           
      })
      
      console.log(this.leadData.first_name);
        
      // this.leadData.area_of_interest? this.leadData.area_of_interest = this.leadData.area_of_interest.split(",").map((x: string | number)=>+x):null;

      for(var i of this.leadData.area_of_interest){
        this.newAreaofIntrest.push(i.id)  
      } 
      
      this.EditLeadForm = this.formbuilder.group({
        project_id: [ this.leadData.project_id],
        cre_user_id: [this.leadData.cre_user_id],
        sales_exec_user_id: [this.leadData.sales_exec_user_id],
        call_duration: [''],
        phone: [this.leadData.phone,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        first_name: [this.leadData.first_name],
        middle_name: [this.leadData.middle_name],
        last_name: [this.leadData.last_name],
        contactability: [this.leadData.contactability],
        mode_of_interest: [this.leadData.mode_of_interest],
        profession_id: [this.leadData.profession_id],
        current_location: [this.leadData.current_location],
        living_mode: [this.leadData.living_mode],
        area_of_interest: [this.newAreaofIntrest],
        buying_purpose: [this.leadData.buying_purpose],
        required_plot_size: [this.leadData.required_plot_size],
        budget: [this.leadData.budget],
        category: [this.leadData.category],
        status: [this.leadData.status],
        follow_up_date: [this.leadData.follow_up_date],
        expected_visit_date: [this.leadData.expected_visit_date],
        lead_source: [this.leadData.lead_source],
        video_sent: [this.leadData.video_sent],
        remark: ['']
  
      })
     
    
        if(this.leadData.mode_of_interest == 'Not Interested'){
          this.Catagory='none';
          this.Status='none';
          this.Follow_Up_Date='none';
         this.Expected_Visit_Date='none'
         this.col6size=12;
        }
        else if(this.leadData.status=='Lead' || this.leadData.status=='Call' || this.leadData.status=='Meet'){
          this.Follow_Up_Date='block';
        this.Expected_Visit_Date='none';
        this.col6size=12;
      
      }
      else if(this.leadData.status=='Visit'){
        this.Expected_Visit_Date='block';
        this.Follow_Up_Date='none';
        this.col6size=12;
        this.col7size=4;
      }
      else{
        this.Expected_Visit_Date='none';
        this.Follow_Up_Date='none';
      }
     
      if(this.leadData.status == "Visit")
       {
           this.showBtn='flex';
       }
      this.fName=this.leadData.first_name;
      this.mName=this.leadData.middle_name;
      this.lName=this.leadData.last_name;
      this.callDuration=this.leadData.call_duration
    },
    (err)=>{
      console.log(err);
      })
  }
  
  
  openEditNameField(){

    const dialogRef = this.dialog.open(EditnameFieldComponent, {
      data: {id:this.id,fname: this.fName,mname:this.mName,lname:this.lName}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nameString = result;
      console.log(this.nameString);
      
      this.fName = this.nameString.fname;
      this.mName = this.nameString.mname;
      this.lName = this.nameString.lname;
      
      this.EditLeadForm.get('first_name')?.setValue(this.fName);
      this.EditLeadForm.get('middle_name')?.setValue(this.mName);
      this.EditLeadForm.get('last_name')?.setValue(this.lName);

    });
    
  }
  Projects() {
    this.mainService.getProjects().subscribe((result) => {
      this.projectData = result;
      this.projects = this.projectData.projects;
      console.log(this.projects);
      
    })
  }
  Users() {
    this.mainService.getUsers().subscribe((result) => {
     // console.log(result);
      this.userData = result;
      this.users = this.userData.user;
      this.users.forEach((data: any) => {
        if (data.Role.name == 'CRE') {
          this.CreUser.push({
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
     // console.log(this.CreUser);
    //  console.log(this.salesManager);

    })
  }

  getProfession() {
    this.mainService.getProfessions().subscribe(result => {
     // console.log(result);
      this.allProfession = result;
    //  console.log(this.allProfession);
      this.professions = this.allProfession.professions;
    //  console.log(this.professions);
    },
      err => {
        console.log(err);
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ActivityLogComponent, {

      width: '800px',

      data: {id:this.id}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
  
  onStop(data: any) {
    console.log(data);
    
    this.showhrs = data.hours ? data.hours : '00';
    this.showmin = data.minutes ? data.minutes : '00';
    this.showsec = data.seconds ? data.seconds : '00';
    this.showtimer = `${this.showhrs}:${this.showmin}:${this.showsec}`;
    console.log(this.showtimer);
    this.EditLeadForm.get('call_duration')?.setValue(this.showtimer);
  }
  doActionBasicTimer(action: String) {
    console.log(action);
    this.callDuration="none";
    switch (action) {
      case 'resume':
        this.basicTimer.resume();
        this.stopbtn = true
        this.startbtn = false
        this.resumebtn= true;

        break;
      case 'reset':
        this.basicTimer.reset();
        this.startbtn = true
        this.stopbtn = false
        this.resumebtn= false;
        break;
      default:
        this.basicTimer.stop();
        this.startbtn = true
        this.stopbtn = false
        this.resumebtn= false;
        break;
    }
  }

  

  Contactibility(e: any) {
    if(e.value == 'Not Connected'){
      this.Call_Duration='none';
      this.Catagory='none';
      this.mode_of_intrestClass='none';
      this.Status='block';
      if(this.EditLeadForm.get('status')?.value=='Lead'){
        this.Follow_Up_Date='block';
        this.Expected_Visit_Date='none';
        this.col6size=12
      }
    }
    else if(e.value=='Not Matched'){
      this.Call_Duration='flex';
      this.Status='none';
      this.Follow_Up_Date='none';
      this.Catagory='none';
      this.mode_of_intrestClass='none';
      this.col6size=4;
    }
    else{
      this.Call_Duration='flex';
      this.mode_of_intrestClass='block';
      this.Status='block';
      this.Catagory='block';
      if(this.EditLeadForm.get('status')?.value=='Lead'){
        this.Follow_Up_Date='block';
        this.Expected_Visit_Date='none';
        this.col6size=12
      }
    }
  }

  MOI(e:any){
    if(e.value == 'Not Interested'){
      this.Catagory='none';
      this.Status='none';
      this.Follow_Up_Date='none';
    }
    else{
      this.Catagory='block';
      this.Status='block';
      this.Follow_Up_Date='block';
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
        console.log(this.projectPropertyType);
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
    }
    else if(e.value=='Lead' || e.value=='Call' || e.value=='Meet'){
      this.Follow_Up_Date='block';
      this.Expected_Visit_Date='none';
    }
    else{
      this.Follow_Up_Date='none';
      this.Expected_Visit_Date='none';
      this.col6size=4;
    }
  }

  openPrebooking() {
    const dialogRef = this.dialog.open(PrebookingComponent, {
      width: '600px',height:'500px',
      data: {id:this.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   console.log('The dialog was closed');
    //   this.ngOnInit();
    // }  );
  }

 submit(value:any){
   console.log(value);
   this.mainService.updateLead(this.id,value).subscribe((result)=>{
   console.log(result); 
   this.route.navigateByUrl('/layout/lead/lead');
},
  (error)=>{
   console.log(error);  
  // this.errorShow = error;
  // this.errorMsg = this.errorShow.error.error.phone;
  // console.log(this.errorMsg);
  // this.toastr.error(this.errorMsg);
   })
}

viewPreBookings(){
  const dialogRef = this.dialog.open(ViewPreBookingsComponent, {
    width: '350px',
    data: {prebooking:this.leadData.Pre_Bookings}
  });
  
}
}


