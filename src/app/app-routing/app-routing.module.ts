import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "../components/login/login.component";
import { CarListComponent } from "../components/car-list/car-list.component";
import {NgModule} from "@angular/core";
import {authGuard} from "../auth.guard";

const routes: Routes = [
  {
    path: 'car-list',
    component: CarListComponent,
    canActivate: [authGuard] // Use the function reference directly
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
