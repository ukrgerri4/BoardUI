import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ResistanceSignalRService } from './modules/board/resistance/services/resistance-signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ResistanceSignalRService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor() {}
}
