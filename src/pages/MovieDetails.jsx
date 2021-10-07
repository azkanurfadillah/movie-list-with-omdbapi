import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Flex, Text, Heading } from "@chakra-ui/layout";
import { Image } from '@chakra-ui/image';
import { AlertIcon, Alert, AlertTitle, } from '@chakra-ui/alert';
import { chakra } from '@chakra-ui/system';
import { CloseButton } from '@chakra-ui/close-button';

import { GetMovieDetails } from 'store/services';
import { Skeleton } from '@chakra-ui/skeleton';

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
        <>
            {
                singleMovie?.Title ?
                    <Box>
                        <Heading>{singleMovie.Title}</Heading>
                        {
                            singleMovie.Poster.toLowerCase() !== "n/a"
                                ?
                                <Image src={singleMovie.Poster} mx="auto" my="2" />

                                : <Skeleton speed={.5} fadeDuration={.8} height="420px" width="full" />
                        }
                        <Box as="section">
                            <Box mb="4">
                                <Text> <chakra.span fontWeight="bold">Director:</chakra.span>&nbsp;{singleMovie?.Director}</Text>
                                <Text> <chakra.span fontWeight="bold">Writer:</chakra.span>&nbsp;{singleMovie?.Writer}</Text>
                                <Text> <chakra.span fontWeight="bold">Type:</chakra.span>&nbsp;{singleMovie?.Type}</Text>
                                <Text> <chakra.span fontWeight="bold">Released:</chakra.span>&nbsp;{singleMovie?.Released}</Text>
                                <Text> <chakra.span fontWeight="bold">Language:</chakra.span>&nbsp;{singleMovie?.Language}</Text>
                                <Text> <chakra.span fontWeight="bold">IMDB Rating:</chakra.span>&nbsp;{singleMovie?.imdbRating}</Text>
                            </Box>
                            <Text> <chakra.span fontWeight="bold">Plot:</chakra.span>
                                <br />
                                {singleMovie?.Plot}
                            </Text>
                        </Box>
                    </Box>
                    : <Text>Loading</Text>
            }
        </>
    )
}

export default MovieDetails
