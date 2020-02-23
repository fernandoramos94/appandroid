import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  api: any = "http://ramosfer.com/service/public";

  login(data){
    return this.http.post(this.api+"/users/login", data);
  }
  registro(data){
    return this.http.post(this.api+"/register", data);
  }

  logout(){
  }
}
