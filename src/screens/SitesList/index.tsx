import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import { ScrollView, StyleSheet, Text, View, _ScrollView } from 'react-native';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../store';
import { SiteItem } from './SiteItem';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { IParsedSitesInformation } from '../../store/siteList/listOfSitesSlice';
import { dw } from '../../utils/sizeUtils';
import { Loader } from '../../components/Loader/Loader';

const injectedJavaScript = `
        setTimeout(function() {
            const text = '©';
            const elements = document.querySelectorAll(':not(script)');
            let matches = [];

        for(let i=0; i<elements.length; i++) {
            if([...elements[i]?.childNodes]?.some(el => el.nodeType === 3 && el.textContent?.includes(text))){
                 matches.push(elements[i].innerText); 
            }
        }
            window.ReactNativeWebView.postMessage(JSON.stringify(matches))
        }, 0)
    `

export const SitesList: FC = () => {
    const [selectedUrl, setSelectedUrl] = useState('');
    const [isWebViewLoading, setIsWebViewLoading] = useState(false);

    const {getListOfSites, setParsedSitesInfo} = useActions();
    const {isListLoaded, listOfSites, parsedSitesInformation} = useAppSelector(state => state.sites);

    const copyrightText = useMemo(() => parsedSitesInformation.find(el => el.url === selectedUrl), [parsedSitesInformation, selectedUrl])?.text;

    useEffect(() => {
         if (!listOfSites.length) {
            getListOfSites();
         }
    }, []);

    const handleSetActiveUrl = useCallback((url: string) => {
        setSelectedUrl(url);
    }, []);

    const handleOnMessage = useCallback((event: WebViewMessageEvent) => {
        console.log(JSON.parse(event.nativeEvent.data))
        if (parsedSitesInformation?.some(el => el.url === selectedUrl)) {
            return
        }

        const webViewData: string[] = JSON.parse(event.nativeEvent.data);

        const parsedInfo = webViewData.map(el => {
            const newElement: IParsedSitesInformation = {
                text: el,
                url: selectedUrl,
            }

            return newElement;
        })

        setParsedSitesInfo(parsedInfo)
    }, [selectedUrl, parsedSitesInformation])

    const handleSetWevViewLoader = useCallback((state: boolean) => () => {
        setIsWebViewLoading(state);
    }, []);



    return (
        <View style={styles.container}>
            <ScrollView style={styles.flex1} contentContainerStyle={styles.flex1}>
                {!isListLoaded && <Loader />}
                {listOfSites?.map(el => <SiteItem key={el.name} selectedUrl={selectedUrl} item={el} onPress={handleSetActiveUrl} />)}
            </ScrollView>
            <View style={styles.flex1}>
                {isWebViewLoading && <Loader />}
                <WebView 
                    source={{uri: selectedUrl}}
                    injectedJavaScript={injectedJavaScript}
                    onLoadStart={handleSetWevViewLoader(true)}
                    onLoadEnd={handleSetWevViewLoader(false)}
                    onMessage={handleOnMessage}
                />
            </View>
            <ScrollView style={styles.flex1} contentContainerStyle={styles.copyrightContainer}>
                <Text>{copyrightText}</Text>
            </ScrollView>
            <View />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex1: {
        flex: 1,
    },
    copyrightContainer: {
        alignItems: 'center',
        paddingVertical: dw(10),
    }
});
