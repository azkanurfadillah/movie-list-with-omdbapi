import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/modal';
import { Image } from '@chakra-ui/image';
import { Slide } from '@chakra-ui/transition';
import { Skeleton } from '@chakra-ui/skeleton';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { GetMovies } from 'store/services';

const SearchResult = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const { movies, loading, error, } = useSelector((state) => state.movies);
    const availablePage = movies?.totalResults ? Math.ceil(movies.totalResults / 10) : 0
    const [loadedImage, setLoadedImage] = useState([])
    const [page, setPage] = useState(2)
    const [modal, setModal] = useState({ status: false, imageURL: "" })
    const [viewDetails, setViewDetails] = useState({ status: false, id: "" })
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
        <Box>
            <Flex wrap="wrap" gridRowGap="6" gridColumnGap="4" my="90px">
                {movies?.Search.length ?
                    movies.Search.map(movie => (
                        <Flex key={movie.imdbID}
                            flex="1" direction="column" justify="space-between"
                            minW="198px" maxW="232px" bgColor="twitter.100" p="4" borderRadius="md" >
                            <Image
                                width="150px"
                                mx="auto"
                                src={movie.Poster}
                                onLoad={() => setLoadedImage(prevSate => [...prevSate, movie.imdbID])}
                                display={loadedImage.includes(movie.imdbID) ? "block" : "none"}
                                _hover={{ cursor: "pointer" }}
                                onClick={() => setModal({ status: true, imageURL: movie.Poster })}
                            />
                            {
                                !loadedImage.includes(movie.imdbID) && <Skeleton borderRadius="md" speed={.5} fadeDuration={.8} height="200px" />
                            }
                            <Box position="relative"
                                onMouseEnter={() => setViewDetails({ status: true, id: movie.imdbID })}
                                onMouseLeave={() => setViewDetails({ status: false, id: "" })}
                                _hover={{ cursor: "pointer" }}
                            >
                                <Box
                                >
                                    <Flex justify="space-between">
                                        <Text>{movie.Type}</Text>
                                        <Text>{movie.Year}</Text>
                                    </Flex>
                                    <Text>{movie.Title}</Text>
                                </Box>
                                {viewDetails.id === movie.imdbID &&
                                    <Slide direction="bottom" in={true} style={{ zIndex: 10, position: "absolute", bottom: "-15px", left: "-15px", right: "-15px" }}  >
                                        <Flex
                                            align="center"
                                            h="72px"
                                            p="4"
                                            color="white"
                                            bgColor="rgba(26, 32, 44, .7)"
                                            borderRadius="md"
                                            onClick={() => history.push(`/omdb/${movie.Title}`)}
                                        >
                                            <Text fontWeight="bold" fontSize="md">Details <ArrowForwardIcon w={6} h={6} /> </Text>
                                        </Flex>
                                    </Slide>
                                }
                            </Box>
                        </Flex>
                    ))
                    : <Text>{error?.Error || movies?.Error}</Text>
                }

                <Modal isOpen={modal.status} onClose={() => setModal({ status: false })}>
                    <ModalOverlay />
                    <ModalContent>
                        <Image src={modal.imageURL} />
                    </ModalContent>
                </Modal>
            </Flex>
        </Box>
    )
}

export default SearchResult
