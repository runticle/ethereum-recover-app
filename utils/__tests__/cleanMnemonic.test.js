import cleanMnemonic from '../cleanMnemonic';

describe('cleanMnemonic function', () => {
  it('should clean up an array of strings', () => {
    const input = ['this is a test', '12345', 'SoMe !@#$%^&*( chaRACTERS', '  leading and trailing spaces  '];
    const expectedOutput = ['thisisatest', '', 'somecharacters', 'leadingandtrailingspaces'];

    const output = cleanMnemonic(input);

    expect(output).toEqual(expectedOutput);
  });
});