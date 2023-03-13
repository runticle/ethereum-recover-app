import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SecondaryButton from '../SecondaryButton';

describe('SecondaryButton', () => {
    const onPressMock = jest.fn();
    const testText = 'Test Text';

    afterEach(() => {
        onPressMock.mockReset();
    });

    it('should render button text correctly', () => {
        const { getByText } = render(
            <SecondaryButton onPress={onPressMock}>{testText}</SecondaryButton>
        );

        expect(getByText(testText)).toBeDefined();
    });

    it('should call onPress function when button is pressed', () => {
        const { getByText } = render(
            <SecondaryButton onPress={onPressMock}>{testText}</SecondaryButton>
        );

        fireEvent.press(getByText(testText));

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
