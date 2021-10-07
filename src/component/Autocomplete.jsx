import React, { useState, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";

import { GetMovies } from 'store/services';
import { reset } from 'store/features/movie';

const Autocomplete = ({ suggestions }) => {
    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.movies);
    // const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState("")

    const handleOnChange = e => {
        const userInput = e.target.value;

        if (movies.currentKeyword && movies.currentKeyword !== userInput) dispatch(reset())

        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        // setActiveSuggestion(0)
        setFilteredSuggestions(filteredSuggestions)
        setShowSuggestions(true)
        setUserInput(e.target.value)
    };


    const handleOnKeyDown = e => {
        // User pressed the enter key
        if (e.keyCode === 13) {
            setShowSuggestions(false)
            dispatch(GetMovies({ q: userInput }))

        }
    };

    const handleOnClick = payload => {
        setUserInput(payload)
        setShowSuggestions(false)
        dispatch(GetMovies({ q: payload }))
    };

    return (
        <Box position="fixed" top="0" py="18px" bgColor="white" maxW="inherit" w="inherit" zIndex="sticky">
            <Input
                placeholder="Enter movie/series title"
                value={userInput}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
            />
            {
                showSuggestions && userInput
                    ?
                    <Box bgColor="twitter.100" py="4" mt="2" borderRadius="md">
                        {filteredSuggestions.length > 0
                            ?
                            <Flex direction="column" gridRowGap=".5" cursor="pointer" overflowY="auto">
                                {filteredSuggestions.map((d, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => handleOnClick(d)}
                                        _hover={{ bgColor: "twitter.300", fontWeight: "semibold" }}
                                        px="4"
                                        py="2"
                                    >
                                        {d}
                                    </Box>
                                ))
                                }
                            </Flex>
                            : <Box> no suggestion </Box>
                        }
                    </Box>
                    : <> </>
            }
            {
                movies.Response === "True" && <Text>Showing {movies?.Search.length} of {movies.totalResults}</Text>
            }
        </Box>
    )
}

export default Autocomplete
