/*
 * Copyright (C) 2010-2022 Talend Inc. - www.talend.com
 *
 * This source code is available under agreement available at
 * https://www.talend.com/legal-terms/us-eula
 *
 * You should have received a copy of the agreement
 * along with this program; if not, write to Talend SA
 * 5 rue Salomon de Rothschild - 92150 Suresnes
 *
 */

// CHROME HELPERS
const create = (configuration) => new Promise((resolve) => chrome.tabs.create(configuration, resolve));

const update = (tabIdOrIds, configuration) => (
  new Promise((resolve) => chrome.tabs.update(tabIdOrIds, configuration, resolve))
);

const remove = (tabIdOrIds) => new Promise((resolve) => chrome.tabs.remove(tabIdOrIds, resolve));

window.APP.chromeHelpers = {
  tabs: {
    create,
    update,
    remove,
  },
};
