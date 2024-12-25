import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksContainerComponent } from './pages/books-container/books-container.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BooksContainerComponent, HeaderComponent,HomeComponent,AboutComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-library-app';
}
