import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {forkJoin, Observable, of} from "rxjs";
import {Course} from "../../models/course.model";
import {AuthorsStoreService} from "../authors/authors-store.service";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient, private authorsStoreService: AuthorsStoreService) {
  }

  // @TODO: Finish
  fetchAll(): Observable<Course[]> {
    return this.http
      .get<{ successful: boolean, result: Course[] }>(
        'http://localhost:3000/courses/all')
      .pipe(
        switchMap(value =>
          forkJoin({
            courses: of(value).pipe(
              map((e) => {
                console.log('Courses in switchMap: ', e.result)
                return e.result
              })
            ),
            authors: this.authorsStoreService.authors$.pipe(
              map((e) => {
                console.log('Authors in switchMap: ', e);
                return e;
              })
            ),
          }).pipe(
            map(e => {
              console.log('Before map: ', e)
              e.courses.map(courseElement => courseElement.authors.map(x => e.authors.find(y => y.id === x)))
              console.log(e)
              e.courses.map(course => new Course(
                course.id,
                course.title,
                course.description,
                course.authors,
                course.duration,
                course.creationDate,
              ))
              return e.courses;
            })
          )
        )
      )
  }


  // fetchAll(): Observable<Course[]> {
  //   return this.http
  //     .get<{ successful: boolean, result: Course[] }>(
  //       'http://localhost:3000/courses/all')
  //     .pipe(
  //       map(e => e.result.map(course => new Course(
  //         course.id,
  //         course.title,
  //         course.description,
  //         course.authors,
  //         course.duration,
  //         course.creationDate,
  //       )))
  //     )
  // }

  addCourse() {

  }
}
