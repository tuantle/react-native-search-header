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
 * @module SearchHeader
 * @description - Search header component.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import { View as AnimatedView } from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import hideIcon from './assets/icons/hide-3x.png';
import closeIcon from './assets/icons/close-3x.png';
import starIcon from './assets/icons/star-3x.png';
import historyIcon from './assets/icons/history-3x.png';
import recallIcon from './assets/icons/recall-3x.png';
import searchIcon from './assets/icons/search-3x.png';

const {
    Text,
    Image,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    Platform
} = ReactNative;

const DEFAULT_ANIMATION_DURATION_MS = 300;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

const DEFAULT_DROP_SHADOW_STYLE = {
    shadowRadius: 2,
    shadowOpacity: 0.25,
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowColor: `#576970`
};

const DEFAULT_SEARCH_HEADER_VIEW_STYLE = {
    container: {
        ...DEFAULT_DROP_SHADOW_STYLE,
        position: `absolute`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        zIndex: 10,
        elevation: 2,
        top: 0,
        width: `100%`,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    header: {
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        height: 57,
        backgroundColor: `#fdfdfd`
    },
    action: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        minWidth: 45,
        minHeight: 45,
        backgroundColor: `transparent`
    },
    suggestion: {
        ...DEFAULT_DROP_SHADOW_STYLE,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        zIndex: 10,
        elevation: 2,
        marginVertical: 6,
        width: DEVICE_WIDTH,
        height: 0,
        macHeight: DEVICE_HEIGHT,
        transform: [{
            translateY: DEVICE_HEIGHT
        }],
        backgroundColor: `#fdfdfd`
    },
    input: {
        flex: 1,
        fontSize: PixelRatio.get() >= 3 ? 20 : 18,
        fontWeight: `400`,
        textAlign: `left`,
        margin: 6,
        padding: 6,
        borderRadius: 4,
        color: `#5d5d5d`,
        backgroundColor: `transparent`
    },
    suggestionEntry: {
        flex: 1,
        fontSize: PixelRatio.get() >= 3 ? 20 : 18,
        fontWeight: `400`,
        textAlign: `left`,
        marginVertical: 3,
        paddingVertical: 3,
        marginLeft: 9,
        color: `#5d5d5d`,
        maxWidth: DEVICE_WIDTH,
        backgroundColor: `transparent`
    },
    icon: {
        width: 24,
        height: 24,
        margin: 6,
        tintColor: `#5d5d5d`,
        backgroundColor: `transparent`
    }
};

const DEFAULT_ICON_IMAGE_COMPONENTS = [{
    name: `close`,
    customStyle: {},
    render: (style) => {
        return (
            <Image
                resizeMode = 'cover'
                source = { closeIcon }
                style = { style }
            />
        );
    }
}, {
    name: `hide`,
    customStyle: {},
    render: (style) => {
        return (
            <Image
                resizeMode = 'cover'
                source = { hideIcon }
                style = { style }
            />
        );
    }
}, {
    name: `pin`,
    customStyle: {},
    render: (style) => {
        return (
            <Image
                resizeMode = 'cover'
                source = { starIcon }
                style = { style }
            />
        );
    }
}, {
    name: `history`,
    customStyle: {},
    render: (style) => {
        return (
            <Image
                resizeMode = 'cover'
                source = { historyIcon }
                style = { style }
            />
        );
    }
}, {
    name: `search`,
    customStyle: {},
    render: (style) => {
        return (
            <Image
                resizeMode = 'cover'
                source = { searchIcon }
                style = { style }
            />
        );
    }
}, {
    name: `recall`,
    customStyle: {},
    render: (style) => {
        return (
            <Image
                resizeMode = 'cover'
                source = { recallIcon }
                style = { style }
            />
        );
    }
}];

const readjustStyle = (newStyle = {
    inputColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.input.color,
    inputBgColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.input.backgroundColor,
    suggestionEntryColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.suggestionEntry.color,
    iconColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.icon.tintColor,
    topOffset: Platform.OS === `ios` ? 24 : 0,
    headerHeight: DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.height,
    headerBgColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.backgroundColor,
    dropShadowed: true,
    visibleInitially: false,
    autoFocus: true,
    autoCorrect: true,
    persistent: false,
    entryAnimation: `from-left-side`
}, prevAdjustedStyle = DEFAULT_SEARCH_HEADER_VIEW_STYLE) => {
    const {
        headerHeight,
        headerBgColor,
        iconColor,
        inputColor,
        inputBgColor,
        suggestionEntryColor,
        topOffset,
        dropShadowed,
        visibleInitially,
        persistent,
        entryAnimation,
        style
    } = newStyle;
    const adjustedStyle = {
        container: {
            ...prevAdjustedStyle.container,
            top: topOffset,
            shadowOpacity: dropShadowed ? DEFAULT_DROP_SHADOW_STYLE.shadowOpacity : 0,
            transform: [{
                translateX: (() => {
                    if (visibleInitially || persistent) {
                        return 0;
                    } else if (!visibleInitially && entryAnimation === `from-left-side`) {
                        return -DEVICE_WIDTH;
                    } else if (!visibleInitially && entryAnimation === `from-right-side`) {
                        return DEVICE_WIDTH;
                    }
                })()
            }],
            ...(typeof style === `object` && style.hasOwnProperty(`container`) ? style.container : {})
        },
        header: {
            ...prevAdjustedStyle.header,
            height: headerHeight,
            backgroundColor: headerBgColor,
            ...(typeof style === `object` && style.hasOwnProperty(`header`) ? style.header : {})
        },
        suggestion: {
            ...prevAdjustedStyle.suggestion,
            shadowOpacity: dropShadowed ? DEFAULT_DROP_SHADOW_STYLE.shadowOpacity : 0,
            ...(typeof style === `object` && style.hasOwnProperty(`suggestion`) ? style.suggestion : {})
        },
        input: {
            ...prevAdjustedStyle.input,
            backgroundColor: inputBgColor,
            color: inputColor,
            ...(typeof style === `object` && style.hasOwnProperty(`input`) ? style.input : {})
        },
        suggestionEntry: {
            ...prevAdjustedStyle.suggestionEntry,
            color: suggestionEntryColor,
            ...(typeof style === `object` && style.hasOwnProperty(`suggestionEntry`) ? style.suggestionEntry : {})
        },
        icon: {
            ...prevAdjustedStyle.icon,
            tintColor: iconColor,
            ...(typeof style === `object` && style.hasOwnProperty(`icon`) ? style.icon : {})
        }
    };

    return adjustedStyle;
};

class SearchHeaderWithReactClass extends React.Component {
    static propTypes = {
        inputColor: PropTypes.string,
        inputBgColor: PropTypes.string,
        placeholderColor: PropTypes.string,
        suggestionEntryColor: PropTypes.string,
        iconColor: PropTypes.string,
        topOffset: PropTypes.number,
        headerHeight: PropTypes.number,
        headerBgColor: PropTypes.string,
        dropShadowed: PropTypes.bool,
        visibleInitially: PropTypes.bool,
        autoFocus: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        persistent: PropTypes.bool,
        enableSuggestion: PropTypes.bool,
        suggestionHistoryEntryRollOverCount: PropTypes.number,
        pinnedSuggestions: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.number, PropTypes.string, PropTypes.object ])),
        placeholder: PropTypes.string,
        entryAnimation: PropTypes.oneOf([ `from-left-side`, `from-right-side` ]),
        iconImageComponents: PropTypes.array,
        onClearSuggesstion: PropTypes.func,
        onGetAutocompletions: PropTypes.func,
        onClear: PropTypes.func,
        onSearch: PropTypes.func,
        onEnteringSearch: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onHide: PropTypes.func,
        onShow: PropTypes.func
    }
    static defaultProps = {
        inputColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.input.color,
        inputBgColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.input.backgroundColor,
        placeholderColor: `#bdbdbd`,
        suggestionEntryColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.suggestionEntry.color,
        iconColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.icon.tintColor,
        topOffset: Platform.OS === `ios` ? 24 : 0,
        headerHeight: DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.height,
        headerBgColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.backgroundColor,
        dropShadowed: true,
        visibleInitially: false,
        autoFocus: true,
        autoCorrect: true,
        persistent: false,
        enableSuggestion: true,
        suggestionHistoryEntryRollOverCount: 16,
        pinnedSuggestions: [],
        placeholder: ``,
        entryAnimation: `from-left-side`,
        iconImageComponents: DEFAULT_ICON_IMAGE_COMPONENTS,
        onClearSuggesstion: () => false,
        onGetAutocompletions: () => [],
        onClear: () => null,
        onSearch: () => null,
        onEnteringSearch: () => null,
        onFocus: () => null,
        onBlur: () => null,
        onHide: () => null,
        onShow: () => null
    }
    static getDerivedStateFromProps (props, state) {
        const {
            inputColor,
            inputBgColor,
            suggestionEntryColor,
            iconColor,
            topOffset,
            headerHeight,
            headerBgColor,
            dropShadowed,
            visibleInitially,
            autoFocus,
            autoCorrect,
            persistent,
            entryAnimation,
            iconImageComponents,
            style,
            suggestionHistoryEntryRollOverCount
        } = props;

        return {
            adjustedStyle: readjustStyle({
                inputColor,
                inputBgColor,
                suggestionEntryColor,
                iconColor,
                topOffset,
                headerHeight,
                headerBgColor,
                dropShadowed,
                visibleInitially,
                autoFocus,
                autoCorrect,
                persistent,
                entryAnimation,
                style
            }, state.adjustedStyle),
            suggestion: {
                ...state.suggestion,
                historyEntryRollOverCount: suggestionHistoryEntryRollOverCount
            },
            customIconImageComponents: state.customIconImageComponents.map((customIconImageComponent) => {
                const matchedIconImageComponent = iconImageComponents.find((_iconImageComponent) => _iconImageComponent.name === customIconImageComponent.name);
                return typeof matchedIconImageComponent === `object` ? {
                    ...customIconImageComponent,
                    ...matchedIconImageComponent
                } : customIconImageComponent;
            })
        };
    }
    constructor (props) {
        super(props);
        this.refCache = {};
        this.state = {
            adjustedStyle: DEFAULT_SEARCH_HEADER_VIEW_STYLE,
            customIconImageComponents: DEFAULT_ICON_IMAGE_COMPONENTS,
            visible: props.visibleInitially || props.persistent,
            input: {
                focused: false,
                value: ``,
                valueChanged: false
            },
            suggestion: {
                visible: false,
                historyEntryRollOverCount: 16,
                histories: [],
                autocompletes: []
            }
        };
    }
    isHidden = () => {
        const component = this;
        const {
            visible
        } = component.state;

        return !visible;
    }
    hide = () => {
        const component = this;
        const {
            persistent,
            entryAnimation,
            onHide
        } = component.props;
        const {
            visible
        } = component.state;
        const animatedSearchHeaderView = component.refCache[`animated-search-header-view`];

        if (!persistent && visible && animatedSearchHeaderView !== undefined) {
            if (entryAnimation === `from-right-side`) {
                animatedSearchHeaderView.transitionTo({
                    opacity: 0,
                    translateX: DEVICE_WIDTH
                }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`, 0);
            } else if (entryAnimation === `from-left-side`) {
                animatedSearchHeaderView.transitionTo({
                    opacity: 0,
                    translateX: -DEVICE_WIDTH
                }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`, 0);
            }

            component.setState((prevState) => {
                return {
                    visible: false,
                    input: {
                        ...prevState.input,
                        focused: false,
                        valueChanged: false
                    },
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false,
                        autocompletes: []
                    }
                };
            }, () => {
                onHide();
            });
            dismissKeyboard();
        }
    }
    show = () => {
        const component = this;
        const {
            persistent,
            onShow
        } = component.props;
        const {
            visible
        } = component.state;
        const animatedSearchHeaderView = component.refCache[`animated-search-header-view`];

        if (!persistent && !visible && animatedSearchHeaderView !== undefined) {
            animatedSearchHeaderView.transitionTo({
                opacity: 1,
                translateX: 0
            }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`, 0);
            component.setState((prevState) => {
                return {
                    visible: true,
                    input: {
                        ...prevState.input,
                        focused: false
                    }
                };
            }, () => {
                onShow();
            });
        }
    }
    clear = () => {
        const component = this;
        const {
            onClear
        } = component.props;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    value: ``,
                    valueChanged: true
                },
                suggestion: {
                    ...prevState.suggestion,
                    autocompletes: []
                }
            };
        }, () => {
            onClear();
        });
    }
    clearSuggestion = () => {
        const component = this;
        const {
            onClearSuggesstion
        } = component.props;

        component.setState(() => {
            return {
                suggestion: {
                    visible: false,
                    histories: [],
                    autocompletes: []
                }
            };
        });

        onClearSuggesstion();
    }
    onFocus = () => {
        const component = this;
        const {
            enableSuggestion,
            onFocus
        } = component.props;
        const {
            visible
        } = component.state;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: true
                },
                suggestion: {
                    ...prevState.suggestion,
                    visible: true
                }
            };
        }, () => {
            // const textInput = component.refCache[`text-input`];
            // if (textInput !== undefined) {
            //     textInput.focus();
            // }
            if (visible && enableSuggestion) {
                const animatedSuggestionView = component.refCache[`animated-suggestion-view`];
                if (animatedSuggestionView !== undefined) {
                    animatedSuggestionView.transitionTo({
                        opacity: 1,
                        translateY: 0,
                        height: DEVICE_HEIGHT
                    }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`);
                }
            }
            onFocus();
        });
    }
    onBlur = () => {
        const component = this;
        const {
            enableSuggestion,
            onBlur
        } = component.props;
        const {
            visible
        } = component.state;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: false
                }
            };
        }, () => {
            // const textInput = component.refCache[`text-input`];
            // if (textInput !== undefined) {
            //     textInput.blur();
            // }
            if (visible && enableSuggestion) {
                const animatedSuggestionView = component.refCache[`animated-suggestion-view`];
                if (animatedSuggestionView !== undefined) {
                    animatedSuggestionView.transitionTo({
                        opacity: 0,
                        translateY: DEVICE_HEIGHT,
                        height: 0
                    }, DEFAULT_ANIMATION_DURATION_MS, `ease-out-cubic`);
                }
            }
            onBlur();
        });
    }
    onEditting = (value) => {
        const component = this;
        const {
            enableSuggestion,
            onGetAutocompletions,
            onEnteringSearch
        } = component.props;

        if (enableSuggestion) {
            const fetchSearchAutocompletions = async function () {
                const autocompleteTexts = await onGetAutocompletions(value);
                if (Array.isArray(autocompleteTexts) && autocompleteTexts.length) {
                    component.setState((prevState) => {
                        return {
                            suggestion: {
                                ...prevState.suggestion,
                                autocompletes: [
                                    // ...new Set(autocompleteTexts.filter((text) => typeof text === `string`).map((text) => text.replace(/\s/g, ``)))
                                    ...new Set(autocompleteTexts.filter((text) => typeof text === `string`))
                                ].map((text) => {
                                    return {
                                        suggestionType: `autocompletion`,
                                        value: text
                                    };
                                })
                            }
                        };
                    });
                }
            };

            if (value !== ``) {
                fetchSearchAutocompletions();
                component.setState((prevState) => {
                    return {
                        input: {
                            ...prevState.input,
                            value,
                            valueChanged: value !== prevState.input.value
                        }
                    };
                });
            } else {
                component.setState((prevState) => {
                    return {
                        input: {
                            ...prevState.input,
                            value: ``,
                            valueChanged: value !== prevState.input.value
                        },
                        suggestion: {
                            ...prevState.suggestion,
                            autocompletes: []
                        }
                    };
                });
            }
        } else {
            if (value !== ``) {
                component.setState((prevState) => {
                    return {
                        input: {
                            ...prevState.input,
                            value,
                            valueChanged: value !== prevState.input.value
                        }
                    };
                });
            } else {
                component.setState((prevState) => {
                    return {
                        input: {
                            ...prevState.input,
                            value: ``,
                            valueChanged: value !== prevState.input.value
                        }
                    };
                });
            }
        }

        onEnteringSearch({
            nativeEvent: {
                text: value
            }
        });
    }
    onSubmitEditing = (event) => {
        const component = this;
        const {
            enableSuggestion,
            pinnedSuggestions,
            onSearch
        } = component.props;
        const {
            suggestion
        } = component.state;
        const value = event.nativeEvent.text;

        if (enableSuggestion) {
            if (value !== ``) {
                if (!suggestion.histories.some((entry) => entry.value === value) &&
                    !pinnedSuggestions.some((_value) => _value === value)) {
                    component.setState((prevState) => {
                        let {
                            historyEntryRollOverCount,
                            histories
                        } = prevState.suggestion;

                        if (histories.length >= historyEntryRollOverCount) {
                            histories.pop();
                        }
                        histories.push({
                            suggestionType: `history`,
                            value,
                            timestamp: new Date().getTime()
                        });

                        return {
                            suggestion: {
                                ...prevState.suggestion,
                                visible: false,
                                autocompletes: [],
                                histories
                            }
                        };
                    });
                } else {
                    component.setState((prevState) => {
                        return {
                            suggestion: {
                                ...prevState.suggestion,
                                visible: false,
                                autocompletes: []
                            }
                        };
                    });
                }
                onSearch({
                    nativeEvent: {
                        text: value
                    }
                });
            } else {
                component.setState((prevState) => {
                    return {
                        suggestion: {
                            ...prevState.suggestion,
                            visible: false,
                            autocompletes: []
                        }
                    };
                });
            }
        } else {
            onSearch({
                nativeEvent: {
                    text: value
                }
            });
        }
    }
    componentDidUnMount () {
        const component = this;

        component.refCache = {};
    }
    renderInput () {
        const component = this;
        const {
            placeholderColor,
            autoFocus,
            autoCorrect,
            persistent,
            placeholder,
            onSearch
        } = component.props;
        const {
            visible,
            adjustedStyle,
            customIconImageComponents,
            input
        } = component.state;

        if (visible) {
            return (
                <View style = { adjustedStyle.header }>
                    <View style = { adjustedStyle.action }>
                        {
                            !persistent ? <TouchableOpacity onPress = {() => {
                                component.hide();
                            }}>
                                {
                                    customIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `hide`).map((iconImageComponent) => {
                                        return iconImageComponent.render([
                                            adjustedStyle.icon,
                                            iconImageComponent.customStyle
                                        ]);
                                    })[0]
                                }
                            </TouchableOpacity> : <TouchableOpacity onPress = {() => {
                                onSearch({
                                    nativeEvent: {
                                        text: input.value
                                    }
                                });
                            }}>
                                {
                                    customIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `search`).map((iconImageComponent) => {
                                        return iconImageComponent.render([
                                            adjustedStyle.icon,
                                            iconImageComponent.customStyle
                                        ]);
                                    })[0]
                                }
                            </TouchableOpacity>
                        }
                    </View>
                    <TextInput
                        ref = {(componentRef) => {
                            component.refCache[`text-input`] = componentRef;
                        }}
                        autoFocus = { autoFocus }
                        autoCorrect = { autoCorrect }
                        returnKeyType = 'search'
                        underlineColorAndroid = 'transparent'
                        placeholder = { placeholder }
                        placeholderTextColor = { placeholderColor }
                        value = { input.value }
                        style = { adjustedStyle.input }
                        onFocus = { component.onFocus }
                        onBlur = { component.onBlur }
                        onChangeText = { component.onEditting }
                        onSubmitEditing = { component.onSubmitEditing }
                    />
                    {
                        input.value === `` ? <View style = { adjustedStyle.action } /> : <View style = { adjustedStyle.action }>
                            <TouchableOpacity onPress = {() => {
                                component.clear();
                            }}>
                                {
                                    customIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `close`).map((iconImageComponent) => {
                                        return iconImageComponent.render([
                                            adjustedStyle.icon,
                                            iconImageComponent.customStyle
                                        ]);
                                    })[0]
                                }
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            );
        }
        return null;
    }
    renderSuggestions () {
        const component = this;
        const {
            enableSuggestion,
            pinnedSuggestions,
            onEnteringSearch,
            onSearch
        } = component.props;
        const {
            adjustedStyle,
            customIconImageComponents,
            suggestion
        } = component.state;

        if (enableSuggestion) {
            const suggestionEntries = pinnedSuggestions.map((value) => {
                return {
                    suggestionType: `pin`,
                    value
                };
            }).concat(suggestion.histories.sort((itemA, itemB) => {
                return itemB.timestamp - itemA.timestamp;
            })).concat().concat(suggestion.autocompletes).map((entry, index) => {
                return {
                    key: `${index}`,
                    ...entry
                };
            });

            return (
                <AnimatedView
                    ref = {(componentRef) => {
                        component.refCache[`animated-suggestion-view`] = componentRef;
                    }}
                    duration = { 300 }
                    pointerEvents = 'box-none'
                    useNativeDriver = { false }
                    style = { adjustedStyle.suggestion }
                >
                    <FlatList
                        data = { suggestionEntries }
                        renderItem = {(listData) => {
                            const entry = listData.item;

                            return (
                                <TouchableOpacity
                                    key = { listData.key }
                                    onPress = {() => {
                                        if (!suggestion.histories.some((_entry) => _entry.value === entry.value) &&
                                            !pinnedSuggestions.some((value) => value === entry.value)) {
                                            component.setState((prevState) => {
                                                let {
                                                    historyEntryRollOverCount,
                                                    histories
                                                } = prevState.suggestion;

                                                if (histories.length >= historyEntryRollOverCount) {
                                                    histories.pop();
                                                }
                                                histories.push({
                                                    suggestionType: `history`,
                                                    value: entry.value,
                                                    timestamp: new Date().getTime()
                                                });

                                                return {
                                                    input: {
                                                        ...prevState.input,
                                                        value: entry.value,
                                                        valueChanged: prevState.input.value !== entry.value,
                                                        focused: false
                                                    },
                                                    suggestion: {
                                                        ...prevState.suggestion,
                                                        visible: false,
                                                        autocompletes: [],
                                                        histories
                                                    }
                                                };
                                            });
                                        } else {
                                            component.setState((prevState) => {
                                                return {
                                                    input: {
                                                        ...prevState.input,
                                                        value: entry.value,
                                                        valueChanged: prevState.input.value !== entry.value,
                                                        focused: false
                                                    },
                                                    suggestion: {
                                                        ...prevState.suggestion,
                                                        visible: false,
                                                        autocompletes: []
                                                    }
                                                };
                                            });
                                        }

                                        onEnteringSearch({
                                            nativeEvent: {
                                                text: entry.value
                                            }
                                        });
                                        onSearch({
                                            nativeEvent: {
                                                text: entry.value
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
                                            customIconImageComponents.filter((iconImageComponent) => {
                                                if (entry.suggestionType === `history`) {
                                                    return iconImageComponent.name === `history`;
                                                } else if (entry.suggestionType === `pin`) {
                                                    return iconImageComponent.name === `pin`;
                                                }
                                                return iconImageComponent.name === `search`;
                                            }).map((iconImageComponent) => {
                                                return iconImageComponent.render([
                                                    adjustedStyle.icon,
                                                    iconImageComponent.customStyle
                                                ]);
                                            })[0]
                                        }
                                        <Text
                                            numberOfLines = { 1 }
                                            ellipsizeMode = 'tail'
                                            style = { adjustedStyle.suggestionEntry }
                                        >{ entry.value }</Text>
                                        <View style = {{
                                            flexDirection: `row`,
                                            alignItems: `center`,
                                            justifyContent: `center`,
                                            minWidth: 46,
                                            minHeight: 46,
                                            backgroundColor: `transparent`
                                        }}>
                                            <TouchableOpacity onPress = {() => {
                                                component.setState((prevState) => {
                                                    return {
                                                        input: {
                                                            ...prevState.input,
                                                            value: entry.value,
                                                            valueChanged: prevState.input.value !== entry.value
                                                        }
                                                    };
                                                });
                                            }}>
                                                {
                                                    customIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `recall`).map((iconImageComponent) => {
                                                        return iconImageComponent.render([
                                                            adjustedStyle.icon,
                                                            iconImageComponent.customStyle
                                                        ]);
                                                    })[0]
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        style = {{
                            flexDirection: `column`,
                            backgroundColor: `transparent`
                        }}
                    />
                </AnimatedView>
            );
        }
        return null;
    }
    render () {
        const component = this;
        const {
            adjustedStyle
        } = component.state;

        return (
            <AnimatedView
                ref = {(componentRef) => {
                    component.refCache[`animated-search-header-view`] = componentRef;
                }}
                style = { adjustedStyle.container }
                duration = { 300 }
                useNativeDriver = { true }
                onStartShouldSetResponder = {() => {
                    dismissKeyboard();
                }}
            >
                {
                    component.renderInput()
                }
                {
                    component.renderSuggestions()
                }
            </AnimatedView>
        );
    }
}

const SearchHeaderWithReactHooks = ({
    inputColor = DEFAULT_SEARCH_HEADER_VIEW_STYLE.input.color,
    inputBgColor = DEFAULT_SEARCH_HEADER_VIEW_STYLE.input.backgroundColor,
    placeholderColor = `#bdbdbd`,
    suggestionEntryColor = DEFAULT_SEARCH_HEADER_VIEW_STYLE.suggestionEntry.color,
    iconColor = DEFAULT_SEARCH_HEADER_VIEW_STYLE.icon.tintColor,
    topOffset = Platform.OS === `ios` ? 24 : 0,
    headerHeight = DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.height,
    headerBgColor = DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.backgroundColor,
    dropShadowed = true,
    visibleInitially = false,
    autoFocus = true,
    autoCorrect = true,
    persistent = false,
    enableSuggestion = true,
    suggestionHistoryEntryRollOverCount = 16,
    pinnedSuggestions = [],
    placeholder = ``,
    entryAnimation = `from-left-side`,
    iconImageComponents = DEFAULT_ICON_IMAGE_COMPONENTS,
    onClearSuggesstion = () => false,
    onGetAutocompletions = () => [],
    onClear = () => null,
    onSearch = () => null,
    onEnteringSearch = () => null,
    onFocus = () => null,
    onBlur = () => null,
    onHide = () => null,
    onShow = () => null,
    style
}, ref) => {
    const animatedSearchHeaderViewRef = React.useRef(null);
    const animatedSuggestionViewRef = React.useRef(null);
    const textInputRef = React.useRef(null);

    const [ adjustedStyle, setAdjustedStyle ] = React.useState(DEFAULT_SEARCH_HEADER_VIEW_STYLE);
    const [ customIconImageComponents, setCustomIconImageComponents ] = React.useState(DEFAULT_ICON_IMAGE_COMPONENTS);
    const [ visible, setVisibility ] = React.useState(visibleInitially || persistent);
    const [ input, setInput ] = React.useState({
        focused: false,
        value: ``,
        valueChanged: false
    });
    const [ suggestion, setSuggestion ] = React.useState({
        visible: false,
        historyEntryRollOverCount: 16,
        histories: [],
        autocompletes: []
    });

    const _onFocus = () => {
        setInput({
            ...input,
            focused: true
        });

        setSuggestion({
            ...suggestion,
            visible: true
        });

        if (visible && enableSuggestion) {
            animatedSuggestionViewRef.current.transitionTo({
                opacity: 1,
                translateY: 0,
                height: DEVICE_HEIGHT
            }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`);
        }

        onFocus();
    };
    const _onBlur = () => {
        setInput({
            ...input,
            focused: false
        });

        if (visible && enableSuggestion) {
            animatedSuggestionViewRef.current.transitionTo({
                opacity: 0,
                translateY: DEVICE_HEIGHT,
                height: 0
            }, DEFAULT_ANIMATION_DURATION_MS, `ease-out-cubic`);
        }

        onBlur();
    };
    const _onEditting = (value) => {
        if (enableSuggestion) {
            const fetchSearchAutocompletions = async function () {
                const autocompleteTexts = await onGetAutocompletions(value);
                if (Array.isArray(autocompleteTexts) && autocompleteTexts.length) {
                    setSuggestion({
                        ...suggestion,
                        autocompletes: [
                            // ...new Set(autocompleteTexts.filter((text) => typeof text === `string`).map((text) => text.replace(/\s/g, ``)))
                            ...new Set(autocompleteTexts.filter((text) => typeof text === `string`))
                        ].map((text) => {
                            return {
                                suggestionType: `autocompletion`,
                                value: text
                            };
                        })
                    });
                }
            };

            if (value !== ``) {
                fetchSearchAutocompletions();
                setInput({
                    ...input,
                    value,
                    valueChanged: value !== input.value
                });
            } else {
                setInput({
                    ...input,
                    value: ``,
                    valueChanged: value !== input.value
                });
                setSuggestion({
                    ...suggestion,
                    autocompletes: []
                });
            }
        } else {
            if (value !== ``) {
                setInput({
                    ...input,
                    value,
                    valueChanged: value !== input.value
                });
            } else {
                setInput({
                    ...input,
                    value: ``,
                    valueChanged: value !== input.value
                });
            }
        }

        onEnteringSearch({
            nativeEvent: {
                text: value
            }
        });
    };
    const _onSubmitEditing = (event) => {
        const value = event.nativeEvent.text;

        if (enableSuggestion) {
            if (value !== ``) {
                if (!suggestion.histories.some((entry) => entry.value === value) &&
                    !pinnedSuggestions.some((_value) => _value === value)) {
                    let {
                        historyEntryRollOverCount,
                        histories
                    } = suggestion;

                    if (histories.length >= historyEntryRollOverCount) {
                        histories.pop();
                    }
                    histories.push({
                        suggestionType: `history`,
                        value,
                        timestamp: new Date().getTime()
                    });

                    setSuggestion({
                        ...suggestion,
                        visible: false,
                        autocompletes: [],
                        histories
                    });
                } else {
                    setSuggestion({
                        ...suggestion,
                        visible: false,
                        autocompletes: []
                    });
                }
                onSearch({
                    nativeEvent: {
                        text: value
                    }
                });
            } else {
                setSuggestion({
                    ...suggestion,
                    visible: false,
                    autocompletes: []
                });
            }
        } else {
            onSearch({
                nativeEvent: {
                    text: value
                }
            });
        }
    };
    const isHidden = () => !visible;
    const hide = () => {
        if (!persistent && visible) {
            if (entryAnimation === `from-right-side`) {
                animatedSearchHeaderViewRef.current.transitionTo({
                    opacity: 0,
                    translateX: DEVICE_WIDTH
                }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`, 0);
            } else if (entryAnimation === `from-left-side`) {
                animatedSearchHeaderViewRef.current.transitionTo({
                    opacity: 0,
                    translateX: -DEVICE_WIDTH
                }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`, 0);
            }

            setVisibility(false);
            setInput({
                ...input,
                focused: false,
                valueChanged: false
            });
            setSuggestion({
                ...suggestion,
                visible: false,
                autocompletes: []
            });

            onHide();
            dismissKeyboard();
        }
    };
    const show = () => {
        if (!persistent && !visible) {
            setVisibility(true);
            setInput({
                ...input,
                focused: false
            });

            onShow();

            animatedSearchHeaderViewRef.current.transitionTo({
                opacity: 1,
                translateX: 0
            }, DEFAULT_ANIMATION_DURATION_MS, `ease-in-cubic`, 0);
        }
    };
    const clear = () => {
        setInput({
            ...input,
            value: ``,
            valueChanged: true
        });
        setSuggestion({
            ...suggestion,
            autocompletes: []
        });

        onClear();
    };
    const clearSuggestion = () => {
        setSuggestion({
            visible: false,
            histories: [],
            autocompletes: []
        });

        onClearSuggesstion();
    };

    React.useImperativeHandle(ref, () => ({
        isHidden,
        hide,
        show,
        clear,
        clearSuggestion
    }));

    React.useEffect(() => {
        setAdjustedStyle(readjustStyle({
            inputColor,
            inputBgColor,
            suggestionEntryColor,
            iconColor,
            topOffset,
            headerHeight,
            headerBgColor,
            dropShadowed,
            visibleInitially,
            autoFocus,
            autoCorrect,
            persistent,
            entryAnimation,
            style
        }, adjustedStyle));

        setCustomIconImageComponents(customIconImageComponents.map((customIconImageComponent) => {
            const matchedIconImageComponent = iconImageComponents.find((_iconImageComponent) => _iconImageComponent.name === customIconImageComponent.name);
            return typeof matchedIconImageComponent === `object` ? {
                ...customIconImageComponent,
                ...matchedIconImageComponent
            } : customIconImageComponent;
        }));

        if (suggestion.historyEntryRollOverCount !== suggestionHistoryEntryRollOverCount) {
            setSuggestion({
                ...suggestion,
                historyEntryRollOverCount: suggestionHistoryEntryRollOverCount
            });
        }
    }, [
        inputColor,
        inputBgColor,
        suggestionEntryColor,
        iconColor,
        topOffset,
        headerHeight,
        headerBgColor,
        dropShadowed,
        visibleInitially,
        autoFocus,
        autoCorrect,
        persistent,
        entryAnimation,
        iconImageComponents,
        style,
        enableSuggestion,
        suggestionHistoryEntryRollOverCount
    ]);

    const renderInput = () => {
        if (visible) {
            return (
                <View style = { adjustedStyle.header }>
                    <View style = { adjustedStyle.action }>
                        {
                            !persistent ? <TouchableOpacity onPress = {() => {
                                hide();
                            }}>
                                {
                                    customIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `hide`).map((iconImageComponent) => {
                                        return iconImageComponent.render([
                                            adjustedStyle.icon,
                                            iconImageComponent.customStyle
                                        ]);
                                    })[0]
                                }
                            </TouchableOpacity> : <TouchableOpacity onPress = {() => {
                                onSearch({
                                    nativeEvent: {
                                        text: input.value
                                    }
                                });
                            }}>
                                {
                                    customIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `search`).map((iconImageComponent) => {
                                        return iconImageComponent.render([
                                            adjustedStyle.icon,
                                            iconImageComponent.customStyle
                                        ]);
                                    })[0]
                                }
                            </TouchableOpacity>
                        }
                    </View>
                    <TextInput
                        ref = { textInputRef }
                        autoFocus = { autoFocus }
                        autoCorrect = { autoCorrect }
                        returnKeyType = 'search'
                        underlineColorAndroid = 'transparent'
                        placeholder = { placeholder }
                        placeholderTextColor = { placeholderColor }
                        value = { input.value }
                        style = { adjustedStyle.input }
                        onFocus = { _onFocus }
                        onBlur = { _onBlur }
                        onChangeText = { _onEditting }
                        onSubmitEditing = { _onSubmitEditing }
                    />
                    {
                        input.value === `` ? <View style = { adjustedStyle.action } /> : <View style = { adjustedStyle.action }>
                            <TouchableOpacity onPress = {() => {
                                clear();
                            }}>
                                {
                                    customIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `close`).map((iconImageComponent) => {
                                        return iconImageComponent.render([
                                            adjustedStyle.icon,
                                            iconImageComponent.customStyle
                                        ]);
                                    })[0]
                                }
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            );
        }
        return null;
    };
    const renderSuggestions = () => {
        if (enableSuggestion) {
            const suggestionEntries = pinnedSuggestions.map((value) => {
                return {
                    suggestionType: `pin`,
                    value
                };
            }).concat(suggestion.histories.sort((itemA, itemB) => {
                return itemB.timestamp - itemA.timestamp;
            })).concat().concat(suggestion.autocompletes).map((entry, index) => {
                return {
                    key: `${index}`,
                    ...entry
                };
            });

            return (
                <AnimatedView
                    ref = { animatedSuggestionViewRef }
                    duration = { 300 }
                    pointerEvents = 'box-none'
                    useNativeDriver = { false }
                    style = { adjustedStyle.suggestion }
                >
                    <FlatList
                        data = { suggestionEntries }
                        renderItem = {(listData) => {
                            const entry = listData.item;

                            return (
                                <TouchableOpacity
                                    key = { listData.key }
                                    onPress = {() => {
                                        if (!suggestion.histories.some((_entry) => _entry.value === entry.value) &&
                                            !pinnedSuggestions.some((value) => value === entry.value)) {
                                            let {
                                                historyEntryRollOverCount,
                                                histories
                                            } = suggestion;

                                            if (histories.length >= historyEntryRollOverCount) {
                                                histories.pop();
                                            }
                                            histories.push({
                                                suggestionType: `history`,
                                                value: entry.value,
                                                timestamp: new Date().getTime()
                                            });

                                            setInput({
                                                ...input,
                                                value: entry.value,
                                                valueChanged: input.value !== entry.value,
                                                focused: false
                                            });
                                            setSuggestion({
                                                ...suggestion,
                                                visible: false,
                                                autocompletes: [],
                                                histories
                                            });
                                        } else {
                                            setInput({
                                                ...input,
                                                value: entry.value,
                                                valueChanged: input.value !== entry.value,
                                                focused: false
                                            });
                                            setSuggestion({
                                                ...suggestion,
                                                visible: false,
                                                autocompletes: []
                                            });
                                        }

                                        onEnteringSearch({
                                            nativeEvent: {
                                                text: entry.value
                                            }
                                        });
                                        onSearch({
                                            nativeEvent: {
                                                text: entry.value
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
                                            customIconImageComponents.filter((iconImageComponent) => {
                                                if (entry.suggestionType === `history`) {
                                                    return iconImageComponent.name === `history`;
                                                } else if (entry.suggestionType === `pin`) {
                                                    return iconImageComponent.name === `pin`;
                                                }
                                                return iconImageComponent.name === `search`;
                                            }).map((iconImageComponent) => {
                                                return iconImageComponent.render([
                                                    adjustedStyle.icon,
                                                    iconImageComponent.customStyle
                                                ]);
                                            })[0]
                                        }
                                        <Text
                                            numberOfLines = { 1 }
                                            ellipsizeMode = 'tail'
                                            style = { adjustedStyle.suggestionEntry }
                                        >{ entry.value }</Text>
                                        <View style = {{
                                            flexDirection: `row`,
                                            alignItems: `center`,
                                            justifyContent: `center`,
                                            minWidth: 46,
                                            minHeight: 46,
                                            backgroundColor: `transparent`
                                        }}>
                                            <TouchableOpacity onPress = {() => {
                                                setInput({
                                                    ...input,
                                                    value: entry.value,
                                                    valueChanged: input.value !== entry.value
                                                });
                                            }}>
                                                {
                                                    customIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `recall`).map((iconImageComponent) => {
                                                        return iconImageComponent.render([
                                                            adjustedStyle.icon,
                                                            iconImageComponent.customStyle
                                                        ]);
                                                    })[0]
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        style = {{
                            flexDirection: `column`,
                            backgroundColor: `transparent`
                        }}
                    />
                </AnimatedView>
            );
        }
        return null;
    };

    return (
        <AnimatedView
            ref = { animatedSearchHeaderViewRef }
            style = { adjustedStyle.container }
            duration = { 300 }
            useNativeDriver = { true }
            onStartShouldSetResponder = {() => {
                dismissKeyboard();
            }}
        >
            {
                renderInput()
            }
            {
                renderSuggestions()
            }
        </AnimatedView>
    );
};

SearchHeaderWithReactHooks.propTypes = {
    inputColor: PropTypes.string,
    inputBgColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    suggestionEntryColor: PropTypes.string,
    iconColor: PropTypes.string,
    topOffset: PropTypes.number,
    headerHeight: PropTypes.number,
    headerBgColor: PropTypes.string,
    dropShadowed: PropTypes.bool,
    visibleInitially: PropTypes.bool,
    autoFocus: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    persistent: PropTypes.bool,
    enableSuggestion: PropTypes.bool,
    suggestionHistoryEntryRollOverCount: PropTypes.number,
    pinnedSuggestions: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.number, PropTypes.string, PropTypes.object ])),
    placeholder: PropTypes.string,
    entryAnimation: PropTypes.oneOf([ `from-left-side`, `from-right-side` ]),
    iconImageComponents: PropTypes.arrayOf(PropTypes.object),
    onClearSuggesstion: PropTypes.func,
    onGetAutocompletions: PropTypes.func,
    onClear: PropTypes.func,
    onSearch: PropTypes.func,
    onEnteringSearch: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onHide: PropTypes.func,
    onShow: PropTypes.func
};

export { SearchHeaderWithReactHooks, SearchHeaderWithReactClass };
