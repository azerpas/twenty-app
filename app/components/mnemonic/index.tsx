import React, {useRef, useCallback, useState} from "react";
import { MnemonicProps } from "./index.props";
import { Button, Flex, Text } from "native-base";
import { BadgeMnemonic, BadgeSelect, SelectedHandle } from "../badge-mnemonic";

export const Mnemonic = (props: MnemonicProps) => {
    const { phrase } = props;
    const words = phrase.split(" ");
    if(words.length !== 24)
        return(
            <Text>Error while displaying the key. Please contact an admin. WL:{words.length}</Text>
        );
    return(
        <Flex direction="row" w="100%" wrap="wrap">
            {words.map((value: string, index: number) => <BadgeMnemonic text={value} number={index+1} key={index} m={1}/>)}
        </Flex>
    );
}

export const ConfirmMnemonic = (props: MnemonicProps) => {
    const { phrase } = props;
    const words = phrase.split(" ");
    // Words in the Mnemonic phrase but sorted
    const [wordsAvailable, setWordsAvailable] = useState<string[]>(phrase.split(" ").sort());
    // Words already selected by the user
    const [wordsSelected, setWordsSelected] = useState<string[]>([]);
    // The word state in the child component
    // We use this callback to remove the selected words from the list of possible words to choose
    const wordRef = useCallback((wordSelector: SelectedHandle) => {
        if(!wordSelector) return
        if(!wordSelector.getSelectedWord()[0]) return
        // The selected word and its number in position
        const [word, number] = wordSelector.getSelectedWord()
        wordsSelected[number] = word;
        setWordsSelected(wordsSelected);
        // Remove words already selected from list of availables
        setWordsAvailable(words.filter(word => !wordsSelected.includes(word)).sort());
    }, [])

    if(words.length !== 24)
        return(
            <Text>Error while displaying the key. Please contact an admin. WL:{words.length}</Text>
        );
    return(
        <>
            <Flex direction="row" w="100%" wrap="wrap">
                {
                    words.map(
                        (value: string, index: number) => 
                            <BadgeSelect 
                                list={wordsAvailable} text={value} number={index+1} key={index} 
                                m={1}
                                ref={wordRef}
                            />
                    )
                }
            </Flex>
            <Button 
                isDisabled={phrase !== wordsSelected.join(" ")} 
                w="100%"
            >
                Start earning
            </Button>
        </>
    );
}