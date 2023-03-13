import styled from 'styled-components/native';

const Colours = {
    black: `#393D47`,
    white: '#DBE2E9',
    orange: '#F09030',
    red: '#CC5608',
};

const Container = styled.View`
    flex: 1;
    background-color: ${Colours.black};
    padding: 20px;

    padding-top: 50px;
`;

const MNEMONIC_LENGTH = 12;

const SECURE_STORAGE_KEY = 'efiuatni4wh4wgiu4iub';

export { Colours, Container, MNEMONIC_LENGTH, SECURE_STORAGE_KEY };
