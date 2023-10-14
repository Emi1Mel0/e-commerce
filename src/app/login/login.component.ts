import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  isloading: boolean = false;
  apiError: string = "";

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z][a-z0-9]{7,14}$/),
    ]),
  });

  handleLogin(loginForm: FormGroup) {
    this.isloading = true;

    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe({
        next: (Response) => {
          if (Response.message === "success") {
            localStorage.setItem("userToken", Response.token);
            this._AuthService.decodeUserData();
            this.isloading = true;
            //Navigate to Login
            this._Router.navigate(["/home"]);
          }

          console.log(Response);
        },
        error: (err) => {
          this.isloading = false;
          this.apiError = err.error.errors.msg;
          console.log(err);
        },
      });
    }
  }
}
