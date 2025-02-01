import { Routes } from '@angular/router';

import { BriefingsComponent } from './features/briefings/briefings.component';

export const routes: Routes = [
  { path: 'briefing', component: BriefingsComponent },
  { path: '',   redirectTo: '/briefing', pathMatch: 'full' },
  { path: '**', redirectTo: '/briefing', pathMatch: 'full' },
];
