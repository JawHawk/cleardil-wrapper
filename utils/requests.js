class APIUtil {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  async commonAPICall(PATH, accessToken, METHOD = "GET", BODY = null) {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(new URL(PATH, this.baseURL), {
      method: METHOD,
      body: BODY,
      headers: headers,
    });

    return response;
  }

  async getAPICall(PATH, accessToken) {
    const response = await this.commonAPICall(PATH, accessToken);
    const data = await response.json();
    return data;
  }

  async postAPICall(PATH, accessToken, DATA) {
    var serializedData;
    if (DATA) {
      serializedData = JSON.stringify(DATA);
    } else {
      serializedData = undefined;
    }
    const response = await this.commonAPICall(
      PATH,
      accessToken,
      "POST",
      serializedData
    );
    const data = await response.json();
    return data;
  }

  async putAPICall(PATH, accessToken, DATA) {
    var serializedData;
    if (DATA) {
      serializedData = JSON.stringify(DATA);
    } else {
      serializedData = undefined;
    }
    const response = await this.commonAPICall(
      PATH,
      accessToken,
      "PUT",
      serializedData
    );
    const data = await response.json();
    return data;
  }

  async patchAPICall(PATH, accessToken, DATA) {
    var serializedData;
    if (DATA) {
      serializedData = JSON.stringify(DATA);
    } else {
      serializedData = undefined;
    }
    const response = await this.commonAPICall(
      PATH,
      accessToken,
      "PATCH",
      serializedData
    );
    const data = await response.text();
    return data;
  }

  async deleteAPICall(PATH, accessToken) {
    const response = await this.commonAPICall(PATH, accessToken, "DELETE");
    const data = await response.text();
    return data;
  }
}

module.exports = APIUtil;
