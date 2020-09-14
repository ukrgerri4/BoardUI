import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResistanceSignalRService } from '../../services/resistance-signalr.service';

@Component({
  selector: 'app-resistance-in-game',
  templateUrl: './resistance-in-game.component.html',
  styleUrls: ['./resistance-in-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistanceInGameComponent implements OnInit {

  private gameId: string = null;

  constructor(
    private route: ActivatedRoute,
    private resistanceSignalRService: ResistanceSignalRService
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }
}
