import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playroom',
  templateUrl: './playroom.component.html',
  styleUrls: ['./playroom.component.scss']
})
export class PlayroomComponent implements OnInit {

  isVisible = true;

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    this.isVisible = !this.isVisible;
  }
}
