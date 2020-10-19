import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MafiaSignalRService } from './services/mafia-signalr.service';

@Component({
  selector: 'app-mafia',
  templateUrl: './mafia.component.html',
  styleUrls: ['./mafia.component.scss'],
  providers: [MafiaSignalRService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MafiaComponent implements OnInit {

  constructor(private mafiaSignalRService: MafiaSignalRService) { }

  ngOnInit(): void {
    this.mafiaSignalRService.connect();
  }

  // connectHub() {
  //   this.mafiaSignalRService.connect();
  // }

  // disconnectHub() {
  //   this.mafiaSignalRService.disconnect();
  // }
}
