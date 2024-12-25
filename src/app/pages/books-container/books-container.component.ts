import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Book } from '../../book.model';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css'],
})
export class BooksContainerComponent implements AfterViewInit, OnInit {
  books: Book[] = []; // Holds the list of books
  searchQuery: string = ''; // Stores the user's search query
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API endpoint for fetching books

  constructor() {
    // Initializes the component and loads books from local storage
    this.loadBooksFromLocalStorage();
  }

  ngOnInit(): void {
    // Fetches books from the API when the component is initialized
    this.fetchBooksFromApi();
  }

  ngAfterViewInit() {
    // Updates the displayed book list after the component view is initialized
    this.updateBookList();
  }

  /**
   * Fetches books from the API and merges them with the local list.
   */
  fetchBooksFromApi(): void {
    fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any[]) => {
        const apiBooks = data.map((book) => ({
          title: book.title,
          author: book.body,
          genre: 'Unknown',
          year: new Date().getFullYear(),
        }));
        this.books = [...this.books, ...apiBooks];
        this.saveBooksToLocalStorage();
        this.updateBookList();
      })
      .catch((error) => {
        console.error('Error fetching books from API:', error);
      });
  }

  /**
   * Saves the list of books to localStorage.
   */
  saveBooksToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('books', JSON.stringify(this.books));
    } else {
      console.error('localStorage is not available.');
    }
  }

  /**
   * Loads books from localStorage into the books array.
   */
  loadBooksFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedBooks = localStorage.getItem('books');
      this.books = storedBooks ? JSON.parse(storedBooks) : [];
    } else {
      console.error('localStorage is not available.');
      this.books = [];
    }
  }

  /**
   * Filters the books array based on the current search query.
   * @returns Filtered list of books
   */
  filterBooks(): Book[] {
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  /**
   * Updates the search query and refreshes the book list.
   */
  onSearchQueryChange(): void {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    this.searchQuery = searchInput.value;
    this.updateBookList();
  }

  /**
   * Updates the book list in the DOM based on the filtered books.
   */
  updateBookList(): void {
    const filteredBooks = this.filterBooks();
    const bookListElement = document.getElementById('bookList') as HTMLElement;

    bookListElement.innerHTML = '';

    if (filteredBooks.length === 0) {
      const noBooksMessage = document.createElement('li');
      noBooksMessage.textContent = 'No books available. Add a new book!';
      bookListElement.appendChild(noBooksMessage);
    } else {
      filteredBooks.forEach((book, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('book-item');

        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.classList.add('author');
        authorElement.textContent = `By: ${book.author}`;

        const genreElement = document.createElement('p');
        genreElement.classList.add('genre');
        genreElement.textContent = `Genre: ${book.genre}`;

        const yearElement = document.createElement('p');
        yearElement.classList.add('year');
        yearElement.textContent = `Year: ${book.year}`;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => this.deleteBook(book, index));

        listItem.appendChild(titleElement);
        listItem.appendChild(authorElement);
        listItem.appendChild(genreElement);
        listItem.appendChild(yearElement);
        listItem.appendChild(deleteButton);

        bookListElement.insertBefore(listItem, bookListElement.firstChild);
      });
    }
  }

  /**
   * Deletes a book from the list and updates the UI and localStorage.
   * @param book The book to delete
   * @param index The index of the book in the array
   */
  deleteBook(book: Book, index: number): void {
    this.books.splice(index, 1); // Remove book from the array
    this.saveBooksToLocalStorage(); // Save updated array to localStorage
    this.deleteBookFromApi(book); // Remove book from the API
    this.updateBookList(); // Refresh the UI
  }

  /**
   * Sends a DELETE request to the API to remove a book.
   * @param book The book to delete
   */
  deleteBookFromApi(book: Book): void {
    fetch(`${this.apiUrl}/${book.title}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Book deleted from API');
        } else {
          console.error('Failed to delete book from API');
        }
      })
      .catch((error) => {
        console.error('Error deleting book from API:', error);
      });
  }

  /**
   * Toggles the visibility of the add book form.
   */
  toggleAddBookForm(): void {
    const addBookForm = document.getElementById('addBookForm') as HTMLElement;
    addBookForm.style.display =
      addBookForm.style.display === 'none' || addBookForm.style.display === ''
        ? 'block'
        : 'none';
  }

  /**
   * Adds a new book to the list, validates the form, and updates localStorage and UI.
   */
  addBook(): void {
    const titleInput = document.getElementById('titleInput') as HTMLInputElement;
    const authorInput = document.getElementById('authorInput') as HTMLInputElement;
    const genreInput = document.getElementById('genreInput') as HTMLInputElement;
    const yearInput = document.getElementById('yearInput') as HTMLInputElement;

    const titleError = document.getElementById('titleError') as HTMLElement;
    const authorError = document.getElementById('authorError') as HTMLElement;
    const genreError = document.getElementById('genreError') as HTMLElement;
    const yearError = document.getElementById('yearError') as HTMLElement;

    let isValid = true;

    // Validate title input
    if (!titleInput.value) {
      titleInput.classList.add('error');
      titleError.style.display = 'block';
      isValid = false;
    } else {
      titleInput.classList.remove('error');
      titleError.style.display = 'none';
    }

    // Validate author input
    if (!authorInput.value) {
      authorInput.classList.add('error');
      authorError.style.display = 'block';
      isValid = false;
    } else {
      authorInput.classList.remove('error');
      authorError.style.display = 'none';
    }

    // Validate genre input
    if (!genreInput.value) {
      genreInput.classList.add('error');
      genreError.style.display = 'block';
      isValid = false;
    } else {
      genreInput.classList.remove('error');
      genreError.style.display = 'none';
    }

    // Validate year input
    if (!yearInput.value) {
      yearInput.classList.add('error');
      yearError.style.display = 'block';
      isValid = false;
    } else {
      yearInput.classList.remove('error');
      yearError.style.display = 'none';
    }

    if (isValid) {
      const newBook: Book = {
        title: titleInput.value,
        author: authorInput.value,
        genre: genreInput.value,
        year: parseInt(yearInput.value, 10),
      };

      this.books.push(newBook);
      this.saveBooksToLocalStorage();
      this.updateBookList();

      // Reset form
      titleInput.value = '';
      authorInput.value = '';
      genreInput.value = '';
      yearInput.value = '';

      this.toggleAddBookForm();
    }
  }
}
