import React from "react"
import { observer } from "mobx-react-lite";
import { Screen, View, Text } from "../../components";
import { Button, Container, FormControl, Input } from "native-base";
import { FormAuth } from "../../components/form/auth/form-auth";

export const AuthScreen = observer(() => {
    return(
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Container>
                    <FormAuth>
                        <FormControl isRequired>
                            <FormControl.Label> Email </FormControl.Label>
                            <Input placeholder="email@gmail.com"/>
                            <FormControl.HelperText>We will not spam you, I promess</FormControl.HelperText>
                        </FormControl>  
                        <Button bgColor="blue.700"><Text tx="helloScreen.continue"/></Button>
                    </FormAuth>
                </Container>
            </Screen>
        </View>
    );
})