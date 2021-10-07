import {Injectable} from '@angular/core';
import {AuthorsService} from "./authors.service";
import {Author} from "../models/author.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService {
  authors: Author[] = []

  constructor(private authorsService: AuthorsService) {
  }

  getAll(): Author[] {
    return this.authors;
  }

  addAuthor() {

  }
}
