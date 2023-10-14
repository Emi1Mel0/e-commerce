import { LoginComponent } from "./../login/login.component";
import { AuthService } from "./../auth.service";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  isloading: boolean = false;
  apiError:string = "";

  signupForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z][a-z0-9]{7,14}$/),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z][a-z0-9]{7,14}$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  handleSignup(signupForm: FormGroup) {
    this.isloading = true;

    if (signupForm.valid) {
      this._AuthService.signup(signupForm.value).subscribe({
        next: (Response) => {
          if (Response.message === "success") {
            this.isloading = false;
            //Navigate to Login
            this._Router.navigate(["/login"]);
          }

          console.log(Response);
        },
        error: (err) =>{
          this.isloading = false;
          this.apiError = err.error.errors.msg;
          
          console.log(err)
        } 
      });
    }
  }
}
