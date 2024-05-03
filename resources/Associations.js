const APIUtil = require("../utils/requests");

// Customer resource class
class AssociationResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }

  async getAssociation(
    accessToken,
    customerId,
    screeningId,
    matchId,
    associationId
  ) {
    const data = await this.getAPICall(
      `customers/${customerId}/screenings/${screeningId}/matches/${matchId}/associations/${associationId}`,
      accessToken
    );
    return data;
  }

  async getAllAssociations(accessToken, customerId, screeningId, matchId) {
    const data = await this.getAPICall(
      `customers/${customerId}/screenings/${screeningId}/matches/${matchId}/associations`,
      accessToken
    );
    return data;
  }
}

module.exports = AssociationResource;
