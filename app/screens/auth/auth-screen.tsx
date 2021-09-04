import React, { useEffect, useContext } from "react"
import { observer } from "mobx-react-lite";
import { Screen, View } from "../../components";
import { Box, Center, Container, VStack } from "native-base";
import { UserContext } from "../../context/user";
import { LogoSvg } from "../../components/svg/logo";
import { Form as FormJoin } from "../../components/join";



export const AuthScreen = observer(() => {
    const user = useContext(UserContext);

    useEffect(() => {
        console.log(user);
    }, [user])

    return(
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Center>
                    <Container w="100%">
                        <VStack space={4} alignItems="center" w="100%">
                            <Box w="100%">
                                <LogoSvg width="100%" height="50"/>
                            </Box>
                            <FormJoin/>
                        </VStack>
                    </Container>
                </Center>
            </Screen>
        </View>
    );
})