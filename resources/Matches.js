const APIUtil = require("../utils/requests");

// Customer resource class
class MatchResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }
  async getMatch(accessToken, customerId, screeningId, matchId) {
    const data = await this.getAPICall(
      `customers/${customerId}/screenings/${screeningId}/matches/${matchId}`,
      accessToken
    );
    return data;
  }

  async getAllMatches(accessToken, customerId, screeningId) {
    const data = await this.getAPICall(
      `customers/${customerId}/screenings/${screeningId}/matches`,
      accessToken
    );
    return data;
  }

  async confirmMatch(accessToken, customerId, screeningId, matchId) {
    const data = await this.postAPICall(
      `customers/${customerId}/screenings/${screeningId}/matches/${matchId}/confirm`,
      accessToken
    );
    return data;
  }

  async dismissMatch(accessToken, customerId, screeningId, matchId) {
    const data = await this.postAPICall(
      `customers/${customerId}/screenings/${screeningId}/matches/${matchId}/dismiss`,
      accessToken
    );
    return data;
  }

  async confirmMultipleMatches(accessToken, customerId, screeningId, matchIds) {
    const data = await this.postAPICall(
      `customers/${customerId}/screenings/${screeningId}/matches/confirm`,
      accessToken,
      matchIds
    );
    return data;
  }

  async dismissMultipleMatches(accessToken, customerId, screeningId, matchIds) {
    const data = await this.postAPICall(
      `customers/${customerId}/screenings/${screeningId}/matches/dismiss`,
      accessToken,
      matchIds
    );
    return data;
  }
}

module.exports = MatchResource;
