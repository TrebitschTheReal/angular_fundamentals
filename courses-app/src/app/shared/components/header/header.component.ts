import {Component, OnInit} from '@angular/core';
import {UserStateFacade} from "../../../user/store/user.facade";
import {AuthStateFacade} from "../../../auth/store/auth.facade";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public userStateFacade: UserStateFacade,
    public authStateFacade: AuthStateFacade) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authStateFacade.logout();
  }
}
