import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-password-eye',
  templateUrl: './password-eye.component.html',
  styleUrls: ['./password-eye.component.scss']
})
export class PasswordEyeComponent implements OnInit {
  @Input()
  isShown: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
