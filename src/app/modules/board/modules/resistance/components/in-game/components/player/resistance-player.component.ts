import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resistance-player',
  templateUrl: './resistance-player.component.html',
  styleUrls: ['./resistance-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistancePlayerComponent implements OnInit {

  @Input() public data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
