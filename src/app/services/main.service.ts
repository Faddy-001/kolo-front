import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import * as FileSaver from 'file-saver'; //Fix

@Injectable({
  providedIn: 'root'
})
export class MainService {
  getproperties() {
    throw new Error('Method not implemented.');
  }

   url="http://localhost:3000/api/"
 // url ="http://3.15.160.127/backend/api/";
  // url = "http://13.58.157.54/dcbackend/api/"    //Dream City Backend
  // url="https://kolonizer.net/kolonizer/api/" //Kolonizer360 domain
    // url="https://kolonizer.net/abdul/api/"     //abdulAleem domain
 // url="https://kolonizer.net/tahir/api/"     //balaji group Domain
  postal_url = "https://api.postalpincode.in/pincode/"
  deleteDept: any;


  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  //  public feature_match(allowedFeatures:any){
  //    let isMatch = false;
  //    const featurePermissions:any = this.auth.getPermission();
  //    console.log(featurePermissions);



  //  }

  //search API
  search_url = this.url + 'searchLeads';
  searchResult(searchData: any, leadType:any) {

    const params = new HttpParams({
      fromObject:{
        search:searchData
      }
    })
    return this.http.get(this.search_url+'/'+leadType,{params: params});
    // return this.getUserApi(this.search_url,{params: params});
  }

  //filter leads API
  filterKey: string = '';
  // filter_url = this.url+'filterLeads?'+'contactability'+'=';
  filter_url = this.url + 'filterLeads';
  filterResult(leadType:any,filterData1: any, filterData2: any, filterData3: any, filterData4: any, filterData5: any, filterData6: any,
    filterData7: any, filterData8: any, filterData9: any, filterData10: any, filterData11: any, filterData12: any, filterData13:any) {
    const params = new HttpParams({
      fromObject: {
        contactability: filterData1,
        mode_of_interest: filterData2,
        cre: filterData3,
        sales_exec: filterData4,
        category: filterData5,
        status: filterData6,
        area_of_interest: filterData7,
        expected_visit_date: filterData8,
        follow_up_date: filterData9,
        call_start_date: filterData10,
        call_end_date: filterData11,
        buying_purpose: filterData12,
        project:filterData13
      }
    })
    return this.http.get(this.filter_url+'/'+leadType,{ params: params})
  }

  //Postal_code API
  getPostalCodes(pinCode: number) {
    return this.http.get(this.postal_url + pinCode);
  }

  //Roles API
  roles_url = this.url + 'role';
  getRoles() {
    let path = 'master/role'
    let feature = 'Roles'
    return this.getUserApi(this.roles_url, path, feature);
  }

  RoleUrl = this.url + 'role';
  addRole(roleData: any) {
    let path = 'master/role';
    let feature = 'Roles';
    return this.postUserApi(this.RoleUrl, roleData, path, feature);
  }

  getRole(id: number) {
    let path = 'master/role';
    let feature = 'Roles';
    return this.getSingleUserApi(this.RoleUrl, id, path, feature)
  }

  updateRole(id: number, data: any) {
    let path = 'master/role';
    let feature = 'Roles';
    return this.UpdateSingleUserApi(this.RoleUrl,id,data,path,feature);
  }

  deleteRole(id: number) {
    let path = 'master/role';
    let feature = 'Roles'
    return this.deleteSingleUserApi(this.RoleUrl, id, path,feature)
  }

  //Projects API
  project_url = this.url + 'project';
  getProjects() {
    let path = 'master/project';
    let feature = 'Projects'
    return this.getUserApi(this.project_url, path, feature);
  }

  addProject(data: any) {
    let path = 'master/project';
    let feature = 'Projects'
    return this.postUserApi(this.project_url, data, path, feature);
  }

  getProject(id: number) {
    let path = 'master/project'
    let feature = 'Projects'
    return this.getSingleUserApi(this.project_url, id, path, feature)
  }

  updateProject(id: number, data: any) {
    let path = 'master/project'
    let feature = 'Projects'
    return this.UpdateSingleUserApi(this.project_url,id,data,path,feature);
  }

  deleteProject(id: number) {
    let path = 'master/project';
    let feature = 'Projects'
    return this.deleteSingleUserApi(this.project_url, id,path,feature)
  }

  //users api
  user_url = this.url + 'user';
  getUsers() {
    let path = 'master/user';
    let feature = 'Users'
    return this.getUserApi(this.user_url, path, feature);
  }

  addUser(data: any) {
    let path = 'master/user';
    let feature = 'Users'
    return this.postUserApi(this.user_url,data,path,feature)
  }

  getUser(id: any) {
    let path = 'master/user';
    let feature = 'Users'
   return this.getSingleUserApi(this.user_url,id,path,feature)

  }

  update_user(id: number, data: any) {
    let path = 'master/user';
    let feature = 'Users'
    return this.UpdateSingleUserApi(this.user_url,id,data,path,feature);
  }

  deleteUser(id: number) {
    let path = 'master/user';
    let feature = 'Users'
    return this.deleteSingleUserApi(this.user_url, id,path,feature)
  }

  deactivateuser_url = this.url+'deactivateUser';
  deActivateUser(id:any){
    let path = 'master/user';
    let feature = 'Users'
    return this.UpdateSingleUserApi(this.deactivateuser_url,id,null,path,feature);
  }

  activateuser_url = this.url+'activateUser'
  activateUser(id:any){
    let path = 'master/user';
    let feature = 'Users'
    return this.UpdateSingleUserApi(this.activateuser_url,id,null,path,feature);
  }

  //offerApi
  offer_url = this.url + 'offer';
  addOffer(data: any) {
    let path = 'master/offer';
    let feature = 'Offers'
    return this.postUserApi(this.offer_url, data, path, feature);
  }

  getOffers() {
    let path = 'master/offer';
    let feature = 'Offers'
    return this.getUserApi(this.offer_url, path, feature);
  }

  getOffer(id: number) {
    let path = 'master/offer';
    let feature = 'Offers'
    return this.getSingleUserApi(this.offer_url, id, path, feature)

  }

  updateOffer(id: number, data: any) {
    let path = 'master/offer';
    let feature = 'Offers'
    return this.UpdateSingleUserApi(this.offer_url,id,data,path,feature)
  }

  deleteOffer(id: number) {
    let path = 'master/offer';
    let feature = 'Offers'
    return this.deleteSingleUserApi(this.offer_url, id,path,feature)
  }

  searchPropertyFor_Offer = this.url + 'property?search=';
  getSearchPropertyOffer(searchProject:any,searchPropertyType:any,searchProperty:any) {
    let bearerToken = localStorage.getItem('token');
    let options = {
      params: new HttpParams({
        fromObject:{
        project: searchProject,
        propertyType:searchPropertyType,
        property:searchProperty
        }
      }),
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': 'master/property',
        'feature':'Properties'
      })
    }
      // const params = new HttpParams({
      //  fromObject:{
      //    project: searchProject,
      //    propertyType:searchPropertyType,
      //   property:searchProperty
      //  }
      // })
   /// return this.getUserApi(this.searchPropertyFor_Offer ,{params:params}, path, feature);
     return this.http.get(this.Property_url,options)
}

  //Property
  delete_property_img = this.url + 'property/deleteFile';
  deleteFile(data: any, id: number) {
    let bearerToken = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
      })
    };
    return this.http.post(this.delete_property_img + '/' + id, data, httpOptions);
  }

  Property_url = this.url + 'property'
  addProperty(data: any) {
    let path = 'master/property';
    let feature = 'Properties'
    return this.postUserApi(this.Property_url, data, path, feature);
  }

  getProperties() {
    let path = 'master/property';
    let feature = 'Properties'
    return this.getUserApi(this.Property_url, path, feature);
  }

  getProperty(id: number) {
    let path = 'master/property';
    let feature = 'Properties'
    return this.getSingleUserApi(this.Property_url, id, path, feature)

  }

  update_Property(id: number, data: any) {
    let path = 'master/property';
    let feature = 'Properties'
    return this.UpdateSingleUserApi(this.Property_url,id,data,path,feature);
    // return this.http.put(this.Property_url + '/' + id, data, httpOptions);
  }

  searchProperty_url = this.url + 'searchProperties?search=';
  getSearchProperty(searchData: any) {
    let path = 'master/property';
    let feature = 'Properties'
    return this.getUserApi(this.searchProperty_url + searchData, path, feature);
  }

  //projectPropertyType
  Project_property_type_url = this.url + 'projectPropertyType'
  getprojectPropertyTypes() {
    let path = 'master/project_property_type';
    let feature = 'Project Property Types'
    return this.getUserApi(this.Project_property_type_url, path, feature);
  }

  addprojectPropertyType(data: any) {
    let path = 'master/project_property_type';
    let feature = 'Project Property Types'
    return this.postUserApi(this.Project_property_type_url, data, path, feature);
  }

  getprojectPropertyType(id: number) {
    let path = 'master/project_property_type';
    let feature = 'Project Property Types'
    return this.getSingleUserApi(this.Project_property_type_url,id,path,feature);

  }

  updateprojectPropertyType(id: number, data: any) {
    let path = 'master/project_property_type';
    let feature = 'Project Property Types'
    return this.UpdateSingleUserApi(this.Project_property_type_url,id,data,path,feature);
  }

  deleteprojectPropertyType(id: number) {
    let path = 'master/project_property_type';
    let feature = 'Project Property Types'
    return this.deleteSingleUserApi(this.Project_property_type_url, id,path,feature)
  }

  // property type api
  property_type_url = this.url + 'propertyType';
  getPropertyTypes() {
    let path = 'master/property_type';
    let feature = 'Property Types'
    return this.getUserApi(this.property_type_url, path, feature);
  }

  addPropertyType(data: any) {
    let path = 'master/property_type';
    let feature = 'Property Types'
    return this.postUserApi(this.property_type_url, data, path, feature);
  }

  getPropertyType(id: number) {
    let path = 'master/property_type';
    let feature = 'Property Types'
    return this.getSingleUserApi(this.property_type_url, id, path, feature)

  }

  updatePropertyType(id: number, data: any) {
    let path = 'master/property_type';
    let feature = 'Property Types'
    return this.UpdateSingleUserApi(this.property_type_url,id,data,path,feature);

  }

  deletePropertyType(id: number) {
    let path = 'master/property_type';
    let feature = 'Property Types'
    return this.deleteSingleUserApi(this.property_type_url, id,path,feature)
  }

  //lead pagination
  pagination_url = this.url + 'lead?' + 'page=';
  getPagination(pageNo: number) {
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.getUserApi(this.pagination_url + pageNo, path, feature);
  }

  paginationD_url = this.url + 'deactiveLead?' + 'page=';
  getDPagination(pageNo: number) {
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.getUserApi(this.paginationD_url + pageNo, path, feature);
  }

  paginationUncalled_url = this.url + 'uncalledLead?' + 'page=';
  paginationUncalled(pageNo: number) {
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.getUserApi(this.paginationUncalled_url + pageNo, path, feature);
  }

  //lead api
  Lead_url = this.url + 'lead'
  addLead(data: any) {
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.postUserApi(this.Lead_url, data, path, feature);
  }

  getLeads() {
    let path = 'lead/lead'
    let feature = 'Leads'
    return this.getUserApi(this.Lead_url, path, feature);
  }

  getLead(id: number) {
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.getSingleUserApi(this.Lead_url, id, path, feature)
  }

  updateLead(id: number, data: any) {
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.UpdateSingleUserApi(this.Lead_url,id,data,path,feature);
  }

  deActivate_url = this.url+'deactivateLead';
  deActivateLead(id:number){
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.UpdateSingleUserApi(this.deActivate_url,id,null,path,feature)
  }

  activate_url= this.url+'activateLead';
  ActivateLead(id:number){
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.UpdateSingleUserApi(this.activate_url,id,null,path,feature);
  }

  export_Lead = this.url+'exportLead';
  exportLead(leadType:any){
    let bearerToken = localStorage.getItem('token');
    let headers = new HttpHeaders({
      "Authorization": "Bearer " + bearerToken, // Auth header
    });
    this.http
    .get(this.export_Lead+'/'+leadType, { headers, responseType: "blob" }) //set response Type properly (it is not part of headers)
    .toPromise()
    .then(blob => {
      FileSaver.saveAs(blob, leadType+Date.now()+'.csv');
    })
    .catch(err => console.error("download error = ", err))

    //return "hrithik";
  }

  import_url = this.url+'importActiveLead';
  importBatch(data:any){
    let path = 'lead/lead';
    let feature = 'Leads'
    return this.postUserApi(this.import_url,data,path,feature);
  }

  //applicableoffers_url = this.url+'applicableOffers?propertyId= &paymentType= ';
  applicableoffers_url = this.url + 'applicableOffers';
  getapplicableOffers(filterData1: any, filterData2: any) {
    {
      const params = new HttpParams({
        fromObject: {
          propertyId: filterData1,
          paymentType: filterData2,
        }
      })
      return this.http.get(this.applicableoffers_url, { params: params })
      //return this.getUserApi(this.applicableoffers_url+applicableOfferData);
    }
  }

  deActiveleads_url = this.url+'deactiveLead';
  deActiveleads(){
    let path = 'lead/lead'
    let feature = 'Leads'
    return this.getUserApi(this.deActiveleads_url, path, feature);
  }

  uncalled_leads = this.url+'uncalledLead'
  getUncalledLeads(){
    let path = 'lead/lead'
    let feature = 'Leads'
    return this.getUserApi(this.uncalled_leads, path, feature);
  }

  follow_up_url = this.url+'todaysFollowUp'
  getTodaysFollwUpLeads(){
    let path = 'lead/lead'
    let feature = 'Leads'
    return this.getUserApi(this.follow_up_url, path, feature);
  }


  followUpFilter(filterData:any){
    let bearerToken = localStorage.getItem('token');
    let options = {
      params: new HttpParams({
        fromObject:{
          project:filterData
        }
      }),
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': 'lead/lead',
        'feature':'Leads'
      })
    }
    return this.http.get(this.follow_up_url,options)
  }

  //helping api's
  getUserApi(url: any, path: any, feature: any) {                                            // Get All Data
    let bearerToken = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': path,
        'feature': feature

      })
    };
    return this.http.get(url, httpOptions);
  }

  getModuleApi(url: any) {                                            // Get All Data
    let bearerToken = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken
      })
    };

    return this.http.get(url, httpOptions);
  }

  postUserApi(url: any, formData: any, path: any, feature: any) {                                            // Add Data
    let bearerToken = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': path,
        'feature': feature
      })
    };
    return this.http.post(url, formData, httpOptions);
  }

  getSingleUserApi(url: any, id: number, path: any, feature: any) {                                            // Get Single Data
    let bearerToken = localStorage.getItem('token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': path,
        'feature': feature
      })
    };
    return this.http.get(url + '/' + id, httpOptions);
  }


  UpdateSingleUserApi(url: any, id: number, data: any, path:any, feature:any) {
    let bearerToken = localStorage.getItem('token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': path,
        'feature': feature
      })
    };
    return this.http.put(url + '/' + id, data, httpOptions);

  }

  deleteSingleUserApi(url: any, id: any, path:any,feature:any) {                                            // delete by id data
    let bearerToken = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': path,
        'feature': feature
      })
    };
    return this.http.delete(url + '/' + id, httpOptions);
  }
  //helping api end

  //Departmentss API
  dept_url = this.url + 'department';
  addDept(data: any) {
    let path = 'master/department';
    let feature = 'Departments'
    return this.postUserApi(this.dept_url, data, path, feature);
  }

  getDeprtments() {
    let path = 'master/department';
    let feature = 'Departments'
    return this.getUserApi(this.dept_url, path, feature);
  }


  getDepartment(id: number) {
    let path = 'master/department'
    let feature = 'Departments'
    return this.getSingleUserApi(this.dept_url, id, path, feature)
  }

  updateDepartment(id: number, data: any) {
    let path = 'master/department'
    let feature = 'Departments'
    return this.UpdateSingleUserApi(this.dept_url,id,data, path,feature)
  }

  deleteDepartment(id: number) {
    let path = 'master/department';
    let feature = 'Departments'
    return this.deleteSingleUserApi(this.dept_url, id,path,feature)
  }

  //Profession API
  profession_url = this.url + 'profession';
  getProfessions() {
    let path = 'lead/profession';
    let feature = 'Professions'
    return this.getUserApi(this.profession_url, path, feature);
  }

  addProfession(data: any) {
    let path = 'lead/profession';
    let feature = 'Professions'
    return this.postUserApi(this.profession_url, data, path, feature);
  }

  getProfession(id: number) {
    let path = 'lead/profession';
    let feature = 'Professions'
    return this.getSingleUserApi(this.profession_url, id, path, feature)
  }

  updateProfession(id: number, data: any) {
    let path = 'lead/profession';
    let feature = 'Professions';
    return this.UpdateSingleUserApi(this.profession_url,id,data,path,feature);

  }

  deleteProfession(id: number) {
    let path = 'lead/profession';
    let feature = 'Professions'
    return this.deleteSingleUserApi(this.profession_url, id,path,feature)
  }

  //prebooking API
  prebooking_url = this.url + 'preBooking';
  addPreBooking(data: any) {
    let path = 'lead/pre_booking';
    let feature = 'Pre Bookings'
    return this.postUserApi(this.prebooking_url, data, path, feature);
  }

  getPreBooking(id: number) {
    let path = 'lead/pre_booking';
    let feature = 'Pre Bookings'
    return this.getSingleUserApi(this.prebooking_url, id, path, feature)
  }

  //property
  deleteProperty(id: number) {
    let path = 'master/property';
    let feature = 'Properties'
    return this.deleteSingleUserApi(this.Property_url, id,path,feature)
  }

  //PaymentVia
  paymentvia_url = this.url + 'paymentVia';
  getPaymentVia() {
    let path = 'master/payment_via';
    let feature = 'Payment Via'
    return this.getUserApi(this.paymentvia_url, path, feature);
  }

  // Customer

  customer_url = this.url + 'customer';
  getCustomers() {
    let path = 'collection/customer';
    let feature = 'Customers'
    return this.getUserApi(this.customer_url, path, feature);
  }

  addcustomer(data: any) {
    let bearerToken = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': 'collection/customer',
        'feature': 'Customers'
      })
    };
    // return this.http.post(this.customer_url, data, httpOptions);
    return this.http.post(this.customer_url, data, httpOptions);
  }

  getCustomer(id: number) {
    let path = 'collection/customer';
    let feature = 'Customers'
    return this.getSingleUserApi(this.customer_url, id, path, feature)
  }

  //module
  modules_url = this.url + 'modulers';
  getModules() {
    return this.getModuleApi(this.modules_url);
  }

  //filter Properties

getFilterProperties(filterData1:any,filterData2:any,filterData3:any) {
  {
    let bearerToken = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': 'master/property',
        'feature': 'Properties'
      }),
      params: new HttpParams({
        fromObject:{
          project: filterData1,
          propertyType:filterData2,
          status:filterData3
        }
      })
    }

    return this.http.get(this.Property_url, options)
  }
}

// For Dashboard pie chart
LeadStatus_url=this.url+'dashboard1'
getLeadReport()
{
    let path = 'collection/customer';
    let feature = 'Customers'
    return this.getUserApi(this.LeadStatus_url, path, feature);
}

//For Dashboard bar chart
Status_url=this.url+'dashboard2'
getStatusReport()
{
  let path = 'collection/customer';
  let feature = 'Customers'
  return this.getUserApi(this.Status_url, path, feature);
}

//For Dashboard Bar chart against the project
getChartProjectWise(filterData1: any,filterData2: any, filterData3:any) {
  {
    let bearerToken = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + bearerToken,
        'path': 'collection/customer',
        'feature': 'Customers'
      }),
      params: new HttpParams({
        fromObject: {
          project: filterData1,
          user: filterData2,
          year:filterData3
        }
      })
    }
    //return this.http.get(this.Status_url, { params: params })
    //return this.getUserApi(this.applicableoffers_url+applicableOfferData);
    return this.http.get(this.Status_url, options);
  }
}


}

