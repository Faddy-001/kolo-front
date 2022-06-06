import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';
//import { OffersComponent } from "../offers.component";
import * as $ from 'jquery';
import 'datatables.net';
import { PropertyComponent } from '../property.component';
import { EditPropertyComponent } from '../edit-property/edit-property.component';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  Property_Number: any;
  Length: any;
  Breadth: any;
  // Property_Name: any;
  TotalArea: any;
  Ratepersq: any;
  Price: any;
  Desc: any;
  Ratepersq_ft: any;
  id: any;
  ProjectName: any;
  ProjectId: any;
  Property_typeName: any;
  Property_typeId: any;
  edit: boolean = false;

  total_area: any;
  area: number = 0;
  Rate:  number = 0;
  Amount: number = 0;
  Total: any = 0;
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
  showHead: string = "none";
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
  UserPreviousImage: any=[];
  no: any;
  editPropertyForm: FormGroup;
  succMsg: any;
  newMsg: any;
  status: any;
  Status: any;
  count:number=0;
  imagepreviewURlArr:Array<{url:string, previewURL:string, name:string}> =[] ;
  deletedImage:any=[];
  errorMsg: any;
  isImageDeleted:boolean=false;
  newObj:any=[];
  isImg:string='block';
  PropertyImages: any=[];
  showImage: any;
  index: any;
  pp: any;
  priceToPrint: any;
  Ratepersq_ft_toprint: any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  propertiesFeature:any;
  

  constructor(public dialogRef: MatDialogRef<PropertyComponent>, public dialog: MatDialog, private formbuilder: FormBuilder,
    private mainService: MainService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.UserPreviousImage = this.imagePreviewUrl(this.data.image);
    this.id = this.data.ID;
    this.editPropertyForm = this.formbuilder.group({
      project_id: [this.data.project_id, Validators.required],
      property_type_id: [this.data.property_type_id,  Validators.required],
      number: [this.data.propertynumber, Validators.required],
      // name: [this.data.propertyname],
      length: [this.data.length],
      breadth: [this.data.breadth],
      property_size: [this.data.totalarea],
      rate_per_sq_ft: [this.data.rate, Validators.required],
      price: [this.data.price, Validators.required],
      description: [this.data.description],
      status:[this.data.status, Validators.required]
    })
  }



  ngOnInit(): void {
      //get feature
      this.getPermission = localStorage.getItem('user_info')
      this.logindata = JSON.parse(this.getPermission)
      this.userId = this.logindata.id;
      
      this.mainService.getUser(this.userId).subscribe((res:any)=>{
        this.userData = res;
        this.features = this.userData.user.Role.Feature_Access_Permissions;
        this.propertiesFeature = this.features.filter((data:any)=>{
          return data.Feature.name == 'Properties';
        })
      })

    this.mainService.getProject(this.data.project_id).subscribe((result) => {
      this.oneprojects = result;
      this.oneproject = this.oneprojects.project;
      this.projectName = this.oneproject.name;
      this.projectPropertyType = this.oneproject.PropertyTypes
      this.projectPropertyType.forEach((data: any) => {
        this.new1p.push({
          id: data.id,
          name: data.name
        })
      });
    })
    this.getProjects();
    this.no = this.data.no;
    this.Length = this.data.length;
    this.id = this.data.ID;
    this.Property_Number = this.data.propertynumber;
    this.Length = this.data.length;
    this.Breadth = this.data.breadth;
    this.total_area = (this.Length * this.Breadth) == 0 ? this.data.totalarea : this.Length * this.Breadth;
    this.area = this.total_area == 0 ? this.data.totalarea : this.total_area;
    // this.Property_Name = this.data.propertyname;
    this.TotalArea = this.data.totalarea;
    this.Ratepersq_ft = this.data.rate;
    this.Ratepersq_ft_toprint=Number(this.Ratepersq_ft).toLocaleString('en-IN');   
    this.Price = this.data.price; 
    this.priceToPrint=Number(this.Price).toLocaleString('en-IN'); 
    this.Desc = this.data.description;
    this.ProjectName = this.data.project_name;
    this.ProjectId = this.data.project_id;
    this.Property_typeName = this.data.property_type_name;
    this.Property_typeId = this.data.property_type_id;
    this.Status=this.data.status;
    this.PropertyImages=this.data.image;
    this.index=this.PropertyImages[0];
  }

  
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 45|| charCode > 57)) {
      return false;
    }
    return true;

  }
  
  imagePreviewUrl(files:any){
    this.imagepreviewURlArr = [];
    for (let i = 0; i < files.length; i++) {      
      var fileName = files[i]['title'];
      let extension = fileName.split('.').pop();  
      let img = {url:files[i]['src'], previewURL:'',name: fileName};
      switch (extension) {
        case 'jpg': case 'png': case 'jpeg': case 'gif': case 'webp': case 'mp3':   
          img.previewURL = files[i]['src']; 
          this.showImage=img.previewURL;
          break;
        case 'docx':
          img.previewURL ='../../assets/files-extension-imgs/doc-file.png';
          break;
        case 'xlsx':
          img.previewURL ='../../assets/files-extension-imgs/excel-file.png';
          break;
        case 'pdf':
          img.previewURL ='../../assets/files-extension-imgs/pdf-file.png';
          break;
        case 'ppt':
          img.previewURL ='../../assets/files-extension-imgs/ppt-file.jpg';
          break;
        case 'zip': case 'zipx':
          img.previewURL ='../../assets/files-extension-imgs/zip-file.png';
          break;
        default:
          img.previewURL ='../../assets/files-extension-imgs/other-file.jpg';          
      }
      this.imagepreviewURlArr.push(img);      
    }
    return this.imagepreviewURlArr;
  }

  deleteImg(img:any) {
    let img_url = img.url;

    let url = img_url.split('/').pop();

    this.deletedImage.push({url});

    this.isImageDeleted=true;
    
    let preview_index = this.imagepreviewURlArr.indexOf(img);
    this.imagepreviewURlArr.splice(preview_index, 1)
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
        $("#emptyErr").fadeIn()
        this.editPropertyForm.get('property_type_id')?.setValue(null);   
       }
       else{
        $("#emptyErr").fadeOut()
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

  getArea() {
    this.Length = (<HTMLInputElement>document.getElementById("length")).value;
    this.Breadth = (<HTMLInputElement>document.getElementById("breadth")).value;
    this.total_area = this.Length * this.Breadth;
    this.area = this.total_area;
    this.editPropertyForm.get('property_size')?.setValue(this.area);
    this.editPropertyForm.get('rate_per_sq_ft')?.setValue(null);
    this.editPropertyForm.get('price')?.setValue(null);
  }

  // getAmount() {
  //   this.Rate = (<HTMLInputElement>document.getElementById("rate")).value; 
  //   this.Total = this.Rate * this.area;
  //   this.editPropertyForm.get('price')?.setValue(this.Total);
  // }

  // getRate() {

  //   this.Amount = (<HTMLInputElement>document.getElementById("amount")).value;
  //   if (this.Amount == '' || this.Amount == null) {
  //     this.persqft = '0.00';
  //   }
  //   else {
  //     this.persqft = this.Amount / this.total_area;
  //   }
  // }


  getRatePerSqFt(e: any)
   {
    this.area = Number((<HTMLInputElement>document.getElementById("area")).value);
    this.TotalAmt = 0;
    this.Rate = Number(e.target.value);
    this.TotalAmt = this.Rate * this.area;
    this.editPropertyForm.get('price')?.setValue(this.TotalAmt);
   }

  getPropertyPrice(e: any)
  { 
    this.area = Number((<HTMLInputElement>document.getElementById("area")).value);
    this.Rate = 0;
    this.TotalAmt = Number(e.target.value);
    this.persqft= Number(this.TotalAmt / this.area);
    this.editPropertyForm.get('rate_per_sq_ft')?.setValue(this.persqft);
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
  getStatus(e: any) {
    console.log(e.value);
  }

  totalArea() {
    this.editPropertyForm.get('price')?.setValue(null);
    this.editPropertyForm.get('rate_per_sq_ft')?.setValue(null);
  }

  offerImage(e: any) {
    for (let i = 0; i < e.target.files.length; i++) {
      let selectedFile = e.target.files[i];
      this.filesToUpload.push(selectedFile);
      var fileName = selectedFile.name;
      var ext = fileName.split('.').pop();
      let img = {  url: '' , previewURL:'', name: fileName };
      var reader = new FileReader();

      switch (ext) {
        case 'jpg': case 'png': case 'jpeg': case 'gif': case 'webp':
          reader.onload = (e: any) => {
            img.previewURL = e.target.result;
          }
          break;
        case 'docx':
          img.previewURL = '../../assets/files-extension-imgs/doc-file.png';
          break;
        case 'xlsx':
          img.previewURL = '../../assets/files-extension-imgs/excel-file.png';
          break;
        case 'pdf':
          img.previewURL = '../../assets/files-extension-imgs/pdf-file.png';
          break;
        case 'ppt':
          img.previewURL = '../../assets/files-extension-imgs/ppt-file.jpg';
          break;
        case 'zip': case 'zipx':
          img.previewURL = '../../assets/files-extension-imgs/zip-file.png';
          break;
        default:
          img.previewURL = '../../assets/files-extension-imgs/other-file.jpg';

      }
      this.UserPreviousImage.push(img)
      reader.readAsDataURL(e.target.files[i]);
    }
  }


  deleteImage(url: any): void {
    this.urls = this.urls.filter((a: any) => a !== url);
  }

  close() {
    this.dialogRef.close();
  }

  editProperty() {
    this.edit = true;
    this.showHead = "flex"
  }

  openEditForm(id: any) {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(EditPropertyComponent, {
      width: '600px',
      data: { no: this.Property_Number, length: this.Length }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }



  openDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(EditPropertyComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

  submit(value: any) {
    if (this.editPropertyForm.valid) {
    if(this.isImageDeleted==true){
      this.mainService.deleteFile(this.deletedImage,this.id).subscribe((result)=>{
      });
    }
    // else{
      const formData = new FormData();
      formData.append('project_id', value.project_id);
      formData.append('property_type_id', value.property_type_id);
      formData.append('number', value.number);
      formData.append('name', value.name);
      formData.append('length', value.length);
      formData.append('breadth', value.breadth);
      formData.append('property_size', value.property_size);
      formData.append('rate_per_sq_ft', value.rate_per_sq_ft);
      formData.append('price', value.price);
      formData.append('status', value.status);
      formData.append('description', value.description);
      for (let img of this.filesToUpload) {
         formData.append('property_image', img);
       }
       this.filesToUpload=[];
      
      this.mainService.update_Property(this.id,formData).subscribe((result)=>{
        this.data = result;
        this.succMsg=result;
        this.dialogRef.close(this.data);
        this.newMsg=this.data.message;
        this.toastr.success(this.newMsg)
      },
      err => {
        this.data = err;
        this.errorMsg = this.data.error.error.number;
        //this.dialogRef.close(this.errorMsg);
        this.toastr.error(this.errorMsg)
      });  
     }
  }

}

function indexOf(j: string) {
  throw new Error('Function not implemented.');
}

