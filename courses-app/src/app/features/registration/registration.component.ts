import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validEmailValidator} from "../../shared/validators/email-validation-logic";
import {UserStoreService} from "../../user/user-store.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    'registrationData': new FormGroup({
      'name': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl('')
    })
  })

  constructor(private userStoreService: UserStoreService) {
  }

  ngOnInit(): void {
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
    this.userStoreService.registerUser(newUser)
  }
}
