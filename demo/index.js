import { AppRegistry } from 'react-native';
import Demo from './Demo';
import { connectToDevTools } from 'react-devtools-core';

connectToDevTools({
    host: `10.0.1.6`,
    port: `8097`
});

AppRegistry.registerComponent(`Demo`, () => Demo);
