import React, { Component } from "react";
import axios from "axios";

export default class BookSearch extends Component {
    constructor() {
        super()
        this.state = {
            searchTerm = ""
        }
    }

    searchByTitle = () => {
        const apiKey = "AIzaSyApUkMRNO3BuDYELnUtHFogIu1M7woqiaY";
        const url = "https://www.googleapis.com/books/v1/volumes?q=";
        const end_Url = "&download=epub&key=";

        if (this.state.searchTerm !== '') {
            axios.get(url + this.state.searchTerm + end_Url + apiKey)
                .then((response) => response.json())
                .then((data) => {
                    this.props.onSearchResult(data.items);
                });
        };
    }

    handleEvent = (event) => {
        this.setState({ searchTerm: event.target.value });

        event.key === 'Enter' && this.handleSearch()
    };

    render() {
        return (
            <div>
                <input
                    placeholder="Search for a book..."
                    type="text"
                    onKeyPress={event => this.handleEvent(event)}
                />
                <button onClick={this.handleSearch}>
                    Search
                </button>
            </div>
        );
    }
}
