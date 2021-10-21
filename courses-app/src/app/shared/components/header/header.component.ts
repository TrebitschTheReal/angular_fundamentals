import {Component, OnInit} from '@angular/core';
import {UserStoreService} from "../../../user/user-store.service";
import {AuthService} from "../../../auth/services/auth.service";
import {UserStateFacade} from "../../../user/store/user.facade";
import {AuthStateFacade} from "../../../auth/store/auth.facade";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string | undefined;
  userRole: string | undefined;
  isAuthorized: boolean = false;


  constructor(private userStoreService: UserStoreService,
              public userStateFacade: UserStateFacade,
              public authStateFacade: AuthStateFacade,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userStoreService.user$.subscribe(user => {
      this.userName = user?.name;
      this.userRole = user?.role;
    })

    this.authService.isAuthorized$.subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
    })
  }

  logout() {
    this.authStateFacade.logout();
  }
}
