import {
    VStack,
    Heading,
    HStack,
    Text
} from "@chakra-ui/react";
import Page from "./Pagination";

export default function Filter({genre_count, hits, setData, query}) {
    return (
        <VStack
            w={400} borderWidth="1px" borderRadius="lg" boxShadow={'lg'} p={4} bg={"gray.50"} align={'left'}>
            <Text>සමස්ත: {hits}</Text>
            <Heading size={14}>වර්ග:</Heading>
            {genre_count.map(genre => <Text>{genre.key}: {genre.doc_count}</Text>)}
            <Heading size={14} pt={5}>පටුන:</Heading>
            <HStack>
                <Page hits={hits} setData={setData} query={query}/>
            </HStack>
        </VStack>);
}