import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoursesComponent} from "./features/courses/courses.component";
import {LoginComponent} from "./features/login/login.component";
import {RegistrationComponent} from "./features/registration/registration.component";
import {ErrorPageComponent} from "./shared";
import {CourseComponent} from "./features/course/course.component";
import {LogoutComponent} from "./features/logout/logout.component";
import {AuthorizedGuard} from "./auth/guards/authorized.guard";

const routes: Routes = [
  {path: '', component: CoursesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'courses',
    canActivate: [AuthorizedGuard],
    canActivateChild: [AuthorizedGuard],
    component: CoursesComponent,
    children: [
      {path: 'new', component: CourseComponent},
      {path: 'view/:id', component: CourseComponent},
      {path: 'edit/:id', component: CourseComponent},
    ]
  },
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
