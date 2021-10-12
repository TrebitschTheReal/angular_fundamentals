import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoursesComponent} from "./features/courses/courses.component";
import {LoginComponent} from "./features/login/login.component";
import {RegistrationComponent} from "./features/registration/registration.component";
import {ErrorPageComponent} from "./shared";
import {CourseComponent} from "./features/course/course.component";
import {AuthorizedGuard} from "./auth/guards/authorized.guard";
import {WelcomeComponent} from "./features/welcome/welcome/welcome.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
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
