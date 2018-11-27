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
 * @description - Search header component export.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import React from 'react';

import ReactNative from 'react-native'; // eslint-disable-line

import PropTypes from 'prop-types';

import merge from 'lodash.merge';

import { View as AnimatedView } from 'react-native-animatable';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import hideIcon from './assets/icons/hide-3x.png';
import closeIcon from './assets/icons/close-3x.png';
import historyIcon from './assets/icons/history-3x.png';
import recallIcon from './assets/icons/recall-3x.png';
import searchIcon from './assets/icons/search-3x.png';

const {
    Component
} = React;

const {
    Text,
    Image,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Dimensions,
    PixelRatio
} = ReactNative;

const DEVICE_WIDTH = Dimensions.get(`window`).width;
const DEVICE_HEIGHT = Dimensions.get(`window`).height;

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
        ...DEFAULT_DROP_SHADOW_STYLE,
        position: `absolute`,
        alignItems: `stretch`,
        justifyContent: `flex-start`,
        zIndex: 10,
        elevation: 2,
        top: 0,
        marginBottom: 6,
        width: DEVICE_WIDTH,
        backgroundColor: `transparent`,
        overflow: `hidden`
    },
    header: {
        flexGrow: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        height: 56,
        backgroundColor: `#fdfdfd`
    },
    action: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        minWidth: 46,
        minHeight: 46,
        backgroundColor: `transparent`
    },
    suggestion: {
        ...DEFAULT_DROP_SHADOW_STYLE,
        flexShrink: 1,
        flexDirection: `column`,
        alignItems: `stretch`,
        justifyContent: `center`,
        paddingLeft: 12,
        marginVertical: 6,
        maxHeight: DEVICE_HEIGHT / 2,
        backgroundColor: `#fdfdfd`
    },
    input: {
        flex: 1,
        fontSize: PixelRatio.get() >= 3 ? 20 : 18,
        fontWeight: `400`,
        textAlign: `left`,
        marginVertical: 1,
        padding: 5,
        borderRadius: 5,
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
        marginLeft: 8,
        color: `#5d5d5d`,
        maxWidth: DEVICE_WIDTH - 92,
        backgroundColor: `transparent`
    },
    icon: {
        width: 24,
        height: 24,
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

export default class SearchHeader extends Component {
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
        topOffset: 24,
        headerHeight: DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.height,
        headerBgColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.backgroundColor,
        dropShadowed: true,
        visibleInitially: false,
        autoFocus: true,
        autoCorrect: true,
        persistent: false,
        enableSuggestion: true,
        suggestionHistoryEntryRollOverCount: 16,
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
    constructor (property) {
        super(property);
        this.refCache = {};
        this.state = {
            adjustedStyle: DEFAULT_SEARCH_HEADER_VIEW_STYLE,
            customeIconImageComponents: DEFAULT_ICON_IMAGE_COMPONENTS,
            visible: false,
            input: {
                focused: false,
                value: ``,
                valueChanged: false
            },
            suggestion: {
                visible: false,
                historyEntryIndex: 0,
                historyEntryRollOverCount: 0,
                histories: [],
                autocompletes: []
            }
        };
    }
    assignComponentRef = (refName) => {
        const component = this;

        if (typeof refName !== `string`) {
            throw new Error(`ERROR: SearchHeader.assignComponentRef - Input component reference name is invalid.`);
        } else {
            const setComponentRef = function setComponentRef (componentRef) {
                component.refCache[refName] = typeof componentRef !== undefined ? componentRef : null;
            };
            return setComponentRef;
        }
    }
    lookupComponentRefs = (...refNames) => {
        const component = this;
        let componentRefs = [];

        if (refNames) {
            componentRefs = refNames.map((refName) => {
                if (typeof refName !== `string`) {
                    throw new Error(`ERROR: SearchHeader.lookupComponentRefs - Input component reference name is invalid.`);
                } else if (!component.refCache.hasOwnProperty(refName)) {
                    return null;
                } else {
                    return component.refCache[refName];
                }
            });
        } else {
            throw new Error(`ERROR: SearchHeader.lookupComponentRefs - Input component reference name array is empty.`);
        }

        return componentRefs;
    }
    _readjustStyle = (newStyle = {
        inputColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.input.color,
        inputBgColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.input.backgroundColor,
        suggestionEntryColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.suggestionEntry.color,
        iconColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.icon.tintColor,
        topOffset: 24,
        headerHeight: DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.height,
        headerBgColor: DEFAULT_SEARCH_HEADER_VIEW_STYLE.header.backgroundColor,
        dropShadowed: true,
        visibleInitially: false,
        autoFocus: true,
        autoCorrect: true,
        persistent: false,
        entryAnimation: `from-left-side`
    }) => {
        const component = this;
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
        const {
            adjustedStyle: prevAdjustedStyle
        } = component.state;
        const adjustedStyle = merge(prevAdjustedStyle, {
            container: {
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
                }]
            },
            header: {
                height: headerHeight,
                backgroundColor: headerBgColor
            },
            suggestion: {
                shadowOpacity: dropShadowed ? DEFAULT_DROP_SHADOW_STYLE.shadowOpacity : 0
            },
            input: {
                backgroundColor: inputBgColor,
                color: inputColor
            },
            suggestionEntry: {
                color: suggestionEntryColor
            },
            icon: {
                tintColor: iconColor
            }
        });

        return typeof style === `object` ? merge(style, adjustedStyle) : adjustedStyle;
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
            onHide
        } = component.props;

        if (!persistent) {
            const [ textInput ] = component.lookupComponentRefs(`text-input`);

            if (textInput !== null) {
                textInput.clear();
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
            }
            dismissKeyboard();
        }
    }
    show = () => {
        const component = this;
        const {
            persistent,
            onShow
        } = component.props;

        if (!persistent) {
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
        const [ textInput ] = component.lookupComponentRefs(`text-input`);

        if (textInput !== null) {
            textInput.clear();
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value: ``,
                        valueChanged: true
                    },
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false
                    }
                };
            }, () => {
                onClear();
            });
        }
    }
    clearSuggestion = () => {
        const component = this;

        component.setState(() => {
            return {
                suggestion: {
                    visible: false,
                    historyEntryIndex: 0,
                    historyEntryRollOverCount: 0,
                    histories: [],
                    autocompletes: []
                }
            };
        });
    }
    onFocus = () => {
        const component = this;
        const {
            onFocus
        } = component.props;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: true
                }
            };
        }, () => {
            onFocus();
        });
    }
    onBlur = () => {
        const component = this;
        const {
            onBlur
        } = component.props;

        component.setState((prevState) => {
            return {
                input: {
                    ...prevState.input,
                    focused: false
                }
            };
        }, () => {
            onBlur();
        });
    }
    onEditting = (value) => {
        const component = this;
        const {
            onGetAutocompletions,
            onEnteringSearch
        } = component.props;

        const fetchSearchAutocompletions = async function () {
            const autocompleteTexts = await onGetAutocompletions(value);
            if (Array.isArray(autocompleteTexts) && autocompleteTexts.length) {
                component.setState((prevState) => {
                    return {
                        // suggestion: {
                        //     ...prevState.suggestion,
                        //     visible: true,
                        //     autocompletes: [
                        //         ...new Set(autocompleteTexts.filter((text) => typeof text === `string`).map((text) => text.replace(/\s/g, ``)))
                        //     ].map((text) => {
                        //         return {
                        //             historyType: false,
                        //             value: text
                        //         };
                        //     })
                        // }
                        suggestion: {
                            ...prevState.suggestion,
                            visible: true,
                            autocompletes: [
                                ...new Set(autocompleteTexts.filter((text) => typeof text === `string`))
                            ].map((text) => {
                                return {
                                    historyType: false,
                                    value: text
                                };
                            })
                        }
                    };
                });
            } else {
                component.setState((prevState) => {
                    return {
                        suggestion: {
                            ...prevState.suggestion,
                            visible: false
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
                        valueChanged: value !== prevState.input.value,
                        focused: true
                    }
                };
            });
        } else {
            component.setState((prevState) => {
                return {
                    input: {
                        ...prevState.input,
                        value: ``,
                        valueChanged: value !== prevState.input.value,
                        focused: true
                    },
                    suggestion: {
                        ...prevState.suggestion,
                        visible: false
                    }
                };
            });
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
            onSearch
        } = component.props;
        const {
            suggestion
        } = component.state;
        const value = event.nativeEvent.text;

        if (value !== ``) {
            if (!suggestion.histories.some((entry) => entry.value === value)) {
                component.setState((prevState) => {
                    let {
                        historyEntryIndex,
                        historyEntryRollOverCount,
                        histories
                    } = prevState.suggestion;

                    if (historyEntryIndex === historyEntryRollOverCount) {
                        historyEntryIndex = 0;
                    }
                    if (historyEntryIndex === histories.length) {
                        histories.push({
                            historyType: true,
                            value,
                            timestamp: new Date().getTime()
                        });
                    } else if (historyEntryIndex < histories.length) {
                        histories[historyEntryIndex] = {
                            historyType: true,
                            value,
                            timestamp: new Date().getTime()
                        };
                    }
                    historyEntryIndex++;
                    histories = histories.sort((itemA, itemB) => itemB.timestamp - itemA.timestamp);

                    return {
                        suggestion: {
                            ...prevState.suggestion,
                            visible: false,
                            historyEntryIndex,
                            histories
                        }
                    };
                });
            } else {
                component.setState((prevState) => {
                    return {
                        suggestion: {
                            ...prevState.suggestion,
                            visible: false
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
                        visible: false
                    }
                };
            });
        }
    }
    componentDidMount () {
        const component = this;
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
        } = component.props;

        component.setState((prevState) => {
            return {
                adjustedStyle: component._readjustStyle({
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
                }),
                visible: visibleInitially || persistent,
                suggestion: {
                    ...prevState.suggestion,
                    historyEntryRollOverCount: suggestionHistoryEntryRollOverCount
                },
                customeIconImageComponents: prevState.customeIconImageComponents.map((iconImageComponent) => {
                    const matchedIconImageComponent = iconImageComponents.find((_iconImageComponent) => _iconImageComponent.name === iconImageComponent.name);
                    if (matchedIconImageComponent) {
                        return merge(matchedIconImageComponent, iconImageComponent);
                    }
                    return iconImageComponent;
                })
            };
        });
    }
    componentDidUpdate () {
        const component = this;
        const {
            enableSuggestion,
            entryAnimation
        } = component.props;
        const {
            visible,
            input,
            suggestion
        } = component.state;
        const [ animatedSearchHeaderView ] = component.lookupComponentRefs(`animated-search-header-view`);

        if (visible) {
            const [ textInput ] = component.lookupComponentRefs(`text-input`);
            if (input.focused) {
                textInput.focus();
            } else {
                textInput.blur();
            }
            animatedSearchHeaderView.transitionTo({
                opacity: 1,
                translateX: 0
            });
            if (enableSuggestion) {
                const [ animatedSuggestionView ] = component.lookupComponentRefs(`animated-suggestion-view`);
                if (suggestion.visible) {
                    animatedSuggestionView.transitionTo({
                        opacity: 1,
                        translateY: 0,
                        height: DEVICE_HEIGHT / 2
                    });
                } else {
                    animatedSuggestionView.transitionTo({
                        opacity: 0,
                        translateY: DEVICE_HEIGHT,
                        height: 0
                    });
                }
            }
        } else {
            if (entryAnimation === `from-right-side`) {
                animatedSearchHeaderView.transitionTo({
                    opacity: 0,
                    translateX: DEVICE_WIDTH
                });
            } else if (entryAnimation === `from-left-side`) {
                animatedSearchHeaderView.transitionTo({
                    opacity: 0,
                    translateX: -DEVICE_WIDTH
                });
            }
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
            adjustedStyle,
            customeIconImageComponents,
            input
        } = component.state;

        return (
            <View style = { adjustedStyle.header }>
                <View style = { adjustedStyle.action }>
                    {
                        !persistent ? <TouchableOpacity onPress = {() => {
                            component.hide();
                        }}>
                            {
                                customeIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `hide`).map((iconImageComponent) => {
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
                                customeIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `search`).map((iconImageComponent) => {
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
                    ref = { component.assignComponentRef(`text-input`) }
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
                                customeIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `close`).map((iconImageComponent) => {
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
    renderSuggestions () {
        const component = this;
        const {
            onEnteringSearch,
            onSearch
        } = component.props;
        const {
            adjustedStyle,
            customeIconImageComponents,
            input,
            suggestion
        } = component.state;
        // let suggestionEntries = suggestion.histories.concat(suggestion.autocompletes);
        //
        // suggestionEntries = suggestionEntries.filter((entry) => {
        //     return entry.value !== `` && input.value !== `` && entry.value.toLowerCase().includes(input.value.toLowerCase());
        // }).map((entry, index) => {
        //     return {
        //         key: `${index}`,
        //         ...entry
        //     };
        // });

        let suggestionEntries = suggestion.histories.filter((entry) => {
            return entry.value.toLowerCase().charAt(0) === input.value.toLowerCase().charAt(0);
        }).concat(suggestion.autocompletes);

        suggestionEntries = suggestionEntries.map((entry, index) => {
            return {
                key: `${index}`,
                ...entry
            };
        });

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animated-suggestion-view`) }
                duration = { 300 }
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
                                    const [ textInput ] = component.lookupComponentRefs(`text-input`);
                                    textInput.setNativeProps({
                                        text: entry.value
                                    });

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
                                        customeIconImageComponents.filter((iconImageComponent) => entry.historyType ? iconImageComponent.name === `history` : iconImageComponent.name === `search`).map((iconImageComponent) => {
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
                                            const [ textInput ] = component.lookupComponentRefs(`text-input`);
                                            textInput.setNativeProps({
                                                text: entry.value
                                            });

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
                                                customeIconImageComponents.filter((iconImageComponent) => iconImageComponent.name === `recall`).map((iconImageComponent) => {
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
    render () {
        const component = this;
        const {
            enableSuggestion
        } = component.props;
        const {
            visible,
            adjustedStyle
        } = component.state;

        return (
            <AnimatedView
                ref = { component.assignComponentRef(`animated-search-header-view`) }
                style = { adjustedStyle.container }
                duration = { 300 }
                useNativeDriver = { true }
                onStartShouldSetResponder = {() => {
                    dismissKeyboard();
                }}
            >
                {
                    !visible ? null : component.renderInput()
                }
                {
                    !enableSuggestion ? null : component.renderSuggestions()
                }
            </AnimatedView>
        );
    }
}
