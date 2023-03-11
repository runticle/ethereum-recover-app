import styled from "styled-components/native";

const Colours = {
    black: `#393D47`,
    white: '#DBE2E9',
    orange: '#CC5608',
}

const Container = styled.View`
    flex: 1;
    background-color: ${Colours.black};
`


export {
    Colours,
    Container
}