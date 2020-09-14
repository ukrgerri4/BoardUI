import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { ResistanceSignalRService } from '../../services/resistance-signalr.service';

@Component({
  selector: 'app-create-game-modal',
  templateUrl: './create-game-modal.component.html',
  styleUrls: ['./create-game-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGameModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private resistanceSignalRService: ResistanceSignalRService
  ) { }

  ngOnInit(): void {
  }

  createGame() {
    this.resistanceSignalRService.createGame()
      .pipe(
        tap(id => alert(`new game id - [${id}]`))
      )
      .subscribe(id => console.log(id));
  }

}
