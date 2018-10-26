import React from 'react';
import {Route} from 'react-router-dom'

import * as BooksAPI from './BooksAPI';
import './App.css';

import RequestPage from './RequestPage';
import MainPage from './MainPage';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  swapShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })

  }

  render() {
    return (<div className="app">
      <Route exact="exact" path='/' render={() => (<MainPage books={this.state.books} swapShelf={this.swapShelf}/>)}/>

      <Route path='/search' render={() => (<RequestPage books={this.state.books} swapShelf={this.swapShelf}/>)}/>
    </div>)
  }
}

export default BooksApp
