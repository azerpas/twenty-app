import React, {useState} from "react";
// UI
import { Box, Button, FormControl, Input } from "native-base";
import { HelperText } from "../helper-text";
import { Text } from ".."
// Form
import { useForm, Controller } from 'react-hook-form';
// Auth
import auth from '@react-native-firebase/auth';
// Misc
import {email as emailPattern, password as passwordPattern} from "../../utils/pattern";
import { FormValues } from "./index.props";

export const Form = () => {
    const { getValues, handleSubmit, control, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);

    const onSubmit = async (data: FormValues) => {
        try {
            const result = await auth().createUserWithEmailAndPassword(data.email, data.password);
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                setSubmitError("You already have an account, please try to login");
            }else if(error.code === "auth/invalid-email"){
                setError("email", {type: "pattern", message: "Email is invalid"})
            }else if(error.code === "auth/weak-password"){
                setError("password", {type: "value", message: "Password is too weak"})
            }
        }
    };
    if(submitError){
        return(
            <>
                <Text>{submitError}</Text>
                <Button>Continue</Button>
            </>
        )
    }
    return(
        <>
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <FormControl isRequired isInvalid={errors.email && true}>
                        <FormControl.Label> Email </FormControl.Label>
                        <Input isInvalid={errors.email && true} placeholder="email@gmail.com" onChangeText={value => onChange(value)} onBlur={onBlur} value={value} type="email"/>
                        <FormControl.ErrorMessage>{errors.email ? errors.email.message : null}</FormControl.ErrorMessage>
                        <FormControl.HelperText mb="2">We will not spam you, I promess</FormControl.HelperText>
                    </FormControl>  
                )}
                name="email"
                rules={{required: true, pattern: emailPattern}}
            />
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <FormControl isRequired isInvalid={errors.password && true}>
                        <FormControl.Label> Password </FormControl.Label>
                        <Input isInvalid={errors.password && true} type="password" onChangeText={value => onChange(value)} onBlur={onBlur} value={value}/>
                        <FormControl.HelperText>
                            <Box ml="2" mb="2">
                                <HelperText valid={value?.length > 7} highlight={errors.password?.type === "pattern"}>
                                    {value?.length > 7 ? "✓": "•"} minimum 8 characters
                                </HelperText>
                                <HelperText valid={value?.match(/\d/) && true} highlight={errors.password?.type === "pattern"}>
                                    {value?.match(/\d/) ? "✓": "•"} contains a number
                                </HelperText>
                                <HelperText valid={value?.match(/[A-Z]/) && true} highlight={errors.password?.type === "pattern"}>
                                    {value?.match(/[A-Z]/) ? "✓": "•"} contains uppercase letter
                                </HelperText>
                                <HelperText valid={value?.match(/[a-z]/) && true} highlight={errors.password?.type === "pattern"}>
                                    {value?.match(/[a-z]/) ? "✓": "•"} contains lowercase letter
                                </HelperText>
                                <HelperText valid={value?.match(/[$&+,:;=?@#|'<>.^*()%!-]/) && true} highlight={errors.password?.type === "pattern"}>
                                    {value?.match(/[$&+,:;=?@#|'<>.^*()%!-]/) ? "✓": "•"} contains special character
                                </HelperText>
                            </Box>
                        </FormControl.HelperText>
                    </FormControl>  
                )}
                name="password"
                rules={{required: true, pattern: passwordPattern}}
            />
            <Controller
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <FormControl isRequired isInvalid={errors.confirmPassword && true}>
                        <FormControl.Label> Confirm password </FormControl.Label>
                        <Input 
                            type="password" 
                            onChangeText={value => {
                                onChange(value);
                            }} 
                            onBlur={onBlur} value={value} isInvalid={errors.confirmPassword && true}
                        />
                        <FormControl.ErrorMessage>{errors.confirmPassword ? errors.confirmPassword.message : null}</FormControl.ErrorMessage>
                        <FormControl.HelperText></FormControl.HelperText>
                    </FormControl>  
                )}
                name="confirmPassword"
                rules={{
                    required: true,
                    validate: (value) => {
                        console.log(`test ${getValues().password !== value}`);
                        if(value !== getValues().password){
                            setError("confirmPassword", {type: "value", message: "Passwords must match"});
                            return "Passwords must match"
                        }
                        return true
                    }
                }}
            />
            <Button onPress={handleSubmit(onSubmit)} variant="solid" colorScheme="primary" w="100%" shadow="3" isDisabled={isSubmitting}>
                <Text tx="authScreen.join"/>
            </Button>
        </>
    )
}