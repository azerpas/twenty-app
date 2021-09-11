import React from "react";
import { MnemonicProps } from "./index.props";
import { Container, Flex, Text } from "native-base";
import { BadgeMnemonic } from "../badge-mnemonic";

export const Mnemonic = (props: MnemonicProps) => {
    const { phrase } = props;
    const words = phrase.split(" ");
    if(words.length !== 24)
        return(
            <Text>Error while displaying the key. Please contact an admin. WL:{words.length}</Text>
        );
    return(
        <Container>
            <Flex direction="row">
                {words.map((value: string, index: number) => <BadgeMnemonic text={value} number={index+1} key={index}/>)}
            </Flex>
        </Container>
    );
}