import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input()
  public title: string = '';

  @Input()
  public message: string = '';

  @Input()
  public okButtonText: string = '';

  @Input()
  public cancelButtonText: string = '';

  @Output()
  public onModalButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() {
  }

  ngOnInit(): void {
  }

  modalButtonClicked(isConfirmed: boolean): void {
    this.onModalButtonClicked.emit(isConfirmed);
  }

}
