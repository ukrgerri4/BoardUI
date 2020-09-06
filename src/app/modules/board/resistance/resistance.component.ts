import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CreateGameModalComponent } from './create-game-modal/create-game-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resistance',
  templateUrl: './resistance.component.html',
  styleUrls: ['./resistance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistanceComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  openModal() {
    const modalRef = this.modalService.open(CreateGameModalComponent);
  }
}
