import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Container } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import { GetMovies } from 'store/services';

const Autocomplete = ({ suggestions }) => {
    const dispatch = useDispatch();
    // const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState("")

    const handleOnChange = e => {
        const userInput = e.target.value;
        // Filter our suggestions that don't contain the user's input
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
            console.log("handle enter", { userInput });
            setShowSuggestions(false)
            dispatch(GetMovies({ q: userInput }))

        }
    };

    const handleOnClick = payload => {
        setUserInput(payload)
        setShowSuggestions(false)
        console.log("handle click suggestion", { payload });
        dispatch(GetMovies({ q: payload }))
    };

    return (
        <div>
            <Input
                pr="4.5rem"
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
        </div>
    )
}

export default Autocomplete
