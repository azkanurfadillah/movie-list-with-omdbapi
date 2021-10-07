import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/provider";
import { Container } from "@chakra-ui/layout";
import theme from "theme";

import MoviesList from "pages/MoviesList";
import MovieDetails from "pages/MovieDetails";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container as="main"
        fontSize="sm"
        minH="100vh"
        my="4"
        p="0"
      >
        <Router>
          <Switch>
            <Route exact path="/" component={MoviesList} />
            <Route path="/omdb/:title" component={MovieDetails} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Container>
    </ChakraProvider>

  );
}

export default App;

