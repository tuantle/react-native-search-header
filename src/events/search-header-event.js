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
 * @description - Search header applet event ids.
 *
 * @author Tuan Le (tuan.t.lei@gmail.com)
 *
 *------------------------------------------------------------------------
 */
'use strict'; // eslint-disable-line

import { Hf } from 'hyperflow';

export default Hf.Event.create({
    onEvents: [
        `clear-all-items-from-search-suggestion`,
        `clear-non-history-items-from-search-suggestion`,
        `add-items-to-search-suggestion`,

        `update-search-header-visibility`,
        `update-search-input-focus`,
        `update-search-input-item-text`,
        `update-search-input-item-text-changed`,
        `update-search-suggestion-visibility`,
        `update-search-suggestion-rollover-count`
    ],
    doEvents: [
        `mutate-search-header-visibility`,
        `mutate-search-input-focus`,
        `mutate-search-input-item-text`,
        `mutate-search-input-item-text-changed`,
        `mutate-search-suggestion`,
        `mutate-search-suggestion-visibility`,
        `mutate-search-suggestion-rollover-count`

    ]
});
