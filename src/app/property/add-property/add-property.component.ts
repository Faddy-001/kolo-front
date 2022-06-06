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
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  Length: number = 0;
  Breadth: number = 0;
  total_area: number = 0;
  area: number = 0;
  Rate: number = 0;
  Amount: number = 0;
  TotalAmt: number =0;
  persqft: number = 0;
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
  addPropertyForm!: FormGroup;
  images: any = [];
  showBtn: string = 'none';
  showImg:string='none'
  offerDetail: any = [];
  offerData: any;
  show_offer: string = 'none';
  urls:any=[];
  $scope:any;
  files:any=[];
  filesToUpload:any=[];
  errorMsg: any;
  disabled:boolean=true;
  showErr:string='none';

  constructor(private route:Router,public dialogRef: MatDialogRef<AddPropertyComponent>, private formbuilder: FormBuilder,
    private mainService: MainService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addPropertyForm = this.formbuilder.group({
      project_id:[null, Validators.required],
      property_type_id:[null, Validators.required],
      number:[null, Validators.required],
      name:[null],
      length:[null],
      breadth:[null],
      property_size:[null, [Validators.required, Validators.min(1)]],
      rate_per_sq_ft:[null, Validators.required],
      price:[0, [Validators.required, Validators.min(1)]],
      //file:[null],
      description:[null]
    })
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 45|| charCode > 57)) {
      return false;
    }
    return true;

  }

  deleteImg(index:number){
    this.images.splice(index, 1)
    this.filesToUpload = Array.from(this.filesToUpload).filter(item => {
      return item != this.filesToUpload[index]
    })
  }

  ngOnInit(): void {
    this.getProjects();
  }
  totalArea() {
    this.addPropertyForm.get('price')?.setValue(null);
    this.addPropertyForm.get('rate_per_sq_ft')?.setValue(null);
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
     if(this.new1p.length==0){
      this.addPropertyForm.get('property_type_id')?.setValue(null);
     }
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

  getArea()
  {
    this.Length = Number((<HTMLInputElement>document.getElementById("length")).value);
    this.Breadth = Number((<HTMLInputElement>document.getElementById("breadth")).value);
    this.total_area = this.Length * this.Breadth;
    this.area = this.total_area;
    this.addPropertyForm.get('property_size')?.setValue(this.area);
    // if(this.Rate!= 0 || this.Amount!=0){
    // this.TotalAmt = 0;
    // this.persqft = 0;
    // }
  }

  getRatePerSqFt(e: any)
   {
    this.TotalAmt = 0;
    this.Rate = Number(e.target.value);
    this.TotalAmt = this.Rate * this.area;
    this.addPropertyForm.get('price')?.setValue(this.TotalAmt);
   }

  getPropertyPrice(e: any)
  {
    this.Rate = 0;
    this.TotalAmt = Number(e.target.value);
    this.persqft= Number(this.TotalAmt / this.area);
    this.addPropertyForm.get('rate_per_sq_ft')?.setValue(this.persqft);
    // console.log("Rate Function");
    // this.TotalAmt = 0;
    // this.TotalAmt = Number((<HTMLInputElement>document.getElementById("amount")).value);
    //   // this.Amount = Number((<HTMLInputElement>document.getElementById("amount")).value);
    //   // this.TotalAmt = this.Amount;
    //   console.log(this.TotalAmt);

    //   // console.log(this.Amount);

    //     this.persqft= Number(this.TotalAmt / this.total_area);
    //     console.log(this.persqft);
    // if(this.Amount==''||this.Amount==null )
    // {
    //   console.log("if part");

    //   this.persqft=0;
    // }
    // else
    // {
    //   console.log("else part");
    //   this.persqft=this.Amount/this.total_area;
    //   console.log(this.persqft);

    // }
  }

  getImage(e: any) {
  for(let i=0;i<e.target.files.length;i++){
    let selectedFile = e.target.files[i];
    this.filesToUpload.push(selectedFile);

    var fileName = selectedFile.name;
    var ext = fileName.split('.').pop();
    let img={url:'', name:fileName, type:'Property'};

    var reader=new FileReader();

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

  submit(value:any){
    console.log(value);
    // if (value.length == 0 || value.length == null) {
    //   delete value.length;
    // }
    // if (value.breadth == 0 || value.breadth == null) {
    //   delete value.breadth;
    // }
    // console.log(value);
    if(value.project_id==null||value.property_type_id==null||value.number==null||value.rate_per_sq_ft == 0||value.price== 0)
    {
        return;
    }
    else
    {
      this.showErr="none";
      const formData = new FormData();
      formData.append('project_id', value.project_id);
      formData.append('property_type_id', value.property_type_id);
      formData.append('number', value.number);
      formData.append('name', value.name);
      formData.append('length', (value.length) ? value.length : 0);
      formData.append('breadth', (value.breadth) ? value.breadth : 0);
      formData.append('property_size', value.property_size);
      formData.append('rate_per_sq_ft', value.rate_per_sq_ft);
      formData.append('price', value.price);
      formData.append('description', value.description);


      for (let img of this.filesToUpload) {
        formData.append('property_image', img);
      }

      // return 0
      this.mainService.addProperty(formData).subscribe((result)=>{
       this.data = result;
       this.dialogRef.close(this.data);
       this.toastr.success(this.data.message)
      //  this.route.navigateByUrl('/layout/property');
      },
      err => {
        this.data = err;
        this.errorMsg = this.data.error.error.number;
        //this.dialogRef.close(this.errorMsg);
        this.toastr.error(this.errorMsg)
      });

    }

      }

  close() {
    this.dialogRef.close();
  }

}
