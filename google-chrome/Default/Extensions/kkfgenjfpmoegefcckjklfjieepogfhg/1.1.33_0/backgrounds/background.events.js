function notificationsEvent(num) {  window.chrome.browserAction.setBadgeBackgroundColor({    color: [255, 0, 0, 255],  });  window.chrome.browserAction.setBadgeText({    text: num + "",  });}window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {  if (request.action == "GET_SESSIONS") {    window.chrome.cookies.getAll(      { url: "https://www.linkedin.com" },      async (data) => {        sendResponse(data);      }    );  }  if (request.action == "REMOVE_COOKIE") {    window.chrome.cookies.remove({      name: "access_token",      url: REACT_APP_BASE_URL,    });  }  if (request.action == "SAVE_WIDGET_POSITION") {    const expirationDate = new Date();    window.chrome.cookies.set(      {        url: REACT_APP_BASE_URL,        name: "widget_position",        value: request.input,        expirationDate: expirationDate.getTime() + 39460601000,      },      async (data) => {        sendResponse(data);      }    );  }  if (request.action == "GET_WIDGET_POSITION") {    window.chrome.cookies.get(      { url: REACT_APP_BASE_URL, name: "widget_position" },      async (data) => {        sendResponse(data && data.value);      }    );  }  if (request.action == "GET_WIDGET_STATUS") {    getToken()      .then(async (credentials) => {        const { data: userInfos } = await getUser({          token: credentials.token.value,          csrf: credentials.csrf,        });        sendResponse({          isActivated: !userInfos.hideWidget,        });      })      .catch(() =>        sendResponse({          isActivated: true,        })      );  }  if (request.action == "SET_WIDGET_STATUS") {    getToken()      .then(async (credentials) => {        const { data: userInfos } = await updateUser({          ...request.input,          token: credentials.token.value,          csrf: credentials.csrf,        });        updateWidgetActivation(!userInfos.hideWidget);        sendResponse({ isActivated: !userInfos.hideWidget });      })      .catch(() =>        sendResponse({          isActivated: true,        })      );  }  if (request.action == "CHECK_WIDGET_FOR_SYNC") {    window.chrome.cookies.get(      { url: REACT_APP_BASE_URL, name: "activate_widget_for_sync" },      (data) => {        if (data && data.value == "true") {          window.chrome.cookies.remove({            name: "activate_widget_for_sync",            url: REACT_APP_BASE_URL,          });          getToken()            .then(async (credentials) => {              const { data: userInfos } = await updateUser({                ...request.input,                token: credentials.token.value,                csrf: credentials.csrf,              });              updateWidgetActivation(false);            })            .catch(() =>              sendResponse({                isActivated: true,              })            );        }      }    );  }  if (request.action == "desactivatePlugin") {    window.chrome.cookies.set(      {        url: REACT_APP_BASE_URL,        name: "activation_plugin_status",        value: "false",        expirationDate: new Date().getTime() / 1000 + 3600 * 24 * 30 * 365,      },      (data) => {        sendResponse({ status: true });      }    );  }  if (request.action == "activationWidgetCookie") {    window.chrome.cookies.get(      { url: REACT_APP_BASE_URL, name: "widget_activation" },      (data) => {        let isActive = false;        try {          isActive = JSON.parse(data.value);        } catch (err) {}        sendResponse({ activation: isActive });      }    );  }  if (request.action == "changeAutoOpenStatus") {    window.chrome.cookies.set(      {        url: REACT_APP_BASE_URL,        name: "auto_open_widget",        value: request.value,      },      (data) => {        sendResponse({ status: data != null ? data.value : true });      }    );  }  if (request.action == "getAutoOpenStatus") {    window.chrome.cookies.get(      { url: REACT_APP_BASE_URL, name: "auto_open_widget" },      (data) => {        sendResponse({ status: data != null ? data.value : true });      }    );  }  if (request.action == "getNotification") {    window.chrome.browserAction.setBadgeBackgroundColor({      color: [255, 0, 0, 255],    });    window.chrome.browserAction.setBadgeText({ text: request.notif });    sendResponse({ success: true });  }  if (request.action == "SET_TUTORIAL_DATA") {    const expirationDate = new Date();    window.chrome.cookies.set(      {        url: REACT_APP_BASE_URL,        name: "tutorial_data",        value: request.input,        expirationDate: expirationDate.getTime() + 39460601000,      },      (data) => {        sendResponse({ status: data != null ? data.value : true });      }    );  }  if (request.action == "GET_TUTORIAL_DATA") {    window.chrome.cookies.get(      {        url: REACT_APP_BASE_URL,        name: "tutorial_data",      },      (data) => {        sendResponse(data && data.value);      }    );  }  if (request.action == "REMOVE_TUTO_COOKIES") {    window.chrome.cookies.remove({      name: "tutorial_data",      url: REACT_APP_BASE_URL,    });  }  return true;});window.chrome.runtime.onMessageExternal.addListener(  (request, sender, sendResponse) => {    if (request.action == "getWidgetStatus") {      window.chrome.tabs.query({}, (tabs) => {        for (let i in tabs) {          window.chrome.tabs.sendMessage(tabs[i].id, {            status: request.status,          });        }      });    }    if (request.action == "isKasprExtensionInstalled") {      const manifest = window.chrome.runtime.getManifest();      sendResponse({        type: "success",        version: manifest.version,      });      return true;    }    if (request.action == "SET_WIDGET_STATUS") {      console.log("______");      getToken().then(async (credentials) => {        const { data: userInfos } = await updateUser({          ...request.input,          token: credentials.token.value,          csrf: credentials.csrf,        });        if (request.input.wasHidden) {          window.chrome.cookies.set(            {              url: REACT_APP_BASE_URL,              name: "activate_widget_for_sync",              value: "true",              expirationDate:                new Date().getTime() / 1000 + 3600 * 24 * 30 * 365,            },            (data) => {}          );        }        updateWidgetActivation(!userInfos.hideWidget);        sendResponse({ isActivated: !userInfos.hideWidget });      });    }    if (request.action == "REFRESH_WHEN_CONNECTED") {      refreshExtension(request.input.isConnected);    }  });function updateWidgetActivation(isWidgetActivated) {  window.chrome.tabs.getAllInWindow(null, function (tabs) {    for (let i = 0; i < tabs.length; i++) {      window.chrome.tabs.sendMessage(tabs[i].id, {        isWidgetActivated,        widgetActivationRequest: true,      });    }  });}function refreshExtension(isConnected) {  window.chrome.tabs.getAllInWindow(null, function (tabs) {    for (let i = 0; i < tabs.length; i++) {      window.chrome.tabs.sendMessage(tabs[i].id, {        isConnected,        IsRefreshConnection: true,      });    }  });}window.chrome.tabs.onUpdated.addListener((tabId) => {  window.chrome.tabs.sendMessage(tabId, { message: "CHANGE_URL" });  notificationsEvent("");});/*window.chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {  window.chrome.tabs.query(    { active: true, lastFocusedWindow: true },    (tabs) => {      let url = tabs[0].url;      if (url.indexOf("linkedin.com/in/anne-charlotte-lazou") > -1) {        getToken().then(async (credentials) => {          const userInfos = await getUser({            token: credentials.token.value,            csrf: credentials.csrf,          });          userInfos.data.doSkipTutorial = true;          updateUser({            userFields: userInfos.data,            token: credentials.token.value,            csrf: credentials.csrf,          });        });      }    }  );});*/window.chrome.windows.onRemoved.addListener(function (windowId) {  window.chrome.tabs.sendMessage(windowId, { message: "TAB_OR_WINDOW_CLOSED" });});