import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick() {
    this.buttonClick.emit();
  }

}
