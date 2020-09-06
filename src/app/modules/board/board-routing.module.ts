import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayroomComponent } from './playroom/playroom.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ResistanceComponent } from './resistance/resistance.component';

const routes: Routes = [
  {
    path: 'playroom',
    component: PlayroomComponent,
    children: [
      {
        path: 'resistance',
        component: ResistanceComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'playroom'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
