import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import * as _moment from 'moment';
const moment = _moment;
import * as $ from 'jquery';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs/public-api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filter-property',
  templateUrl: './filter-property.component.html',
  styleUrls: ['./filter-property.component.scss']
})
export class FilterPropertyComponent implements OnInit {
  Project: any;
  AllPropertyType: any = [];
  PropertyType: any = [];
  AllProjectPropertyType: any = [];
  ProjectPropertyType: any = [];
  oneprojects: any;
  oneproject: any;
  projectName: string = "";
  projectPropertyType: any = [];
  new1p: any = [];
  property_type: any;
  Status: any;
  constructor(public dialogRef: MatDialogRef<FilterPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, @Inject(MAT_DIALOG_DATA) public data2: any, public mainservice: MainService, public toastr: ToastrService) { }
  @ViewChildren("checkboxes")
  checkboxes!: QueryList<ElementRef>;
  leadsData: any;
  filteredData: any = [];
  vDate: any = null;
  selectedCRE: any = [];
  selectedTab: number = 0
  Projects: any = [];
  AllProjects: any = [];
  filterPROJECT: any = [];
  showProperties: string = "block";
  showPropertiesProject_Wise: string = "none";
  Booked: boolean = false;
  PreBooked: boolean = false;
  Registered: boolean = false;
  Stock: boolean = false;
  property_checked: boolean = false;
  filterStatus: any = [];
  filterPropertyType: any = [];
  showPropertyType: string = "none";
  selectedProject: any = [];
  projectData: any = [];
  selectedPropertyType: any = [];


  ngOnInit(): void {

    this.showPropertyType = "none"
    this.mainservice.getProjects().subscribe((result) => {
      this.AllProjects = result;
      this.Projects = this.AllProjects.projects;
      this.projectData = [];
      this.Projects.forEach((data: any) => {
        this.projectData.push({
          id: data.id,
          name: data.name,
          isSelected: false
        })
      })
      //for filter Project selected data
      this.selectedProject = this.data.project;
      if (this.selectedProject != undefined) {
        for (let project of this.selectedProject) {
          this.projectData.filter((x: any) => x.id == project).map((x: any) => x.isSelected = true)
          this.filterPROJECT.push(project);
        }
      }
    })




    //for status selected data
    this.Booked = this.data.booked;
    this.Booked == true ? this.filterStatus.push('Booked') : null

    this.PreBooked = this.data.prebooked;
    this.PreBooked == true ? this.filterStatus.push('Pre-Booked') : null

    this.Registered = this.data.registered;
    this.Registered == true ? this.filterStatus.push('Registered') : null

    this.Stock = this.data.stock;
    this.Stock == true ? this.filterStatus.push('Stock') : null

    this.selectedPropertyType = this.data.propertyType
    
    if (this.selectedPropertyType != undefined) {
      for (let property of this.selectedPropertyType) {
        this.new1p.filter((x: any) => x.id == property).map((x: any) => x.isSelected = true)
        this.filterPropertyType.push(property);
      }
    }
  }

  Status1(e: any) {
    this.Booked = e.target.checked;
    let status1 = e.target.value;
    if (e.target.checked == true) {
      this.filterStatus.push(status1);
    }
    else {
      var index = this.filterStatus.indexOf(this.Booked)
      if (index >= 0) {
        this.filterStatus.splice(index, 1)
      }
    }
  }

  Status2(e: any) {
    this.PreBooked = e.target.checked;
    let status2 = e.target.value;
    if (e.target.checked == true) {
      this.filterStatus.push(status2);
    }
    else {
      var index = this.filterStatus.indexOf(status2)
      if (index >= 0) {
        this.filterStatus.splice(index, 1)
      }
    }
  }

  Status3(e: any) {
    this.Registered = e.target.checked;
    let status3 = e.target.value;
    if (e.target.checked == true) {
      this.filterStatus.push(status3);
    }
    else {
      var index = this.filterStatus.indexOf(status3)
      if (index >= 0) {
        this.filterStatus.splice(index, 1)
      }
    }
  }

  Status4(e: any) {
    this.Stock = e.target.checked;
    let status4 = e.target.value;
    if (e.target.checked == true) {
      this.filterStatus.push(status4);
    }
    else {
      var index = this.filterStatus.indexOf(status4)
      if (index >= 0) {
        this.filterStatus.splice(index, 1)
      }
    }
  }



  getProjects(e: any) {
    this.showProperties = "none";
    this.showPropertiesProject_Wise = "block";
    if (e.target.checked == true) {
      this.Project = e.target.value;
      this.mainservice.getProject(this.Project).subscribe((result) => {
        this.oneprojects = result
        this.oneproject = this.oneprojects.project
        this.projectName = this.oneproject.name
        this.new1p = [];
        this.projectPropertyType = this.oneproject.PropertyTypes
        this.projectPropertyType.forEach((data: any) => {
          this.new1p.push({
            id: data.id,
            name: data.name,
            isSelected: false
          })
        });
      })
      this.filterPROJECT.push(this.Project);
    }

    else {
      this.showProperties = "block";
      this.showPropertiesProject_Wise = "none";
      var index = this.filterPROJECT.indexOf(this.Project)
      if (index >= 0) {
        this.filterPROJECT.splice(index, 1)
      }
    }
  }

  getPropertyTypes(e: any) {
    if (this.projectName == '' || this.Project == 'null') {
      this.showProperties = "block";
    }
    this.property_type = e.target.value;
    this.property_checked = e.target.checked;
    if (e.target.checked == true) {
      this.filterPropertyType.push(this.property_type);
    }
    else {
      var index = this.filterPropertyType.indexOf(this.property_type)
      if (index >= 0) {
        this.filterPropertyType.splice(index, 1)
      }
    }
  }

  applyFilter(e: any) {
    this.mainservice.getFilterProperties(this.filterPROJECT, this.filterPropertyType, this.filterStatus).subscribe((result: any) => {
      let appendedData = {
        Project: this.filterPROJECT,
        PropertyType: this.filterPropertyType,
        Status: this.filterStatus,
        Booked: this.Booked,
        PreBooked: this.PreBooked,
        Registered: this.Registered,
        Stock: this.Stock,
        Property_checked: this.property_checked,
        result: result
      }
      this.data = appendedData;
      this.dialogRef.close(this.data)

    })

  }

  clearAll(e: any) {
    this.filterPROJECT = [];
    this.filterStatus = [];
    this.filterPropertyType = [];
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.showProperties = "block";
    this.showPropertiesProject_Wise = "none";
  }


  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.index
  }

}
