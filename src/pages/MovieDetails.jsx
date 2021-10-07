import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Flex, Container, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { AlertIcon, Alert, AlertTitle, } from '@chakra-ui/alert';
import { CloseButton } from '@chakra-ui/close-button';
import { GetMovieDetails } from 'store/services';

const MovieDetails = () => {
    const dispatch = useDispatch()
    const { title } = useParams()
    const { singleMovie, error } = useSelector((state) => state.movies);
    console.log({ singleMovie, error });

    useEffect(() => {
        if (title) {
            dispatch(GetMovieDetails({ title }))
        }
    }, [title])

    if (singleMovie?.Response === "False" || error?.Error) {
        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{error?.Error || singleMovie?.Error}</AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
        )
    }
    return (
        <div>

        </div>
    )
}

export default MovieDetails
