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
import {useState} from "react";

function App() {
    const [data, setData] = useState([]);
    const [aggs, setAggs] = useState([])
    const [hits, setHits] = useState(0);
    const [query, setQuery] = useState('');

    return (
        <ChakraProvider>
            <HStack p={8} align={'top'}>
                <Filter genre_count={aggs} hits={hits} setData={setData} query={query}/>
                <Spacer/>
                <VStack w={'100%'} pr={6} spacing={8}>
                    <SearchBar setData={setData} setAggs={setAggs} setHits={setHits} setQuery={setQuery}/>
                    <Results data={data}/>
                </VStack>
            </HStack>
        </ChakraProvider>
    )
}

export default App;
