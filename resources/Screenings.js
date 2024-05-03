const APIUtil = require("../utils/requests");

// Customer resource class
class ScreeningResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }
  async getScreening(accessToken, customerId, screeningId) {
    const data = await this.getAPICall(
      `customers/${customerId}/screenings/${screeningId}`,
      accessToken
    );
    return data;
  }

  async createScreening(accessToken, customerId, scope) {
    const data = await this.postAPICall(
      `customers/${customerId}/screenings`,
      accessToken,
      scope
    );
    return data;
  }

  async getAllScreenings(accessToken, customerId) {
    const data = await this.getAPICall(
      `customers/${customerId}/screenings`,
      accessToken
    );
    return data;
  }

  async searchAllScreenings(accessToken) {
    const data = await this.getAPICall(`search/screenings`, accessToken);
    return data;
  }
}

module.exports = ScreeningResource;
