import React from 'react'
import Autocomplete from "component/Autocomplete";
import SearchResult from "component/SearchResult";

const MoviesList = () => {
    return (
        <>
            <Autocomplete
                suggestions={[
                    'Hunger Games',
                    'Wild',
                    'Batman',
                    'Game of Thrones',
                    'The Office',
                    'Jack Ryan',
                    'Forrest Gump',
                    'Spirited Away',
                    'Parasite',
                    'Whiplash',
                    'Spider-Man',
                    'Brave',
                    'Cruella',
                    'Money Heist',
                    'Breaking Bad',
                    'Interstellar',
                    'The Tomorrow War',
                    'Modern Family',
                    'Russian Doll',
                    'Ozark'
                ]}
            />
            <SearchResult />
        </>
    )
}

export default MoviesList
