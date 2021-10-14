import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Author} from "../../models/author.model";
import {AuthorsService} from "./authors.service";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService implements OnDestroy {
  private readonly _authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  public readonly authors$: Observable<Author[]> = this._authors$$.asObservable().pipe(shareReplay(1))
  private readonly _loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._loading$$.asObservable().pipe(shareReplay(1))

  constructor(private authorsService: AuthorsService) {
    this.getAllAuthors();
  }

  get authors(): Author[] {
    return this._authors$$.getValue();
  }

  set authors(author: Author[]) {
    this._authors$$.next(author);
  }

  createAuthor(author: Author) {
    return this.authorsService.addAuthor(author)
  }

  ngOnDestroy() {
    console.log('destroy')
  }

  private getAllAuthors(): void {
    this._loading$$.next(true);
    this.authorsService.fetchAll().subscribe({
      next: (authors: Author[]) => {
        this._authors$$.next(authors);
        this._loading$$.next(false);
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
