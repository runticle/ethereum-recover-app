import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import BaseButton from '../BaseButton';

describe('BaseButton', () => {
    const onPressMock = jest.fn();
    const testText = 'Test Text';

    afterEach(() => {
        onPressMock.mockReset();
    });

    it('should render button text correctly', () => {
        const { getByText } = render(
            <BaseButton onPress={onPressMock}>{testText}</BaseButton>
        );

        expect(getByText(testText)).toBeDefined();
    });

    it('should call onPress function when button is pressed', () => {
        const { getByText } = render(
            <BaseButton onPress={onPressMock}>{testText}</BaseButton>
        );

        fireEvent.press(getByText(testText));

        expect(onPressMock).toHaveBeenCalledTimes(1);
    });
});
