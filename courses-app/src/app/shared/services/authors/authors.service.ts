import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Author} from "../../models/author.model";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  constructor(private http: HttpClient) {
  }

  fetchAll(): Observable<Author[]> {
    return this.http
      .get<{ successful: boolean, result: Author[] }>(
        'http://localhost:3000/authors/all')
      .pipe(
        map(e => e.result)
      )
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http
      .post<{ successful: boolean, result: Author }>(
        'http://localhost:3000/authors/add', author)
      .pipe(
        catchError(e => {
          return throwError(e)
        }),
        map(e => e.result),
      )
  }
}
