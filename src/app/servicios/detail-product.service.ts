import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailProductService {
  

  api: any = "http://ramosfer.com/service/public";
  constructor(private http: HttpClient) { }

  detail (id) {
    return this.http.get(this.api + "/products/detail/"+id);
  }
}
