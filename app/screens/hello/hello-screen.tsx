
import React from "react"
import { observer } from "mobx-react-lite";
import { Screen, Text, View } from "../../components";
import { Flex, Heading, Button } from "native-base";

export const Hello = observer(() => {
    return(
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Flex>
                    <Heading color="lightBlue.500">Save.</Heading>
                    <Heading color="lightBlue.500">Earn.</Heading>
                    <Heading color="lightBlue.500">Diversify.</Heading>
                    <Button bgColor="lightblue">Start investing</Button> 
                </Flex>
            </Screen>
        </View>
    );
})