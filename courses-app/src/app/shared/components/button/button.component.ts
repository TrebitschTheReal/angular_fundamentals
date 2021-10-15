import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input()
  public buttonText: string = '';

  @Input()
  public buttonIcon: string = '';

  @Input()
  public buttonType: string = 'button';

  @Input()
  public disabled: boolean | null = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
