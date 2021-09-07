import React from 'react';
import { CheckIcon, Select } from "native-base";
import { FIAT } from '../../../utils/constants/currencies';

type SelectFiatProps = {
    fiat: FIAT,
    setFiat: React.Dispatch<React.SetStateAction<FIAT>>
}

export const SelectFiat = ({fiat, setFiat}: SelectFiatProps) => {
    return(
        <Select 
            selectedValue={fiat}
            onValueChange={value => setFiat(FIAT[value])}
            _selectedItem={{
                bg: "primary.600",
                endIcon: <CheckIcon size={4} />,
            }}
            minWidth={100}
        >
            {Object.values(FIAT).map(
                v => <Select.Item label={v} key={v} value={v}></Select.Item>
            )}
        </Select>
    );
}