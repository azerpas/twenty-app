
import React from "react"
import { observer } from "mobx-react-lite";
import { Screen, Text, View } from "../../components";

export const Hello = observer(() => {
    return(
        <View>
            <Screen preset="scroll" backgroundColor="transparent">
                <Text style={{color: "blue"}}>Save.</Text>
                <Text style={{color: "red"}}>Earn.</Text>
                <Text style={{color: "green"}}>Diversify.</Text>
            </Screen>
        </View>
    );
})