# react-native-seach-header
[![npm version](https://img.shields.io/npm/v/react-native-search-header.svg?style=flat)](https://www.npmjs.com/package/react-native-search-header)
[![npm downloads](https://img.shields.io/npm/dm/react-native-search-header.svg?style=flat-square)](https://www.npmjs.com/package/react-native-search-header)

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
                    ref = {(searchHeader) => {
                        this.searchHeader = searchHeader;
                    }}
                    statusHeightOffet = { 21 }
                />
                <View style = { styles.button }>
                    <Button
                        title = 'Open Search'
                        color = '#f5fcff'
                        onPress = {() => this.searchHeader.show()}
                    />
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Demo', () => Demo);
```

## Public Methods Access via Reference

    These are methods that are accessible via "ref":

Methods | description
-----|------
show | Call to show the SearchHeader.
hide | Call to hide the SearchHeader.
clearSearchSuggestion | Call to clear search suggestion list.

## Props

Below are the props you can pass to the React Component to customize the SearchHeader.

Prop | Type | Default | description
-----|------|---------|------------
searchInputTextColor | string | #5d5d5d | Search text input color.
placeholderTextColor | string | #bdbdbd | Text input placeholder color.
searchSuggestionTextColor | string | #bdbdbd | Search suggestion text color.
iconColor | string | #5d5d5d | SearchHeader component icon button color.
statusHeightOffet | number | 21 | The offset above the SearchHeader component. Usually where the phone status is.
dropShadow | boolean | true | Enable drop shadow styling.
visibleInitially | boolean | false | Set to false to hide and to true to show the SearchHeader component.
autoCorrect | boolean | true | Enable text input autocorrect.
enableSearchSuggestion | boolean | true | When enabled, search suggestion list will be display accordingly.
searchSuggestionRollOverCount | number | 16 | The max number of search suggestion items.
placeholder | string | "Search..." | A string placeholder when there is no text in text input.
entryAnimation | string | "from-left-side" | Set the direction of SearchHeader entry animation. Possible values are [ "from-left-side", "from-right-side" ]
onGetSearchSuggestions | function | None | This function is called during search change (componenWillUpdate) to get a string array of search suggestions.
onSearch | function | None | This function is called after return/done key is pressed. Return text input event.
onSearchChange | function | None | This function is called after text is entered/changed in text input. Return text input event.
onFocus | function | None | This function is called when text input in focused.
onBlur | function | None | This function is called when text input in blurred.
onHidden | function | None | This function is called right after hide animation is completed.
onVisible | function | None | This function is called right after show animation is completed.

### Style Overrides

SearchHeader component default style can be override. Below are examples of how to override each default style element.

```js
<SearchHeader
	style = {{
		container: {
			...myContainerStyle
		},
		searchInput: {
			...mySearchInputStyle
		},
		searchSuggestion: {
			...mySearchSuggestionStyle
		},
		searchInputText: {
			...mySearchTextStyle
		},
		searchSuggestionText: {
			...mySearchSuggestionTextStyle
		},
		icon: {
			...myIconStyle
		}
	}}
/>
```

## Change Log
**Release Version 0.1.6 (02/16/2017)**
```
Notes:
New Features:
    - Added isHidden and clear methods, accessible via "ref"
Breaking Changes:
Improvements:
Bug fixes:
    - Fixed issues with onHidden and onVisible not firing.
```
**Release Version 0.1.5 (01/27/2017)**
```
Notes:
New Features:
Breaking Changes:
Improvements:
    - Improved search suggestion implementation. Matching it closer to other material design search implementations.
Bug fixes:
```
**Release Version 0.1.4 (01/26/2017)**
```
Notes:
	- Update to latest hyperflow version.
New Features:
    - New prop "entryAnimation" for setting SearchHeader entry animation direction.
Breaking Changes:
Improvements:
    - Added public methods access via "ref"
Bug fixes:
    - Fixed react "refs" warning message.
```
**Release Version 0.1.3 (01/25/2017)**
```
Notes:
	- Update to latest hyperflow version.
New Features:
Breaking Changes:
    - Props renaming:
        searchTextColor               -> searchInputTextColor
        searchSuggestionItemTextColor -> searchSuggestionTextColor
        searchVisibleInitially        -> visibleInitially
        onSearchBlur                  -> onBlur
        onSearchFocus                 -> onFocus
        onMinimized                   -> onHidden
        onMaximized                   -> onVisible
Improvements:
    - Added public methods access via "ref"
Bug fixes:
    - Fixed issue with search container covering underlining components when hidden.
```
**Release Version 0.1.2 (01/23/2017)**
```
Notes:
	- Update to latest hyperflow version.
New Features:
Breaking Changes:
    - Props renaming:
        statusBarHeightOffet      -> statusHeightOffet
        textInputPlaceholderColor -> placeholderTextColor
        minimized                 -> searchVisibleInitially
        onBlur                    -> onSearchBlur
        onFocus                   -> onSearchFocus
        onMinimized               -> onSearchHidden
        onMaximized               -> onSearchVisible
Improvements:
    - Added public methods access via "ref"
Bug fixes:
```
**Release Version 0.1.1 (01/23/2017)**
```
Notes:
	- Update to latest hyperflow version.
New Features:
Breaking Changes:
Improvements:
Bug fixes:
```
**Release Version 0.1.0 (01/22/2017)**
```
Notes:
    - Initial commit with features
	    Search header component based on material design.
	    Search suggestions and history with autocomplete. patterns
New Features:
Breaking Changes:
Improvements:
Bug fixes:
```

## TODO

-   Fix RCTView shadow warning message.

## License

[MIT licensed](./LICENSE).
