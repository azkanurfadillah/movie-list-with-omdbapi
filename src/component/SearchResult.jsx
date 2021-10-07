import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Container, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image } from '@chakra-ui/image';
import { Skeleton } from '@chakra-ui/skeleton';
import { GetMovies } from 'store/services';

const SearchResult = () => {
    const dispatch = useDispatch();
    const { movies, loading, error, } = useSelector((state) => state.movies);
    const availablePage = movies?.totalResults ? Math.ceil(movies.totalResults / 10) : 0
    const [loadedImage, setLoadedImage] = useState([])
    const [page, setPage] = useState(2)

    console.log({ movies, error, })

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if (page <= availablePage && movies?.currentKeyword) {
                setPage(page + 1)
                dispatch(GetMovies({ q: movies?.currentKeyword, page }))

            }
        }
    }

    return (
        <Flex wrap="wrap" gridRowGap="6" gridColumnGap="4" my="8">
            {movies?.Search.length ?
                movies.Search.map(movie => (
                    <Flex flex="1" direction="column" minW="198" maxW="208px" bgColor="twitter.100" p="4" borderRadius="md" justify="space-between">
                        <Image
                            width="150px"
                            mx="auto"
                            src={movie.Poster}
                            onLoad={() => setLoadedImage(prevSate => [...prevSate, movie.imdbID])}
                            display={loadedImage.includes(movie.imdbID) ? "block" : "none"}
                        />
                        {
                            !loadedImage.includes(movie.imdbID) && <Skeleton borderRadius="md" speed={.5} fadeDuration={.8} height="200px" />
                        }
                        <Box>
                            <Flex justify="space-between">
                                <Text>{movie.Type}</Text>
                                <Text>{movie.Year}</Text>
                            </Flex>
                            <Text>{movie.Title}</Text>
                        </Box>
                    </Flex>
                ))
                : <Text>{error?.Error || movies?.Error}</Text>
            }
        </Flex>
    )
}

export default SearchResult
