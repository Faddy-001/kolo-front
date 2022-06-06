import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import * as _moment from 'moment';
const moment = _moment; 
import * as $ from 'jquery';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs/public-api';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterContact:any=[];
  filterMOI:any=[];
  checkedConv:boolean=false;
  checkedMatch:boolean=false;
  checkedConnected:boolean=false;
  checked:boolean=false;
  checkedInt:boolean=false;
  checkCRE:boolean=false;
  checkednotInt:boolean=false;
  notIntVal:string='';
  userData:any;
  users:any;
  creData:any=[];
  salesExcData:any=[];
  filterCRE:any=[];
  filterSales:any=[];
  filterCategory:any=[];
  filterLead:any=[];
  filterAOI:any=[];
  filterBuyPurpose:any=[];
  filterVisitDate:any=[];
  filterFollowDate:any=[];
  filterStartDate:any=[];
  filterEndDate:any=[];
  filterProject:any=[];
  propertyTypeData:any;
  propData:any;
  visitDate:any;
  roomsFilter:any;
  followDate:any;
  startDate:any;
  cre:any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  date:any;
  selectedTab:number=0
  checke:boolean=true;
  selectedSE:any=[];
  hot:boolean=false;
  warm:boolean=false;
  cold:boolean=false;
  lead:boolean=false;
  call:boolean=false;
  meet:boolean=false;
  visit:boolean=false;
  PropertyData:any=[];
  selectedAoi:any;
  selecteAoi:any=[];
  projectArr:any=[];
  personal:boolean=false;
  investment:boolean=false;
  FollowUpData:any;
  followUpdate:any;
  startdate:any=null;
  enddate:any=null;
  endDate:any;
  OfferSdate:any;
  OfferEdate:any;
  project:any;
  projectData:any;
  projects:any;
  logindata: any;
  getPermission:any;
  userId: any;


  constructor(public dialogRef: MatDialogRef<FilterComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, @Inject(MAT_DIALOG_DATA) public data2: any,public mainservice: MainService ) {
    
      }
     @ViewChildren("checkboxes")
     checkboxes!: QueryList<ElementRef>;
     leadsData:any;
     filteredData:any=[];
     vDate:any=null;
     selectedCRE:any=[];

  ngOnInit(): void {
  console.log(this.data.deactive);
  
    // this.getUsers();
    // this.getpropertyType();
    //users api data
   this.getProjects();
    
    this.mainservice.getUsers().subscribe((result)=>{
      console.log(result);
      this.userData = result;
      this.users = this.userData.user
      console.log(this.users);
      this.creData=[];
      this.salesExcData=[];
      this.users.forEach((data:any) => {
        if(data.Role.name=='CRE'){
           this.creData.push({
             id:data.id,
             name:data.name,
             isSelected:false
        })
        }

        if(data.Role.name=='Sales Executive'){
          this.salesExcData.push({
            id:data.id,
            name:data.name,
            isSelected:false
            })
        }    
      });
   //for filter Cre selected data
      this.selectedCRE=this.data.cre;
      console.log(this.selectedCRE);
      
     if( this.selectedCRE != undefined){
       for(let cre of this.selectedCRE){
        this.creData.filter((x:any)=>x.id==cre).map((x:any)=>x.isSelected=true)
          this.filterCRE.push(cre);
       }
     }
     console.log(this.filterCRE);
     
     //for filter Sales Executive selected data
     this.selectedSE=this.data.salesExecutive;
     if( this.selectedSE != undefined){
      for(let se of this.selectedSE){
        this.salesExcData.filter((x:any)=>x.id==se).map((x:any)=>x.isSelected=true)
       this.filterSales.push(se);
      }
    }
    })

     //propertyType api data
     this.mainservice.getPropertyTypes().subscribe((result)=>{
      console.log(result);
      this.propertyTypeData = result;
      this.propData = this.propertyTypeData.propertyTypes
      this.propData.forEach((data:any) => {
        this.PropertyData.push({
          id:data.id,
          name:data.name,
          isSelected:false
        })
      });
      //for filter property selected data
      this.selecteAoi=this.data.Aoi
      console.log(this.selecteAoi);
      if( this.selecteAoi != undefined){
      for(let property of this.selecteAoi){
        this.PropertyData.filter((x:any)=>x.name==property).map((x:any)=>x.isSelected=true)
        this.filterAOI.push(property);
      } 
    }     
    })
    console.log(this.data);
    console.log(this.data.connec);
    

    //for contactibility selected data
    this.checkedConv=this.data.connec;
    this.checkedConv==true? this.filterContact.push("Conversation"):null;
    this.checkedMatch=this.data.notMatch;
    this.checkedMatch==true? this.filterContact.push("Not Matched"):null;
    this.checkedConnected=this.data.notConnected;
    this.checkedConnected==true? this.filterContact.push("Not Contacted"):null;
    //for mode of intrest selected data
    this.checkedInt=this.data.intrested;
    this.checkedInt == true? this.filterMOI.push('Interested'):null;
    this.checkednotInt=this.data.notintrested;
    this.checkednotInt == true? this.filterMOI.push('Not Interested'):null;

     //for mode categry selected data
     this.hot=this.data.Hot;
     this.hot == true? this.filterCategory.push('A+(Hot)'):null
     this.cold=this.data.Cold;
     this.cold == true? this.filterCategory.push('B(Cold)'):null
     this.warm=this.data.Warm;
     this.warm == true? this.filterCategory.push('A(Warm)'):null
     
      //for  status selected data
      this.lead=this.data.Lead;
      this.lead==true?this.filterLead.push('Lead'):null
      this.call=this.data.Call;
      this.call==true?this.filterLead.push('Call'):null
      this.meet=this.data.Meet;
      this.meet==true?this.filterLead.push('Meet'):null
      this.visit=this.data.Visit;
      this.visit==true?this.filterLead.push('Visit'):null
       //for  buying purpose selected data
       this.personal=this.data.Personal;
       this.personal==true? this.filterBuyPurpose.push('Personal'):null;
       this.investment=this.data.Investment;
       this.investment==true? this.filterBuyPurpose.push('Investment'):null;
     //for visit date selected data
    this.vDate = this.data.date;
    
    this.selectedTab=this.data.index; 
    this.date = new FormControl(moment(new Date(this.vDate)));
    this.visitDate = moment(this.date.value).format("YYYY-MM-DD");
    if(this.visitDate!="Invalid date"){
      this.filterVisitDate.push(this.visitDate);
    }
     //for follow up date selected data
    this.FollowUpData=this.data.followUpdate
    this.followUpdate = new FormControl(moment(new Date(this.FollowUpData)));
    this.followDate = moment(this.followUpdate.value).format("YYYY-MM-DD");
    if(this.followDate!="Invalid date"){
    this.filterFollowDate.push(this.followDate);
    }
    //for start end date selected data
   this.startdate=this.data.startDate;
   this.enddate=this.data.endDate;
   console.log(this.startdate,this.enddate);
    this.OfferSdate=new FormControl(moment(new Date(this.startdate)));
    this.startDate= moment(this.OfferSdate.value).format("YYYY-MM-DD");
    
    if(this.startDate !="Invalid date"){
      this.filterStartDate.push(this.startDate);
    } 
    this.OfferEdate=new FormControl(moment(new Date(this.enddate)));
   this.endDate = moment(this.OfferEdate.value).format("YYYY-MM-DD");
   
 if(this.endDate !="Invalid date"){
  this.filterEndDate.push( this.endDate);
 }
   

  }

  selectedProject:any;
  //get projects
  getProjects(){
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)

    if (this.logindata.role == 'Super Admin' || this.logindata.role == 'Admin') {
      this.mainservice.getProjects().subscribe((res)=>{
        this.projects = res;
        this.projectData = this.projects.projects;
        this.projectData.forEach((data:any) => {
          this.projectArr.push({
            id:data.id,
            name:data.name,
            isSelected:false
          })
        });
        //for project selected data
        this.selectedProject = this.data.project;
        if(this.selectedProject!= undefined){
          for(let project of this.selectedProject){
            this.projectArr.filter((x:any)=>x.id==project).map((x:any)=>x.isSelected=true)
            this.filterProject.push(project);
          }
        }
      })   
    } else {
      this.projectData = this.logindata.project;
      this.projectData.forEach((data:any) => {
        this.projectArr.push({
          id:data.id,
          name:data.name,
          isSelected:false
        })
      });
      //for project selected data
      this.selectedProject = this.data.project;
      if(this.selectedProject!= undefined){
        for(let project of this.selectedProject){
          this.projectArr.filter((x:any)=>x.id==project).map((x:any)=>x.isSelected=true)
          this.filterProject.push(project);
        }
      }   
    }
    




    // this.mainservice.getProjects().subscribe((res)=>{
    //   this.projects = res;
    //   this.projectData = this.projects.projects
    //   this.projectData.forEach((data:any) => {
    //     this.projectArr.push({
    //       id:data.id,
    //       name:data.name,
    //       isSelected:false
    //     })
    //   });
      
    // //for project selected data
    // this.selectedProject = this.data.project;
    // if(this.selectedProject!= undefined){
    //   for(let project of this.selectedProject){
    //     this.projectArr.filter((x:any)=>x.id==project).map((x:any)=>x.isSelected=true)
    //     this.filterProject.push(project);
    //   }
    // }
    // console.log(this.projectArr);
    
    
    // })
  }

  //get project
    getProject(e:any){
      this.project = e.target.value;
      if(e.target.checked == true){
        this.filterProject.push(this.project);
      }
      else{
        var index = this.filterProject.indexOf(this.project)
          if(index>=0){
            this.filterProject.splice(index,1)
          }  
      } 
    }

  //get Contactability
  conv(e:any){
    this.checkedConv=e.target.checked
    let conversation = e.target.value;
      if(e.target.checked == true){
      this.filterContact.push(conversation);
      
    }
    else{
     var index = this.filterContact.indexOf(conversation)
     if(index>=0){
       this.filterContact.splice(index,1)
     }
    }
  }

  notMatched(e:any){
    this.checkedMatch=e.target.checked
    let not_matched = e.target.value; 
      if(e.target.checked == true){
      this.filterContact.push(not_matched);
    }
    else{
      var index = this.filterContact.indexOf(not_matched)
      if(index>=0){
        this.filterContact.splice(index,1)
      }  
      }
  }
  notConnected(e:any){
    this.checkedConnected=e.target.checked
    let not_connected = e.target.value;
      if(e.target.checked == true){
      this.filterContact.push(not_connected);
    }
    else{
      var index = this.filterContact.indexOf(not_connected)
      if(index>=0){
        this.filterContact.splice(index,1)
      }  
      }
  }

  //get MOI
  Interested(e:any){
    this.checkedInt=e.target.checked
    let interestedVal = e.target.value;
      if(e.target.checked == true){
      this.filterMOI.push(interestedVal);
    }
    else{
      var index = this.filterMOI.indexOf(interestedVal)
      if(index>=0){
        this.filterMOI.splice(index,1)
      }  
      }
  }

  notInterested(e:any){
    this.checkednotInt=e.target.checked
    let notIntVal = e.target.value;
      if(e.target.checked == true){
      this.filterMOI.push(notIntVal);
    }
    else{
      var index = this.filterMOI.indexOf(notIntVal)
      if(index>=0){
        this.filterMOI.splice(index,1)
      }  
      }
  }

  //get CRE
  getCre(e:any){
    this.cre = e.target.value;
    if(e.target.checked == true){
      this.filterCRE.push(this.cre);
    }
    else{
      var index = this.filterCRE.indexOf(this.cre)
        if(index>=0){
          this.filterCRE.splice(index,1)
        }  
    }      
  }

  //get Sales Executive
  getSalesExc(e:any){
    let salesExc = e.target.value;
    if(e.target.checked == true){
      this.filterSales.push(salesExc);
    }
    else{
      var index = this.filterSales.indexOf(salesExc)
        if(index>=0){
          this.filterSales.splice(index,1)
        }  
    }  
  }

  //get Calegory
  Category1(e:any){
    this.hot=e.target.checked;
    let cat1 = e.target.value;
    if(e.target.checked == true){
      this.filterCategory.push(cat1);
    }
    else{
      var index = this.filterCategory.indexOf(cat1)
        if(index>=0){
          this.filterCategory.splice(index,1)
        }  
    }  
  }
  Category2(e:any){
    this.warm=e.target.checked;
    let cat2 = e.target.value;
    if(e.target.checked == true){
      this.filterCategory.push(cat2);
    }
    else{
      var index = this.filterCategory.indexOf(cat2)
        if(index>=0){
          this.filterCategory.splice(index,1)
        }  
    }  
  }
  Category3(e:any){
    this.cold=e.target.checked;
    let cat3 = e.target.value;
    if(e.target.checked == true){
      this.filterCategory.push(cat3);
    }
    else{
      var index = this.filterCategory.indexOf(cat3)
        if(index>=0){
          this.filterCategory.splice(index,1)
        }  
    }  
  }

  //get status
  getLead(e:any){
    this.lead=e.target.checked;
    let leadVal = e.target.value;
    if(e.target.checked == true){
      this.filterLead.push(leadVal);
    }
    else{
      var index = this.filterLead.indexOf(leadVal)
        if(index>=0){
          this.filterLead.splice(index,1)
        }  
    }  
  }
  getVisit(e:any){
    this.visit=e.target.checked;
    let visitval = e.target.value;
    if(e.target.checked == true){
      this.filterLead.push(visitval);
    }
    else{
      var index = this.filterLead.indexOf(visitval)
        if(index>=0){
          this.filterLead.splice(index,1)
        }  
    }  
  }
  getCall(e:any){
    this.call=e.target.checked;
    let callVal = e.target.value;
    if(e.target.checked == true){
      this.filterLead.push(callVal);
    }
    else{
      var index = this.filterLead.indexOf(callVal)
        if(index>=0){
          this.filterLead.splice(index,1)
        }  
    }  
  }

  getMeet(e:any){
    this.meet=e.target.checked;
    let meetVal = e.target.value;
    if(e.target.checked == true){
      this.filterLead.push(meetVal);
    }
    else{
      var index = this.filterLead.indexOf(meetVal)
        if(index>=0){
          this.filterLead.splice(index,1)
        }  
    }  
  }

  //get AOI
  getAOI(e:any){
    let AOIVal = e.target.value;
    if(e.target.checked == true){
      this.filterAOI.push(AOIVal);
    }
    else{
      var index = this.filterAOI.indexOf(AOIVal)
        if(index>=0){
          this.filterAOI.splice(index,1)
        }  
    }  
  }

  getBuyingPurpose1(e:any){
  this.personal=e.target.checked
   let buyPurposeVal = e.target.value;
    if(e.target.checked == true){
      this.filterBuyPurpose.push(buyPurposeVal);
    }
    else{
      var index = this.filterBuyPurpose.indexOf(buyPurposeVal)
        if(index>=0){
          this.filterBuyPurpose.splice(index,1)
        }  
    }  
  }

  getBuyingPurpose2(e:any){
    this.investment=e.target.checked
    let buyPurposeVal = e.target.value;
     if(e.target.checked == true){
       this.filterBuyPurpose.push(buyPurposeVal);                   
     }
     else{
       var index = this.filterBuyPurpose.indexOf(buyPurposeVal)
         if(index>=0){
           this.filterBuyPurpose.splice(index,1)
         }  
     }  
   }

 
  
  getvisitDate(e:any){
    this.filterVisitDate=[];
    
    let monthVal=e.value._i.month+1; 
    this.visitDate =e.value._i.year+'-'+monthVal+'-'+e.value._i.date;
    this.filterVisitDate.push(this.visitDate);
  }

  getFollowDate(e:any){
    this.filterFollowDate=[];
    let monthVal=e.value._i.month+1;
    this.followDate =e.value._i.year+'-'+monthVal+'-'+e.value._i.date;
    this.filterFollowDate.push(this.followDate);
  }
  getStartDate(e:any){
    this.filterStartDate=[];
    let monthVal=e.value._i.month+1;
    this.startDate =e.value._i.year+'-'+monthVal+'-'+e.value._i.date; 
    this.filterStartDate.push(this.startDate);
  }

  getEndDate(e:any){
    this.filterEndDate=[];
    let monthVal=e.value._i.month+1;
    this.endDate =e.value._i.year+'-'+monthVal+'-'+e.value._i.date;
    this.filterEndDate.push(this.endDate);
    
  }
  
  leadType:string=this.data.deactive || this.data.active;

  applyFilter(e:any){     
    this.mainservice.filterResult(this.leadType,this.filterContact,
      this.filterMOI,this.filterCRE,this.filterSales,
      this.filterCategory,this.filterLead,this.filterAOI,this.filterVisitDate,
      this.filterFollowDate,this.filterStartDate,this.filterEndDate, this.filterBuyPurpose,this.filterProject).subscribe((result: any)=>{
        let appendedData = {
          projectData:this.filterProject,
          expectedVDate:this.visitDate,
          selectedIndex:this.selectedTab,
          credata:this.filterCRE,
          salesExc:this.filterSales,
          contactibility:this.filterContact,
          contacted:this.checkedConv,
          not_match:this.checkedMatch,
          not_connected:this.checkedConnected,
          intrested:this.checkedInt,
          notIntrested:this.checkednotInt,
          Hot:this.hot,
          Warm:this.warm,
          Cold:this.cold,
          Lead:this.lead,
          Call:this.call,
          Meet:this.meet,
          Visit:this.visit,
          aoi: this.filterAOI,
          personal:this.personal,
          investment:this.investment,
          followUpdate:this.followDate,
          startdate: this.startDate,
          enddate: this.endDate, 
          result:result
        }
      this.data = appendedData;  
      this.dialogRef.close(this.data)
    })
  }

  visDate:any;
  follDate:any;
  strtDate:any;
  enDate:any;
  clearAll(e:any){
    this.vDate = this.data.date;
    this.visDate=null;
    this.follDate=null;
    this.strtDate=null;
    this.enDate=null;
    this.startDate='';
    this.endDate='';
    this.filterStartDate.splice(this.startDate);
    this.filterEndDate.splice(this.endDate)
    this.visitDate='';
    this.followDate='';
    this.filterFollowDate.splice(this.followDate);
    this.filterVisitDate.splice(this.visitDate);
    this.filterCRE=[];
    this.filterSales=[];
    this.filterContact=[];
    this.filterMOI=[];
    this.filterCategory=[];
    this.filterLead=[];
    this.filterAOI=[];
    this.filterBuyPurpose=[];
    this.filterVisitDate=[];
    this.filterFollowDate=[];

    // $('#followDateVal').val(this.followDate);
    //  $('#dateVal').val(this.visitDate);
     $('#mat-date-range-input-container').val(this.startDate);
     $('#end_date').val(this.endDate);
      this.checkboxes.forEach((element) => { 
      element.nativeElement.checked = false;
    });
      this.dialogRef.close(this.filterCRE)
    
  }
  
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
   this.selectedTab=tabChangeEvent.index
  }
  
}
