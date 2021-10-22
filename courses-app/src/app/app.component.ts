import {Component, OnInit} from '@angular/core';
import {AuthStateFacade} from "./auth/store/auth.facade";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';

  constructor(private authStateFacade: AuthStateFacade) {
  }

  ngOnInit() {
    this.authStateFacade.autoLogin();
  }
}
