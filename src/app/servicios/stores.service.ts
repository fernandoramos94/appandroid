import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  api: any = "http://ramosfer.com/service/public";

  constructor(private http: HttpClient) { }

  stores(cx, cy){
    return this.http.get(this.api+"/stores/"+cx+"/"+cy);
  }
  by(id){
    return this.http.get(this.api+ "/store/byClient/"+id);
  }
}
