import React from "react";
import { observer } from "mobx-react-lite";
import { Center } from "native-base";
import { Screen, View } from "../../components";

export const StartScreen = observer(() => {
    
    return (
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Center>
                </Center>
            </Screen>
        </View>
    );
});