import React, {FC} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

interface Props {
    color?: string;
    size?: number | 'small' | 'large' | undefined;
}

export const Loader: FC<Props> = ({color = "red", size = "large" }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={color} size={size} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
