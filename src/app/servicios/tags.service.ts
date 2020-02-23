import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  api: any = "http://ramosfer.com/service/public";
  constructor(private http: HttpClient) { }

  tags(){
    return this.http.get(this.api+"/tags");
  }
}
