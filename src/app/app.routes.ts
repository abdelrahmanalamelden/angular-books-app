import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BooksContainerComponent } from './pages/books-container/books-container.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    { path: '', 
        component: HomeComponent, 
    },
{ path: 'books',
    component: BooksContainerComponent, 

},
{ path: 'about',
    component: AboutComponent, 

},
];
