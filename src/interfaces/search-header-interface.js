/**
 * Copyright 2016-present Tuan Le.
 *
 * Licensed under the MIT License.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/mit-license.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *------------------------------------------------------------------------
 *
 * @module SearchHeaderInterface
 * @description - Search header applet interface.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import React from 'react';

import ReactNative, { Dimensions, PixelRatio } from 'react-native';

import { View as AnimatedView } from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import hideIcon from '../../assets/icons/hide-3x.png';
import closeIcon from '../../assets/icons/close-3x.png';
import historyIcon from '../../assets/icons/history-3x.png';
import recallIcon from '../../assets/icons/recall-3x.png';
import searchIcon from '../../assets/icons/search-3x.png';

import EVENT from '../events/search-header-event';

const {
    Text,
    Image,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const SEARCH_SUGGESTION_UPDATE_DELAY_IN_MS = 100;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowColor: `#000000`
};

const DEFAULT_SEARCH_HEADER_VIEW_STYLE = {
    container: {
        position: `absolute`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        zIndex: 10,
        elevation: 2,
        top: 0,
        width: DEVICE_WIDTH,
        marginBottom: 6,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    searchInput: {
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        height: 56,
        backgroundColor: `#fdfdfd`
    },
    searchSuggestion: {
        flexGrow: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        paddingLeft: 12,
        marginVertical: 6,
        backgroundColor: `#fdfdfd`
    },
    searchInputText: {
        flexGrow: 1,
        fontSize: PixelRatio.get() >= 3 ? 20 : 18,
        fontWeight: `400`,
        textAlign: `left`,
        marginVertical: 3,
        paddingVertical: 3,
        color: `#5d5d5d`,
        backgroundColor: `transparent`
    },
    searchSuggestionText: {
        flexGrow: 1,
        fontSize: PixelRatio.get() >= 3 ? 20 : 18,
        fontWeight: `400`,
        textAlign: `left`,
        marginVertical: 3,
        paddingVertical: 3,
        marginLeft: 8,
        color: `#5d5d5d`,
        backgroundColor: `transparent`
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: `#5d5d5d`,
        backgroundColor: `transparent`
    }
};

const SearchHeaderInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        searchInputTextColor: {
            value: ``,
            stronglyTyped: true
        },
        placeholderTextColor: {
            value: ``,
            stronglyTyped: true
        },
        searchSuggestionTextColor: {
            value: ``,
            stronglyTyped: true
        },
        iconColor: {
            value: ``,
            stronglyTyped: true
        },
        statusHeightOffet: {
            value: 21,
            stronglyTyped: true
        },
        dropShadow: {
            value: true,
            stronglyTyped: true
        },
        visibleInitially: {
            value: false,
            stronglyTyped: true
        },
        autoCorrect: {
            value: true,
            stronglyTyped: true
        },
        enableSearchSuggestion: {
            value: true,
            stronglyTyped: true
        },
        searchSuggestionRollOverCount: {
            value: 16,
            stronglyTyped: true
        },
        placeholder: {
            value: `Search...`,
            stronglyTyped: true
        },
        entryAnimation: {
            value: `from-left-side`,
            oneOf: [ `from-left-side`, `from-right-side` ],
            stronglyTyped: true
        },
        onGetSearchSuggestions: {
            value: () => [],
            stronglyTyped: true
        },
        onSearch: {
            value: () => {},
            stronglyTyped: true
        },
        onSearchChange: {
            value: () => {},
            stronglyTyped: true
        },
        onFocus: {
            value: () => {},
            stronglyTyped: true
        },
        onBlur: {
            value: () => {},
            stronglyTyped: true
        },
        onHidden: {
            value: () => {},
            stronglyTyped: true
        },
        onVisible: {
            value: () => {},
            stronglyTyped: true
        }
    },
    setup: function setup (done) {
        const intf = this;

        intf.preMountStage((component) => {
            const {
                visibleInitially
            } = component.props;

            if (visibleInitially) {
                intf.outgoing(EVENT.ON.UPDATE_SEARCH_HEADER_VISIBILITY).emit(() => true);
            }
        });

        intf.postUpdateStage((component) => {
            const {
                searchSuggestionRollOverCount,
                entryAnimation
            } = component.props;
            const {
                visible,
                searchInput,
                searchSuggestion
            } = component.state;
            const [
                searchTextInput,
                animatedSearchHeaderView,
                animatedSearchSuggestionView
            ] = component.lookupComponentRefs(
                `searchTextInput`,
                `animatedSearchHeaderView`,
                `animatedSearchSuggestionView`
            );

            if (searchInput.focus) {
                searchTextInput.focus();
            } else {
                searchTextInput.blur();
            }

            if (visible) {
                animatedSearchHeaderView.transitionTo({
                    opacity: 1,
                    translateX: 0
                });
            } else {
                if (entryAnimation === `from-right-side`) {
                    animatedSearchHeaderView.transitionTo({
                        opacity: 0,
                        translateX: DEVICE_WIDTH
                    });
                }
                if (entryAnimation === `from-left-side`) {
                    animatedSearchHeaderView.transitionTo({
                        opacity: 0,
                        translateX: -DEVICE_WIDTH
                    });
                }
            }

            if (searchSuggestion.visible) {
                animatedSearchSuggestionView.transitionTo({
                    opacity: 1,
                    translateY: 0
                });
            } else {
                animatedSearchSuggestionView.transitionTo({
                    opacity: 0,
                    translateY: DEVICE_HEIGHT
                });
            }

            intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_ROLLOVER_COUNT).emit(() => searchSuggestionRollOverCount);
        });

        done();
    },
    isHidden: function isHidden () {
        const component = this;
        const {
            visible
        } = component.state;

        return !visible;
    },
    hide: function hide () {
        const component = this;
        component.onHideSearch();
    },
    show: function show () {
        const component = this;
        component.onShowSearch();
    },
    clear: function clear () {
        const component = this;
        component.onClearSearchInput();
    },
    clearSearchSuggestion: function clearSearchSuggestion () {
        const component = this;
        component.onClearSearchSuggestion();
    },
    onHideSearch: function onHideSearch () {
        const component = this;
        const {
            onHidden
        } = component.props;
        const [
            searchTextInput
        ] = component.lookupComponentRefs(
            `searchTextInput`
        );

        component.outgoing(
            EVENT.ON.UPDATE_SEARCH_HEADER_VISIBILITY,
            EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY,
            EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS,
            EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT_CHANGED
        ).emit(() => false);
        component.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).emit();
        component.onDismissKeyboard();
        searchTextInput.clear();
        onHidden();
    },
    onShowSearch: function onShowSearch () {
        const component = this;
        const {
            onVisible
        } = component.props;

        component.outgoing(
            EVENT.ON.UPDATE_SEARCH_HEADER_VISIBILITY,
            EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS
        ).emit(() => true);
        onVisible();
    },
    onClearSearchSuggestion: function onClearSearchSuggestion () {
        const component = this;

        component.outgoing(EVENT.ON.CLEAR_ALL_ITEMS_FROM_SEARCH_SUGGESTION).emit();
    },
    onClearSearchInput: function onClearSearchInput () {
        const component = this;
        const [
            searchTextInput
        ] = component.lookupComponentRefs(
            `searchTextInput`
        );

        searchTextInput.clear();
        component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT).emit(() => ``);
        component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT_CHANGED).emit(() => false);
    },
    onDismissKeyboard: function onDismissKeyboard () {
        const component = this;

        component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS).emit(() => false);
        dismissKeyboard();
    },
    renderSearchInput: function renderSearchInput (adjustedStyle) {
        const component = this;
        const {
            placeholderTextColor,
            autoCorrect,
            placeholder,
            onGetSearchSuggestions,
            onSearch,
            onSearchChange,
            onFocus,
            onBlur
        } = component.props;
        const {
            searchInput
        } = component.state;

        return (
            <View style = { adjustedStyle.searchInput }>
                <View style = {{
                    flexDirection: `row`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    minWidth: 46,
                    minHeight: 46,
                    backgroundColor: `transparent`
                }}>
                    <TouchableOpacity onPress = { component.onHideSearch }>
                        <Image
                            resizeMode = 'cover'
                            source = { hideIcon }
                            style = { adjustedStyle.icon }
                        />
                    </TouchableOpacity>
                </View>
                <View style = {{
                    flexDirection: `row`,
                    alignSelf: `center`,
                    alignItems: `flex-start`,
                    justifyContent: `center`,
                    maxWidth: DEVICE_WIDTH - 92,
                    minHeight: 46,
                    backgroundColor: `transparent`
                }}>
                    <TextInput
                        ref = { component.assignComponentRef(`searchTextInput`) }
                        autoCorrect = { autoCorrect }
                        returnKeyType = 'search'
                        onFocus = { onFocus }
                        onBlur = { onBlur }
                        onChange = {(event) => {
                            const searchSuggestions = onGetSearchSuggestions();
                            if (Hf.isNonEmptyArray(searchSuggestions)) {
                                component.outgoing(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).emit(() => {
                                    return searchSuggestions.filter((text) => Hf.isString(text)).map((text) => {
                                        return {
                                            historyType: false,
                                            text
                                        };
                                    });
                                });
                            }
                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT).emit(() => event.nativeEvent.text);
                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS).emit(() => true);
                            component.outgoing(
                                EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT_CHANGED,
                                EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                            ).emit(() => !Hf.isEmpty(event.nativeEvent.text));
                            onSearchChange(event);
                        }}
                        onSubmitEditing = {(event) => {
                            if (!Hf.isEmpty(event.nativeEvent.text)) {
                                component.outgoing(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).delay(SEARCH_SUGGESTION_UPDATE_DELAY_IN_MS).emit(() => {
                                    return [{
                                        historyType: true,
                                        text: event.nativeEvent.text,
                                        timestamp: new Date().getTime()
                                    }];
                                });
                            }
                            component.outgoing(
                                EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS,
                                EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                            ).emit(() => false);
                            component.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).emit();
                            onSearch(event);
                        }}
                        placeholder = { placeholder }
                        placeholderTextColor = { Hf.isEmpty(placeholderTextColor) ? `#bdbdbd` : placeholderTextColor }
                        style = { adjustedStyle.searchInputText }
                    />
                </View>
            {
                !searchInput.itemTextChanged ?
                <View style = {{
                    minWidth: 46,
                    minHeight: 46,
                    backgroundColor: `transparent`
                }}/> :
                <View style = {{
                    flexDirection: `row`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    minWidth: 46,
                    minHeight: 46,
                    backgroundColor: `transparent`
                }}>
                    <TouchableOpacity onPress = { component.onClearSearchInput }>
                        <Image
                            resizeMode = 'cover'
                            source = { closeIcon }
                            style = { adjustedStyle.icon }
                        />
                    </TouchableOpacity>
                </View>
            }
            </View>
        );
    },
    renderSuggestions: function renderSuggestions (adjustedStyle) {
        const component = this;
        const {
            onSearchChange,
            onSearch
        } = component.props;
        const {
            searchInput,
            searchSuggestion
        } = component.state;

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animatedSearchSuggestionView`) }
                duration = { 300 }
                useNativeDriver = { true }
                style = { adjustedStyle.searchSuggestion }
            >
                <ScrollView style = {{
                    flexDirection: `column`,
                    backgroundColor: `transparent`
                }}>
                {
                    searchSuggestion.items.filter((item) => {
                        return !Hf.isEmpty(item.text) && !Hf.isEmpty(searchInput.itemText) && item.text.toLowerCase().includes(searchInput.itemText.toLowerCase());
                    }).map((item, index) => {
                        return (
                            <TouchableOpacity
                                key = { index }
                                onPress = {() => {
                                    const [
                                        searchTextInput
                                    ] = component.lookupComponentRefs(
                                        `searchTextInput`
                                    );
                                    searchTextInput.setNativeProps({
                                        text: item.text
                                    });
                                    component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT).emit(() => item.text);
                                    component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT_CHANGED).emit(() => true);
                                    component.outgoing(
                                        EVENT.ON.UPDATE_SEARCH_INPUT_FOCUS,
                                        EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                                    ).emit(() => false);
                                    component.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).emit();
                                    onSearchChange({
                                        nativeEvent: {
                                            text: item.text
                                        }
                                    });
                                    onSearch({
                                        nativeEvent: {
                                            text: item.text
                                        }
                                    });
                                }}>
                                <View style = {{
                                    flexDirection: `row`,
                                    justifyContent: `center`,
                                    alignItems: `center`,
                                    backgroundColor: `transparent`
                                }}>
                                {
                                    item.historyType ?
                                    <Image
                                        resizeMode = 'cover'
                                        source = { historyIcon }
                                        style = { adjustedStyle.icon }
                                    /> :
                                    <Image
                                        resizeMode = 'cover'
                                        source = { searchIcon }
                                        style = { adjustedStyle.icon }
                                    />
                                }
                                    <Text style = { adjustedStyle.searchSuggestionText }>{ item.text }</Text>
                                    <View style = {{
                                        flexDirection: `row`,
                                        alignItems: `center`,
                                        justifyContent: `center`,
                                        minWidth: 46,
                                        minHeight: 46,
                                        backgroundColor: `transparent`
                                    }}>
                                        <TouchableOpacity onPress = {() => {
                                            const [
                                                searchTextInput
                                            ] = component.lookupComponentRefs(
                                                `searchTextInput`
                                            );
                                            searchTextInput.setNativeProps({
                                                text: item.text
                                            });
                                            searchTextInput.focus();
                                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT).emit(() => item.text);
                                            component.outgoing(EVENT.ON.UPDATE_SEARCH_INPUT_ITEM_TEXT_CHANGED).emit(() => true);
                                        }}>
                                            <Image
                                                resizeMode = 'cover'
                                                source = { recallIcon }
                                                style = { adjustedStyle.icon }
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
                </ScrollView>
            </AnimatedView>
        );
    },
    render: function render () {
        const component = this;
        const {
            iconColor,
            searchInputTextColor,
            searchSuggestionTextColor,
            statusHeightOffet,
            enableSearchSuggestion,
            dropShadow,
            visibleInitially,
            entryAnimation,
            style
        } = component.props;

        let adjustedStyle = Hf.merge(DEFAULT_SEARCH_HEADER_VIEW_STYLE).with({
            container: dropShadow ? {
                ...DEFAULT_DROP_SHADOW_STYLE,
                top: statusHeightOffet,
                transform: [{
                    translateX: (() => {
                        if (visibleInitially) {
                            return 0;
                        } else if (!visibleInitially && entryAnimation === `from-left-side`) {
                            return -DEVICE_WIDTH;
                        } else if (!visibleInitially && entryAnimation === `from-right-side`) {
                            return DEVICE_WIDTH;
                        }
                    })()
                }]
            } : {
                top: statusHeightOffet,
                transform: [{
                    translateX: (() => {
                        if (visibleInitially) {
                            return 0;
                        } else if (!visibleInitially && entryAnimation === `from-left-side`) {
                            return -DEVICE_WIDTH;
                        } else if (!visibleInitially && entryAnimation === `from-right-side`) {
                            return DEVICE_WIDTH;
                        }
                    })()
                }]
            },
            searchSuggestion: dropShadow ? {
                ...DEFAULT_DROP_SHADOW_STYLE
            } : {},
            searchInputText: Hf.merge(DEFAULT_SEARCH_HEADER_VIEW_STYLE.searchInputText).with({
                color: Hf.isEmpty(searchInputTextColor) ? DEFAULT_SEARCH_HEADER_VIEW_STYLE.searchInputText.color : searchInputTextColor
            }),
            searchSuggestionText: Hf.merge(DEFAULT_SEARCH_HEADER_VIEW_STYLE.searchSuggestionText).with({
                color: Hf.isEmpty(searchSuggestionTextColor) ? DEFAULT_SEARCH_HEADER_VIEW_STYLE.searchSuggestionText.color : searchSuggestionTextColor
            }),
            icon: Hf.merge(DEFAULT_SEARCH_HEADER_VIEW_STYLE.icon).with({
                tintColor: Hf.isEmpty(iconColor) ? DEFAULT_SEARCH_HEADER_VIEW_STYLE.icon.tintColor : iconColor
            })
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animatedSearchHeaderView`) }
                style = { adjustedStyle.container }
                duration = { 300 }
                useNativeDriver = { true }
                onStartShouldSetResponder = { component.onDismissKeyboard }
            >
            {
                component.renderSearchInput(adjustedStyle)
            }
            {
                !enableSearchSuggestion ? null : component.renderSuggestions(adjustedStyle)
            }
            </AnimatedView>
        );
    }
});
export default SearchHeaderInterface;
