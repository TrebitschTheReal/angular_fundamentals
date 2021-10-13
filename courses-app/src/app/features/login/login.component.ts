import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModelGroup} from "@angular/forms";
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {ResultMessage} from "../../shared/models/result-message-model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm')
  public loginForm: NgForm | undefined;
  @ViewChild('loginData')
  public loginData: NgModelGroup | undefined;

  public resultMessages: ResultMessage | undefined;
  public isLoading: boolean = false;

  private isLoadingSubscription: Subscription | undefined;
  private resultMessagesSubscription: Subscription | undefined;
  private isAuthorizedSubscription: Subscription | undefined;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.resultMessagesSubscription = this.authService.resultMessage$.subscribe(result => {
      console.log('login', result)
      this.resultMessages = result;
    })

    this.isLoadingSubscription = this.authService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    })

    this.isAuthorizedSubscription = this.authService.isAuthorized$.subscribe(isAuth => {
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

  ngOnDestroy() {
    this.isLoadingSubscription?.unsubscribe();
    this.resultMessagesSubscription?.unsubscribe();
    this.isAuthorizedSubscription?.unsubscribe();
  }
}
