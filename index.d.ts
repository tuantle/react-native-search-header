declare module "react-native-search-header" {
  import { StyleProp } from "react-native";
  import { Component } from "react";
  export interface IconComponent<T> {
    name: string;
    customStyle: StyleProp<T>;
    render: React.ReactElement<{ style: StyleProp<T> }>;
  }
  export interface SearchHeaderProps {
    inputColor?: string;
    inputBgColor?: string;
    placeholderColor?: string;
    suggestionEntryColor?: string;
    iconColor?: string;
    topOffset?: number;
    headerHeight?: number;
    headerBgColor?: string;
    dropShadowed?: boolean;
    visibleInitially?: boolean;
    autoFocus?: boolean;
    autoCorrect?: boolean;
    persistent?: boolean;
    enableSuggestion?: boolean;
    suggestionHistoryEntryRollOverCount?: number;
    placeholder?: string;
    entryAnimation?: `from-left-side` | `from-right-side`;
    iconImageComponents?: Array<any>;
    onClearSuggesstion?: Function;
    onGetAutocompletions?: Function;
    onClear?: Function;
    onSearch?: Function;
    onEnteringSearch?: Function;
    onFocus?: Function;
    onBlur?: Function;
    onHide?: Function;
    onShow?: Function;
  }
  export default class extends Component<SearchHeaderProps> {
    isHidden(): Boolean;
    show(): void;
    hide(): void;
    clear(): void;
    clearSuggestion(): void;
  }
}
