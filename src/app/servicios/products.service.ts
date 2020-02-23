import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  api: any = "http://ramosfer.com/service/public";
  constructor(private http: HttpClient) { }

  products(id){
    return this.http.get(this.api+"/products/"+id);
  }
}
