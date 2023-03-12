import styled from "styled-components/native";

const Colours = {
    black: `#393D47`,
    white: '#DBE2E9',
    orange: '#CC5608',
}

const Container = styled.View`
    flex: 1;
    background-color: ${Colours.black};

    padding-top: 50px;
`

const MNEMONIC_LENGTH = 12


export {
    Colours,
    Container,
    MNEMONIC_LENGTH
}