const APIUtil = require("../utils/requests");

// Customer resource class
class ODDResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }
  async getODD(accessToken, customerId, oddId) {
    const data = await this.getAPICall(
      `customers/${customerId}/odd/${oddId}`,
      accessToken
    );
    return data;
  }

  async createODD(accessToken, customerId, scope, frequency, active) {
    const BODY = {
      scope: scope,
      frequency: frequency,
    };
    if (active !== null) {
      BODY["active"] = active;
    }

    const data = await this.postAPICall(
      `customers/${customerId}/odd`,
      accessToken,
      BODY
    );
    return data;
  }

  async getODDResult(accessToken, customerId, oddId) {
    const data = await this.getAPICall(
      `customers/${customerId}/odd/${oddId}/results`,
      accessToken
    );
    return data;
  }

  async updateODD(accessToken, customerId, oddId, scope, frequency, active) {
    const BODY = {
      scope: scope,
      frequency: frequency,
      active: active,
    };
    const data = await this.putAPICall(
      `customers/${customerId}/odd/${oddId}`,
      accessToken,
      BODY
    );
    return data;
  }

  async partiallyUpdateODD(accessToken, customerId, oddId, oddPatchData) {
    const data = await this.patchAPICall(
      `customers/${customerId}/odd/${oddId}`,
      accessToken,
      oddPatchData
    );
    return data;
  }

  async deleteODD(accessToken, customerId, oddId) {
    const data = await this.deleteAPICall(
      `customers/${customerId}/odd/${oddId}`,
      accessToken
    );
    return data;
  }

  async listAllODD(accessToken, customerId) {
    const data = await this.getAPICall(
      `/customers/${customerId}/odd`,
      accessToken
    );
    return data;
  }
}

module.exports = ODDResource;
