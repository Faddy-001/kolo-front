import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
// declare var $: any;
import {MatDialog} from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';
import { ActivityLogComponent } from 'src/app/lead/edit-lead/activity-log/activity-log.component';
import { EditLeadComponent } from './edit-lead/edit-lead.component';
import { MainService } from '../services/main.service';
import { ToastrService } from 'ngx-toastr';

 
@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class LeadComponent implements OnInit {
  showTest: string = '';
  knowWidth: any;
  dtOptions: any = {};
  checkedName = true;
  checkedPhone: boolean = true;
  checkedCont: boolean = true;
  checkedMOI: boolean = true;
  checkedStat: boolean = true;
  checkedCat: boolean = true;
  Leads: any;
  
  LeadDetail: any;
  newLeads: any = [];
  isClass: string = "";
  toShow: boolean = false;
  isHide: any = 'none';
  showExpBtn: any = 'none';
  howExpBtn: string = 'sfsf';
  shwFooter: boolean = false;
  shwHeader: boolean = true;
  noRecords: boolean = false;
  pageCounts: any;
  pageCount: any;
  page: any;
  leadid: any;
  showClose: boolean = false;
  showOpen: boolean = true;
  showbtn: boolean = false;
  hideBtn: string = '';
  Image_Icon: boolean = true;
  Show_ICon: boolean = false;
  viewData:string='ssdf';
  selectedindex:any
  selectedCre:any;
  selectedSE:any;
  // sContactibility:any;
  connected:any;
  not_match:any;
  not_connected:any;
  Intrested:any;
  NotIntrested:any;
  selectedHot:any;
  selectedWarm:any;
  selectedCold:any;
  selectedLead:any;
  selectedCall:any;
  selectedMeet:any;
  selectedVisit:any;
  selectedAoi:any;
  Personal:any;
  Investment:any;
  selectedFollowUp:any;
  startDate:any;
  endDate:any;
  selectedProject:any;
  showCrossicon:boolean = false;
  deactivateRes:any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  leadFeature:any;
  selectedFile:any=[];
  extension:any;  
  isAcceptableImg:boolean=false;
  isUpload:boolean=false;
  totalLeads: any;
  value: boolean = true;
  activePage: Number =1 ;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showLead:boolean=true;
  showPhn:boolean=true;
  showContact:boolean=true;
  showMOI:boolean=true;
  shwStatus:boolean=true;
  showCtgry:boolean=true;

  constructor(public dialog: MatDialog, public mainservice: MainService, private toastr: ToastrService) { }

  Deactivate(id:any){
   this.mainservice.deActivateLead(id).subscribe((res)=>{
     this.deactivateRes = res;
     
     
     this.toastr.success(this.deactivateRes.message);
    this.ngOnInit();
   })
  }

  exportLead(){
    this.mainservice.exportLead('active')
  }


  filesToUpload:any=[];
  getFiletoImport(e:any){
    this.selectedFile = e.target.files[0];
    var fileName = this.selectedFile.name;
    this.extension = fileName.split('.').pop();
    var reader = new FileReader();
    switch(this.extension){
      case 'xls': case 'xlsx': case 'xlsm': case 'xlsb':
        this.isAcceptableImg=false;
        this.isUpload=true;
          $('#batchFile').attr('src', '../../assets/files-extension-imgs/excel-file.png');
      break;

        case 'csv':
          this.isAcceptableImg=false;
          this.isUpload=true;
            $('#batchFile').attr('src', '../../assets/files-extension-imgs/other-file.jpg');
      break;

        default:
          this.isAcceptableImg=true;
          this.isUpload=false;
    }
    reader.readAsDataURL(this.selectedFile); // convert to base64 string 
  }

  uploadFile(){
    const formData = new FormData();
    formData.append('file',this.selectedFile);
    this.mainservice.importBatch(formData).subscribe((res)=>{
      console.log(res); 
    })
  }

  openDialog(Lid:number) {
    const dialogRef = this.dialog.open(ActivityLogComponent, {
      width: '800px',
      height:'800px',
      data: {id: Lid}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  showName(e: any) {
    if (e.checked == false) {
      $('.first_name').hide();
    }
    else {
      $('.first_name').show();
    }
  }
  showPhone(e: any) {
    if (e.checked == false) {
      $('.phone').hide();
    }
    else {
      $('.phone').show();
    }
  }
  
  showContactibility(e: any) {
    if (e.checked == false) {
      $('.contactability').hide();
    }
    else {
      $('.contactability').show();
    }
  }
  showModeofInt(e: any) {
    if (e.checked == false) {
      $('.mode_of_interest').hide();
    }
    else {
      $('.mode_of_interest').show();
    }
  }
  showStatus(e: any) {
    if (e.checked == false) {
      $('.status').hide();
    }
    else {
      $('.status').show();
    }
  }
  showCategory(e: any) {
    if (e.checked == false) {
      $('.category').hide();
    }
    else {
      $('.category').show();
    }
  }

  leadType:string='active';
  search_lead(e: any) {
    this.newLeads = [];
    let searchData = e.target.value;
    if (searchData == '') {
      this.noRecords = false;
      this.ngOnInit();
    }
    else {
      this.mainservice.searchResult(searchData,this.leadType).subscribe((result) => {
        this.Leads = result;
        this.LeadDetail = this.Leads.leads;
        if (this.LeadDetail == '') {
          this.noRecords = true;
        }
        else {
          this.noRecords = false;
          this.LeadDetail.forEach((data: any) => {
            this.newLeads.push({
              id: data.id,
              call_dateTime: data.call_datetime,
              callDuration: data.call_duration,
              alternate_contact_no:data.alternate_contact_no,
              projectName: data.Project.name,
              salesExecutive: data.Sales_Executive.name,
              areaOfIntrest: data.area_of_interest,
              Budget: data.budget,
              buyingPurpose: data.buying_purpose,
              Category: data.category,
              Contactability: data.contactability,
              currentLocation: data.current_location,
              expectedVdate: data.expected_visit_date,
              firstName: data.first_name,
              middleName: data.middle_name,
              lastName: data.last_name,
              followUpDate: data.follow_up_date,
              leadsource: data.lead_source,
              livingmode: data.living_mode,
              modeofInterest: data.mode_of_interest,
              Phone: data.phone,
              requiredPlotSize: data.required_plot_size,
              professionId: data.profession_id,
              Status: data.status,
              videoSent: data.video_sent,
            })
          })
        }
      })
    }
  }

  ngOnInit(): void {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    this.mainservice.getUser(this.userId).subscribe((res:any)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.leadFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Leads';
      })
    })

    this.pageCounts = [];
    this.newLeads = [];
    this.mainservice.getLeads().subscribe((result:any) => {
      
      this.Leads = result;
     
      
      this.pageCount = this.Leads.totalPages;
      this.page = this.Leads.page;
      this.totalLeads = this.Leads.count;
        
         

      for (let i = 1;i <= this.pageCount; i++) {
        this.pageCounts.push(i);
      };
      this.LeadDetail = this.Leads.leads
      
      
      
      this.LeadDetail.forEach((data: any) => {
        this.newLeads.push({
          id: data.id ? data.id : null,
          call_dateTime: data.call_datetime ? data.call_datetime : null,
          callDuration: data.call_duration ? data.call_duration : null,
          projectName: data.Project ? data.Project.name : null,
          alternate_contact_no:data.alternate_contact_no ? data.alternate_contact_no:null,
          salesExecutive: data.Sales_Executive ? data.Sales_Executive.name : null,
          areaOfIntrest: data.area_of_interest ? data.area_of_interest : null,
          Budget: data.budget ? data.budget : null,
          buyingPurpose: data.buying_purpose ? data.buying_purpose : null,
          Category: data.category ? data.category : null,
          Contactability: data.contactability ? data.contactability : null,
          currentLocation: data.current_location ? data.current_location : null,
          expectedVdate: data.expected_visit_date ? data.expected_visit_date : null,
          firstName: data.first_name ? data.first_name : null,
          middleName: data.middle_name ? data.middle_name : null,
          lastName: data.last_name ? data.last_name : null,
          followUpDate: data.follow_up_date ? data.follow_up_date : null,
          leadsource: data.lead_source ? data.lead_source : null,
          livingmode: data.living_mode ? data.living_mode : null,
          modeofInterest: data.mode_of_interest ? data.mode_of_interest : null,
          Phone: data.phone ? data.phone : null,
          requiredPlotSize: data.required_plot_size ? data.required_plot_size : null,
          professionId: data.profession_id ? data.profession_id : null,
          Status: data.status ? data.status : data.status,
          videoSent: data.video_sent ? data.video_sent : null,
          cre: data.CRE ? data.CRE.name : null
        })
      });
    }, err => {
        console.log(err);
    })

    this.knowWidth = $(window).width();
    if (this.knowWidth > 1024) {
      this.shwFooter = false;
      this.shwHeader = true;
    }
    else {
      this.shwHeader = false;
      this.shwFooter = true;
    }
    if (this.knowWidth < 1025) {
      this.Image_Icon = false;
      this.Show_ICon = true;
    }
    else {
      this.Image_Icon = true;
      this.Show_ICon = false;
    }
    if (window.innerWidth <= 1024) {
      this.showCrossicon = true
    }
  }
/*------sorting-------*/
  sortName(asc:boolean)
  {
    
    if(asc)
    {
      this.showLead = false;
    }
    else
    {
      this.showLead = true;
    }
    this.newLeads.sort(function (a:any, b:any) 
    {
      
      //return a.name.localeCompare(b.name.rendered);
      if(asc)
      {
        return (a.firstName.toLocaleLowerCase() > b.firstName.toLocaleLowerCase()) ? 1 : -1;
      }
      else
      {
        return (a.firstName.toLocaleLowerCase() > b.firstName.toLocaleLowerCase()) ? -1 : 1;
      }
    });
  }

  sortPhone(asc:boolean)
{
  
  if(asc)
  {
    this.showPhn = false;
  }
  else
  {
    this.showPhn = true;
  }
  this.newLeads.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      return (a.Phone > b.Phone) ? 1 : -1;
    }
    else
    {
      return (a.Phone > b.Phone) ? -1 : 1;
    }
  });
}

sortContact(asc:boolean)
{
  
  if(asc)
  {
    this.showContact = false;
  }
  else
  {
    this.showContact = true;
  }
  this.newLeads.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      return (a.Contactability > b.Contactability) ? 1 : -1;
    }
    else
    {
      return (a.Contactability > b.Contactability) ? -1 : 1;
    }
  });
}

sortMOI(asc:boolean)
{
  
  if(asc)
  {
    this.showMOI = false;
  }
  else
  {
    this.showMOI = true;
  }
  this.newLeads.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      if(a.modeofInterest === null)
      {
          return Infinity;
      }
     else
     {
        return (a.modeofInterest > b.modeofInterest) ? 1 : -1;
     }
    }
    else
    {
      if(a.modeofInterest === null)
      {
          return 0;
      }
     else
     {
        return (a.modeofInterest > b.modeofInterest) ? -1 : 1;
     }
    }
  });
}

sortStatus(asc:boolean)
{
  
  if(asc)
  {
    this.shwStatus = false;
  }
  else
  {
    this.shwStatus = true;
  }
  this.newLeads.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      return (a.Status.toLocaleLowerCase() > b.Status.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.Status.toLocaleLowerCase() > b.Status.toLocaleLowerCase()) ? -1 : 1;
    }
  });
}

sortCategory(asc:boolean)
{
  
  if(asc)
  {
    this.showCtgry = false;
  }
  else
  {
    this.showCtgry = true;
  }
  this.newLeads.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      if(a.Category === null)
      {
          return Infinity;
      }
     else
     {
        return (a.Category > b.Category) ? 1 : -1;
     }
    }
    else
    {
      if(a.Category === null)
      {
          return 0;
      }
     else
     {
        return (a.Category > b.Category) ? -1 : 1;
     }
    }
  });
}



  getNextData(pageNo: number) {
    this.pageCounts = [];
    this.newLeads = [];
    this.mainservice.getPagination(pageNo).subscribe((result) => {
     console.log(result);
      
      this.Leads = result;
      this.pageCount = this.Leads.totalPages;
      
      
      this.page = this.Leads.page;
      console.log(this.Leads);
       for (let i = 1; i <= this.pageCount; i++) {
        this.pageCounts.push(i);
      }
      console.log(this.page);
      console.log(this.pageCount);
      console.log(this.pageCounts);
      
      
      
      this.LeadDetail = this.Leads.leads;
      this.LeadDetail.forEach((data: any) => {
        this.newLeads.push({
          id: data.id,
          call_dateTime: data.call_datetime? data.call_datetime:null,
          callDuration: data.call_duration?data.call_duration:null,
          alternate_contact_no:data.alternate_contact_no ? data.alternate_contact_no:null,
          projectName: data.Project?data.Project.name:null,
          salesExecutive: data.Sales_Executive?data.Sales_Executive.name:null,
          areaOfIntrest: data.area_of_interest?data.area_of_interest:null,
          Budget: data.budget?data.budget:null,
          buyingPurpose: data.buying_purpose?data.buying_purpose:null,
          Category: data.category? data.category:null,
          Contactability: data.contactability?data.contactability:null,
          currentLocation: data.current_location?data.current_location:null,
          expectedVdate: data.expected_visit_date?data.expected_visit_date:null,
          firstName: data.first_name?data.first_name:null,
          middleName: data.middle_name?data.middle_name:null,
          lastName: data.last_name?data.last_name:null,
          followUpDate: data.follow_up_date?data.follow_up_date:null,
          leadsource: data.lead_source?data.lead_source:null,
          livingmode: data.living_mode?data.living_mode:null,
          modeofInterest: data.mode_of_interest?data.mode_of_interest:null,
          Phone: data.phone?data.phone:null,
          requiredPlotSize: data.required_plot_size?data.required_plot_size:null,
          professionId: data.profession_id?data.profession_id:null,
          Status: data.status?data.status:null,
          videoSent: data.video_sent?data.video_sent:null,
        })
      })
    })
  }

  getNextData1(e: any) {
  
  //  console.log(e.target.value);
  this.activePage=e.target.value;
    
    this.pageCounts = [];
    this.newLeads = [];
    this.mainservice.getPagination(e.target.value).subscribe((result) => {
     console.log(result);
     this.Leads = result;
     
     
    if(e.target.value > 0 && e.target.value <= this.Leads.totalPages ) 
    { 
      this.value = true;
      this.pageCount = this.Leads.totalPages;
      this.page = this.Leads.page;
      //console.log(this.Leads);
       for (let i = 1; i <= this.pageCount; i++)
      {
        this.pageCounts.push(i);
      }
      console.log(this.page);
      console.log(this.pageCount);
      console.log(this.pageCounts);
      this.LeadDetail = this.Leads.leads;
      this.LeadDetail.forEach((data: any) => {
      this.newLeads.push({
          id: data.id,
          call_dateTime: data.call_datetime? data.call_datetime:null,
          callDuration: data.call_duration?data.call_duration:null,
          alternate_contact_no:data.alternate_contact_no ? data.alternate_contact_no:null,
          projectName: data.Project?data.Project.name:null,
          salesExecutive: data.Sales_Executive?data.Sales_Executive.name:null,
          areaOfIntrest: data.area_of_interest?data.area_of_interest:null,
          Budget: data.budget?data.budget:null,
          buyingPurpose: data.buying_purpose?data.buying_purpose:null,
          Category: data.category? data.category:null,
          Contactability: data.contactability?data.contactability:null,
          currentLocation: data.current_location?data.current_location:null,
          expectedVdate: data.expected_visit_date?data.expected_visit_date:null,
          firstName: data.first_name?data.first_name:null,
          middleName: data.middle_name?data.middle_name:null,
          lastName: data.last_name?data.last_name:null,
          followUpDate: data.follow_up_date?data.follow_up_date:null,
          leadsource: data.lead_source?data.lead_source:null,
          livingmode: data.living_mode?data.living_mode:null,
          modeofInterest: data.mode_of_interest?data.mode_of_interest:null,
          Phone: data.phone?data.phone:null,
          requiredPlotSize: data.required_plot_size?data.required_plot_size:null,
          professionId: data.profession_id?data.profession_id:null,
          Status: data.status?data.status:null,
          videoSent: data.video_sent?data.video_sent:null,
        })
      })
    }
    else
    {
      this.value = false;
      
    }
    })
  }

  expandRow(leadId: any) {
    this.leadid = leadId;
    if (this.isHide = 'none') 
    {
      this.isHide = 'table-row';
      this.hideBtn = 'block';
      this.showbtn = false;
      
    }
   
  }
  collapse(leadId: any) {
    if (this.isHide = 'table-row') 
    {
      this.isHide = 'none';
      this.hideBtn = 'none';
      this.showbtn = true;
    }
  }

  visitDate:any;

  openFilter() {
    const dialogRef = this.dialog.open(FilterComponent, {
      height:'800px',
      data: {active:'active',project:this.selectedProject,date:this.visitDate,index:this.selectedindex,cre:this.selectedCre, salesExecutive:this.selectedSE,
         connec:this.connected,notMatch:this.not_match, notConnected:this.not_connected,intrested:this.Intrested,
         notintrested:this.NotIntrested,Hot:this.selectedHot,Warm:this.selectedWarm,Cold:this.selectedCold,Lead:this.selectedLead,
        Call:this.selectedCall,Meet:this.selectedMeet,Visit:this.selectedVisit,Aoi:this.selectedAoi,Personal:this.Personal,
      Investment:this.Investment,followUpdate:this.selectedFollowUp,startDate:this.startDate,endDate:this.endDate}
    });



    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.pageCounts = [];
        this.page=[];
        this.pageCount=[];
           this.pageCount=data.result.totalPages;
           this.page=data.result.page;
           console.log(this.page);
        for (let i = 1;i <= this.pageCount; i++) {
            this.pageCounts.push(i);
           };
        this.selectedProject = data.projectData;
        this.visitDate=data.expectedVDate;
        this.selectedindex=data.selectedIndex;
        this.selectedCre=data.credata;
        this.selectedSE=data.salesExc;
        this.connected=data.contacted,
        this.not_match=data.not_match,
        this.not_connected=data.not_connected,
        this.Intrested=data.intrested,
        this.NotIntrested=data.notIntrested,
        this.selectedHot=data.Hot,
        this.selectedWarm=data.Warm,
        this.selectedCold=data.Cold,
        this.selectedLead=data.Lead,
        this.selectedCall=data.Call,
        this.selectedMeet=data.Meet,
        this.selectedVisit=data.Visit,
        this.selectedAoi=data.aoi,
        this.Personal=data.personal,
        this.Investment=data.investment,
        this.selectedFollowUp=data.followUpdate,
        this.startDate=data.startdate,
        this.endDate=data.enddate,
        this.noRecords=false;
        this.Leads = data.result;
        this.LeadDetail = this.Leads.leads?this.Leads.leads:null;
        if(this.LeadDetail==''){
         this.noRecords=true;
        }
        this.newLeads = [];
        this.LeadDetail.forEach((data: any) => {
          this.newLeads.push({
            id: data.id?data.id:null,
            call_dateTime: data.call_datetime?data.call_datetime:null,
            callDuration: data.call_duration?data.call_duration:null,
            projectName: data.Project ?data.Project.name:null,
           alternate_contact_no:data.alternate_contact_no ?data.alternate_contact_no:null,
            salesExecutive: data.Sales_Executive ?data.Sales_Executive.name:null,
            areaOfIntrest: data.area_of_interest?data.area_of_interest:null,
            Budget: data.budget?data.budget:null,
            buyingPurpose: data.buying_purpose?data.buying_purpose:null,
            Category: data.category?data.category:null,
            Contactability: data.contactability?data.contactability:null,
            currentLocation: data.current_location?data.current_location:null,
            expectedVdate: data.expected_visit_date?data.expected_visit_date:null,
            firstName: data.first_name?data.first_name:null,
            middleName: data.middle_name?data.middle_name:null,
            lastName: data.last_name?data.last_name:null,
            followUpDate: data.follow_up_date?data.follow_up_date:null,
            leadsource: data.lead_source?data.lead_source:null,
            livingmode: data.living_mode?data.living_mode:null,
            modeofInterest: data.mode_of_interest?data.mode_of_interest:null,
            Phone: data.phone?data.phone:null,
            requiredPlotSize: data.required_plot_size?data.required_plot_size:null,
            professionId: data.profession_id?data.profession_id:null,
            Status: data.status?data.status:null,
            videoSent: data.video_sent?data.video_sent:null,
            cre:data.CRE?data.CRE.name:null
          })
        })
      }
    });
  }
}
