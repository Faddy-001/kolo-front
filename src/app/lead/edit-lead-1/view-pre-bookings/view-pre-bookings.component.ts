import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PrebookingComponent } from '../prebooking/prebooking.component';



@Component({
  selector: 'app-view-pre-bookings',
  templateUrl: './view-pre-bookings.component.html',
  styleUrls: ['./view-pre-bookings.component.scss']
})
export class ViewPreBookingsComponent implements OnInit {

  preBookingData: any = []
  newPrebookingData: any = []
  images: any = [];
  index: any;
  imagepreviewURlArr: Array<{ url: string, previewURL: string, name: string }> = [];
  PreBookingFieldsData: any = [];
  PropertyNumber: string = '';
  id: any;
  showIcon:string="none";

  constructor(public dialogRef: MatDialogRef<ViewPreBookingsComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.preBookingData = data.prebooking;
    //  console.log(data.prebooking);
  }


  ngOnInit(): void {
    this.preBookingData.forEach((data: any) => {
      if (data.offer) {
        for (let i of data.offer) {
          this.newPrebookingData.push({
            id: data.id,
            flatname: data.Property ? data.Property.number : null,
            paymentType: data.payment_type ? data.payment_type : null,
            offerName: i.name,
            commitment: data.commitment ? data.commitment : null,
            images: this.imagePreviewUrl(data.Images),
            //PropertyNumber:data.Property
          })
        }
                // console.log(this.newPrebookingData);
        //  console.log(this.newPrebookingData.flatname);
      }
      else {
        this.newPrebookingData.push({
          id: data.id,
          flatname: data.Property ? data.Property.number : null,
          paymentType: data.payment_type ? data.payment_type : null,
          offerName: null,
          commitment: data.commitment ? data.commitment : null
        })
      }


    });

    this.index = this.newPrebookingData[0]
    // console.log(this.index);

  }

  imagePreviewUrl(files: any) {
    this.imagepreviewURlArr = [];
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      var fileName = files[i]['title'];
      let extension = fileName.split('.').pop();
      let img = { url: files[i]['src'], previewURL: '', name: fileName };
      //  console.log(img);

      //  console.log('Hii',extension,files[i]['src']);

      switch (extension) {
        case 'jpg': case 'png': case 'jpeg': case 'gif': case 'webp': case 'mp3':

          img.previewURL = files[i]['src'];
          // console.log(img.previewURL);

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
      this.imagepreviewURlArr.push(img);
    }
    return this.imagepreviewURlArr;
  }

  closeView(id: any) {
    this.id = id;
    this.PreBookingFieldsData = {
      Prebookings: this.preBookingData,
      PID: this.id
    }
    this.data = this.PreBookingFieldsData;
  //  console.log(this.data);
    this.dialogRef.close(this.data);
  }


  close() {
    const dialogRef = this.dialog.open(PrebookingComponent, {
     width: '600px', height: '500px',
      data: {}

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // dialogRef.afterClosed().subscribe(result => {
    //    this.NewPreBookString = result;
    //    console.log(this.NewPreBookString);
       // this.dialogRef.close(this.NewPreBookString);
        // this.PreBookingCommitment = this.NewPreBookString.Commitment ? this.NewPreBookString.Commitment : '';
        // this.FinalizedPrice = this.NewPreBookString.FinalPropertyPrice ? this.NewPreBookString.FinalPropertyPrice : '';
        // this.PreBookingOfferId = this.NewPreBookString.Offer ? this.NewPreBookString.Offer : '';
        // this.PreBookingPaymentType = this.NewPreBookString.PaymentType ? this.NewPreBookString.PaymentType : '';
        // this.PropertyTypeId = this.NewPreBookString.PropertyTypeId ? this.NewPreBookString.PropertyTypeId : '';
        // this.Project_Id = this.NewPreBookString.ProjectId ? this.NewPreBookString.ProjectId : '';
        // this.PropertyId = this.NewPreBookString.PropertyId ? this.NewPreBookString.PropertyId : '';
  
        // this.addCustomerForm.get(['property', 'project_id'])?.setValue(this.Project_Id);
        // this.addCustomerForm.get(['property', 'property_type_id'])?.setValue(this.PropertyTypeId);
        // this.addCustomerForm.get(['property', 'property_id'])?.setValue(this.PropertyId);
        // this.addCustomerForm.get(['property', 'payment_type'])?.setValue(this.PreBookingPaymentType);
        // this.addCustomerForm.get(['property', 'commitment'])?.setValue(this.PreBookingCommitment);
        // this.addCustomerForm.get(['property', 'offer'])?.setValue(this.PreBookingOfferId);
        // this.addCustomerForm.get(['property', 'finalized_property_price'])?.setValue(this.FinalizedPrice);
    });
    this.dialogRef.close();
  }

}
