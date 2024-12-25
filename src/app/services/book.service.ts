import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class BookService {
  
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; 

  constructor() {}

// Fetchin Data From API 
  getBooks(): Observable<any> {
    return new Observable(observer => {
      fetch(this.apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data); 
          observer.complete(); 
        })
        .catch(error => {
          observer.error('Error fetching data: ' + error);
        });
    });
  }
}
