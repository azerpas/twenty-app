import React from 'react';
import { Screen, View } from "../../components";
import { Box, Center, Text } from "native-base";
import { Mnemonic } from '../../components/mnemonic';

export const MnemonicScreen = () => {
    const st = "cry pilot west bench pepper jeans joke slow gadget cloud chuckle wedding canal crop dolphin route ridge mouse canoe rural actor luxury guide buzz";
    return (
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Box mx={10}>
                    <Center>
                        <Mnemonic phrase={st}/>
                        <Text>
                            Please write down these 24 words (order is important). This phrase will allow you
                            to recover your funds in case of application failure.
                        </Text>
                        <Text>NEVER DISCLOSE THIS PHRASE TO ANYONE. WE WILL NEVER ASK YOU FOR YOUR PHRASE.</Text>
                    </Center>
                </Box>
            </Screen>
        </View>
    );
}