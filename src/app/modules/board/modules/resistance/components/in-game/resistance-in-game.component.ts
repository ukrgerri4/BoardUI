import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ResistanceMessage, ResistanceSignalRService } from '../../services/resistance-signalr.service';

@Component({
  selector: 'app-resistance-in-game',
  templateUrl: './resistance-in-game.component.html',
  styleUrls: ['./resistance-in-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistanceInGameComponent implements OnInit {

  private gameId: string = null;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private resistanceSignalRService: ResistanceSignalRService
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.initMessagesSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initMessagesSubscription() {
    this.resistanceSignalRService.onMessage
      .pipe(
        takeUntil(this.destroy$),
        filter(event => event?.messageType === ResistanceMessage.GameState)
      )
      .subscribe(event => console.log(event));
  }
}
