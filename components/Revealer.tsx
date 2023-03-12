import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Colours } from "./Globals";
import LargeText from "./Text/LargeText";
import NormalText from "./Text/NormalText";

interface RevealerProps {
    textToHide: string;
    title: string;
}

const RevealerView = styled.View`
    align-items: center;
    padding-bottom: 20px;
`

const HeadingContainer = styled.View`
    color: white;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Revealer:FunctionComponent<RevealerProps> = ({
    title,
    textToHide,
}) => {
    const [hidden, setHidden ] = useState(true)

    const hiddenString = textToHide.replace(/./g, "*")

    return (
        <RevealerView>
            <HeadingContainer>
                <LargeText textStyle={{ marginRight: 10, color: Colours.white }}>
                    {title}
                </LargeText>
                <TouchableOpacity onPress={() => setHidden(prev => !prev)}>
                    <Ionicons name={hidden ? "eye-outline" : "eye-off-outline"} size={24} color={Colours.white} />
                </TouchableOpacity>
            </HeadingContainer>
            <NormalText>
                { hidden ? hiddenString : textToHide}
            </NormalText>
        </RevealerView>
    )
}

export default Revealer