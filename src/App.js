import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/provider";
import { Box, Flex, Container } from "@chakra-ui/layout";
import theme from "theme";

import Autocomplete from "component/Autocomplete";
import SearchResult from "component/SearchResult";
const queryClient = new QueryClient();

function App() {

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
          <SearchResult />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>

  );
}

export default App;

