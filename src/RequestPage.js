import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import {Link} from 'react-router-dom';

class RequestPage extends Component {
  state = {
    /*control the input*/
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    /*updates the search based on the user input */
    this.setState({query: query})
    this.updateSearchedBooks(query);
  }

  updateSearchedBooks = (query) => {
    if (query) {
      /*will show nothing if input does't match */
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.error) {
          this.setState({searchedBooks: []});
        } else {
          /*looks in the data base for books based on the input that do match */
          this.setState({searchedBooks: searchedBooks});
        }
      })
    } else {
      this.setState({searchedBooks: []});
    }
  }

  render() {

    return (<div className="search-books">
      <div className="search-books-bar">

        <Link to ="/" className="close-search">
          Close</Link>

        <div className="search-books-input-wrapper">

          <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => {
              this.updateQuery(event.target.value)
            }}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            this.state.searchedBooks.map(searchedBook => {
              let shelf = "none";

              this.props.books.map(book => (
                book.id === searchedBook.id
                ? shelf = book.shelf
                : ''
              ));
              return (<li key = {searchedBook.id}>
                <Book
                book={searchedBook}
                swapShelf={this.props.swapShelf}
                currentShelf={shelf}
                />
              </li>);
            })
          }
        </ol>
      </div>
    </div>);
  }
}

export default RequestPage;
