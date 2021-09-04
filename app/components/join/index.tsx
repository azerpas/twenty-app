import React from "react";
import { Box, Button, FormControl, Input } from "native-base";
import { useForm, Controller } from 'react-hook-form';
import {email as emailPattern} from "../../utils/pattern";
import { FormValues } from "./index.props";
import { HelperText } from "../helper-text";
import { Text } from ".."

export const Form = () => {
    const { register, setValue, handleSubmit, control, formState: { errors } } = useForm<FormValues>();
    const onSubmit = data => {
        console.log(data);
    };
    return(
        <>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <FormControl isRequired>
                        <FormControl.Label> Email </FormControl.Label>
                        <Input isInvalid={errors.email && true} placeholder="email@gmail.com" onChangeText={value => onChange(value)} onBlur={onBlur} value={value} type="email"/>
                        {errors.email && <FormControl.ErrorMessage>{errors.email.message}</FormControl.ErrorMessage>}
                        <FormControl.HelperText mb="2">We will not spam you, I promess</FormControl.HelperText>
                    </FormControl>  
                )}
                name="email"
                rules={{required: true, pattern: emailPattern}}
            />
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <FormControl isRequired>
                        <FormControl.Label> Password </FormControl.Label>
                        <Input isInvalid={errors.password && true} type="password" onChangeText={value => onChange(value)} onBlur={onBlur} value={value}/>
                        <FormControl.HelperText>
                            <Box ml="2" mb="2">
                                <HelperText valid={value?.length > 7}>
                                    {value?.length > 7 ? "✓": "•"} minimum 8 characters
                                </HelperText>
                                <HelperText valid={value?.match(/\d/) && true}>
                                    {value?.match(/\d/) ? "✓": "•"} contains a number
                                </HelperText>
                                <HelperText valid={value?.match(/[A-Z]/) && true}>
                                    {value?.match(/[A-Z]/) ? "✓": "•"} contains uppercase letter
                                </HelperText>
                                <HelperText valid={value?.match(/[a-z]/) && true}>
                                    {value?.match(/[a-z]/) ? "✓": "•"} contains lowercase letter
                                </HelperText>
                                <HelperText valid={value?.match(/[$&+,:;=?@#|'<>.^*()%!-]/) && true}>
                                    {value?.match(/[$&+,:;=?@#|'<>.^*()%!-]/) ? "✓": "•"} contains special character
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
            <Button onPress={handleSubmit(onSubmit)} variant="solid" colorScheme="primary" w="100%" shadow="3">
                <Text tx="authScreen.join"/>
            </Button>
        </>
    )
}