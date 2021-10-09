import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {forkJoin, Observable, of} from "rxjs";
import {Course} from "../../models/course.model";
import {AuthorsService} from "../authors/authors.service";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient,
              private authorService: AuthorsService) {
  }

  fetchAll(): Observable<Course[]> {
    return this.http
      .get<{ successful: boolean, result: Course[] }>(
        'http://localhost:3000/courses/all')
      .pipe(
        switchMap(coursesData =>
          forkJoin({
            courses: of(coursesData).pipe(
              map((e) => e.result)
            ),
            authors: this.authorService.fetchAll().pipe(
              map((a) => a)
            ),
          }).pipe(
            map(e => {
              console.log('Courses before matching authors: ', e);
              return e.courses.map(course => {
                //@TODO fix me
                // @ts-ignore
                course.authors = course.authors.map(authorId => {
                  return e.authors.find(authorsCollectionElement => authorsCollectionElement.id === authorId)?.name
                })
                return course
              })
            })
          )
        )
      )
  }

  fetchCourse(id: string): Observable<Course> {
    return this.http
      .get<{ successful: boolean, result: Course }>(
        'http://localhost:3000/courses/' + id)
      .pipe(
        switchMap(coursesData =>
          forkJoin({
            course: of(coursesData).pipe(
              map((e) => e.result)
            ),
            authors: this.authorService.fetchAll().pipe(
              map((a) => a)
            ),
          }).pipe(
            map(e => {
              console.log('Courses before matching authors: ', e);
              //@TODO fix me
              // @ts-ignore
              e.course.authors = e.course.authors.map(authorId => {
                return e.authors.find(authorsCollectionElement => authorsCollectionElement.id === authorId)?.name
              })
              return e.course;
            })
          )
        )
      )
  }

  addCourse() {

  }
}
