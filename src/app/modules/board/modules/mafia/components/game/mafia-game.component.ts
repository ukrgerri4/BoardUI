import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mafia-game',
  templateUrl: './mafia-game.component.html',
  styleUrls: ['./mafia-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MafiaGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
