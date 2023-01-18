import {HStack, Text, VStack} from "@chakra-ui/react";

const SingeLine = ({keyValue, value}) => (<HStack>
    <Text as={'b'}>{keyValue}:</Text>
    <Text><div dangerouslySetInnerHTML={{ __html: value }} /></Text>
</HStack>);

function LyricsCard({line, source, target, meaning, song, artist, composer, writer, genre}) {
    return (
        <VStack borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow={'md'} w={980} align={'left'} p={2}>
            <SingeLine keyValue={"වැකිය"} value={line}/>
            <SingeLine keyValue={"උපමාව් "} value={source}/>
            <SingeLine keyValue={"උපමේය"} value={target}/>
            <SingeLine keyValue={"අර්ථය"} value={meaning}/>
            <SingeLine keyValue={"සින්දුව"} value={song}/>
            <SingeLine keyValue={"ගායකයා "} value={artist}/>
            <SingeLine keyValue={"නිර්මාපකයෙක්"} value={composer}/>
            <SingeLine keyValue={"ගත්කරු "} value={writer}/>
            <SingeLine keyValue={"වර්ගය"} value={genre}/>
        </VStack>
    )
}

export default function Results({data}) {
    return (
        <VStack>
            {data.map(entry => <LyricsCard line={entry.line} source={entry.source} target={entry.target}
                                           meaning={entry.meaning} song={entry.title} artist={entry.artist.join(", ")}
                                           composer={entry.composer.join(',')} writer={entry.writer.join(', ')}
                                           genre={entry.genre.join(', ')}/>)}
        </VStack>
    );
}