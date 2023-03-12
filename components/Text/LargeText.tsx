import { FunctionComponent } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import styled from 'styled-components/native';
import { Colours } from '../Globals';

const TextView = styled.Text`
    font-size: 30px;
    color: ${Colours.orange};
`

interface TextProps {
    textStyle?: StyleProp<TextStyle>;
    children: React.ReactNode;
}

const LargeText: FunctionComponent<TextProps> = (props) => {
    return (
        <TextView>
            {props.children}
        </TextView>
    )
}

export default LargeText;