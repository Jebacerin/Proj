import { Component } from '@angular/core';
import { gldetailmodel } from './model/gldetailmodel';
import { HttpClient} from '@angular/common/http'
import { customerdetail } from './model/customerdetail.model';
import { glditemdetail } from './model/glditemdetail.model';
//import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'gold-loan';
  constructor(private http: HttpClient){}

  golddetail:gldetailmodel ={
    currentgoldrate:"",
    glnumber:null,
    customercode:null,
    customername: "",
    repledgecustomer: "",
    contactno: 0
  }

         
  custdetail:customerdetail ={
    customercodepopup:0,
    firstname: "",
    lastname: "",
    locality: "",
    address1: "",
    address2: "",
    district: "",
    state: "",
    pin: "",
    dateofbirth: null,
    gender: "",
    mobilenumber: null,
    landlinenumber: null,
    email: "",
    photoPath: ""
  }

golditemdetail:glditemdetail={
    ornament: "",
    count: null,
    broken: true,
    carat: null,
    grosswt : null,
    stonewt : null,
    stoneperc: null,
    netwt : null,
    puritytype : "",
    amountpergram:null,
    maxamount:null
}

  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  isValidFormSubmitted = false;
  popup : boolean=false;

  savegoldDetails():void{
    const newEmployee: gldetailmodel = Object.assign({}, this.golddetail);
    console.log("test data :" +  this.golddetail.contactno)
  }

  savecustomerDetails(data)
    {
        this.http.post('http://localhost:61079/',data).subscribe((result)=>{
          console.warn("result",result)
          })  
        console.warn(data);
    }
    

  // savecustomerDetails():void{
  //   const newEmployee2: customerdetail = Object.assign({}, this.custdetail);
  //   console.log("test datas :" +  this.custdetail.email)
  // }
/////table grid start
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }
  /////tablegrid end
  public files: any[];

  contructor() { this.files = []; }
  
  onFileChanged(event: any) {
    this.files = event.target.files;
  }
  
  onUpload() {
    const formData = new FormData();
    for (const file of this.files) {
        formData.append(name, file, file.name);
    }
    this.http.post('url', formData).subscribe(x => "");
  }
 

}
