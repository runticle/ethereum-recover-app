import { Animated, Easing } from 'react-native';

const spinValue = new Animated.Value(0);

Animated.loop(
    Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
    })
).start(() => {
    spinValue.setValue(0);
});

export const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
});
