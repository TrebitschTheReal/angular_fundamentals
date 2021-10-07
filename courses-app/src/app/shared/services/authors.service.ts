import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Author} from "../models/author.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) {
  }

  fetchAll(): any {
    return this.http
      .get<{ successful: boolean, result: Author[] }>(
      'http://localhost:3000/authors/all')
      .pipe(
        map(e => e.result)
      )
      .subscribe(
        authors => {
          //console.log(authors)
          //isloading = false
          return authors
        },
        err => {
          //isloading = false
          throw err
        }
      )
  }

  addAuthor() {

  }
}
