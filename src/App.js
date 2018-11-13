import React from 'react';
import {Route} from 'react-router-dom'
import Footer from './Footer'
import * as BooksAPI from './BooksAPI';
import './App.css';

import RequestPage from './RequestPage';
import MainPage from './MainPage';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  /*Will get our initial state of the page by getting all
  books then filtering them out by their respective states*/
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

/*will check for the book the user has clicked and
 asked which shelf to place it in*/
  swapShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  render() {
    return (<div className="app">

    <Route path='/search' render={() => (<RequestPage books={this.state.books} swapShelf={this.swapShelf}/>)}/>

    <Route exact path='/' render={() => (<MainPage books={this.state.books} swapShelf={this.swapShelf}/>)}/>

    <Footer />

    </div>)
  }
}



export default BooksApp
