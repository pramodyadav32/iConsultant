import React from 'react';
import 'react-native-gesture-handler';
import AuthNavigator from './source/navigation/AuthNavigator';
import {Provider} from 'react-redux';
import configureStore from './source/redux/configureStore';
import EmptyLoader from './source/components/EmptyLoader';
export default function App() {
  // const store = configureStore()

  return (
    <Provider store={configureStore}>
      <EmptyLoader />
      <AuthNavigator />
    </Provider>
  );
}