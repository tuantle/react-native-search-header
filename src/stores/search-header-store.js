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
 * @module SearchHeaderStore
 * @description - Search header applet store.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

import EVENT from '../events/search-header-event';

const SearchHeaderStore = Hf.Store.augment({
    state: {
        visible: {
            value: false,
            stronglyTyped: true
        },
        searchInput: {
            value: {
                focus: false,
                itemTextChanged: false,
                itemText: ``
            },
            stronglyTyped: true
        },
        searchSuggestion: {
            value: {
                index: 0,
                rollOverCount: 0,
                visible: false,
                items: []
            },
            stronglyTyped: true
        }
    },
    setup: function setup (done) {
        const store = this;
        store.incoming(EVENT.DO.MUTATE_SEARCH_HEADER_VISIBILITY).handle((visible) => {
            store.reduce({
                visible
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_INPUT_FOCUS).handle((focus) => {
            store.reduce({
                searchInput: {
                    focus
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_INPUT_ITEM_TEXT).handle((itemText) => {
            store.reduce({
                searchInput: {
                    itemText
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_INPUT_ITEM_TEXT_CHANGED).handle((itemTextChanged) => {
            store.reduce({
                searchInput: {
                    itemTextChanged
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_SUGGESTION_VISIBILITY).handle((visible) => {
            store.reduce({
                searchSuggestion: {
                    visible
                }
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_SUGGESTION_ROLLOVER_COUNT).handle((rollOverCount) => {
            store.reduce({
                searchSuggestion: {
                    rollOverCount
                }
            }, {
                suppressMutationEvent: true
            });
        });
        store.incoming(EVENT.DO.MUTATE_SEARCH_SUGGESTION).handle((mutateSearchSuggestion) => {
            store.reconfig(mutateSearchSuggestion);
        });
        done();
    }
});
export default SearchHeaderStore;
