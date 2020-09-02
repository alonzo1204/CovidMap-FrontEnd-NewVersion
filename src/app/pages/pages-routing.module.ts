import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { ProductComponent } from './product/product.component';
import{DataCountryComponent} from './dataCountry/dataCountry.component'

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'product',
      component: ProductComponent,
    },

    {
      path: 'home',
      component: HomeComponent,//home
    },
    {
      path: 'dataCountries',
      loadChildren: () => import('./dataCountry/dataCountry.module')
        .then(m => m.DataCountryModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },

    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
