import { Routes } from '@angular/router';
import { NewPatientRegistrationComponent } from './components/patient/new-patient-registration/new-patient-registration.component';
import { EditPatientRegistrationComponent } from './components/patient/edit-patient-registration/edit-patient-registration.component';
import { NewOrderComponent } from './components/orders/new-order/new-order.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'patient-registration',
    component: NewPatientRegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-patient',
    component: EditPatientRegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'new-order',
    component: NewOrderComponent,
    canActivate: [authGuard],
  },

  {
    path: 'settings',
    loadComponent: () =>
      import(
        './components/settings/settings-info/settings-info.component'
      ).then((m) => m.SettingsInfoComponent),
  },
  {
    path: 'settings/drug/dashboard',
    loadComponent: () =>
      import(
        './components/settings/drug/drug-dashboard/drug-dashboard.component'
      ).then((m) => m.DrugDashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'settings/drug/create',
    loadComponent: () =>
      import(
        './components/settings/drug/create-drug/create-drug.component'
      ).then((m) => m.CreateDrugComponent),
    canActivate: [authGuard],
  },
  {
    path: 'settings/drug/update/:id',
    loadComponent: () =>
      import(
        './components/settings/drug/create-drug/create-drug.component'
      ).then((m) => m.CreateDrugComponent),
    canActivate: [authGuard],
  },

  {
    path: 'settings/supplier/dashboard',
    loadComponent: () =>
      import(
        './components/settings/supplier/supplier-dashboard/supplier-dashboard.component'
      ).then((c) => c.SupplierDashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'settings/supplier/create',
    loadComponent: () =>
      import(
        './components/settings/supplier/supplier-create-update/supplier-create-update.component'
      ).then((m) => m.SupplierCreateUpdateComponent),
    canActivate: [authGuard],
  },
    {
    path: 'settings/supplier/update/:id',
    loadComponent: () =>
      import(
        './components/settings/supplier/supplier-create-update/supplier-create-update.component'
      ).then((m) => m.SupplierCreateUpdateComponent),
    canActivate: [authGuard],
  },
];
