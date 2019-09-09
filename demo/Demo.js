/* eslint quotes: 0 */
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Button,
    StatusBar
} from 'react-native';

import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import SearchHeader from 'react-native-search-header';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
    status: {
        zIndex: 10,
        elevation: 2,
        width: DEVICE_WIDTH,
        height: 36,
        backgroundColor: '#0097a7'
    },
    header: {
        flexDirection: `row`,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: 59,
        padding: 6,
        backgroundColor: '#00bcd4'
    },
    label: {
        flexGrow: 1,
        fontSize: 18,
        fontWeight: `600`,
        textAlign: `right`,
        paddingRight: 50,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#f5fcff`,
        backgroundColor: `transparent`
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: `#ff5722`
    }
});

const Example1 = (props) => {
    const searchHeaderRef = React.useRef(null);
    const {
        navigation
    } = props;

    return (
        <View style = { styles.container }>
            <StatusBar barStyle = 'light-content' />
            <View style = { styles.status }/>
            <View style = { styles.header }>
                <Text style = { styles.label } > Example 1 </Text>
                <Button
                    title = 'Search'
                    color = '#f5fcff'
                    onPress = {() => searchHeaderRef.current.show()}
                />
                <Button
                    title = '>'
                    color = '#f5fcff'
                    onPress = {() => navigation.navigate(`example2`)}
                />
            </View>
            <SearchHeader
                ref = { searchHeaderRef }
                placeholder = 'Search...'
                placeholderColor = 'gray'
                autoFocus = { true }
                visibleInitially = { false }
                persistent = { false }
                enableSuggestion = { true }
                entryAnimation = 'from-right-side'
                pinnedSuggestions = {[ `react-native-search-header`, `react-native`, `javascript` ]}
                topOffset = { 36 }
                iconColor = 'gray'
                iconImageComponents = {[{
                    name: `hide`,
                    customStyle: {
                        tintColor: 'red'
                    }
                }, {
                    name: `pin`,
                    customStyle: {
                        tintColor: 'red'
                    }
                }]}
                onClear = {() => {
                    console.log(`CLEAR`);
                }}
                onGetAutocompletions = {async (text) => {
                    if (text) {
                        const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                            method: `get`
                        });
                        const data = await response.json();
                        return data[1];
                    }
                    return [];
                }}
                onEnteringSearch = {(event) => {
                    console.log(event.nativeEvent.text);
                }}
                onSearch = {(event) => {
                    console.log(event.nativeEvent.text);
                }}
                style = {{
                    header: {
                        height: 62,
                        backgroundColor: `#fdfdfd`
                    }
                }}
            />
            <View style = { styles.button }>
                <Button
                    title = 'Show'
                    color = '#f5fcff'
                    onPress = {() => searchHeaderRef.current.show()}
                />
            </View>
            <View style = { styles.button }>
                <Button
                    title = 'Hide'
                    color = '#f5fcff'
                    onPress = {() => searchHeaderRef.current.hide()}
                />
            </View>
            <View style = { styles.button }>
                <Button
                    title = 'Clear'
                    color = '#f5fcff'
                    onPress = {() => searchHeaderRef.current.clear()}
                />
            </View>
            <View style = { styles.button }>
                <Button
                    title = 'Clear Suggestion'
                    color = '#f5fcff'
                    onPress = {() => searchHeaderRef.current.clearSuggestion()}
                />
            </View>
            <View style = { styles.button }>
                <Button
                    title = 'Next'
                    color = '#f5fcff'
                    onPress = {() => navigation.navigate(`example2`)}
                />
            </View>
        </View>
    );
};

const Example2 = (props) => {
    const searchHeaderRef = React.useRef(null);
    const {
        navigation
    } = props;

    return (
        <View style = { styles.container }>
            <StatusBar barStyle = 'light-content' />
            <View style = { styles.status }/>
            <View style = { styles.header }/>
            <SearchHeader
                ref = { searchHeaderRef }
                placeholder = 'Search...'
                placeholderColor = 'gray'
                dropShadowed = { false }
                autoFocus = { false }
                visibleInitially = { true }
                persistent = { true }
                enableSuggestion = { true }
                entryAnimation = 'from-left-side'
                topOffset = { 36 }
                iconColor = 'gray'
                iconImageComponents = {[{
                    name: `hide`,
                    customStyle: {
                        tintColor: 'red'
                    }
                }, {
                    name: `pin`,
                    customStyle: {
                        tintColor: 'red'
                    }
                }]}
                onClear = {() => {
                    console.log(`CLEAR`);
                }}
                onGetAutocompletions = {async (text) => {
                    if (text) {
                        const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                            method: `get`
                        });
                        const data = await response.json();
                        return data[1];
                    }
                    return [];
                }}
                onEnteringSearch = {(event) => {
                    console.log(event.nativeEvent.text);
                }}
                onSearch = {(event) => {
                    console.log(event.nativeEvent.text);
                }}
                style = {{
                    header: {
                        height: 38,
                        marginTop: 9,
                        marginHorizontal: 9,
                        borderRadius: 19,
                        backgroundColor: `#fdfdfd`
                    },
                    input: {
                        fontSize: 16,
                        margin: 0,
                        padding: 0,
                        borderRadius: 0,
                        backgroundColor: `transparent`
                    }
                }}
            />
            <View style = { styles.button }>
                <Button
                    title = 'Clear'
                    color = '#f5fcff'
                    onPress = {() => searchHeaderRef.current.clear()}
                />
            </View>
            <View style = { styles.button }>
                <Button
                    title = 'Clear Suggestion'
                    color = '#f5fcff'
                    onPress = {() => searchHeaderRef.current.clearSuggestion()}
                />
            </View>
            <View style = { styles.button }>
                <Button
                    title = 'Prev'
                    color = '#f5fcff'
                    onPress = {() => navigation.goBack()}
                />
            </View>
        </View>
    );
};

const ExampleStackNavigator = createStackNavigator({
    example1: {
        screen: ({
            navigation
        }) => {
            return (
                <Example1 navigation = { navigation }/>
            );
        },
        navigationOptions: () => {
            return {
                header: {
                    visible: true
                }
            };
        }
    },
    example2: {
        screen: ({
            navigation
        }) => {
            return (
                <Example2 navigation = { navigation }/>
            );
        },
        navigationOptions: () => {
            return {
                header: {
                    visible: true
                }
            };
        }
    }
}, {
    initialRouteName: `example1`,
    mode: `card`,
    headerMode: `none`,
    cardStyle: {
        backgroundColor: `transparent`
    }
});

const AppContainer = createAppContainer(ExampleStackNavigator);
const Demo = () => {
    return (
        <AppContainer/>
    );
};
export default Demo;
