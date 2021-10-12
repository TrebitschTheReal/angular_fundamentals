import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModelGroup} from "@angular/forms";
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  public loginForm: NgForm | undefined;

  @ViewChild('loginData')
  public loginData: NgModelGroup | undefined;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/courses'])
      }
    })
  }


  onSubmit() {
    console.log('Form submitted: ', this.loginForm)
    console.log('Controls: ', this.loginData?.control.controls.email.value)
    let user = {
      email: this.loginData?.control.controls.email.value,
      password: this.loginData?.control.controls.password.value
    }

    this.authService.login(user);
  }
}
