import React, {FC, memo, useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { IListOfSitesItem } from '../../store/siteList/listOfSitesSlice';
import { dw } from '../../utils/sizeUtils';

interface Props {
    item: IListOfSitesItem;
    selectedUrl: string;
    onPress: (url: string) => void;
}

const SiteItemCmp: FC<Props> = ({item, selectedUrl, onPress}) => {
    const isItemActive = useMemo(() => item.url === selectedUrl, [item.url, selectedUrl]);

    const handleOnPress = useCallback(() => {
        onPress(item.url);
    }, [onPress])

    return (
        <TouchableOpacity style={styles.container} onPress={handleOnPress}>
            <Text style={[styles.text, isItemActive ? styles.activeText : null]}>{item.name}</Text>
        </TouchableOpacity>
    );
};

export const SiteItem = memo(SiteItemCmp);

const styles = StyleSheet.create({
    container: {
        paddingVertical: dw(6),
    },
    text: {
        fontSize: dw(14),
        textAlign: 'center',
    },
    activeText: {
        color: 'lightblue',
    }
});
