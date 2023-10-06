import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './modules/layout/admin-layout/admin-layout.component';
import { AuthGuard } from './shared/services/auth-guard.service';

const routes: Routes = [
  // // {
  // //   path: '',
  // //   loadChildren: () =>
  // //     import('./modules/auth/auth.module').then((m) => m.AuthModule),
  // // },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./modules/layout/admin-layout/admin-layout.module').then(
  //       (m) => m.AdminLayoutModule
  //     ),
  // },
  // { path: '**', redirectTo: '' },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/layout/admin-layout/admin-layout.module').then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
