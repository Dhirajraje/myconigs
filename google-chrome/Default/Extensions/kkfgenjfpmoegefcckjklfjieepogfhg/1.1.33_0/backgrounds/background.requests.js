function getToken() {  return new Promise((resolve) => {    window.chrome.cookies.get(      { url: REACT_APP_BASE_URL, name: "access_token" },      async (token) => {        let csrf = await createCsrf(window.chrome.cookies.get);        resolve({ token, csrf });      }    );  });}const capitalizeFirstLetter = (string) => {  return string && string.charAt(0).toUpperCase() + string.slice(1);};async function onCreateOrganization(token) {  try {    const { data: dataUser, statusCode: userStatusCode } = await getUser({      token,    });    const { data, statusCode } = await getPublicOrganization({      token,    });    if (      (data.organizations && !data.organizations.length) ||      statusCode !== 200    ) {      let domainName = dataUser.email.split("@")[1];      domainName = domainName.split(".");      domainName.pop();      domainName = domainName.join("");      const organization = {        name: capitalizeFirstLetter(domainName) + " Workspace",        domains: [dataUser.email.split("@")[1]],      };      const formData = new FormData();      formData.append("picture", null);      formData.append("organization", JSON.stringify(organization));      const { statusCode } = await createOrganization({        token,        data: formData,      });      return { success: statusCode == 200 };    }  } catch (err) {    return false;  }}/**/getToken().then(({ token, csrf }) => {  window.chrome.cookies.get(    { url: REACT_APP_BASE_URL, name: "first_install" },    async (firstInstall) => {      let { data } = await getUser({ token: token.value });      const linkedinValidation =        data.steps &&        data.steps.find((step) => step.id === "linkedinValidation");      if (linkedinValidation && !linkedinValidation.done && !firstInstall) {        await validatePluginInstallation({ token: token.value, csrf });        window.chrome.tabs.update({          url: "https://www.linkedin.com/feed/?synchro=kaspr&isFirstKasprSynchro=true",        });        window.chrome.cookies.set({          url: REACT_APP_BASE_URL,          name: "first_install",          value: "true",          expirationDate: new Date().getTime() / 1000 + 3600 * 24 * 30 * 365,        });        reloadDashboard();      }    }  );});window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {  getToken().then((credentials) => {    if (request.action == "GET_TOKEN") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      sendResponse({ token: credentials.token, statusCode: 200 });    }    //    if (!credentials.token) return;    if (request.action == "LINKEDIN_SYNCHRO") {      if (!credentials.token)        return sendResponse({          data: {            message:              "You have to connect to your Kaspr account or you have to accept the permission to use the plugin",            messageVar: "youHaveToConnectToYouKasprAccount",          },          statusCode: 400,        });      linkedinSynchro({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(async (data) => {          if (data && data.statusCode == 200) {            await onCreateOrganization(credentials.token.value);            reloadDashboard(              request.input && request.input.isFirstKasprSynchro                ? "firstSync"                : null            );          }          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "LINKEDIN_CLASSES") {      if (!credentials.token)        return sendResponse({          data: {            message:              "You have to connect to your Kaspr account or you have to accept the permission to use the plugin",            messageVar: "youHaveToConnectToYouKasprAccount",          },          statusCode: 400,        });      linkedinClasses({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((data) => {          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "VALIDATE_LINKEDIN_STEP") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      validateLinkedinStep({        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((data) => {          reloadDashboard();          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "VALIDATE_PLUGIN_INSTALLATION") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      skipSteps({        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((data) => {          reloadDashboard();          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "GET_HIDDEN_DATA_PROFILE") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      checkLinkedinProfile({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((results) => {          if (results.data && results.data.profile) {            notificationsEvent(              results.data.profile.emails.length +                results.data.profile.phones.length            );          }          sendResponse(results);        })        .catch((result) => sendResponse(result));    }    if (request.action == "ADVANCED_SEARCH") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      advancedSearchLinkedin({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((data) => {          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "GET_DATA_PROFILE") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      getEmailsLinkedin({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((data) => {          if (request.input.isFirstDiscover) {            reloadDashboard();          }          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "GET_HIDDEN_DATA_COMPANY") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      checkLinkedinCompany({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((results) => {          if (results.data && results.data.patterns)            notificationsEvent(              results.data.patterns.length + results.data.phones.length            );          sendResponse(results);        })        .catch((result) => sendResponse(result));    }    if (request.action == "GET_DATA_COMPANY") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      getPatternsLinkedin({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((data) => {          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "AUTOMATION_SUBMIT") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      linkedInAutomation({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((data) => {          if (request.input.isFirstLaunch) {            reloadDashboard();          }          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "GET_WORKFLOWS") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      getWorflows({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(sendResponse)        .catch((result) => sendResponse(result));    }    if (request.action == "GET_LEADS_LABELS") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      getLabels({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(sendResponse)        .catch((result) => sendResponse(result));    }    if (request.action == "GET_COMPANIES") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      getCompanies({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(sendResponse)        .catch((result) => sendResponse(result));    }    if (request.action == "UPDATE_USER") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      updateUser({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(sendResponse)        .catch((result) => sendResponse(result));    }    if (request.action == "ADD_LEAD") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      addLead({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then((data) => {          if (request.input.isFirstLeadAdded) {            reloadDashboard();          }          sendResponse(data);        })        .catch((result) => sendResponse(result));    }    if (request.action == "ADD_PRELEAD_TO_WAITING_LIST") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      addPreLeadToWaitingList({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(sendResponse)        .catch((result) => sendResponse(result));    }    if (request.action == "UPDATE_LEAD") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      updateLead({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(sendResponse)        .catch((result) => sendResponse(result));    }    if (request.action == "UPDATE_LEAD_INFOS") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      updateLeadInfos({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(sendResponse)        .catch((result) => sendResponse(result));    }    if (request.action == "DELETE_LEAD") {      if (!credentials.token)        return sendResponse({          data: { message: "user not connected" },          statusCode: 400,        });      deleteLead({        ...request.input,        token: credentials.token.value,        csrf: credentials.csrf,      })        .then(sendResponse)        .catch((result) => sendResponse(result));    }  });  return true;});