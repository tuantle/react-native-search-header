/* eslint quotes: 0 */
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Button,
    StatusBar
} from 'react-native';

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
        height: 21,
        backgroundColor: '#0097a7'
    },
    header: {
        flexDirection: `row`,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: 56,
        marginBottom: 6,
        backgroundColor: '#00bcd4'
    },
    label: {
        flexGrow: 1,
        fontSize: 18,
        fontWeight: `600`,
        textAlign: `left`,
        paddingLeft: 150,
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

export default class Demo extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <View style = { styles.container }>
                <StatusBar barStyle = 'light-content' />
                <View style = { styles.status }/>
                <View style = { styles.header }>
                    <Text style = { styles.label } >Demo </Text>
                    <Button
                        title = 'Search'
                        color = '#f5fcff'
                        onPress = {() => this.searchHeader.show()}
                    />
                </View>
                <SearchHeader
                    ref = {(searchHeader) => {
                        this.searchHeader = searchHeader;
                    }}
                    autoFocus = { true }
                    visibleInitially = { false }
                    persistent = { false }
                    enableSuggestion = { true }
                    entryAnimation = 'from-right-side'
                    topOffset = { 21 }
                    onClearSuggesstion = {() => true }
                    onGetAutocompletions = {async (text) => {
                        if (text) {
                            const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                                method: `get`
                            });
                            const data = await response.json();
                            return data[1];
                        } else { // eslint-disable-line
                            return [];
                        }
                    }}
                    onEnteringSearch = {(event) => {
                        console.log(event.nativeEvent.text);
                    }}
                    onSearch = {(event) => {
                        console.log(event.nativeEvent.text);
                    }}
                />
                <View style = { styles.button }>
                    <Button
                        title = 'Clear Suggestion'
                        color = '#f5fcff'
                        onPress = {() => this.searchHeader.clearSuggestion()}
                    />
                </View>
            </View>
        );
    }
}
