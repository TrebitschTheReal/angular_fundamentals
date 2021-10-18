import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validEmailValidator} from "../../shared/validators/email-validation-logic";
import {AuthService} from "../../auth/services/auth.service";
import {ResultMessage} from "../../shared/models/result-message-model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public resultMessages: ResultMessage | undefined;
  public isLoading: boolean = false;

  public registrationForm: FormGroup = new FormGroup({
    'registrationData': new FormGroup({
      'name': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl('')
    })
  })

  private isLoadingSubscription: Subscription | undefined;
  private resultMessagesSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.resultMessagesSubscription = this.authService.resultMessage$.subscribe(result => {
      this.resultMessages = result;
    })

    this.isLoadingSubscription = this.authService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    })

    this.registrationForm = new FormGroup({
      'registrationData': new FormGroup({
        'name': new FormControl(null,
          [Validators.required,
            Validators.minLength(6)]),
        'email': new FormControl(null,
          [Validators.required, validEmailValidator(this.registrationForm)]),
        'password': new FormControl(null,
          [Validators.required])
      })
    })
  }

  onSubmit() {
    let newUser = {
      name: this.registrationForm.get('registrationData.name')?.value,
      email: this.registrationForm.get('registrationData.email')?.value,
      password: this.registrationForm.get('registrationData.password')?.value
    }

    this.authService.register(newUser);
  }

  ngOnDestroy() {
    this.resultMessagesSubscription?.unsubscribe();
    this.isLoadingSubscription?.unsubscribe();
  }
}
