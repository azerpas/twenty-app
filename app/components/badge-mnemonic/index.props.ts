import { IButtonProps } from "native-base";

export interface BadgeMnemonicProps extends IButtonProps {
    number: number,
    text: string
}

export interface BadgeSelectProps extends BadgeMnemonicProps {
    list: string[]
}