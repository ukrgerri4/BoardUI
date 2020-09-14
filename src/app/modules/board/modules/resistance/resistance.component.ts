import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ResistanceSignalRService } from './services/resistance-signalr.service';

@Component({
  selector: 'app-resistance',
  templateUrl: './resistance.component.html',
  styleUrls: ['./resistance.component.scss'],
  providers: [ResistanceSignalRService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistanceComponent implements OnInit, OnDestroy {
  constructor(
    private cdr: ChangeDetectorRef,
    private resistanceSignalRService: ResistanceSignalRService
  ) { }

  ngOnInit(): void {
    this.resistanceSignalRService.connect();
  }

  ngOnDestroy(): void {
    // this.resistanceSignalRService.disconnect();
  }
}
