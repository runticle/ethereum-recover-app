import { FunctionComponent } from 'react';

import styled from 'styled-components/native';
import { Container } from '../components/Globals';
import NormalButton from '../components/NormalButton';
import NormalText from '../components/Text/NormalText';

const HomeView = styled(Container)`
  // add extra styles here
  justify-content: space-evenly;
  align-items: center;
`

const HomeScreen: FunctionComponent = () => {
  return (  
    <HomeView>
      <NormalText>
        Hello world        
      </NormalText>
      <NormalButton onPress={() => null}>
        Recover Wallet
      </NormalButton>
    </HomeView>
  );
}

export default HomeScreen;