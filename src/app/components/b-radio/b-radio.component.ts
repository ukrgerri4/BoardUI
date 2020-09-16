import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './b-radio.component.html',
  styleUrls: ['./b-radio.component.scss']
})
export class BRadioComponent {

  @Input() disabled = false;
  @Input() checked = false;
  @Input() fontSize = '32px';

  @Input() checkedColor = '#000000';
  @Input() uncheckedColor = '#000000';

  @Input() checkedIcon = 'radio_button_checked';
  @Input() uncheckedIcon = 'radio_button_unchecked';

  @Output() toggle = new EventEmitter();

  constructor() { }

  get radioIcon() {
    return this.checked ? this.checkedIcon : this.uncheckedIcon;
  }

  get color() {
    return this.checked ? this.checkedColor : this.uncheckedColor;
  }

  toggleButton() {
    if (this.disabled) { return; }

    this.checked = this.checked ? false : true;
    this.toggle.emit(this.checked);
  }
}
