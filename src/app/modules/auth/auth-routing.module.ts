import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotFoundComponent } from 'src/app/shared/components/pagenot-found/pagenot-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: '**', component: PagenotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
