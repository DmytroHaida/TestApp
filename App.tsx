import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {Provider} from 'react-redux';
import { SitesList } from './src/screens/SitesList';
import store from './src/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <SitesList />

      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
