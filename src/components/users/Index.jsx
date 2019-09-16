import React, { Component } from "react";
import CharacterCard from "./components/characterCard/CharacterCard";
import CircularProgress from "@material-ui/core/CircularProgress";


class Users extends Component {

    state = {
        data: {
            results: [],
        },
        page: 1,
        error: null,
        loading: true,
    };

    componentDidMount() {
        this.fetchCharacters();
    }

    fetchCharacters = async () => {
        this.setState({ loading: true, error: null });
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${this.state.page}`);
            const data = await response.json();
            this.setState({ loading: false, data: { info: data.info, results: [].concat(this.state.data.results, data.results) }, page: this.state.page + 1 });

        } catch (error) {
            this.setState({ error: true, loading: false });

        }
    };

    render() {
        if (this.state.error) {
            return `Error ${this.state.error.message}`;
        }
        return (
            <div className="container">
                <div className="cards-container">
                    {this.state.data.results.map(character => (
                        <CharacterCard key={character.id} character={character} />
                    ))}
                </div>
                {this.state.loading && (
                    <div className="loader-container">
                        <CircularProgress color={"secondary"} size={100} />
                    </div>
                )}

                {!this.state.loading && (
                    <div className="btn-container"><button className="btn-custom" onClick={() => this.fetchCharacters()}>Load more</button></div>
                )}
            </div>
        );
    }
}

export default Users;
