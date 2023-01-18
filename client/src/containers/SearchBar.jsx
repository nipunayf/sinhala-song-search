import {
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
import {postRequest} from "../api";
import {post} from "axios";


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

export default function SearchBar({setData, setAggs, setHits, setQuery}) {
    const [userQuery, setUserQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit() {
        setIsLoading(true);
        const result = await postRequest(userQuery, 0);
        console.log(result);
        setData(result.data);
        setAggs(result.aggs)
        setHits(result.hits)
        setQuery(userQuery)
        setIsLoading(false);
    }

    return (<HStack w={'50%'} h={65} borderWidth="1px" borderRadius="lg" boxShadow={'lg'} p={4} bg={"gray.50"}>
        <InputGroup pt={1} w={'75%'}>
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
                onChange={((e) => {
                    setUserQuery(e.target.value)
                }).bind(this)}
            />
        </InputGroup>
        <Spacer/>
        <IconButton
            w={20}
            colorScheme='blue'
            aria-label='Search database'
            isLoading={isLoading}
            onClick={onSubmit}
            icon={<SearchIcon/>}
        />
    </HStack>);
}