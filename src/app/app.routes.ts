import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role-guard.guard';
import { BaseComponent } from './Components/Layout/base/base.component';
import { EventBookComponent } from './Components/event-book/event-book.component';
import { HealthProviderComponent } from './Components/health-provider/health-provider.component';
import { ChartboxComponent } from './Components/chartbox/chatbox.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { BookedEventsComponent } from './Components/booked-events/booked-events.component';
import { ManageWellnessProgramListComponent } from './Components/manage-programs/wellness-program/wellness-program.component';
import { WellnessProgramComponent } from './Components/Programs/wellness-program/wellness-program.component';
import { ChallengeComponent } from './Components/Programs/challenge/challenge.component';
import { EventsProgramComponent } from './Components/manage-programs/events-program/events-program.component';
import { ChallengeProgramComponent } from './Components/manage-programs/challenge-program/challenge-program.component';
import { EventsComponent } from './Components/Programs/events/events.component';
import { EmployeeDetailComponent } from './Components/employee-detail/employee-detail.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [

        { path: "", loadChildren: () => import('./Components/Auth/auth.module').then(m => m.AuthModule) },
        {
                path: '', component: BaseComponent,
                canActivate: [AuthGuard],
                children: [

                        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_USER' }},
                        { path: 'admin_dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }},              
                        { path: 'eventbook', component: EventBookComponent },
                        { path: 'eventbook', component: EventBookComponent },
                        { path: 'health', component: HealthProviderComponent},
                        { path: 'chart', component: ChartboxComponent },
                        { path: 'wellness', component: WellnessProgramComponent },
                        { path: 'events', component: EventsComponent },
                        { path: 'challenges', component: ChallengeComponent },
                        { path: 'details', component: EmployeeDetailComponent },
                        { path: 'emplist', component: EmployeeListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }},
                        { path: 'manage-wellness', component: ManageWellnessProgramListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }},
                        { path: 'manage-events', component: EventsProgramComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }},
                        { path: 'manage-challenge', component: ChallengeProgramComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }},
                        { path: 'bookedevents', component: BookedEventsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }},
                        { path: 'eventbook', component: EventBookComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }},

                ],
        },


];
