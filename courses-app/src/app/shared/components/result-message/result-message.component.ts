import {Component, Input, OnInit} from '@angular/core';
import {ResultMessage} from "../../models/result-message-model";

@Component({
  selector: 'app-result-message',
  templateUrl: './result-message.component.html',
  styleUrls: ['./result-message.scss']
})
export class ResultMessageComponent implements OnInit {

  @Input()
  resultMessages: ResultMessage | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
