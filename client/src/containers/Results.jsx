import {Badge, Box, HStack, Text, VStack} from "@chakra-ui/react";

const SingeLine = ({keyValue, value}) => (<HStack>
    <Text>{keyValue}:</Text>
    <Text>{value}</Text>
</HStack>);

function LyricsCard() {
    return (
        <VStack borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow={'md'} w={980} align={'left'} p={2}>
            <Text>Sinduwa</Text>
            <SingeLine keyValue={"Gayanaya"} value={"Amaradewa"}/>
            <SingeLine keyValue={"Compose eka"} value={"Amaradewa"}/>
            <SingeLine keyValue={"Genres:"} value={"Amaradewa"}/>
            <SingeLine keyValue={"Writer:"} value={"Amaradewa"}/>
        </VStack>
    )
}

export default function Results() {
    return (
        <VStack>
            <LyricsCard/>
            <LyricsCard/>
            <LyricsCard/>
        </VStack>
    );
}