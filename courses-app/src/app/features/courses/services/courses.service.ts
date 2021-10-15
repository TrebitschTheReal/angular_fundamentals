import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, defaultIfEmpty, map, switchMap} from "rxjs/operators";
import {forkJoin, Observable, of, throwError} from "rxjs";
import {Course} from "../../../shared/models/course.model";
import {AuthorsService} from "../../../shared/services/authors/authors.service";
import {Author} from "../../../shared/models/author.model";

@Injectable({
  providedIn: 'root'
})
//@TODO this needs a refactoring
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
            authors: this.authorService.fetchAll(),
          }).pipe(
            map(e => {
              return e.courses.map(course => {
                //@TODO fix me
                // @ts-ignore
                course.authors = course.authors.map(author => {
                  // Need force cast 'author' model into string, because backend sends only a string id
                  return e.authors.find(authorsCollectionElement => authorsCollectionElement.id === String(author))
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
        switchMap(courseData =>
          forkJoin({
            course: of(courseData).pipe(
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
              e.course.authors = e.course.authors.map(author => {
                // Need force cast 'author' model into string, because backend sends only a string id
                return e.authors.find(authorsCollectionElement => authorsCollectionElement.id === String(author))
              })
              return e.course;
            })
          )
        )
      )
  }

  deleteCourse(id: string): Observable<{ successful: boolean, result: string }> {
    return this.http
      .delete<{ successful: boolean, result: string }>(
        'http://localhost:3000/courses/' + id)
      .pipe(
        map((e: { successful: boolean, result: string }) => {
          return e;
        }))
  }

  // If the input course has an id, we call the edit endpoint
  // if there is no id, we call the create endpoint
  addOrEditCourse(course: Course): Observable<Course> {
    if (course.id) {
      return this.http
        .put<{ successful: boolean, result: Course }>(
          'http://localhost:3000/courses/' + course.id, course)
        .pipe(
          catchError(e => {
            return throwError(e)
          }),
          map(e => e.result)
        )
    } else {
      return this.http
        .post<{ successful: boolean, result: Course }>(
          'http://localhost:3000/courses/add', course)
        .pipe(
          catchError(e => {
            return throwError(e)
          }),
          map(e => e.result)
        )
    }
  }

  // This is a tricky, dirty solution to serve a bad idea
  magicManageCourse(course: Course, authorObservables: Observable<Author>[]): Observable<Course> {
    return this.http.get('http://localhost:3000/users/me')
      .pipe(
        switchMap(x =>
          forkJoin(authorObservables).pipe(
            map(e => {
              console.log('1. switchmap - Authors: ', e)
              return e;
            }))
            .pipe(
              // Emitting an empty array if the input array is empty
              // (there are no new authors)
              defaultIfEmpty(new Array())
            )
        ),
        switchMap((authors: Author[]) => {
          // at my 'Course' model, the 'authors' field have type 'Author'
          // because of this, i had to 'dumb it down' this object with this hack
          // i don't understand why the backend works like this (eats only id-s and not whole Author objects)
          // but i would like to strict with the 'clean' way in my app, and work with clean objects as much as i can
          let newCourse = JSON.parse(JSON.stringify(course))

          newCourse.authors = newCourse.authors.map((e: Author) => e.id)
          newCourse.authors = newCourse.authors.concat(authors.map((e: Author) => e.id));
          console.log('2. switchmap - Course: ', newCourse)
          return this.addOrEditCourse(newCourse)
        }),
      )
  }
}


