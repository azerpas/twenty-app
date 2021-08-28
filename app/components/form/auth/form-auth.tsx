import React from "react"
import { FormAuthProps } from "./form-auth.props";

export const FormAuth = ({children, style}: FormAuthProps) => {
    return(
        <form style={style}>{children}</form>
    );
}