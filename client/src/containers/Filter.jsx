import {
    VStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
    Box,
    Button,
    Heading,
    RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Checkbox, HStack
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export default function Filter() {
    return (<VStack
        w={400} borderWidth="1px" borderRadius="lg" boxShadow={'lg'} p={4} bg={"gray.50"} align={'left'}>
        <Heading size={14}>Genres:</Heading>
        <Checkbox>Checkbox</Checkbox>
        <Checkbox>Checkbox</Checkbox>
        <Checkbox>Checkbox</Checkbox>
        <Checkbox>Checkbox</Checkbox>
        <Checkbox>Checkbox</Checkbox>
        <Checkbox>Checkbox</Checkbox>
        <Heading size={14} pt={5}>Views:</Heading>
        <RangeSlider defaultValue={[120, 240]} min={0} max={300} step={30}>
            <RangeSliderTrack>
                <RangeSliderFilledTrack/>
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0}/>
            <RangeSliderThumb boxSize={6} index={1}/>
        </RangeSlider>
        <Heading size={14} pt={5}>Pagination:</Heading>
        <HStack>
            <Button variant={'outline'} colorScheme='blue'>පෙර</Button>
            <Button variant={'outline'} colorScheme='blue'>පසු</Button>
        </HStack>
    </VStack>);
}