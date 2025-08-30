import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: App }
];