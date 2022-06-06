import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// declare var $: any;
import 'datatables.net';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  [x: string]: Object;
  Length: any;
  Breadth: any;
  BreadthValue!: number;
  LengthValue!: number;
  AmountValue!: number;
  RateValue!: number;
  total_area: any;
  area: any = '0.00';
  Rate: any = '0.00';
  Amount: any = '0.00';
  Total: any = '0.00';
  persqft: any = '0.00';
  projectData: any;
  projects: any;
  Project_Properties_Data: any;
  Project_prop_type: any = [];
  ProjectPropertyData: any = [];
  PropertyData: any = [];
  oneprojects: any = [];
  oneproject: any = [];
  projectName: any = [];
  projectPropertyType: any = [];
  new1p: any = [];
  //addPropertyForm!: FormGroup;
  images: any = [];
  showBtn: string = 'none';
  showImg: string = 'none'
  offerDetail: any = [];
  offerData: any;
  show_offer: string = 'none';
  urls: any = [];
  $scope: any;
  files: any = [];
  filesToUpload: any = [];
  no: any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  propertiesFeature:any;
  errorMsg: any;
  showErr:string='none';

 

  constructor(private route: Router, public dialogRef: MatDialogRef<EditPropertyComponent>, private formbuilder: FormBuilder,
    private mainService: MainService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

      
    this.getProjects();
    this.no = this.data.no;
    this.Length = this.data.length;
  }

  deleteImg(index: number) {
    this.images.splice(index, 1)
    this.filesToUpload = Array.from(this.filesToUpload).filter(
      item => {
        return item != this.filesToUpload[index]
      })
  }
  GetProject(e: any) {
    this.new1p = [];
    this.mainService.getProject(e.value).subscribe((result) => {
      this.oneprojects = result
      this.oneproject = this.oneprojects.project
      this.projectName = this.oneproject.name
      this.projectPropertyType = this.oneproject.PropertyTypes
      this.projectPropertyType.forEach((data: any) => {
        this.new1p.push({
          id: data.id,
          name: data.name
        })
      });
    })
  }

  getProjects() {
    this.mainService.getProjects().subscribe(result => {
      this.projectData = result;
      this.projects = this.projectData.projects;
      this.ProjectPropertyData = this.projects;
    },
      err => {
        console.log(err);
      })
  }

  getArea() {
    this.Length = (<HTMLInputElement>document.getElementById("length")).value;
    this.Breadth = (<HTMLInputElement>document.getElementById("breadth")).value;
    this.total_area = this.Length * this.Breadth;
    this.area = this.total_area;
    //this.addPropertyForm.get('property_size')?.setValue(this.area);
  }

  getAmount() {
    this.Rate = (<HTMLInputElement>document.getElementById("rate")).value;
    this.Total = this.Rate * this.area;
  }

  getRate() {

    this.Amount = (<HTMLInputElement>document.getElementById("amount")).value;
    if (this.Amount == '' || this.Amount == null) {
      this.persqft = '0.00';
    }
    else {
      this.persqft = this.Amount / this.total_area;
    }
  }
  getrole(){
    this.mainService.getRoles().subscribe(result => {

      this.role = result;
      console.log(this.role);
      
      
    },
      err => {
        console.log(err);
      })
  }

  offerImage(e: any) {
    for (let i = 0; i < e.target.files.length; i++) {
      let selectedFile = e.target.files[i];
      this.filesToUpload.push(selectedFile);
      var fileName = selectedFile.name;
      var ext = fileName.split('.').pop();
      let img = { url: '', name: fileName };
      var reader = new FileReader();

      switch (ext) {
        case 'jpg': case 'png': case 'jpeg': case 'gif': case 'webp':
          reader.onload = (e: any) => {
            img.url = e.target.result;
          }
          break;
        case 'docx':
          img.url = '../../assets/files-extension-imgs/doc-file.png';
          break;
        case 'xlsx':
          img.url = '../../assets/files-extension-imgs/excel-file.png';
          break;
        case 'pdf':
          img.url = '../../assets/files-extension-imgs/pdf-file.png';
          break;
        case 'ppt':
          img.url = '../../assets/files-extension-imgs/ppt-file.jpg';
          break;
        case 'zip': case 'zipx':
          img.url = '../../assets/files-extension-imgs/zip-file.png';
          break;
        default:
          img.url = '../../assets/files-extension-imgs/other-file.jpg';

      }

      this.images.push(img);
      reader.readAsDataURL(e.target.files[i]);
    }
  }


  deleteImage(url: any): void {
    this.urls = this.urls.filter((a: any) => a !== url);
  }

 

  close() {
    this.dialogRef.close();
  }

}
