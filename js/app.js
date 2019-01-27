'use strict';

import phonePages from './phones/phones-page.js';

let curentPage = new phonePages({
    element: document.querySelector('[data-view]')
});
