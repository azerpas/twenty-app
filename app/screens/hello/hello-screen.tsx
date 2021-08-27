
import React from "react"
import { observer } from "mobx-react-lite";
import { Screen, Text, View } from "../../components";
import { Flex, Heading, Button, Container } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FULL_HEIGHT: ViewStyle = {
    height: "100%"
}

export const Hello = observer(() => {
    const navigation = useNavigation()
    const toAuth = () => navigation.navigate("welcome");
    return(
        <View>
            <Screen preset="scroll" backgroundColor="transparent" style={FULL_HEIGHT}>
                <Flex align="center" flexDir="row" justify="space-between" height="100%">
                    <Container w="75%">
                        <Heading color="lightBlue.500" textAlign="center" w="100%">Save.</Heading>
                        <Heading color="lightBlue.500" textAlign="center" w="100%">Earn.</Heading>
                        <Heading color="blue.500" textAlign="center" w="100%">Diversify.</Heading>
                    </Container>
                    <SafeAreaView>
                        <Container w="100%">
                            <Button bgColor="blue.700" onPress={toAuth} width="100%">
                                <Text tx="helloScreen.continue"/>    
                            </Button> 
                    </Container>
                    </SafeAreaView>
                    
                </Flex>
            </Screen>
        </View>
    );
})