import { EvilIcons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Animated } from 'react-native';

import styled from 'styled-components/native';
import { spinAnimation } from '../utils/spinAnimation';
import { Colours } from './Globals';

const LoadingView = styled.SafeAreaView`
    background-color: ${Colours.black};
    opacity: 0.7;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    justify-content: center;
    align-items: center;
`;

interface LoadingProps {
    show: boolean;
}

const Loading: FunctionComponent<LoadingProps> = (props) => {
    if (!props.show) return null;
    return (
        <LoadingView>
            <Animated.View style={{ transform: [{ rotate: spinAnimation }] }}>
                <EvilIcons name="spinner-3" size={24} color={Colours.white} />
            </Animated.View>
        </LoadingView>
    );
};

export default Loading;
