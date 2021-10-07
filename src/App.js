import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/provider";
import { Box, Flex, Container } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useSelector } from "react-redux";
import theme from "theme";

import Autocomplete from "component/Autocomplete";
const queryClient = new QueryClient();

function App() {


  const movies = useSelector((state) => state.movies);

  console.log({ movies })
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Container
          fontSize="sm"
          minH="100vh"
        >
          Stockbit React Dev Test
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
              'Modern Family'
            ]}
          />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>

  );
}

export default App;

