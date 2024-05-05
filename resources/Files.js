const APIUtil = require("../utils/requests");

// Customer resource class
class FileResource extends APIUtil {
  constructor(baseURL) {
    super(baseURL);
  }
  async getFile(accessToken, fileId) {
    const data = await this.getAPICall(`files/${fileId}`, accessToken);
    return data;
  }

  async downloadFile(accessToken, fileId, output) {
    const data = await this.getAPICall(
      `files/${fileId}?output=${output}`,
      accessToken
    );
    return data;
  }

  async updateFile(
    accessToken,
    fileId,
    fileName,
    fileSize,
    contentType,
    content
  ) {
    const DATA = {
      content_type: contentType,
      fileName: fileName,
      size: fileSize,
      content: content,
    };
    const data = await this.putAPICall(`files/${fileId}`, accessToken, DATA);
    return data;
  }

  async partiallyUpdateFile(accessToken, fileId, filePatchData) {
    const data = await this.patchAPICall(
      `files/${fileId}`,
      accessToken,
      filePatchData
    );
    return data;
  }

  async deleteFile(accessToken, fileId) {
    const data = await this.deleteAPICall(`files/${fileId}`, accessToken);
    return data;
  }

  async listAllFiles(accessToken) {
    const data = await this.getAPICall("files", accessToken);
    return data;
  }
}

module.exports = FileResource;
