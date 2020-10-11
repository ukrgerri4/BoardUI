import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardModule } from './modules/board/board.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: '',
    loadChildren: () => BoardModule
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
