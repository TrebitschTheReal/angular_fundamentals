import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('search')
  public search: NgModel | undefined;

  @Input()
  placeholder: string = ''

  @Output()
  searchButtonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSearchButtonClicked() {
    this.searchButtonClicked.emit(this.search?.value)
  }
}
