import React, { useState } from 'react';
import { Screen, View } from "../../components";
import { Box, Button, Center, Heading, Text } from "native-base";
import { ConfirmMnemonic, Mnemonic } from '../../components/mnemonic';
import { useMemoryStore, useStores } from '../../models';
import { cast } from 'mobx-state-tree';

export const MnemonicScreen = () => {
    const st = "cry pilot west bench pepper jeans joke slow gadget cloud chuckle wedding canal crop dolphin route ridge mouse canoe rural actor luxury guide buzz";
    const [step, setStep] = useState<number>(2);
    const [confirmPhrase, setConfirmPhrase] = useState<string>();

    const { engineStore } = useStores();
    const memoryStore = useMemoryStore();

    const createNewVaultAndKeychain = async (password) => {
        console.log("dd-dd")
        const keyrings = await engineStore.createNewKeychain("test");
        memoryStore.keyrings = keyrings;
        const seed = await engineStore.exportSeedPhrase();
        console.log(seed);
        console.log("dd-dd")
	};

    const clearKeyrings = () => {
        engineStore.clearKeyrings();
        memoryStore.keyrings = cast([]);
    }

    return (
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Box mx={5}>
                    <Center>
                        <Button onPress={createNewVaultAndKeychain}>Heo</Button>
                        <Heading>Your wallet</Heading>
                        <Heading fontWeight="light" fontSize="lg" my={2}>Step {step}/2</Heading>
                        { 
                            step === 1 && 
                            <>
                                <Text my={2}>
                                    Please write down these 24 words (order is important). This phrase will allow you
                                    to recover your funds in case of application failure.
                                </Text>
                                <Mnemonic phrase={st}/>
                                <Text>NEVER DISCLOSE THIS PHRASE TO ANYONE. WE WILL NEVER ASK YOU FOR YOUR PHRASE. STORE IT IN A SAFE PLACE.</Text>
                                <Button w="100%">Continue</Button>
                            </>
                        }
                        {
                            step === 2 && 
                            <>
                                <Text my={2}>
                                    Enter the 24 words in the same order
                                </Text>
                                <ConfirmMnemonic phrase={st}/>
                            </>
                        }
                    </Center>
                </Box>
            </Screen>
        </View>
    );
}