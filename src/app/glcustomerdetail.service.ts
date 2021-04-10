import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Iicustomerdetail } from './model/icustomerdetail';
import { customerdropdowndetail} from './model/customerdropdowndetail.model';
import { Observable } from 'rxjs';

import { catchError, debounce, map, tap } from 'rxjs/operators';
import { customerdetail } from './model/customerdetail.model';
import { gldetailmodel } from './model/gldetailmodel';
import { glditemdetail } from './model/glditemdetail.model';
import { uploadphotomodel } from './model/uploadphotomodel';
import { bankdetailmodel } from './model/bankdetailmodel';

@Injectable()
export class glcustomerdetail
{
    constructor(private _http: HttpClient)
    {

    }
    private selectedbranchurl = 'http://localhost:61079/api/CreateGoldLoan/GetBranchDetails'; 
    getbranchdetails(branchid):Observable<customerdropdowndetail[]>{
      
      
      
      let branch = new HttpParams().set('branchid', branchid)
      return this._http.get<customerdropdowndetail[]>(this.selectedbranchurl,{params:{branch:branchid}})
    }  

    private cityUrl = 'http://localhost:61079/api/CreateGoldLoan/GetAllCity'; 
    getallcity():Observable<customerdropdowndetail[]> {
        return this._http.get<customerdropdowndetail[]>(this.cityUrl)
        
      }

      private idprooftypeUrl = 'http://localhost:61079/api/CreateGoldLoan/GetAllIdProofType'; 
    getallidprooftype():Observable<customerdropdowndetail[]> {
        return this._http.get<customerdropdowndetail[]>(this.idprooftypeUrl)
        
      }
     
      // private customercodeurl = 'http://localhost:61079/api/CreateGoldLoan/GetCustomerCodeByBranch'; 
      // getcustomercodebybranch():Observable<customerdropdowndetail[]> {
      //   return this._http.get<customerdropdowndetail[]>(this.customercodeurl)
        
      // }
      private customercodeurl = 'http://localhost:61079/api/CreateGoldLoan/GetCustomerCodeByBranch'; 
      getcustomercodebybranch(branch):Observable<customerdropdowndetail[]>{
        let branchid = new HttpParams().set('branchid', branch)
        return this._http.get<customerdropdowndetail[]>(this.customercodeurl,{params:{branchid:branch}})
      }
    
      private savecusurl = 'http://localhost:61079/api/CreateGoldLoan/SaveCustomerDetails'; 
      savecustomerdetails(custdet) {
          return this._http.post<customerdetail[]>(this.savecusurl,custdet)
          
        }

        
        private customersearchurl = 'http://localhost:61079/api/CreateGoldLoan/GetCustomerDetails'; 
        searchcustomerdetails(customerCode,firstname,branchid):Observable<customerdetail[]>{
          
          let cuscode = new HttpParams().set('customerCode', customerCode)
          let name = new HttpParams().set('firstname', firstname)
          let branch = new HttpParams().set('branchid', branchid)
          return this._http.get<customerdetail[]>(this.customersearchurl,
            {params:{cuscode :customerCode,name:firstname,branch:branchid}})
        }   

        private selectedcustomerurl = 'http://localhost:61079/api/CreateGoldLoan/GetselectedCustomerDetails'; 
        clickselectedcusdetsearch(customerCode,branchid):Observable<customerdetail[]>{
          
          let cuscode = new HttpParams().set('customercode', customerCode)
          
          let branch = new HttpParams().set('branchid', branchid)
          return this._http.get<customerdetail[]>(this.selectedcustomerurl,
            {params:{cuscode :customerCode,branch:branchid}})
        }  

        private selectedcustomerdisplayurl = 'http://localhost:61079/api/CreateGoldLoan/GetCustomerCodeDetailsByMax'; 
        getcustomercodebybranchdisplay(branchid):Observable<customerdetail[]>{
          
          
          
          let branch = new HttpParams().set('branchid', branchid)
          return this._http.get<customerdetail[]>(this.selectedcustomerdisplayurl,{params:{branch:branchid}})
        }  

        private currentgoldrateurl = 'http://localhost:61079/api/CreateGoldLoan/GetCurrentGoldRate'; 
        getcurrentgoldrate():Observable<gldetailmodel[]>{
        return this._http.get<gldetailmodel[]>(this.currentgoldrateurl)
      }


      private financialyearurl = 'http://localhost:61079/api/CreateGoldLoan/GetFinancialYearById'; 
      getfinancialyearbyId(finance):Observable<gldetailmodel[]>{
        let financialyear = new HttpParams().set('financialyear', finance)
      return this._http.get<gldetailmodel[]>(this.financialyearurl,{params:{financialyear:finance}})
    }

      private goldnumberurl = 'http://localhost:61079/api/CreateGoldLoan/GetGoldLoanNumber'; 
      getgoldloannumber(branchid,companyid):Observable<gldetailmodel[]>{
        let branch = new HttpParams().set('branchid', branchid)
        let company = new HttpParams().set('companyid', companyid)
        return this._http.get<gldetailmodel[]>(this.goldnumberurl,{params:{branch:branchid,company:companyid}})
      }

      private pawnticketnumberurl = 'http://localhost:61079/api/CreateGoldLoan/GetPawnTicketNumber'; 
      getpawnticketnumber(branchid,companyid):Observable<gldetailmodel[]>{
        let branch = new HttpParams().set('branchid', branchid)
        let company = new HttpParams().set('companyid', companyid)
        return this._http.get<gldetailmodel[]>(this.pawnticketnumberurl,{params:{branch:branchid,company:companyid}})
      }

      private schemenameurl = 'http://localhost:61079/api/CreateGoldLoan/GetSchemeByBranch'; 
      getschemename(branchid,companyid):Observable<gldetailmodel[]>{
        let branch = new HttpParams().set('branchid', branchid)
        let company = new HttpParams().set('companyid', companyid)
        return this._http.get<gldetailmodel[]>(this.schemenameurl,{params:{branch:branchid,company:companyid}})
      }

      private schemedetailurl = 'http://localhost:61079/api/CreateGoldLoan/GetSchemeRate'; 
      onSelectedSchemeDetail(scheme,branchid,companyid):Observable<gldetailmodel[]>{
        let schemeid = new HttpParams().set('scheme', scheme)
     
        return this._http.get<gldetailmodel[]>(this.schemedetailurl,{params:{schemeid:scheme,branchid,companyid}})
      }

      private ornamenttypeUrl = 'http://localhost:61079/api/CreateGoldLoan/GetOrnamentType'; 
      getornamenttype():Observable<customerdropdowndetail[]> {
        return this._http.get<customerdropdowndetail[]>(this.ornamenttypeUrl)
        
      }

      private puritytypeUrl = 'http://localhost:61079/api/CreateGoldLoan/GetPurityType'; 
      getpuritytype():Observable<customerdropdowndetail[]> {
        return this._http.get<customerdropdowndetail[]>(this.puritytypeUrl)
        
      }   
      
      private puritytypepercurl = 'http://localhost:61079/api/CreateGoldLoan/GetPurityTypePercentage'; 
      onSelectedpuritytype(purity):Observable<glditemdetail[]>{
        let purityId = new HttpParams().set('purity', purity)
     
        return this._http.get<glditemdetail[]>(this.puritytypepercurl,{params:{purityId:purity}})
      }

      private servicechargeurl = 'http://localhost:61079/api/CreateGoldLoan/GetServiceCharge'; 
      getgoldservicecharge():Observable<gldetailmodel[]>{
      return this._http.get<gldetailmodel[]>(this.servicechargeurl)
    }
    getdata(){
        // let url="http://localhost:4200/";
        // return this._http.get(url);
    }

    // savecustomerdetails(): Observable<Iicustomerdetail[]>   
    // {
    //     return this._http.get("http://localhost:4200/")
    //     // .map((response: Response)=> <Iicustomerdetail[]>response.json())
    // }

    private savegolddetailsurl = 'http://localhost:61079/api/CreateGoldLoan/SaveGoldDetails'; 
    savegolddetails(custdet) {
        return this._http.post<customerdetail[]>(this.savegolddetailsurl,custdet)
        
      }

      private photouploadurl = 'http://localhost:61079/api/BlobStorage/PostBlobUpload'; 
      postphotoupload(pu) {
          return this._http.post<uploadphotomodel[]>(this.photouploadurl,pu)
          
        }

        // private idprooffileurl = 'http://localhost:61079/api/CreateGoldLoan/idprooffile'; 
        // idprooffiles(file) {
        //     return this._http.post<uploadphotomodel[]>(this.idprooffileurl,file)
            
        //   }
        

        private selectcityurl = 'http://localhost:61079/api/CreateGoldLoan/GetDistrictByCityId'; 
        onSelectcity(city):Observable<customerdetail[]>{
          let cityid = new HttpParams().set('city', city)
       
          return this._http.get<customerdetail[]>(this.selectcityurl,{params:{cityid:city}})
        }

           private selectstateurl = 'http://localhost:61079/api/CreateGoldLoan/GetstateBydistrictId'; 
           onSelectcitystate(district):Observable<customerdetail[]>{
          let districtid = new HttpParams().set('district', district)
       
          return this._http.get<customerdetail[]>(this.selectstateurl,{params:{districtid:district}})
        }

        private bankUrl = 'http://localhost:61079/api/CreateGoldLoan/GetAllBanks'; 
    getallbank():Observable<customerdropdowndetail[]> {
        return this._http.get<customerdropdowndetail[]>(this.bankUrl)
        
      }

      private savebankdetailsurl = 'http://localhost:61079/api/CreateGoldLoan/SaveBankDetails'; 
      savebankdetail(bankdet) {
          return this._http.post<bankdetailmodel[]>(this.savebankdetailsurl,bankdet)
          
        }
}