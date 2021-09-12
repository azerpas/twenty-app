import React from "react";
import { MnemonicProps } from "./index.props";
import { Container, Flex, Text } from "native-base";
import { BadgeMnemonic, BadgeSelect } from "../badge-mnemonic";

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
    const wordsSorted = phrase.split(" ").sort();
    if(words.length !== 24)
        return(
            <Text>Error while displaying the key. Please contact an admin. WL:{words.length}</Text>
        );
    return(
        <Flex direction="row" w="100%" wrap="wrap">
            {words.map((value: string, index: number) => <BadgeSelect list={wordsSorted} text={value} number={index+1} key={index} m={1}/>)}
        </Flex>
    );
}