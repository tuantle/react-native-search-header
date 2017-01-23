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

import moment from 'moment';

import React from 'react';

import ReactNative, { Dimensions, PixelRatio } from 'react-native';

import * as Animatable from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import goBackIcon from '../../assets/icons/back-3x.png';
import closeIcon from '../../assets/icons/close-3x.png';
import restoreIcon from '../../assets/icons/restore-3x.png';
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

const AnimatedView = Animatable.View;

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const SEARCH_BAR_WIDTH = DEVICE_WIDTH;
const SEARCH_BAR_HEIGHT = 56;
const SEARCH_BAR_CHILD_MIN_WIDTH = 46;
const SEARCH_BAR_CHILD_MIN_HEIGHT = 46;
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
        zIndex: 10,
        elevation: 2,
        top: 0,
        alignSelf: `flex-start`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    searchBar: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        width: SEARCH_BAR_WIDTH,
        height: SEARCH_BAR_HEIGHT,
        marginBottom: 6,
        backgroundColor: `#fdfdfd`
    },
    searchSuggestion: {
        flexDirection: `column`,
        alignItems: `flex-start`,
        justifyContent: `center`,
        width: SEARCH_BAR_WIDTH,
        paddingLeft: 12,
        marginBottom: 6,
        backgroundColor: `#fdfdfd`
    },
    textInput: {
        flexGrow: 1,
        fontSize: PixelRatio.get() >= 3 ? 20 : 18,
        fontWeight: `400`,
        textAlign: `left`,
        marginVertical: 3,
        paddingVertical: 3,
        color: `#5d5d5d`,
        backgroundColor: `transparent`
    },
    searchSuggestionItemText: {
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

Animatable.initializeRegistryWithDefinitions({
    searchBarFadeIn: {
        from: {
            opacity: 0,
            translateX: SEARCH_BAR_WIDTH
        },
        to: {
            opacity: 1,
            translateX: 0
        }
    },
    searchBarFadeOut: {
        from: {
            opacity: 1,
            translateX: 0
        },
        to: {
            opacity: 0,
            translateX: SEARCH_BAR_WIDTH
        }
    }
});

const SearchHeaderInterface = Hf.Interface.augment({
    composites: [
        Hf.React.ComponentComposite
    ],
    state: {
        textInputColor: {
            value: ``,
            stronglyTyped: true
        },
        textInputPlaceholderColor: {
            value: ``,
            stronglyTyped: true
        },
        iconColor: {
            value: ``,
            stronglyTyped: true
        },
        statusBarHeightOffet: {
            value: 21,
            stronglyTyped: true
        },
        dropShadow: {
            value: true,
            stronglyTyped: true
        },
        minimized: {
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
        onClose: {
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
        onMinimized: {
            value: () => {},
            stronglyTyped: true
        },
        onMaximized: {
            value: () => {},
            stronglyTyped: true
        }
    },
    setup: function setup (done) {
        const intf = this;

        intf.preUpdateStage((component) => {
            const {
                searchSuggestionRollOverCount
            } = component.props;

            intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_ROLLOVER_COUNT).emit(() => searchSuggestionRollOverCount);
        });
        intf.postUpdateStage((component) => {
            const {
                minimized
            } = component.props;
            const [
                textInput
            ] = component.lookupComponentRefs(
                `textInput`
            );

            if (!minimized) {
                textInput.focus();
            } else {
                textInput.blur();
            }
        });

        done();
    },
    onClear: function onClear () {
        const component = this;
        const intf = component.getInterface();
        const [
            textInput
        ] = component.lookupComponentRefs(
            `textInput`
        );

        textInput.clear();
        intf.outgoing(EVENT.ON.UPDATE_SEARCH_ITEM_TEXT_CHANGED).emit(() => false);
    },
    onDismissKeyboard: function onDismissKeyboard () {
        dismissKeyboard();
    },
    renderSearchBar: function renderSearchBar (adjustedStyle) {
        const component = this;
        const intf = component.getInterface();
        const {
            textInputPlaceholderColor,
            autoCorrect,
            minimized,
            placeholder,
            onGetSearchSuggestions,
            onSearch,
            onSearchChange,
            onClose,
            onFocus,
            onBlur,
            onMinimized,
            onMaximized
        } = component.props;
        const {
            searchItemTextChanged: showCloseButton
        } = component.state;
        let animationType = minimized ? `searchBarFadeOut` : `searchBarFadeIn`;

        return (
            <AnimatedView
                style = { adjustedStyle.searchBar }
                duration = { 300 }
                animation = { animationType }
                useNativeDriver = { false }
                onAnimationEnd = { () => minimized ? onMinimized() : onMaximized() }
            >
                <View style = {{
                    flexDirection: `row`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    minWidth: SEARCH_BAR_CHILD_MIN_WIDTH,
                    minHeight: SEARCH_BAR_CHILD_MIN_HEIGHT,
                    backgroundColor: `transparent`
                }}>
                    <TouchableOpacity
                        onPress = {() => {
                            const [
                                textInput
                            ] = component.lookupComponentRefs(
                                `textInput`
                            );

                            intf.outgoing(
                                EVENT.ON.UPDATE_SEARCH_ITEM_TEXT_CHANGED,
                                EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY
                            ).emit(() => false);
                            intf.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).emit();
                            component.onDismissKeyboard();
                            textInput.clear();
                            onClose();
                        }}
                    >
                        <Image
                            resizeMode = 'cover'
                            source = { goBackIcon }
                            style = { adjustedStyle.icon }
                        />
                    </TouchableOpacity>
                </View>
                <View style = {{
                    flexDirection: `row`,
                    alignSelf: `center`,
                    alignItems: `flex-start`,
                    justifyContent: `center`,
                    maxWidth: SEARCH_BAR_WIDTH - (SEARCH_BAR_CHILD_MIN_WIDTH * 2),
                    minHeight: SEARCH_BAR_CHILD_MIN_HEIGHT,
                    backgroundColor: `transparent`
                }}>
                    <TextInput
                        ref = { component.assignComponentRef(`textInput`) }
                        autoCorrect = { autoCorrect }
                        returnKeyType = 'search'
                        onFocus = { () => onFocus() }
                        onBlur = { () => onBlur() }
                        onChange = {(event) => {
                            const searchSuggestions = onGetSearchSuggestions();

                            if (Hf.isNonEmptyArray(searchSuggestions)) {
                                const searchSuggestionItems = searchSuggestions.filter((text) => Hf.isString(text)).map((text) => {
                                    return {
                                        historyType: false,
                                        text
                                    };
                                });
                                intf.outgoing(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).emit(() => searchSuggestionItems);
                            }
                            intf.outgoing(EVENT.ON.UPDATE_SEARCH_ITEM_TEXT).emit(() => event.nativeEvent.text);
                            intf.outgoing(EVENT.ON.UPDATE_SEARCH_ITEM_TEXT_CHANGED).emit(() => !Hf.isEmpty(event.nativeEvent.text));
                            intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).emit(() => !Hf.isEmpty(event.nativeEvent.text));
                            onSearchChange(event);
                        }}
                        onSubmitEditing = {(event) => {
                            if (!Hf.isEmpty(event.nativeEvent.text)) {
                                intf.outgoing(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).delay(SEARCH_SUGGESTION_UPDATE_DELAY_IN_MS).emit(() => {
                                    return [{
                                        historyType: true,
                                        text: event.nativeEvent.text,
                                        timestamp: moment()
                                    }];
                                });
                            }
                            intf.outgoing(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).emit();
                            intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).emit(() => false);
                            onSearch(event);
                        }}
                        placeholder = { placeholder }
                        placeholderTextColor = { Hf.isEmpty(textInputPlaceholderColor) ? `#bdbdbd` : textInputPlaceholderColor }
                        style = { adjustedStyle.textInput }
                    />
                </View>
                {
                    !showCloseButton ?
                    <View style = {{
                        minWidth: SEARCH_BAR_CHILD_MIN_WIDTH,
                        minHeight: SEARCH_BAR_CHILD_MIN_HEIGHT,
                        backgroundColor: `transparent`
                    }}/> :
                    <View style = {{
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        minWidth: SEARCH_BAR_CHILD_MIN_WIDTH,
                        minHeight: SEARCH_BAR_CHILD_MIN_HEIGHT,
                        backgroundColor: `transparent`
                    }}>
                        <TouchableOpacity onPress = { component.onClear }>
                            <Image
                                resizeMode = 'cover'
                                source = { closeIcon }
                                style = { adjustedStyle.icon }
                            />
                        </TouchableOpacity>
                    </View>
                }
            </AnimatedView>
        );
    },
    renderSuggestions: function renderSuggestions (adjustedStyle) {
        const component = this;
        const intf = component.getInterface();
        const {
            searchItemText,
            searchSuggestion
        } = component.state;

        return (
            <AnimatedView
                animation = { searchSuggestion.visible ? `fadeIn` : `fadeOut` }
                duration = { 300 }
                useNativeDriver = { false }
                style = { adjustedStyle.searchSuggestion }
            >
                <ScrollView style = {{
                    flexDirection: `column`,
                    backgroundColor: `transparent`
                }}>
                {
                    searchSuggestion.items.filter((item) => {
                        return !Hf.isEmpty(item.text) && item.text.toLowerCase().includes(searchItemText.toLowerCase());
                    }).map((item, index) => {
                        return (
                            <TouchableOpacity
                                key = { index }
                                onPress = {() => {
                                    const [
                                        textInput
                                    ] = component.lookupComponentRefs(
                                        `textInput`
                                    );
                                    textInput.setNativeProps({
                                        text: item.text
                                    });
                                    intf.outgoing(EVENT.ON.UPDATE_SEARCH_ITEM_TEXT_CHANGED).emit(() => true);
                                    intf.outgoing(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).emit(() => false);
                                }}>
                                <View style = {{
                                    flexDirection: `row`,
                                    justifyContent: `center`,
                                    alignSelf: `flex-start`,
                                    alignItems: `center`,
                                    backgroundColor: `transparent`
                                }}>
                                {
                                    item.historyType ?
                                    <Image
                                        resizeMode = 'cover'
                                        source = { restoreIcon }
                                        style = { adjustedStyle.icon }
                                    /> :
                                    <Image
                                        resizeMode = 'cover'
                                        source = { searchIcon }
                                        style = { adjustedStyle.icon }
                                    />
                                }
                                    <Text style = { adjustedStyle.searchSuggestionItemText }>{ item.text }</Text>
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
            textInputColor,
            statusBarHeightOffet,
            enableSearchSuggestion,
            dropShadow,
            minimized,
            style
        } = component.props;
        const {
            searchSuggestion
        } = component.state;
        const showSearchSuggestion = !minimized && enableSearchSuggestion && !Hf.isEmpty(searchSuggestion.items);

        let adjustedStyle = Hf.merge(DEFAULT_SEARCH_HEADER_VIEW_STYLE).with({
            container: {
                top: statusBarHeightOffet
            },
            searchBar: dropShadow ? {
                ...DEFAULT_DROP_SHADOW_STYLE
            } : {},
            searchSuggestion: dropShadow ? {
                ...DEFAULT_DROP_SHADOW_STYLE
            } : {},
            textInput: Hf.merge(DEFAULT_SEARCH_HEADER_VIEW_STYLE.textInput).with({
                color: Hf.isEmpty(textInputColor) ? DEFAULT_SEARCH_HEADER_VIEW_STYLE.textInput.color : textInputColor
            }),
            icon: Hf.merge(DEFAULT_SEARCH_HEADER_VIEW_STYLE.icon).with({
                tintColor: Hf.isEmpty(iconColor) ? DEFAULT_SEARCH_HEADER_VIEW_STYLE.icon.tintColor : iconColor
            })
        });

        adjustedStyle = Hf.isObject(style) ? Hf.merge(adjustedStyle).with(style) : adjustedStyle;

        return (
            <View
                style = { adjustedStyle.container }
                onStartShouldSetResponder = { component.onDismissKeyboard }
            >
            {
                component.renderSearchBar(adjustedStyle)
            }
            {
                !showSearchSuggestion ? null : component.renderSuggestions(adjustedStyle)
            }
            </View>
        );
    }
});
export default SearchHeaderInterface;
