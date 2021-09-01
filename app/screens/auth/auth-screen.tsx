import React, { useEffect, useContext } from "react"
import { observer } from "mobx-react-lite";
import { Screen, View, Text } from "../../components";
import { Button, Container, FormControl, Input } from "native-base";
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from "../../context/user";

type FormValues = {
    email: string;
}

export const AuthScreen = observer(() => {
    const user = useContext(UserContext);
    const { register, setValue, handleSubmit, control, formState: { errors } } = useForm<FormValues>();
    const onSubmit = data => {
        console.log(data);
    };
    useEffect(() => {
        console.log(user);
    }, [user])
    return(
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Container>
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
                    <Button bgColor="blue.700" onPress={handleSubmit(onSubmit)}><Text tx="authScreen.join"/></Button>
                </Container>
            </Screen>
        </View>
    );
})