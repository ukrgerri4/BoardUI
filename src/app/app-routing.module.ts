import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  // },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/board/board.module').then(mod => mod.BoardModule)
  },
  {
    path: '**',
    redirectTo: '/auth/sign-in'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
