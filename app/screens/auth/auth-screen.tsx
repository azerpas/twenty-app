import React, { useEffect, useContext } from "react"
import { observer } from "mobx-react-lite";
import { Screen, View, Text } from "../../components";
import { Box, Button, Center, Container, FormControl, Input, useTheme, VStack } from "native-base";
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from "../../context/user";
import { TextStyle } from "react-native";
import styled from "@emotion/native";

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
}

export const AuthScreen = observer(() => {
    const user = useContext(UserContext);
    const { colors } = useTheme();
    const { register, setValue, handleSubmit, control, formState: { errors } } = useForm<FormValues>();
    const onSubmit = data => {
        console.log(data);
    };
    useEffect(() => {
        console.log(user);
    }, [user])

    const HelperText = styled.Text<{valid?: boolean}>((props) => ({
        color: props.valid ? colors.green : colors.black,
        fontWeight: props.valid ? "800" : "normal"
    }))

    return(
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Center>
                    <Container w="100%">
                        <VStack space={4} alignItems="center" w="100%">
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <FormControl isRequired>
                                    <FormControl.Label> Email </FormControl.Label>
                                    <Input placeholder="email@gmail.com" onChangeText={value => onChange(value)} onBlur={onBlur} value={value}/>
                                    <FormControl.HelperText>We will not spam you, I promess</FormControl.HelperText>
                                </FormControl>  
                            )}
                            name="email"
                            rules={{required: true}}
                        />
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <FormControl isRequired>
                                    <FormControl.Label> Password </FormControl.Label>
                                    <Input type="password" onChangeText={value => onChange(value)} onBlur={onBlur} value={value}/>
                                    <FormControl.HelperText>
                                        <Box ml="2">
                                            <HelperText valid={value?.length > 7}>
                                                {value?.length > 7 ? "✓": "•"} minimum 8 characters
                                            </HelperText>
                                            <HelperText valid={value.match(/\d/) && true}>
                                                {value.match(/\d/) ? "✓": "•"} contains a number
                                            </HelperText>
                                            <HelperText valid={value.match(/[A-Z]/) && true}>
                                                {value.match(/[A-Z]/) ? "✓": "•"} contains uppercase letter
                                            </HelperText>
                                            <HelperText valid={value.match(/[a-z]/) && true}>
                                                {value.match(/[a-z]/) ? "✓": "•"} contains lowercase letter
                                            </HelperText>
                                            <HelperText valid={value.match(/[$&+,:;=?@#|'<>.^*()%!-]/) && true}>
                                                {value.match(/[$&+,:;=?@#|'<>.^*()%!-]/) ? "✓": "•"} contains special character
                                            </HelperText>
                                        </Box>
                                    </FormControl.HelperText>
                                </FormControl>  
                            )}
                            name="password"
                            rules={{required: true}}
                        />
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <FormControl isRequired>
                                    <FormControl.Label> Confirm password </FormControl.Label>
                                    <Input type="password" onChangeText={value => onChange(value)} onBlur={onBlur} value={value}/>
                                    <FormControl.HelperText></FormControl.HelperText>
                                </FormControl>  
                            )}
                            name="password"
                            rules={{required: true}}
                        />
                        <Button bgColor="blue.700" onPress={handleSubmit(onSubmit)}><Text tx="authScreen.join"/></Button>
                        </VStack>
                    </Container>
                </Center>
            </Screen>
        </View>
    );
})