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
 * @module SearchHeaderDomain
 * @description - Search header applet domain.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import moment from 'moment';

import SearchHeaderStore from '../stores/search-header-store';

import SearchHeaderInterface from '../interfaces/search-header-interface';

import EVENT from '../events/search-header-event';

const SearchHeaderDomain = Hf.Domain.augment({
    $init: function $init () {
        const domain = this;
        domain.register({
            store: SearchHeaderStore({
                name: `search-header-store`
            }),
            intf: SearchHeaderInterface({
                name: domain.name
            })
        });
    },
    setup: function setup (done) {
        const domain = this;

        domain.incoming(EVENT.ON.UPDATE_SEARCH_VISIBILITY).forward(EVENT.DO.MUTATE_SEARCH_VISIBILITY);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_ITEM_TEXT).forward(EVENT.DO.MUTATE_SEARCH_ITEM_TEXT);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_ITEM_TEXT_CHANGED).forward(EVENT.DO.MUTATE_SEARCH_ITEM_TEXT_CHANGED);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_SUGGESTION_VISIBILITY).forward(EVENT.DO.MUTATE_SEARCH_SUGGESTION_VISIBILITY);
        domain.incoming(EVENT.ON.UPDATE_SEARCH_SUGGESTION_ROLLOVER_COUNT).forward(EVENT.DO.MUTATE_SEARCH_SUGGESTION_ROLLOVER_COUNT);

        domain.incoming(EVENT.ON.CLEAR_ALL_SEARCH_SUGGESTION).handle(() => {
            return function mutateSearchSuggestion (state) {
                let {
                    items
                } = state.searchSuggestion;
                return {
                    searchSuggestion: {
                        items: items.map((item) => {
                            item.text = ``;
                            return item;
                        })
                    }
                };
            };
        }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);
        domain.incoming(EVENT.ON.CLEAR_NON_HISTORY_ITEMS_FROM_SEARCH_SUGGESTION).handle(() => {
            return function mutateSearchSuggestion (state) {
                let {
                    items
                } = state.searchSuggestion;
                return {
                    searchSuggestion: {
                        items: items.map((item) => {
                            if (!item.historyType) {
                                item.text = ``;
                            }
                            return item;
                        })
                    }
                };
            };
        }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);
        domain.incoming(EVENT.ON.ADD_ITEMS_TO_SEARCH_SUGGESTION).handle((searchSuggestionItems) => {
            return function mutateSearchSuggestion (state) {
                let {
                    index,
                    rollOverCount,
                    items
                } = state.searchSuggestion;
                const filteredSearchSuggestionItems = searchSuggestionItems.filter((item) => !items.some((_item) => _item.text === item.text));

                if (!Hf.isEmpty(filteredSearchSuggestionItems)) {
                    filteredSearchSuggestionItems.forEach((item) => {
                        if (index === rollOverCount) {
                            index = 0;
                        }
                        if (index === items.length) {
                            items.push(item);
                        } else if (index < items.length) {
                            items[index] = item;
                        }
                        index++;
                    });
                    items = items.sort((itemA, itemB) => {
                        return moment(itemA.timestamp) < moment(itemB.timestamp);
                    });
                    return {
                        searchSuggestion: {
                            index,
                            items
                        }
                    };
                } else { // eslint-disable-line
                    return {
                        searchSuggestion: state.searchSuggestion
                    };
                }
            };
        }).relay(EVENT.DO.MUTATE_SEARCH_SUGGESTION);

        done();
    }
});
export default SearchHeaderDomain;
