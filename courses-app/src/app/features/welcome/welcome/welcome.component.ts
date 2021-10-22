import {Component, OnInit} from '@angular/core';
import {UserStateFacade} from "../../../user/store/user.facade";
import {AuthStateFacade} from "../../../auth/store/auth.facade";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public authStateFacade: AuthStateFacade,
              public userStateFacade: UserStateFacade) {
  }

  ngOnInit(): void {
  }
}
