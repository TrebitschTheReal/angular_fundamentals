import {Injectable, OnDestroy} from '@angular/core';
import {AuthorsService} from "./authors.service";
import {Author} from "../../models/author.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService implements OnDestroy {
  public authors$: Observable<Author[]> = new Observable<Author[]>();
  public isLoading$: Observable<boolean> = new Observable<boolean>();
  private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  private loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authorsService: AuthorsService) {
    this.getAll();
    this.authors$ = this.authors$$.asObservable();
    this.isLoading$ = this.loading$$.asObservable();
  }

  addAuthor() {

  }

  ngOnDestroy() {
    console.log('destroy')
  }

  private getAll(): any {
    this.loading$$.next(true);
    this.authorsService.fetchAll().subscribe((authors: Author[]) => {
      this.authors$$.next(authors);
      this.loading$$.next(false);
    })
  }
}
