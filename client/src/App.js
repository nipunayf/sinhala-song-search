import './App.css';
import {
    ChakraProvider,
    HStack,
    Spacer,
    VStack
} from "@chakra-ui/react";
import SearchBar from "./containers/SearchBar";
import Filter from "./containers/Filter";
import Results from "./containers/Results";

function App() {
    return (
        <ChakraProvider>
            <HStack p={8} align={'center'}>
                {/*<Filter/>*/}
                {/*<Spacer/>*/}
                <VStack w={'100%'} pr={6} spacing={8}>
                    <SearchBar/>
                    <Results/>
                </VStack>
            </HStack>
        </ChakraProvider>
    )
}

export default App;
