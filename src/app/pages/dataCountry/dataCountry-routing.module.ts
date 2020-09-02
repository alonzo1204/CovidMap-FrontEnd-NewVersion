import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataCountryComponent } from './dataCountry.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

const routes: Routes = [{
  path: '',
  component: DataCountryComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'table',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataCountryRoutingModule { }

export const routedComponents = [
  DataCountryComponent,
  SmartTableComponent,
  TreeGridComponent,
];
