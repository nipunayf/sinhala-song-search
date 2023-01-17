import {
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
    RadioGroup,
    Stack,
    Radio
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useState} from "react";


function RadioExample() {
    const [value, setValue] = useState('1')
    return (<RadioGroup onChange={setValue} value={value}>
        <Stack direction='row'>
            <Radio value='2'>ගී පද</Radio>
            <Spacer/>
            <Radio value='3'>උපමා </Radio>
        </Stack>
    </RadioGroup>)
}

export default function SearchBar() {
    return (<HStack w={'100%'} h={65} borderWidth="1px" borderRadius="lg" boxShadow={'lg'} p={4} bg={"gray.50"}>
        <InputGroup pt={1} w={'50%'}>
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="white.100"/>}
                pt={2}
            />
            <Input
                id={"keyword"}
                type="search"
                placeholder="ඔබගේ මූල පද ඇතුලත් කරන්න"
                isRequired
                onChange={() => {
                }}
            />
        </InputGroup>
        <Spacer/>
        <RadioExample/>
        <Spacer/>
        <IconButton
            colorScheme='blue'
            aria-label='Search database'
            icon={<SearchIcon/>}
        />
    </HStack>);
}