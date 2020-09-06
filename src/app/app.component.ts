import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ResistanceSignalRService } from './services/resistance-signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ResistanceSignalRService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'BoardUI';

  constructor(private resistanceSignalRService: ResistanceSignalRService) {
    // this.resistanceSignalRService.connect();
  }
}
