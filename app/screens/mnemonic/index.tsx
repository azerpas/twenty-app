import React from 'react';
import { Screen, Text, View } from "../../components";
import { Box, Center } from "native-base";

export const MnemonicScreen = () => {
    return (
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Box mx={10}>
                    <Center>
                        {/* set up a map for the mnemonic phrase */}
                    </Center>
                </Box>
            </Screen>
        </View>
    );
}