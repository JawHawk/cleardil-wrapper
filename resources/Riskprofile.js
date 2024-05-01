const APIUtil = require("../utils/requests");

// Customer resource class
class RiskProfileResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }
  async getRiskProfile(accessToken, customerId) {
    const data = await this.getAPICall(
      `customers/${customerId}/risk_profile`,
      accessToken
    );
    return data;
  }
}

module.exports = RiskProfileResource;
