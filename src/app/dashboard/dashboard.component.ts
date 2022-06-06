import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { ChartsModule } from 'ng2-charts';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
const moment = _moment;

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ID: any;
  projectData: any;
  User: any;
  user: any;
  getPermission: any;
  logindata: any;
  userId: any;
  userData: any;
  features: any;
  leadFeature: any;
  projects: any;
  ProjectName: any = [];
  projectList: any = [];
  projectName: string = "";
  CategoryChart: string = "none";
  StatusChart: string = "block";
  CategoryChart_UserWise: string = "none";
  StatusChart_UserWise: string = "block";
  index: any;
  LeadData: any;
  activeLeads: any;
  dectiveLeads: any;
  todaysFollowUpLeads: any;
  unCalledLeads: any;
  activeLeadsPercentage: any;
  dectiveLeadsPercentage: any;
  todaysFollowUpLeadsPercentage: any;
  unCalledLeadsPercentage: any;
  projectStatus: any = [];
  firstProjectIndex: any;
  status: any;
  status_Status: any;
  status_Category: any;
  labels_Status:any=[];
  labels_Category:any=[];

 
  chartOptions_Status:any={};
  chartOptions_Category:any={};
  chartData_Status:any=[];
  chartData_Category:any=[];

  labels_Status_UserWise:any=[];
  labels_Category_UserWise:any=[];

  chartOptions_Status_UserWise:any={};
  chartOptions_Category_UserWise:any={};

  chartData_Status_UserWise:any=[];
  chartData_Category_UserWise:any=[];
  statusLead: any;
  statusCall: any;
  statusMeet: any;
  statusVisit: any;
  statusBooked: any;
  category: any;
  categoryHot:any;
  categoryWarm:any;
  categoryCold:any;
  category_category: any;

  category_ProjectWise: any;
  categoryHot_UserWise:any;
  categoryWarm_UserWise:any;
  categoryCold_UserWise:any;
  category_category_UserWise: any;

  users: any;
  CreUser: any = [];
  salesManager: any = [];
  creAndSales:any=[];
  filterCRE:any=[];
  filterSalesMan:any=[];

  projectUserFilter: any = "";
  yearUserFilter: any = "";
  userUserFilter: any = "";

  projectFilter: any = "";
  yearFilter: any = "";
  userFilter: any = "";
  
  selectedUserName: any = "";
  showDashboard3: any = false;


  // CHART COLOR.
  colors_category = [
    { // A+(Hot)
      backgroundColor: 'green'
    },
    { // A(Warm)
      backgroundColor: 'skyblue'
    },
    { // B+(Cold)
      backgroundColor: 'orange'
    }
  ]

  // CHART COLOR PriceWise.
  colors_category_PriceWise = [
    { // A+(Hot)
      backgroundColor: 'blue'
    },
    { // A(Warm)
      backgroundColor: 'brown'
    },
    { // B+(Cold)
      backgroundColor: 'teal'
    }
  ]

  labels_Category_PriceWise = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  chartOptions_Category_PriceWise = {
    responsive: true   // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  chartData_PriceWise = [
    {
      label: '1st Year',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
    },
    { 
      label: '2nd Year',
      data: [47, 9, 28, 54, 77, 51, 24]
    }
  ];


  showAreaWise:string  = "block";
  showPriceWise:string = "none";



  

  //For Bar Chart of Status
  // CHART COLOR.
  colors_Status = [
    { // Lead
      backgroundColor: 'green'
    },
    { // Call
      backgroundColor: 'skyblue'
    },
    { // Meet
      backgroundColor: 'orange'
    },
    { // Visit
      backgroundColor: 'Red'
    },
    { // Booked
      backgroundColor: 'yellow'
    }
  ];
   //For Pie Chart
  // CHART COLOR.
  pieChartColor: any = [
    {
      backgroundColor: ['green',
        'red',
        'orange',
        'skyblue'
     // 'rgba(255, 102, 0, 0.9)'
      ]
    }
  
  ]

 //For Pie Chart of Area Wise
  // CHART COLOR.
  pieChartColor_AreaWise: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
     // 'rgba(255,165,0,0.9)',
      'rgba(139, 136, 136, 0.9)',
      'rgba(255, 161, 181, 0.9)',
      'rgba(255, 102, 0, 0.9)'
     // 'rgba(255, 102, 0, 0.9)'
      ]
    }
  
  ]

  //For Label of Piechartof Areawise
  pieChartLabels_Area_Wise =  ['Booked', 'Sold', 'Prebooked', 'Remaining'];
  pieChartData_AreaWise:any = [
    { 
        data: [47, 28, 54, 77]
    }
];


  Getyear: any=[];
  yy:any;
  statusLead_UserWise: any;
  statusCall_UserWise: any;
  statusMeet_UserWise: any;
  statusVisit_UserWise: any;
  statusBooked_UserWise: any;
  UserId: any;
  selectedYear: any;
  //Pie Chart end here
  StatusColor_UserWise:string="#8080db";
  CategoryColor_UserWise:string="";
  StatusColor:string="#8080db";
  CategoryColor:string="";
  selected_User:string="";
  activeButton:any;


  constructor(public mainservice: MainService, private route: Router, private router: ActivatedRoute) { }
 
  activateClass(event:any){
    this.activeButton = event;
  }
 
  ngOnInit(): void {
      this.dashboard1(); //For Pie chart
      this.dashboard2(); //For bar graph of status and category
      this.dashboard3(); //For bar graph of status and category UserWise
      this.Users(); //To get the users who has the permission to add the lead
      //For permission of the projects
      this.getPermission = localStorage.getItem('user_info')
      this.logindata = JSON.parse(this.getPermission)
      this.userId = this.logindata.id;
      if (this.logindata.role == 'Super Admin' || this.logindata.role == 'Admin') {
        this.showDashboard3 = true;
        this.mainservice.getProjects().subscribe((res) => {
          this.projects = res;
          this.projectData = this.projects.projects;
          this.index = this.projectData[0];
          this.ProjectName = this.projectData;
          this.ProjectName.forEach((data: any) => {
            this.projectList.push({
              id: data.id,
              name: data.name
            })
          });
          let projectNames: any = [];
          this.projectList.forEach((project: any) => {
            projectNames.push(project.name)
          });
        })
      }
      else {
        this.projectData = this.logindata.project
      }
  }

//For pie chart 
  dashboard1()
  {
    this.mainservice.getLeadReport().subscribe((res) => {
      this.LeadData = res;
      this.activeLeads = this.LeadData.activeLeads.count;
      this.activeLeadsPercentage = this.LeadData.activeLeads.percentage;
      this.dectiveLeads = this.LeadData.deActiveLeads.count;
      this.dectiveLeadsPercentage = this.LeadData.deActiveLeads.percentage;
      this.todaysFollowUpLeads = this.LeadData.todaysFollowUpLeads.count;
      this.todaysFollowUpLeadsPercentage = this.LeadData.todaysFollowUpLeads.percentage;
      this.unCalledLeads = this.LeadData.unCalledLeads.count;
      this.unCalledLeadsPercentage = this.LeadData.unCalledLeads.percentage;
      //for ProjectWise Status
      this.projectStatus = this.LeadData.projects;
     // For loop for the dyanmic projects to insert the data in the pie chart
      for (let i = 0; i < this.projectStatus.length; i++) {
        this.projectStatus[i].doughnutChartOptions = {
          responsive: true,
          title: {
            text: this.projectStatus[i].name,
            display: true,
            fontSize: 18,
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem:any, data:any) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(previousValue:any, currentValue:any, currentIndex:any, array:any) {
                  return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor(((currentValue/total) * 100)+0.5);  
                return percentage+ "%" +' ' + data.labels[tooltipItem.index];
              },
          }
          },
          legend: {
           // display: true,
            position: 'top',
            labels: {
              boxWidth: 20,
              //fontColor: '#474747',
             // fontFamily: '6px Montserrat',
             // fontSize:10,
            },
          },
        };
        this.projectStatus[i].doughnutChartLabels = [['Active'], ['Deactive'], ['Uncalled'], ['Todays FollowUp']];
        this.projectStatus[i].doughnutChartData = [this.projectStatus[i].activeLeads, this.projectStatus[i].deActiveLeads, this.projectStatus[i].unCalledLeads, this.projectStatus[i].todaysFollowUpLeads];
        this.projectStatus[i].doughnutChartType = 'doughnut';
        this.projectStatus[i].doughnutChartLegend = true;
        this.projectStatus[i].doughnutChartPlugins = [];
      }
       //For loop ends here
      this.firstProjectIndex = this.projectStatus[0].name;
    })
  }

//For bar graph of status and category

  dashboard2()
  {
    this.mainservice.getChartProjectWise(this.projectFilter,this.userFilter,this.yearFilter).subscribe((res) => {
      this.status=res;
      this.category=res;
      this.status_Status=this.status.status;
      this.statusLead=this.status_Status.Lead
      this.statusCall=this.status_Status.Call
      this.statusMeet=this.status_Status.Meet
      this.statusVisit=this.status_Status.Visit
      this.statusBooked=this.status_Status.Booked
      this.status_Category=this.status.category;
        this.chartOptions_Status = {
        responsive: true ,   // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
      }
        this.labels_Status = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        this.chartData_Status = [
          {
            label: 'Lead',
            data: this.statusLead
          },
          {
            label: 'Call',
            data:  this.statusCall
          },
          {
            label: 'Meet',
            data:  this.statusMeet
          },
          {
            label: 'visit',
            data: this.statusVisit
          },
          {
            label: 'Booked',
            data: this.statusBooked
          },
        ];

        this.category_category=this.category.category;
        this.categoryHot=this.category_category["A+(Hot)"];
        this.categoryWarm=this.category_category["A(Warm)"];
        this.categoryCold=this.category_category["B+(Cold)"];
        this.chartOptions_Category = {
          responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
        }
        this.labels_Category = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        this.chartData_Category = [
          {
            label: 'A+(Hot)',
            data:  this.categoryHot
          },
          {
            label: 'A(Warm)',
            data:  this.categoryWarm
          },
          {
            label: 'B+(Cold)',
            data:  this.categoryCold
          }       
        ];
    })
  }

 // For bar graph of status and category for user

  dashboard3()
  {
    this.mainservice.getChartProjectWise(this.projectUserFilter,this.userUserFilter,this.yearUserFilter).subscribe((res) => {
       this.status=res;
       this.category=res;
       this.status_Status=this.status.status;
       this.statusLead_UserWise=this.status_Status.Lead
       this.statusCall_UserWise=this.status_Status.Call
       this.statusMeet_UserWise=this.status_Status.Meet
       this.statusVisit_UserWise=this.status_Status.Visit
       this.statusBooked_UserWise=this.status_Status.Booked
       this.status_Category=this.status.category;
         this.chartOptions_Status_UserWise = {
         responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
       }
         this.labels_Status_UserWise = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
         this.chartData_Status_UserWise = [
           {
             label: 'Lead',
             data: this.statusLead_UserWise
           },
           {
             label: 'Call',
             data:  this.statusCall_UserWise
           },
           {
             label: 'Meet',
             data:  this.statusMeet_UserWise
           },
           {
             label: 'visit',
             data: this.statusVisit_UserWise
           },
           {
             label: 'Booked',
             data: this.statusBooked_UserWise
           },
         ];
 
         this.category_category_UserWise=this.category.category;
         this.categoryHot_UserWise=this.category_category_UserWise["A+(Hot)"];
         this.categoryWarm_UserWise=this.category_category_UserWise["A(Warm)"];
         this.categoryCold_UserWise=this.category_category_UserWise["B+(Cold)"];
         this.chartOptions_Category_UserWise = {
           responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
         }
         this.labels_Category_UserWise = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
         this.chartData_Category_UserWise = [
           {
             label: 'A+(Hot)',
             data:  this.categoryHot_UserWise
           },
           {
             label: 'A(Warm)',
             data:  this.categoryWarm_UserWise
           },
           {
             label: 'B+(Cold)',
             data:  this.categoryCold_UserWise
           }       
         ];
     })
  }


  //To get User who has the permission to add the lead
  Users() {
    this.mainservice.getUsers().subscribe((result) => {
      this.userData = result;
      this.users = this.userData.user;
      for (let i = 0; i < this.users.length; i++) {
        for (let j = 0; j < this.users[i].Role.Feature_Access_Permissions.length; j++) { 
          if (this.users[i].Role.Feature_Access_Permissions[j].Feature.name == 'Leads' && this.users[i].Role.Feature_Access_Permissions[j].create == true) {
            this.CreUser.push({
              id: this.users[i].id,
              name: this.users[i].name,
              role:this.users[i].Role.name
            })
            break;
          }
        }
      }
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
      //  this.AddLeadForm.get('cre_user_id')?.setValue(this.filterCRE[0].id);
      }
      else{
        //this.AddLeadForm.get('cre_user_id')?.setValue(null);
      }

      //filter sales manager
      this.filterSalesMan = this.salesManager.filter((item:any)=>{
        return item.name == getLoggedinUser.name;
      })

      if(this.filterSalesMan.length > 0){
       // this.AddLeadForm.get('sales_exec_user_id')?.setValue(this.filterSalesMan[0].id);
      }
      else{
       // this.AddLeadForm.get('sales_exec_user_id')?.setValue(null);
      }
    })  
  }

  //Get data in the bar graph of status and category UserWise
  getuserWiseData(user:any)
  {
    console.log("hello");
    
    this.userUserFilter = user.id;
    this.selectedUserName = user.name;
    this.dashboard3();
  }

 
  // CHART CLICK EVENT.
  onChartClick(event: any) {
   
  }

  // CHART CLICK EVENT.
  onChartClick_Status(event: any) {
   
  }

  showStatusChart() {
    this.StatusColor="#8080db";
    this.CategoryColor="#68bfbb";
    this.StatusChart = "block";
    this.CategoryChart = "none";
  }

  showStatusChart_UserWise()
  {
    this.CategoryColor_UserWise="#68bfbb";
    this.StatusColor_UserWise="#8080db";
    this.StatusChart_UserWise = "block";
    this.CategoryChart_UserWise = "none";
  }

  showCategoryChart_UserWise()
  {
    this.CategoryColor_UserWise="#8080db";
    this.StatusColor_UserWise="#68bfbb";
    this.StatusChart_UserWise = "none";
    this.CategoryChart_UserWise = "block";
  }


  showAreaChart()
  {
    this.StatusColor="#8080db";
    this.CategoryColor="#68bfbb";
    this.showAreaWise="block";
    this.showPriceWise="none";
  }

  showPriceChart()
  {
    this.CategoryColor="#8080db";
    this.StatusColor="#68bfbb"
    this.showAreaWise="none";
    this.showPriceWise="block";
  }


  showCategoryChart() {
    this.CategoryColor="#8080db";
    this.StatusColor="#68bfbb"
    this.StatusChart = "none";
    this.CategoryChart = "block";
  }

  GetSelectedYear(e:any)
  {
    this.yearFilter = e.value;
    this.dashboard2();
  }

  GetSelectedYearUser(e:any)
  {
    this.yearUserFilter=e.value;
    this.dashboard3();
  }

  GetProject(e: any) {
    this.projectFilter = e.value;
    this.dashboard2();
   }

  GetProject_UserWise(e: any) {
    this.projectUserFilter=e.value;
    this.dashboard3();
   }

  GoToActiveLeads() {
    this.route.navigateByUrl('layout/lead/lead')
  }

  GoToDeActiveLeads() {
    this.route.navigateByUrl('layout/lead/lead/deactive-leads')
  }

  GoToUncalledLeads() {
    this.route.navigateByUrl('layout/lead/lead/uncalled-leads')
  }

  GoToTodaysFollowUp() {
    this.route.navigateByUrl('layout/lead/lead/todays-follow-up')
  }

}
