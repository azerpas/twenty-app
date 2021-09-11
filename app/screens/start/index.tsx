import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Center, Container, FormControl, Heading, Input } from "native-base";
import { Screen, Text, View } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { SelectFiat } from "../../components/select/currency";
import { CRYPTO, FIAT } from "../../utils/constants/currencies";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PrimaryParamList } from "../../navigators";

type FormValues = {
    amount: number;
}

export const StartScreen = observer(() => {
    const { getValues, handleSubmit, control, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();
    const [fiat, setFiat] = useState<FIAT>(FIAT.EUR);
    const [crypto, setCrypto] = useState<CRYPTO>(CRYPTO.UST);
    const navigation = useNavigation<StackNavigationProp<PrimaryParamList>>()
    const nextScreen = () => navigation.navigate("mnemonic")

    return (
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Box mx={10}>
                <Center>
                        <Heading mb={4}>Start by depositing</Heading>
                        {/* <Button disabled>Use bank transfer</Button> */}
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <FormControl isRequired isInvalid={errors.amount && true}>
                                    <FormControl.Label> Amount </FormControl.Label>
                                    <Input 
                                        isInvalid={errors.amount && true} 
                                        placeholder="1000" keyboardType="numeric"
                                        onChangeText={value => onChange(value)} onBlur={onBlur} 
                                        value={value?.toString()} type="number"
                                        InputRightElement={
                                            <SelectFiat fiat={fiat} setFiat={setFiat}/>
                                        }    
                                    />
                                    <FormControl.ErrorMessage>{errors.amount ? errors.amount.message : null}</FormControl.ErrorMessage>
                                    <FormControl.HelperText mb="2">
                                        {
                                            getValues().amount ?
                                                <Text>
                                                    You'll get: {getValues().amount * 0.98} {crypto}
                                                </Text>
                                            : null
                                        }
                                    </FormControl.HelperText>
                                </FormControl>  
                            )}
                            name="amount"
                            rules={{required: true, min: 50, max: 100000, pattern: /[^0-9]/}}
                        />
                        <Button width="100%" onPress={nextScreen}>Use credit card</Button>
                </Center>
                </Box>
            </Screen>
        </View>
    );
});