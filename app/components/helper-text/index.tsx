import styled from "@emotion/native";
import React from "react";
import { useTheme } from "native-base";

export const HelperText = ({valid, children}: {valid: boolean, children: React.ReactNode}) => {
    const { colors } = useTheme();
    const Helper = styled.Text<{valid?: boolean}>((props) => ({
        color: props.valid ? colors.gray["600"] : colors.gray["400"],
        fontWeight: props.valid ? "800" : "normal"
    }))

    return <Helper valid={valid}>{children}</Helper>
}