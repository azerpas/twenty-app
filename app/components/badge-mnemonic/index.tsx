import React, {useState} from "react";
import { Badge, Button, CheckIcon, Select } from "native-base";
import { BadgeMnemonicProps, BadgeSelectProps } from "./index.props";

export const BadgeMnemonic = (props: BadgeMnemonicProps) => {
    const {number, text, ...rest} = props;
    return(
        <Button
            startIcon={
                <Badge colorScheme="gray" rounded="md">
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

export const BadgeSelect = (props: BadgeSelectProps) => {
    const {number, text, list, ...rest} = props;
    const [word, setWord] = useState<string>();
    return(
        <Button
            startIcon={
                <Badge colorScheme={word === undefined ? "gray" : (word !== text ? "red" : "green")} rounded="md">
                    {number.toString()}
                </Badge>
            }
            isDisabled
            variant={"outline"}
            size={"sm"}
            {...rest}
        >
            <Select
                variant="unstyled"
                selectedValue={word}
                defaultValue={list[0]}
                onValueChange={value => setWord(value)}
                _selectedItem={{
                    bg: "primary.600",
                    endIcon: <CheckIcon size={4} />,
                }}
                minWidth={100}
            >
                {
                    list.map((value, index) => {
                        return <Select.Item key={index} label={value} value={value}/>
                    })
                }
            </Select>
        </Button>
    );
} 