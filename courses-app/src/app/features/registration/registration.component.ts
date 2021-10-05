import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validEmailValidator} from "../../shared/validators/email-validation-logic";

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

  constructor() {
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
    console.log(this.registrationForm.get('registrationData'));
  }
}
