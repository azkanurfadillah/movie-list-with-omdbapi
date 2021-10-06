import { ChakraProvider, Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import theme from "theme";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box
          fontSize="sm"
          minH="100vh"
        >
        </Box>
      </ChakraProvider>
    </QueryClientProvider>

  );
}

export default App;

