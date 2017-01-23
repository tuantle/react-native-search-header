# react-native-seach-header
Easy to use React Native search header component based on material design patterns.
This react native component was built with [hyperflow](http://github.com/tuantle/hyperflow) (a state management and mutation tool).

![demo](/demo.gif)

## Installation

`$ npm install react-native-search-header --save`

## Usage

To use search header you simply import the component factory function to create a renderable component:

```js
import SearchHeaderComponent from 'react-native-search-header';

const SearchHeaderView = SearchHeaderComponent();
```

### Examples

To use search header you simply import the component factory function to create a renderable component:

```js
import React, { Component } from 'react';
import {
    Dimensions,
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Button,
    StatusBar
} from 'react-native';

import SearchHeaderComponent from 'react-native-search-header';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const SearchHeader = SearchHeaderComponent();

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
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH,
        height: 56,
        marginBottom: 6,
        backgroundColor: '#00bcd4'
    },
    label: {
        flexGrow: 1,
        fontSize: 20,
        fontWeight: `600`,
        textAlign: `left`,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#f5fcff`,
        backgroundColor: `transparent`
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: `#ff5722`
    }
});

export default class Demo extends Component {
    constructor (
        props : Object,
        context : Object
    ) {
        super(props, context);
        this.state = {
            searchMode: false
        };
    }
    render () {
        return (
            <View style = { styles.container }>
                <StatusBar barStyle = 'light-content' />
                <View style = { styles.status }/>
                <View style = { styles.header }>
                    <Text style = { styles.label }>Demo</Text>
                </View>
                <SearchHeader
                    statusBarHeightOffet = { 21 }
                    minimized = { !this.state.searchMode }
                    onClose = {() => this.setState({
                        searchMode: false
                    })}
                />
                <View style = { styles.button }>
                    <Button
                        title = 'Open Search'
                        color = '#f5fcff'
                        onPress = {() => this.setState({
                            searchMode: true
                        })}
                    />
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Demo', () => Demo);
```

## Props

Below are the props you can pass to the React Component to customize the SearchHeader.

Prop | Type | Default | description
-----|------|---------|------------
textInputColor | string | #5d5d5d | Text input color.
textInputPlaceholderColor | string | #bdbdbd | Text input placeholder color.
iconColor | string | #5d5d5d | SearchHeader component icon button color.
statusBarHeightOffet | number | 21 | The offset above the SearchHeader component. Usually where the phone status is. 
dropShadow | boolean | true | Enable dropshow styling.
minimized | boolean | false | Set to false to minimize and to true to maximze the SearchHeader component.
autoCorrect | boolean | true | Enable text input autocorrect.
enableSearchSuggestion | boolean | true | When enabled, search suggestion list will be display accordingly.
searchSuggestionRollOverCount | number | 16 | The max number of search suggestion items.
placeholder | string | "Search..." | A string placeholder when there is no text in text input.
onGetSearchSuggestions | function | None | This function is called during search change to get a string array of search suggestions.
onSearch | function | None | This function is called after return/done key is pressed. Return text input event.
onSearchChange | function | None | This function is called after text is entered/changed in text input. Return text input event.
onClose | function | None | This function is called when SearchHeader close button is pressed.
onFocus | function | None | This function is called when text input in focused.
onBlur | function | None | This function is called when text input in blurred.
onMinimized | function | None | This function is called right after minimization animation is completed.
onMaximized | function | None | This function is called right after maximization animation is completed.

### Style Overrides

SearchHeader component default style can be overided. Below are examples of how to override each default style element.

```js
<SearchHeader
	style = {{
		container: {
			...myContainerStyle
		},
		searchBar: {
			...mySearchBarStyle
		},
		searchSuggestion: {
			...mySearchSuggestionStyle
		},
		textInput: {
			...myTextInputStyle
		},
		searchSuggestionItemText: {
			...mySearchSuggestionItemTextStyle
		},
		icon: {
			...myIconStyle
		}
	}}
/>
```

## Change Log
- Link to [change log](https://github.com/tuantle/react-native-search-header/tree/master/CHANGELOG.md)

## TODO

## License

Hyperflow is [MIT licensed](./LICENSE).
