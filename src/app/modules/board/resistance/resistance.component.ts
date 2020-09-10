import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResistanceSignalRService } from 'src/app/modules/board/resistance/services/resistance-signalr.service';
import { CreateGameModalComponent } from './components/create-game-modal/create-game-modal.component';

@Component({
  selector: 'app-resistance',
  templateUrl: './resistance.component.html',
  styleUrls: ['./resistance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistanceComponent implements OnInit, OnDestroy {

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private resistanceSignalRService: ResistanceSignalRService
  ) { }

  ngOnInit(): void {
    this.resistanceSignalRService.connect();
  }

  ngOnDestroy() {
    this.resistanceSignalRService.disconnect();
  }

  openModal() {
    const modalRef = this.modalService.open(CreateGameModalComponent, { windowClass: 'fullscreen' });
  }
}
