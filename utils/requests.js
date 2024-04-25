async function commonAPICall(PATH, accessToken, METHOD = "GET", BODY = null) {
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(PATH, {
    method: METHOD,
    body: BODY,
    headers: headers,
  });

  return response;
}

async function getAPICall(PATH, accessToken) {
  const response = await commonAPICall(PATH, accessToken);
  const data = await response.json();
  return data;
}

async function postAPICall(PATH, accessToken, DATA) {
  var serializedData;
  if (DATA) {
    serializedData = JSON.stringify(DATA);
  } else {
    serializedData = undefined;
  }
  const response = await commonAPICall(
    PATH,
    accessToken,
    "POST",
    serializedData
  );
  const data = await response.json();
  return data;
}

async function putAPICall(PATH, accessToken, DATA) {
  var serializedData;
  if (DATA) {
    serializedData = JSON.stringify(DATA);
  } else {
    serializedData = undefined;
  }
  const response = await commonAPICall(
    PATH,
    accessToken,
    "PUT",
    serializedData
  );
  const data = await response.json();
  return data;
}

async function patchAPICall(PATH, accessToken, DATA) {
  if (DATA) {
    serializedData = JSON.stringify(DATA);
  } else {
    serializedData = undefined;
  }
  const response = await commonAPICall(
    PATH,
    accessToken,
    "PATCH",
    serializedData
  );
  const data = await response.text();
  return data;
}

async function deleteAPICall(PATH, accessToken) {
  const response = await commonAPICall(PATH, accessToken, "DELETE");
  const data = await response.text();
  return data;
}

module.exports = {
  getAPICall,
  postAPICall,
  putAPICall,
  deleteAPICall,
  patchAPICall,
};
