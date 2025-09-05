import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('src/app/commons/pages/login/login.component').then(
        (c) => c.LoginComponent,
      ),
  },
  {
    path: 'home',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('src/app/layouts/home/home.component').then(
        (c) => c.HomeComponent,
      ),
    children: [
      {
        path: 'overview',
        loadChildren: () =>
          import('./pages/overview/overview.module').then(
            (m) => m.OverviewModule,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
