import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  api: any = "http://ramosfer.com/service/public";
  constructor(private http: HttpClient) { }

  addCart(data) {
    return this.http.post(this.api + "/cart/add", data);
  }
  getAll(id){
    return this.http.get(this.api + "/cart/"+id);
  }
}
