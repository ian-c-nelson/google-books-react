import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import Search from "../components/Search";
import Results from "../components/Results";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import axios from "axios";

require("dotenv").config();

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    link: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis,
        link: this.state.link
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };
  
  searchByTitle = event => {
    event.preventDefault();
    // const apiKey = //this is is in the .env file that needs to be imported in here
    const url = "https://www.googleapis.com/books/v1/volumes?q=";
    const end_Url = "&download=epub&key=";
    const apiKey = "AIzaSyDvq-DydIRwoRgMg_mN4g0re9LawkabNfc"

    if (this.state.title) {
        axios.get(url + this.state.title + end_Url + apiKey)
            .then(res =>  API.saveBook({
              title: res.data.items[0].volumeInfo.title,
              author: res.data.items[0].volumeInfo.authors[0],
              synopsis: res.data.items[0].volumeInfo.description,
              link: res.data.items[0].volumeInfo.previewLink
            }))
            // .then(res => console.log(res.data.items[0].volumeInfo))
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };
}


  //  handleFormSave = event => {
  //   event.preventDefault();
  //   if (this.state.title) {
  //     API.saveBook({
  //       title: res.data.items[0].volumeInfo.title,
  //       author: res.data.items[0].volumeInfo.authors[0],
  //       synopsis: res.data.items[0].volumeInfo.description
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <Jumbotron>
              <h1>(react) Google Books Search</h1>
              <h4>Search and Save Books</h4>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Search>
              <h4>Book Search</h4>
              <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.searchByTitle}
              >
                Search
              </FormBtn>
            </form>
            </Search>
            
          </Col>
          <Col size="md-12">
            <Results>
              <h4>Search Results</h4>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <SaveBtn onClick={this.handleFormSave} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
              )}
              </Results>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
