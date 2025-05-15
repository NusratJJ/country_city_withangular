import { Routes } from '@angular/router';
import { ViewCWCComponent } from './view-cwc/view-cwc.component';
import { AddCWCComponent } from './add-cwc/add-cwc.component';
import { EditCWCComponent } from './edit-cwc/edit-cwc.component';

export const routes: Routes = [
  { path: '', component: ViewCWCComponent },
  { path: 'Index', component: ViewCWCComponent },
  { path: 'Add', component: AddCWCComponent },
  { path: 'Index/edit/:id', component: EditCWCComponent },
];
