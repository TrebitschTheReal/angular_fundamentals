import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  template: '',
  selector: 'app-logout',
})
export class LogoutComponent implements OnInit {
  private isAuthorized: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(isAuthorized => {
      if (isAuthorized) {
        this.isAuthorized = isAuthorized;
      }
    })

    if (this.isAuthorized) {
      this.authService.logout();
    }
    this.router.navigate(['/courses'])
  }
}
