import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { gldetailmodel } from './model/gldetailmodel';
import { bankdetailmodel } from './model/bankdetailmodel';
import { HttpClient } from '@angular/common/http'
import { customerdetail } from './model/customerdetail.model';
import { glditemdetail } from './model/glditemdetail.model';
import { uploadphotomodel } from './model/uploadphotomodel';
import { glcustomerdetail } from './glcustomerdetail.service';
import { customerdropdowndetail } from './model/customerdropdowndetail.model';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { notStrictEqual } from 'assert';
import { Guid } from 'guid-typescript';
import { stringify } from '@angular/compiler/src/util';
// import jquery = require("jquery");
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [glcustomerdetail]
})


export class AppComponent {
  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  videoWidth = 20;
  videoHeight = 20;
  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };
  title = 'gold-loan';
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  pincontrolpattern = "^((\\+91-?)|0)?[0-9]{6}$";
  isValidFormSubmitted = false;
  popup: boolean = false;
  popupsearch: boolean = false;
  popupphoto:boolean=false;
  popupBank:boolean=false;
  click: boolean = false;
  shownspin:boolean=false;
  errorMessage: string;
  public citys: customerdropdowndetail[];
  public banks: customerdropdowndetail[];
  public prooftypes: customerdropdowndetail[];
  public customerCode: customerdropdowndetail[];
  public currentgoldrate: gldetailmodel[];
  public servicechargeamt: gldetailmodel[];
  customerdetailgrid: customerdetail[];
  district: customerdetail[];
  public glnumberpub: gldetailmodel[];
  public pawnticket: gldetailmodel[];
  public schemename: gldetailmodel[];
  public schemedetail: gldetailmodel[];
  public financeyearid: gldetailmodel[];
  public purityratepercentage: glditemdetail[];
  public ornamenttypes: customerdropdowndetail[];
  public branchlist:customerdropdowndetail[];
  public puritytypes: customerdropdowndetail[];
  sampleform: FormGroup;
  filenamevars: string = "";
  filestreamvars:string="";
  BranchId:string="C8A07BB1-CB62-4441-B5A7-AD64BD09F732";
  CompanyId:string="B90A1259-1D3A-43AA-9254-15DC3D149E23";
  financialyear:string="2021-2022"
  
  //public filenamevars: Array<any> = [];
  constructor(private customerservice: glcustomerdetail, private _http: HttpClient, private renderer: Renderer2) {
this.getbranchdetails(this.BranchId)
    this.getallcity();
    this.getallidprooftype();
    this.getcustomercodebybranch(this.custdetail.BranchId);
    this.getcurrentgoldrate();
    this.getgoldloannumber(this.golddetail.branchid, this.golddetail.companyid);
    this.getpawnticketnumber(this.golddetail.branchid, this.golddetail.companyid);
   // this.getschemename(this.golddetail.branchid, this.golddetail.companyid);
    this.getornamenttype();
    this.getpuritytype();
    this.getfinancialyearbyId(this.financialyear);
   // this.getcustomercodebybranchdisplay(this.custdetail.BranchId);
    //this.savecustomerdetails("");
    //this.showMsg = false;

  }


  ngOnInit() {
    //this.startCamera();
  }

 

  handleError(error) {
    console.log('Error: ', error);
  }
  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }
branchnamess:string;
LandLine:string;
  getbranchdetails(selecteddetail: any) {
    debugger;
    this.customerservice.getbranchdetails(this.BranchId)
      .subscribe(res => {
       
        //console.log(res);
        this.branchlist = res;
        //var branchdetailsobj = Object.keys(res).map(key => res[key]);
         this.branchnamess = res[0].name;
        this.LandLine =res[0].landLine;
      })
  }

  getallcity() {
    // alert("calling")
    this.customerservice.getallcity().subscribe(res => {
      // alert(res)
      debugger;
      this.citys = res;
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
  }

   onSelectcity(value: string) {
  
    this.customerservice.onSelectcity(value)
      .subscribe(res => {

        this.custdetail.district = res[0].name;
      
        this.customerservice.onSelectcitystate(res[0].districtId)
        
          .subscribe(res => {
            
            this.custdetail.state = res[0].name;
      
          })
      })
      
  }

  getallidprooftype() {
    // alert("calling")
    this.customerservice.getallidprooftype().subscribe(res => {
      // alert(res)
      debugger;
      this.prooftypes = res;
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
  }
  getcustomercodebybranch(branchid) {
    // alert("calling")

    this.customerservice.getcustomercodebybranch(this.BranchId).subscribe(res => {

      debugger;
      this.customerCode = res;

    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
  }

  custdetail: customerdetail = {
    id: "",
    customerCode: 0,
    firstname: "",
    lastname: "",
    customerName: "",
    locality: "",
    addressOne: "",
    addresstwo: "",
    cityid: "",
    district: "",
    state: "",
    pin: "",
    Dob: null,
    Dobirth: "",
    idprooftypeid: "",
    gender: "",
    mobile: null,
    landlinenumber: null,
    email: "",
    photoPath: "",
    BranchId: this.BranchId,
    PhotoUrl:"",
    name:"",
    districtId:""
  }

  // savecustomerDetails(data) {
  //   debugger;
  //   this.custdetail.Dobirth.toString();
  //   this._http.post('http://localhost:61079/api/CreateGoldLoan/SaveCustomerDetails', data).subscribe((result) => {
  //     console.warn("result", result)
  //   })
  //   console.warn(data);
  // }
  public succmsgval: any
  showcussaveMsgsuc: boolean = false;
  showcussaveMsgerr: boolean = false;
  savecustomerdetails(custdet) {
    this.shownspin=true;
    custdet['BranchId']=this.BranchId;
    custdet['CustomerCode']=this.customerCode;
debugger;
    // const newEmployee2: customerdetail = Object.assign({}, this.custdetail);
    // console.log("test datas :" +  this.custdetail.email)
    //this.custmdetails.Dobirth.toString();
   
    this.customerservice.savecustomerdetails(custdet).subscribe(

      // res => console.log('success', res),
      res => {

        this.succmsgval = res,
        error => console.error('error', error)
this.shownspin=false;
        if (this.succmsgval == 1) {
          this.showcussaveMsgsuc = true
          this.clearSearch();
          this.getcustomercodebybranchdisplay(this.custdetail.BranchId)
        }
        else if (this.succmsgval == 0 || this.succmsgval==2) {
          this.showcussaveMsgerr = true
        }
      });

    this.showcussaveMsgsuc = false

  }

  clearSearch() {
    this.customerCode = null;
    this.custdetail.firstname ='' ;
    this.custdetail.lastname ='' ;
    this.custdetail.locality ='' ;
    this.custdetail.addressOne ='' ;
    this.custdetail.district ='' ;
    this.custdetail.state ='' ;
    this.custdetail.pin ='' ;
    this.custdetail.Dob =null ;
    this.custdetail.mobile =null ;
    this.custdetail.landlinenumber =null ;
    this.custdetail.email ='';
  }
  // clicked = false;
  // actionMethod() {

  //   console.log("actionMethod was called!");
  // }

  getcustomercodebybranchdisplay(selecteddetail: any) {
    debugger;
    this.customerservice.getcustomercodebybranchdisplay(this.BranchId)
      .subscribe(res => {
       
        console.log(res);
        this.customerdetailgrid = res;
        ////console.log(this.customerdetailgrid);
        var cusdisplay = Object.keys(res).map(key => res[key]);
         this.golddetail.customerCode = cusdisplay[1];
        this.golddetail.customerName =cusdisplay[5];
        this.golddetail.mobile = cusdisplay[3]
       this.golddetail.email =  cusdisplay[4];
         this.golddetail.addressOne =  cusdisplay[2]
        // this.golddetail.customerid = res[0].id;
        //console.log(this.customerdetailgrid);

      })
  }

  searchcustomerdetails(custsearchkeyword) {
    debugger;

    this.customerservice.searchcustomerdetails
      (this.custdetail.customerCode, this.custdetail.firstname, this.BranchId).subscribe(
        res => {
          //   res => console.log('success',res),
          //  error=>console.error('error',error)
          this.customerdetailgrid = res;
          // alert(this.customerdetailgrid);

          // console.dir(this.customerdetailgrid);
        }
      );

    //this.showMsg = true;
  }
  public customerselectionCode: customerdropdowndetail[];
  RowSelected(custsearch: any) {
    debugger;
    //console.log(custsearch);
    //this.custdetail.customercodes = custsearch.customerCode;
    //this.custdetail.customername = custsearch.customerName;
    // alert(custsearch.customerCode);
    this.customerselectionCode = custsearch.customerCode;
  }

  clickselectedcusdetsearch(selecteddetail: any) {
    debugger;
    this.customerservice.clickselectedcusdetsearch(this.customerselectionCode, this.BranchId)
      .subscribe(res => {

        this.customerdetailgrid = res;
        this.golddetail.customerCode = res[0].customerCode;
        this.golddetail.customerName = res[0].customerName;
        this.golddetail.mobile = res[0].mobile;
        this.golddetail.email = res[0].email;
        this.golddetail.addressOne = res[0].addressOne;
        this.golddetail.customerid = res[0].id;
        //console.log(this.customerdetailgrid);

      })
  }

  golddetail: gldetailmodel = {
    customerid: "",
    currentgoldrate: null,
    glnumber: null,
    customerCode: null,
    customerName: "",
    pawnticketno: null,
    mobile: null,
    email: "",
    addressOne: "",
    branchid: this.BranchId,
    companyid: this.CompanyId,
    schemenameid: "",
    ratePerGram: null,
    riskCategory: "",
    effectiveTo: null,
    goldloanamount: null,
    maximumamount: null,
    excessamount: null,
    totalloanamount: null,
    servicecharge: null,
    loantype: "",
    totalgrosswt: null,
    totalnetwt: null,
    paymentmode: "",
    remarks: "",
    fieldarray: null,
    photoUrl:"",
    interestPercentage:null,
    interestPercentage2:null,
    interestPercentage3:null,
    interestPercentage4:null,
    fromMonth:null,
    fromMonth2:null,
    fromMonth3:null,
    fromMonth4:null,
    toMonth:null,
    toMonth2:null,
    toMonth3:null,
    toMonth4:null,
    financialYearId:""
    // contactno:: 0
  }


  getgoldloannumber(branchid,companyid) {
    // alert("calling")
    this.customerservice.getgoldloannumber(this.BranchId, this.CompanyId).subscribe(res => {

      debugger;
      this.glnumberpub = res;
      this.golddetail.glnumber = parseInt(this.glnumberpub.toString())
      // console.log(this.glnumberpub);

    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
  }


  getcurrentgoldrate() {
    debugger;
    this.customerservice.getcurrentgoldrate().subscribe(res => {

      debugger;
      this.currentgoldrate = res;
      //console.log(this.currentgoldrate);
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
  }
 
  getfinancialyearbyId(financialyear) {
     //alert("calling")
    this.customerservice.getfinancialyearbyId(this.financialyear).subscribe(res => {

      debugger;
      this.financeyearid = res;
      this.golddetail.financialYearId = this.financeyearid.toString();
     
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
  }

  getpawnticketnumber(branchid, companyid) {
    // alert("calling")
    this.shownspin=true;
    this.customerservice.getpawnticketnumber(this.BranchId, this.CompanyId).subscribe(res => {

      debugger;
      this.pawnticket = res;
      // console.log(this.pawnticket);
      //alert(this.glnumberpub);
      this.shownspin=false;
      this.golddetail.pawnticketno = parseInt(this.pawnticket.toString() + this.glnumberpub.toString())
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
    
  }

  clicknormalloan(t){
    this.getschemename(this.golddetail.branchid, this.golddetail.companyid);
  }

  getschemename(branchid, companyid) {
    
    this.customerservice.getschemename(this.BranchId, this.CompanyId).subscribe(res => {
      // alert(res)
      debugger;
      this.schemename = res;
      //console.dir(this.schemename)
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)

  }

  onSelectedSchemeDetail(value: string) {
   
    //console.log("the selected value is " + value);
    this.customerservice.onSelectedSchemeDetail(value,this.BranchId,this.CompanyId)
      .subscribe(res => {

        this.schemedetail = res;
        this.golddetail.schemenameid = value;
        this.golddetail.ratePerGram = res[0].ratePerGram;
        this.golddetail.riskCategory = res[0].riskCategory;
        this.golddetail.effectiveTo = res[0].effectiveTo;
        this.golddetail.interestPercentage = res[0].interestPercentage;
        this.golddetail.interestPercentage2 = res[1].interestPercentage;
        this.golddetail.interestPercentage3 = res[2].interestPercentage;
        this.golddetail.interestPercentage4 = res[3].interestPercentage;
        
        this.golddetail.fromMonth = res[0].fromMonth;
        this.golddetail.fromMonth2 = res[1].fromMonth;
        this.golddetail.fromMonth3 = res[2].fromMonth;
        this.golddetail.fromMonth4 = res[3].fromMonth;
        
        this.golddetail.toMonth = res[0].toMonth;
        this.golddetail.toMonth2 = res[1].toMonth;
        this.golddetail.toMonth3 = res[2].toMonth;
        this.golddetail.toMonth4 = res[3].toMonth;
        //console.log(this.schemedetail);
       
    
      })
    this.getgoldservicecharge();

    this.newAttribute.maxamount = ((this.newAttribute.grosswt - this.newAttribute.stonewt) * (this.golddetail.ratePerGram) * (this.golditemdetail.ratePercentage / 100) *
      (this.newAttribute.carat) / 22).toFixed(2)
    this.newAttribute.amountpergram = (((this.newAttribute.grosswt - this.newAttribute.stonewt) * (this.golddetail.ratePerGram) * (this.golditemdetail.ratePercentage / 100) *
      (this.newAttribute.carat) / 22) / (this.newAttribute.grosswt - this.newAttribute.stonewt)).toFixed(2)
  }

  

  golditemdetail: glditemdetail = {
    id: "",
    ornament: "",
    itemName: [{
      itemName: "",
      id: ""
    }],
    count: 1,
    broken: true,
    carat: null,
    grosswt: null,
    stonewt: null,
    stoneperc: null,
    netwt: null,
    puritytype: "",
    amountpergram: null,
    maxamount: null,
    ratePercentage: null
  }


  getornamenttype() {
    // alert("calling")
    this.customerservice.getornamenttype().subscribe(res => {
      // alert(res)
      debugger;

      this.ornamenttypes = res;
      //console.dir('ornamenttypes'+ JSON.stringify(this.ornamenttypes))
      //console.dir(this.ornamenttypes)
    }
      , error => this.errorMessage = <any>error);
  }

  onchangecarat(caratval) {
    // do something with new value
    this.newAttribute.maxamount = ((this.newAttribute.grosswt - this.newAttribute.stonewt) * (this.golddetail.ratePerGram) * (this.golditemdetail.ratePercentage / 100) *
      caratval / 22).toFixed(2)
    this.newAttribute.amountpergram = (((this.newAttribute.grosswt - this.newAttribute.stonewt) * (this.golddetail.ratePerGram) * (this.golditemdetail.ratePercentage / 100) *
      caratval / 22) / (this.newAttribute.grosswt - this.newAttribute.stonewt)).toFixed(2)
  }



  getpuritytype() {
    // alert("calling")
    this.customerservice.getpuritytype().subscribe(res => {
      // alert(res)
      debugger;

      this.puritytypes = res;
      //console.dir('ornamenttypes'+ JSON.stringify(this.ornamenttypes))
      //console.dir(this.puritytypes)
    }
      , error => this.errorMessage = <any>error);

  }
  // nwts;
  // @ViewChild('nwt') nwt:ElementRef
  //this.nwts = nwt;


  //public numbe
  onSelectedpuritytype(newobj) {

    this.customerservice.onSelectedpuritytype(newobj.id).subscribe(res => {

      debugger;
      // this.purityratepercentage = res;
      this.newAttribute.netwt = this.newAttribute.grosswt - this.newAttribute.stonewt;
      this.golditemdetail.ratePercentage = res[0].ratePercentage

      // console.log(this.purityratepercentage);
      this.newAttribute.maxamount = ((this.newAttribute.grosswt - this.newAttribute.stonewt) * (this.golddetail.ratePerGram) * (this.golditemdetail.ratePercentage / 100) *
        (this.newAttribute.carat) / 22).toFixed(2)
      this.newAttribute.amountpergram = (((this.newAttribute.grosswt - this.newAttribute.stonewt) * (this.golddetail.ratePerGram) * (this.golditemdetail.ratePercentage / 100) *
        (this.newAttribute.carat) / 22) / (this.newAttribute.grosswt - this.newAttribute.stonewt)).toFixed(2)
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)

  }

  newattrgrosswtchange(grosswts) {
    // do something with new value
    if (this.newAttribute.stonewt == null)
      this.newAttribute.stonewt = 0
    this.newAttribute.netwt = grosswts - this.newAttribute.stonewt

    this.newAttribute.maxamount = ((this.newAttribute.netwt) * (this.golddetail.ratePerGram) * (this.golditemdetail.ratePercentage / 100) *
      (this.newAttribute.carat) / 22).toFixed(2)

  }

  newattrstonewtchange(stonewts) {
    // do something with new value
    this.newAttribute.netwt = this.newAttribute.grosswt - stonewts

    this.newAttribute.maxamount = ((this.newAttribute.netwt) * (this.golddetail.ratePerGram) * (this.golditemdetail.ratePercentage / 100) *
      (this.newAttribute.carat) / 22).toFixed(2)

  }

  goldloanMinus(evnet: any):void {
    debugger;
    if(this.golddetail.maximumamount+50 < evnet)
    {
      this.golddetail.goldloanamount=0;
    
      alert("Excess Amount Maximum Limit Exceed");
      
    }
    else
{
    this.golddetail.excessamount = evnet - this.golddetail.maximumamount
    if (this.golddetail.excessamount <= 0) {
      this.golddetail.excessamount = 0;
    }
    else {
      this.golddetail.excessamount
    }
  }
  }

  getgoldservicecharge() {
    debugger;
    this.customerservice.getgoldservicecharge().subscribe(res => {

      debugger;
      this.servicechargeamt = res;
      this.golddetail.servicecharge = parseInt(this.servicechargeamt.toString())
      //console.log(this.golddetail.servicecharge);
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
  }

  // savegoldDetails(): void {
  //   const newEmployee: gldetailmodel = Object.assign({}, this.golddetail);
  //  // console.log("test data :" + this.golddetail.goldloanamount)
  // }


  /////table grid start/////
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  // maxamounts: number;
  //public totalamount:number;
  addFieldValue() {
    this.newAttribute.ornament = this.newAttribute.itemName.id
    this.newAttribute.puritytype = this.newAttribute.description.id
    this.fieldArray.push(this.newAttribute);
    console.log(this.fieldArray);
    this.newAttribute = {};
    //     let sum: number = 0;
    //     this.fieldArray.forEach(a => sum += a.maxamount);
    // console.log(sum );

    let sumtt: number = this.fieldArray.map(a => parseFloat(a.maxamount)).reduce(function (a, b) {
      return a + b;

    });
    //console.log(sumtt);

    this.golddetail.maximumamount = sumtt;
    this.golddetail.maximumamount.toFixed(2);

    let totgrosswt: number = this.fieldArray.map(a => parseFloat(a.grosswt)).reduce(function (a, b) {
      return a + b;

    });
    // console.log(totgrosswt);
    this.golddetail.totalgrosswt = totgrosswt;
    // let totnt:any=this.fieldArray.map(a=>a.grosswt-a.stonewt)
    let totnetwt: number = this.fieldArray.map(a => parseFloat(a.netwt)).reduce(function (a, b) {
      return a + b;

    });
    //console.log(totnetwt);
    this.golddetail.totalnetwt = totnetwt;

  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  public localVar: any;
  showMsg2: boolean = false;
  showMsg3: boolean = false;
  disableTextbox =  false;
  isShownsavebutton: boolean = true ; 
  oncancelgoldcreation(): void{
    
    window.location.reload();
    
  }

  onsavegolddetails($event) {
    debugger;
    
    if(confirm("Are you sure want to Create Gold Loan ")) {
      this.shownspin=true;
    
    ////const newEmployee: gldetailmodel = Object.assign({}, this.golddetail);
    this.golddetail.fieldarray = this.fieldArray;
    //console.log("test data :" + this.golddetail.fieldarray)
    this.customerservice.savegolddetails(this.golddetail).subscribe(

      res => {
        this.localVar = res,
        this.shownspin=false;
        error => console.error('error', error)
        //alert(this.localVar)
        debugger;
        if (this.localVar == 1) {
          this.disableTextbox = !this.disableTextbox;
          this.showMsg2 = true;
          this.showMsg3 = false;
          this.isShownsavebutton=  false;
        }
        else if (this.localVar == 0) {
          this.showMsg3 = true;
          this.showMsg2 = false;
        }
      });
    }
    //console.dir("test data :" + this.golddetail.fieldarray)


  }
 
goldphotoclick(){
  // alert();
  this.showgoldphotoMsgsuc=false;
  this.startCamera();
}
customerphotoclick(){
 
  this.startCamera();
}
  // ornamenttypes1 = [
  //   { id: "C3716B36-A7B3-4C19-A8F4-92F447EC0093", itemName: "Anklet" },
  //   { id: "09F233B3-4F4C-4CAF-B927-A8FD3B5998CC", itemName: "Aranjanam" },
  //   { id: "54335B6E-1A1D-47E4-89EA-ED1C6E59E375", itemName: "Bangle" },
  //   { id: "E50DD094-2358-4B4A-AB1A-45A00B4E5B93", itemName: "Bracelet" },
  //   { id: "0209D4FB-7682-4514-990C-0DB0FDF3703C", itemName: "Chain" },
  //   { id: "C686DE2E-EAD7-4F09-A4B0-14CD10A2D10C", itemName: "ChainWithLocket" },
  //   { id: "7C90EC83-9999-4811-9026-1B13FB0041EE", itemName: "Coin" },
  //   { id: "DBDD7ABD-C9F4-4238-A92B-2A00F999FDF2", itemName: "Drops" },
  //   { id: "9B042710-4702-4D28-B466-92028E5F4126", itemName: "HipChain" },
  //   { id: "63C5D751-C9B6-4FAA-A377-BBAB9FA3FF54", itemName: "Locket" },
  //   { id: "A05F1BFF-425B-427F-816E-D1E0CC4B41F1", itemName: "Misc" },
  //   { id: "0EB36E07-BDD0-48A9-9D9C-1880B729D1FD", itemName: "Necklace" },
  //   { id: "02C89ACF-721F-47E0-AC5E-383B811E2580", itemName: "Ring" },
  //   { id: "76D9484F-3FE6-4AE5-BAE0-6BDE26FA030E", itemName: "Stud" },
  //   { id: "CF228B5D-9090-40B6-84BD-B7E967BD77C7", itemName: "StudWithDrops" }
  // ];



  /////tablegrid end/////
  public files: any[];

  capture() {
    
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
  }

  public id: Guid;
  onUpload() {

    var imageName = this.id = Guid.create();
    imageName.toString() + ".jpg";
    //alert(imageName.toString() + ".jpg")
  }

  uploadphoto: uploadphotomodel = {
    FileName: "",
    BlobName: "",
    FileStream: "",
    status:null,
    data:""
  }


  public localVars: any;
 
  uploadgoldimagebtn(){
  
    debugger;
    
       var imageName = this.id = Guid.create()
       var imageNames= imageName+ '.jpg'

        let canvass = <HTMLCanvasElement> document.getElementById('goldimage');
        var img = canvass.toDataURL("image/jpeg",1.0);   
       // alert(img)
        var splitimg= img.split(',')[1];

       //alert(splitimg)
      //  var splitimgs = splitimg.substr(splitimg.indexOf('/') + 1);
      // alert(splitimgs);
        this.uploadphoto.FileName = imageNames.toString();
        this.uploadphoto.FileStream= JSON.stringify(splitimg);
        this.uploadphoto.BlobName="itemimage".toLowerCase()
        this. uploadimageazure(this.uploadphoto) ;

      }

      showgoldphotoMsgsuc:boolean=false;
      golduploadstatus:string="Not Uploaded";
      uploadimageazure(t) {
        debugger;
        this.shownspin=true;
        //alert(this.uploadphoto)
        this.customerservice.postphotoupload(this.uploadphoto).subscribe(
    
              res => {this.localVars = res,
      
              error => console.error('error', error)
              debugger;
              this.shownspin=false;
              
    var values = Object.keys(res).map(key => res[key]);
    this.uploadphoto.status=values[0];
    // this.uploadphoto.data=values[2];
    //alert( values[1]);
    //this.uploadphoto.data='"' + values[2] + '"' +'=43254'; 

    this.uploadphoto.data= values[2] ; 
    JSON.stringify(this.uploadphoto.data); 
    
    this.golddetail.photoUrl=this.uploadphoto.data;
    console.log(this.golddetail.photoUrl );
    if(this.uploadphoto.status==1)
    {
    // this.popupphoto=false;
    this.showgoldphotoMsgsuc=true;
    this.golduploadstatus="PhotoUploaded"
    }
    else{
      alert("Please Upload Photo again");
    }
        });
       
      }

  //public words:string[];
  bindImageToObjetgold(event) {
    debugger;
    var imageName = this.id = Guid.create();
  
    let file = event.target.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(file);


    reader.onload =()=>  {
      //alert(reader.result)
      
      this.filestreamvars = (reader.result as string).split(',')[1];
      //var jsonString = JSON.stringify(reader.result)
      this.uploadphoto.FileName = imageName.toString();
      this.uploadphoto.FileStream= JSON.stringify(this.filestreamvars);
      this. uploadphoto.BlobName="itemimage".toLowerCase()
      
       //alert(this.uploadphoto.FileName);
      //console.log(this.filestreamvars);
     this. uploadimageazure(this.uploadphoto) ;
    }

  }

  uploadcustomerimagebtn()
  {
    debugger;
    this.uploadphoto.FileStream="";
    var cusautoid = this.id = Guid.create()
    var cusautoids= cusautoid+ '.jpg'

     let canvassc = <HTMLCanvasElement> document.getElementById('customerimage');
     var imgc = canvassc.toDataURL("image/jpeg",1.0);   
     //alert(imgc)
     var splitimgc= imgc.split(',')[1];
    //alert(splitimg)
     this.uploadphoto.FileName = cusautoids.toString();
     this.uploadphoto.FileStream= JSON.stringify(splitimgc);
     this.uploadphoto.BlobName="customerimage".toLowerCase()
     this. uploadcusimageazure(this.uploadphoto) ;
     
  }
  showMsgcusphotoupload:boolean=false;
  uploadcusimageazure(t) {
    debugger;
    //alert(this.uploadphoto)
    this.shownspin=true;
    this.customerservice.postphotoupload(this.uploadphoto).subscribe(

          res => {this.localVars = res,
  
          error => console.error('error', error)
          debugger;
         // alert(res);
         this.shownspin=false;
var values = Object.keys(res).map(key => res[key]);
this.uploadphoto.status=values[0];
//this.uploadphoto.data=values[2];
//this.uploadphoto.data='"' + values[2] +'=43254' + '"'; 
this.uploadphoto.data='"' + values[2]  + '"';
JSON.stringify(this.uploadphoto.data); 

this.custdetail.PhotoUrl=this.uploadphoto.data;
//console.log(this.custdetail.PhotoUrl );
if(this.uploadphoto.status==1)
{
this.showMsgcusphotoupload=true;
// alert("Customer Photo Upload  Successfully!");
}
else{
  alert("Please Upload Photo again");
}
    });
    this.showcussaveMsgsuc = false;
     this.showcussaveMsgerr = false;
  }
  bindImageToObjetcus(event) {
    debugger;
   
    var cusautoid = this.id = Guid.create();
   
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);


    reader.onload =()=>  {
      //alert(reader.result)
      
      this.filestreamvars = (reader.result as string).split(',')[1];
      //var jsonString = JSON.stringify(reader.result)
      this.uploadphoto.FileName = cusautoid.toString();
      this.uploadphoto.FileStream= JSON.stringify(this.filestreamvars);
      this. uploadphoto.BlobName="customerimage".toLowerCase()
      
       //alert(this.uploadphoto.FileName);
      //console.log(this.filestreamvars);
     this. uploadcusimageazure(this.uploadphoto) ;
    }


   
    

    //   this.customerservice.postphotoupload(this.uploadphoto).subscribe(

    //     res => {this.localVars = res,

    //     error => console.error('error', error)

    //  debugger;

    //     });
  }

  clickaddbank(){
    
    this.popupBank=true;
    this.getallbank();
  }

  getallbank() {
    // alert("calling")
    this.customerservice.getallbank().subscribe(res => {
      // alert(res)
      debugger;
      this.banks = res;
    }
      , error => this.errorMessage = <any>error);
    // console.dir(this.citys)
  }

  onSelectedbankname(value:string){
    debugger;
    
    this.bankdetail.bankId = value;
  
  }
  bankdetail:bankdetailmodel={
    bankId:"",
    branch:"",
    accountHolder:"",
    accountNumber:"",
    ifscCode:"",
    address:"",
  // cancelledcheqcopy:[],
    cancelledcheqcopystr:"",
    glCustomerId:"",
    passbookcopystr:""
  }


  // fileChangeEventidproof(files: File[]) {
   
  // }
  
  fileChangeEventidproof(event) {
    let fileip = event.target.files[0];
  // console.log(file)
    let readerip = new FileReader();
    readerip.readAsDataURL(fileip);
    readerip.onload =()=>  {
      // alert(reader.result)
      if(!readerip.result) return;
      this.bankdetail.cancelledcheqcopystr = (readerip.result as string).split(',')[1];
    
     
  }
  
  }

  fileChangeEventpassbook(event) {
    let filepb = event.target.files[0];
  // console.log(file)
    let readerpb = new FileReader();
    readerpb.readAsDataURL(filepb);
    readerpb.onload =()=>  {
      // alert(reader.result)
      if(!readerpb.result) return;
      this.bankdetail.passbookcopystr = (readerpb.result as string).split(',')[1];
      //this.bankdetail.cancelledcheqcopystr=this.filesplitbase64;
     
  }
  
  }


  showbanksuccessmsg: boolean = false;
  showbankfailedmsg: boolean = false;
  isShownbanksavebutton:boolean=true;
  isShownbankcancelbutton:boolean=true;
bankvar:any;
  onsavebankdetails(t){
    debugger;
    if(this.bankdetail.bankId=="")
    {
      alert("Please Choose bank Name");
    }
    else if(this.bankdetail.branch=="")
    {
      alert("Please Enter the Bank Branch Name");
    }
    else if(this.bankdetail.accountHolder=="")
    {
      alert("Please Enter the Account Holder Name");
    }
    else if(this.bankdetail.accountNumber=="")
    {
      alert("Please Enter the Account Number");
    }
    else if(this.bankdetail.ifscCode=="")
    {
      alert("Please Enter the Bank IFSC Code");
    }
    else if(this.bankdetail.address=="")
    {
      alert("Please Enter the Bank Address");
    }
   
    else if(this.verifytick==false)
    {
      alert("Please tick the verified Bank Details");
    }
    else{
      this.bankdetail.glCustomerId=this.golddetail.customerid;
      if(confirm("Are you sure want to Create Bank Details ")) {
     
        this.customerservice.savebankdetail(this.bankdetail).subscribe(
    
          res => {
            this.bankvar = res,
    
            error => console.error('error', error)
            ////alert(this.bankvar)
            debugger;
            if (this.bankvar == 1) {
              
              this.showbanksuccessmsg = true;
              this.showbankfailedmsg = false;
              this.isShownbanksavebutton=  false;
              this.isShownbankcancelbutton=false;
            }
            else if (this.bankvar == 0) {
              this.showbanksuccessmsg = true;
              this.showbankfailedmsg = false;
              
            }
          });
        }



    }
    
  }
  verifytick:boolean=false;
  onChecked(obj: any, isChecked: boolean){
    this.verifytick=isChecked;
    //console.log(obj, isChecked); // {}, true || false
    
  }
}
