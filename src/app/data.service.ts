import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private baseUrl = 'http://localhost:8080/api/'
    private baseLoginUrl = 'http://localhost:8080/'

    private facebookUrl = 'http://graph.facebook.com/'
    private facebookUser = 'michadka/feed?'
    private facebookMessage = 'message=Look what I did'  
    private facebookKey = '&access_token=4433558a0fdb8361de663e4814185a2d'


    constructor (private http: Http) {
        console.log(`${this.facebookUrl}${this.facebookUser}${this.facebookMessage}${this.facebookKey}`)

    }

    updateFacebook(endpoint: string): Observable<any[]> {
        console.log("data.service - updateFacebook()")
        let apiUrl = this.facebookUrl+this.facebookUser+this.facebookMessage+this.facebookKey;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRecords(endpoint: string): Observable<any[]> {
    console.log("data.service - getRecords()")
    let apiUrl = this.baseUrl+endpoint;
    return this.http.get(apiUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getRecord(endpoint: string, id): Observable<object> {

        console.log("data.service - getRecord()")
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getLoginRecord(endpoint: string, record:object): Observable<object> {
        console.log("data.service - getLoginRecord()")
        let apiUrl = `${this.baseLoginUrl}${endpoint}`;
        console.log("before")
        console.log(apiUrl, record)
        console.log("after")
        return this.http.post(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editRecord(endpoint: string, record:object, id:number): Observable<object> {
        console.log("data.service - editRecord()")
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        console.log(record)
        console.log(apiUrl)
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addRecord(endpoint: string, record:object): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log("URL" + apiUrl, record)
        return this.http.post(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteRecord(endpoint: string, id: number): Observable<object> {
       let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
       console.log('URL' + apiUrl)
       return this.http.delete(apiUrl)
           .map(this.extractData)
           .catch(this.handleError);
   }

    private extractData(res: Response) {
       console.log("data.service - extractData()")
       let results = false;
       try {
           results = res.json();
       } catch (e) {
           if (res.status !== 200) {
               Observable.throw(e)
           }
       }
       return results || [];
   }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if(typeof error._body === "string"){
            errMsg = error._body
        }else{
            if (error instanceof Response) {
                if(error.status === 0){
                    errMsg = "Error connecting to API"
                }else{
                    const errorJSON = error.json();
                    errMsg = errorJSON.message;
                } 
            }
        }
        return Observable.throw(errMsg);
    }
}
