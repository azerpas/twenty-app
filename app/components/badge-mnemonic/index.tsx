import React from "react";
import { Badge, Button } from "native-base";
import { BadgeMnemonicProps } from "./index.props";

export const BadgeMnemonic = (props: BadgeMnemonicProps) => {
    const {number, text, ...rest} = props;
    return(
        <Button
            startIcon={
                <Badge colorScheme="secondary" rounded="md">
                    {number.toString()}
                </Badge>
            }
            isDisabled
            variant={"outline"}
            size={"sm"}
            {...rest}
        >
            {text}
        </Button>
    );
}