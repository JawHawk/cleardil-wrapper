const APIUtil = require("../utils/requests");

// Customer resource class
class ReportResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }
  async getReport(accessToken, reportId) {
    const data = await this.getAPICall(`reports/${reportId}`, accessToken);
    return data;
  }

  async downloadReport(accessToken, reportId, extension) {
    const data = await this.getAPICall(
      `reports/${reportId}/${extension}/download`,
      accessToken
    );
    return data;
  }

  async listAllReports(accessToken) {
    const data = await this.getAPICall(`reports`, accessToken);
    return data;
  }
}

module.exports = ReportResource;
