import { Routes } from '@angular/router';

// Layouts
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';
import { HomeComponent } from './website/home.component';
import { LoginComponent } from './common/login.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule'
            }
        ]
    },
    {
        path: '',
        component: AuthenticationLayoutComponent,
        children: [
            {
                path: 'authentication',
                loadChildren: './extras/authentication.modules#AuthenticationModule'
            }
        ]
    }
];

