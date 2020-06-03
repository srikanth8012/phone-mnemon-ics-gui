import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PhoneRequest } from './phone.request';
@Injectable({
    providedIn: 'root'
})
export class PhoneService {
    constructor(private http: HttpClient) { }
    getPhoneNumberMnemonics(phoneNo: any): Observable<any> {
        if (phoneNo) {
            const params = new HttpParams()
                .set('phoneNo', phoneNo.toString());
            const path = 'http://localhost:8080/telephone/'+ phoneNo.toString();
            return this.http.get(path);
        }
    }
    crearePhoneMnemonis(postData: PhoneRequest): Observable<any> {
        let finalUrl = 'http://localhost:8080/telephone/';
       return  this.http
            .post(finalUrl, postData);
           
    }


    getPaginatedPhoneMnemonics(postperPage: number, currentPage: number, phoneNo: any): Observable<any> {
      if (phoneNo) {
          const queryParams = `?size=${postperPage}&page=${currentPage}`;
          const params = new HttpParams()
              .set('phoneNo', phoneNo.toString());
          const path = 'http://localhost:8080/telephone/paginated/'+ phoneNo.toString() + queryParams;
          return this.http.get(path);
      }
  }

    constructUrl(path: string, params: HttpParams): string {
        const keySet: string[] = params.keys();
        for (let i in keySet) {
          path = path.replace('{'.concat(keySet[i], '}'), params.get(keySet[i]));
        }
        return path;
      }
}
