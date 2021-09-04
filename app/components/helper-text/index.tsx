import styled from "@emotion/native";
import React from "react";
import { useTheme } from "native-base";
import { HelperTextProps } from "./index.props";

export const HelperText = ({valid, children, highlight}: HelperTextProps) => {
    const { colors } = useTheme();
    console.log(`${highlight} ${valid}`)
    const Helper = styled.Text<{valid?: boolean, highlight?: boolean}>((props) => ({
        color: props.valid ? colors.gray["600"] : (props.highlight ? colors.red["500"] : colors.gray["400"]),
        fontWeight: props.valid ? "800" : "normal"
    }));

    return <Helper valid={valid} highlight={highlight}>{children}</Helper>
}