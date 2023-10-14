import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("userToken") !== null) {
      this.decodeUserData();
    }
  }

  signup(userdata: object): Observable<any> {
    return this._HttpClient.post(
      "https://route-ecommerce.onrender.com/api/v1/auth/signup",
      userdata
    );
  }

  login(userdata: object): Observable<any> {
    return this._HttpClient.post(
      "https://route-ecommerce.onrender.com/api/v1/auth/signin",
      userdata
    );
  }

  decodeUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem("userToken"));
    let decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }

  logOut() {
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._Router.navigate(["/login"]);
  }
}
