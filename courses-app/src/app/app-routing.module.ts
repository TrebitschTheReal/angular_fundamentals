import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoursesComponent} from "./features/courses/courses.component";
import {LoginComponent} from "./features/login/login.component";
import {RegistrationComponent} from "./features/registration/registration.component";
import {ErrorPageComponent} from "./shared";
import {CourseComponent} from "./features/course/course.component";

const routes: Routes = [
  {path: '', component: CoursesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'courses', component: CoursesComponent, children: [
      {path: ':id', component: CourseComponent},
      {path: 'add', component: CourseComponent},
      {path: 'edit/:id', component: CourseComponent},
    ]
  },
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
