import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HttmapComponent } from './httmap/httmap.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
    {
        path: '', redirectTo: 'search', pathMatch: 'full'
    },
    {
        path: 'search', component: SearchComponent,

    },
    {
        path: 'httmap',
        component: HttmapComponent,
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash:true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }