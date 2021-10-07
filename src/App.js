import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/provider";
import { Container } from "@chakra-ui/layout";
import theme from "theme";

import MoviesList from "pages/MoviesList";
import MovieDetails from "pages/MovieDetails";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Container as="main"
          fontSize="sm"
          minH="100vh"
        >
          Stockbit React Dev Test
          <Router>
            <Switch>
              <Route exact path="/" component={MoviesList} />
              <Route path="/omdb/:title" component={MovieDetails} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </Container>
      </ChakraProvider>
    </QueryClientProvider>

  );
}

export default App;

