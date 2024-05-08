const AssociationResource = require("./resources/Associations");
const CustomerResource = require("./resources/Customers");
const DocumentVerificationResource = require("./resources/DocumentVerifications");
const DocumentResource = require("./resources/Documents");
const FileResource = require("./resources/Files");
const IdentityVerificationResource = require("./resources/IdentityVerifications");
const MatchResource = require("./resources/Matches");
const NoteResource = require("./resources/Notes");
const ODDResource = require("./resources/OngoingDueDiligence");
const ReportResource = require("./resources/Reports");
const RiskProfileResource = require("./resources/Riskprofile");
const ScreeningResource = require("./resources/Screenings");

class ClearDil {
  #customerResource;
  #riskProfileResource;
  #screeningResource;
  #matchResource;
  #associationResource;
  #documentVerificationResource;
  #reportResource;
  #fileResource;
  #noteResource;
  #oddResource;
  #documentResource;
  #identityVerificationResource;
  constructor(clientId, clientSecret) {
    if (!clientId || !clientSecret) {
      throw new Error("Client id and secret cannot be null");
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseURL = "https://dev.cleardil.com/v1/";
    this.tokenData = {};
    this.#customerResource = new CustomerResource(this.baseURL);
    this.#riskProfileResource = new RiskProfileResource(this.baseURL);
    this.#screeningResource = new ScreeningResource(this.baseURL);
    this.#matchResource = new MatchResource(this.baseURL);
    this.#associationResource = new AssociationResource(this.baseURL);
    this.#documentVerificationResource = new DocumentVerificationResource(
      this.baseURL
    );
    this.#reportResource = new ReportResource(this.baseURL);
    this.#fileResource = new FileResource(this.baseURL);
    this.#noteResource = new NoteResource(this.baseURL);
    this.#oddResource = new ODDResource(this.baseURL);
    this.#documentResource = new DocumentResource(this.baseURL);
    this.#identityVerificationResource = new IdentityVerificationResource(
      this.baseURL
    );
  }

  async #generateAccessToken() {
    const response = await fetch(new URL("oauth2/token", this.baseURL).href, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(this.clientId + ":" + this.clientSecret)}`,
      },
      body: "",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to generate access token: ${response.statusText}`
      );
    }

    const data = await response.json();
    this.tokenData = {
      ...data,
      tokenExpiresAt: Date.now() + data.expires_in * 1000,
    };
  }

  async #ensureAccessToken() {
    // Check if access token exists or is it expired.
    if (
      !this.tokenData.access_token ||
      Date.now() >= this.tokenData.tokenExpiresAt
    ) {
      // refresh token logic will come here. This is just for showcasing the logic.
      // refreshAccessToken method will be created later on and called here.
      // await this.refreshAccessToken() will be used instead of this.generateAccessToken();

      await this.#generateAccessToken();
    }
  }

  async withAccessToken(fn, binding, ...args) {
    await this.#ensureAccessToken();
    return fn.apply(binding, [this.tokenData.access_token, ...args]);
  }

  // Customers resource
  customer = {
    createCustomer: (customerData) =>
      this.withAccessToken(
        this.#customerResource.createCustomer,
        this.#customerResource,
        customerData
      ),
    getCustomer: (customerId) =>
      this.withAccessToken(
        this.#customerResource.getCustomer,
        this.#customerResource,
        customerId
      ),
    updateCustomer: (customerId, customerData) =>
      this.withAccessToken(
        this.#customerResource.updateCustomer,
        this.#customerResource,
        customerId,
        customerData
      ),
    partiallyUpdateCustomer: (customerId, customerPatchData) =>
      this.withAccessToken(
        this.#customerResource.partiallyUpdateCustomer,
        this.#customerResource,
        customerId,
        customerPatchData
      ),
    deleteCustomer: (customerId) =>
      this.withAccessToken(
        this.#customerResource.deleteCustomer,
        this.#customerResource,
        customerId
      ),
    getAllCustomers: () =>
      this.withAccessToken(
        this.#customerResource.getAllCustomers,
        this.#customerResource
      ),
  };

  // Risk profile resource
  riskProfile = {
    getRiskProfile: (customerId) =>
      this.withAccessToken(
        this.#riskProfileResource.getRiskProfile,
        this.#riskProfileResource,
        customerId
      ),
  };

  // Screenings resource
  screenings = {
    getScreening: (customerId, screeningId) =>
      this.withAccessToken(
        this.#screeningResource.getScreening,
        this.#screeningResource,
        customerId,
        screeningId
      ),
    createScreening: (customerId, scope) =>
      this.withAccessToken(
        this.#screeningResource.createScreening,
        this.#screeningResource,
        customerId,
        scope
      ),
    getAllScreenings: (customerId) =>
      this.withAccessToken(
        this.#screeningResource.getAllScreenings,
        this.#screeningResource,
        customerId
      ),
    searchAllScreeningsL: () =>
      this.withAccessToken(
        this.#screeningResource.searchAllScreenings,
        this.#screeningResource
      ),
  };

  // Matches resource
  matches = {
    getMatch: (customerId, screeningId, matchId) =>
      this.withAccessToken(
        this.#matchResource.getMatch,
        this.#matchResource,
        customerId,
        screeningId,
        matchId
      ),
    getAllMatches: (customerId, screeningId) =>
      this.withAccessToken(
        this.#matchResource.getAllMatches,
        this.#matchResource,
        customerId,
        screeningId
      ),
    confirmMatch: (customerId, screeningId, matchId) =>
      this.withAccessToken(
        this.#matchResource.confirmMatch,
        this.#matchResource,
        customerId,
        screeningId,
        matchId
      ),
    dismissMatch: (customerId, screeningId, matchId) =>
      this.withAccessToken(
        this.#matchResource.dismissMatch,
        this.#matchResource,
        customerId,
        screeningId,
        matchId
      ),
    confirmMultipleMatches: (customerId, screeningId, matchIds) =>
      this.withAccessToken(
        this.#matchResource.confirmMultipleMatches,
        this.#matchResource,
        customerId,
        screeningId,
        matchIds
      ),
    dismissMultipleMatches: (customerId, screeningId, matchIds) =>
      this.withAccessToken(
        this.#matchResource.dismissMultipleMatches,
        this.#matchResource,
        customerId,
        screeningId,
        matchIds
      ),
  };

  // Associations resource
  associations = {
    getAssociation: (customerId, screeningId, matchId, associationId) =>
      this.withAccessToken(
        this.#associationResource.getAssociation,
        this.#associationResource,
        customerId,
        screeningId,
        matchId,
        associationId
      ),
    getAllAssociations: (customerId, screeningId, matchId) =>
      this.withAccessToken(
        this.#associationResource.getAllAssociations,
        this.#associationResource,
        customerId,
        screeningId,
        matchId
      ),
  };

  // Document Verifications resource
  documentVerifications = {
    getDocumentVerification: (customerId, verificationId) =>
      this.withAccessToken(
        this.#documentVerificationResource.getDocumentVerification,
        this.#documentVerificationResource,
        customerId,
        verificationId
      ),
    createDocumentVerification: (customerId, type, documentId) =>
      this.withAccessToken(
        this.#documentVerificationResource.createDocumentVerification,
        this.#documentVerificationResource,
        customerId,
        type,
        documentId
      ),
    getAllDocumentVerifications: (customerId) =>
      this.withAccessToken(
        this.#documentVerificationResource.getAllDocumentVerifications,
        this.#documentVerificationResource,
        customerId
      ),
    searchAllDocumentVerifications: () =>
      this.withAccessToken(
        this.#documentVerificationResource.searchAllDocumentVerifications,
        this.#documentVerificationResource
      ),
  };

  // Reports resource
  reports = {
    getReport: (reportId) =>
      this.withAccessToken(
        this.#reportResource.getReport,
        this.#reportResource,
        reportId
      ),
    downloadReport: (reportId, extension) =>
      this.withAccessToken(
        this.#reportResource.downloadReport,
        this.#reportResource,
        reportId,
        extension
      ),
    listAllReports: () =>
      this.withAccessToken(
        this.#reportResource.listAllReports,
        this.#reportResource
      ),
  };

  // Files resource
  files = {
    getFile: (fileId) =>
      this.withAccessToken(
        this.#fileResource.getFile,
        this.#fileResource,
        fileId
      ),
    downloadFile: (fileId, output) =>
      this.withAccessToken(
        this.#fileResource.downloadFile,
        this.#fileResource,
        fileId,
        output
      ),
    updateFile: (fileId, fileName, fileSize, contentType, content) =>
      this.withAccessToken(
        this.#fileResource.updateFile,
        this.#fileResource,
        fileId,
        fileName,
        fileSize,
        contentType,
        content
      ),
    partiallyUpdateFile: (fileId, filePatchData) =>
      this.withAccessToken(
        this.#fileResource.partiallyUpdateFile,
        this.#fileResource,
        fileId,
        filePatchData
      ),
    deleteFile: (fileId) =>
      this.withAccessToken(
        this.#fileResource.deleteFile,
        this.#fileResource,
        fileId
      ),
    listAllFiles: () =>
      this.withAccessToken(this.#fileResource.listAllFiles, this.#fileResource),
  };

  //Notes resource
  notes = {
    getNote: (customerId, noteId) =>
      this.withAccessToken(
        this.#noteResource.getNote,
        this.#noteResource,
        customerId,
        noteId
      ),
    createNote: (customerId, text) =>
      this.withAccessToken(
        this.#noteResource.createNote,
        this.#noteResource,
        customerId,
        text
      ),
    updateNote: (customerId, noteId, text) =>
      this.withAccessToken(
        this.#noteResource.updateNote,
        this.#noteResource,
        customerId,
        noteId,
        text
      ),
    deleteNote: (customerId, noteId) =>
      this.withAccessToken(
        this.#noteResource.deleteNote,
        this.#noteResource,
        customerId,
        noteId
      ),
    listAllNotes: (customerId) =>
      this.withAccessToken(
        this.#noteResource.listAllNotes,
        this.#noteResource,
        customerId
      ),
  };

  // ODD resource
  odd = {
    getODD: (customerId, oddId) =>
      this.withAccessToken(
        this.#oddResource.getODD,
        this.#oddResource,
        customerId,
        oddId
      ),
    createODD: (customerId, scope, frequency, active = null) =>
      this.withAccessToken(
        this.#oddResource.createODD,
        this.#oddResource,
        customerId,
        scope,
        frequency,
        active
      ),
    getODDResult: (customerId, oddId) =>
      this.withAccessToken(
        this.#oddResource.getODDResult,
        this.#oddResource,
        customerId,
        oddId
      ),
    updateODD: (customerId, oddId, scope, frequency, active) =>
      this.withAccessToken(
        this.#oddResource.updateODD,
        this.#oddResource,
        customerId,
        oddId,
        scope,
        frequency,
        active
      ),
    partiallyUpdateODD: (customerId, oddId, scope, frequency, active) =>
      this.withAccessToken(
        this.#oddResource.partiallyUpdateODD,
        this.#oddResource,
        customerId,
        oddId,
        scope,
        frequency,
        active
      ),
    deleteODD: (customerId, oddId) =>
      this.withAccessToken(
        this.#oddResource.deleteODD,
        this.#oddResource,
        customerId,
        oddId
      ),
    listAllODD: (customerId) =>
      this.withAccessToken(
        this.#oddResource.listAllODD,
        this.#oddResource,
        customerId
      ),
  };

  //Documents resource
  documents = {
    getDocument: (customerId, documentId) =>
      this.withAccessToken(
        this.#documentResource.getDocument,
        this.#documentResource,
        customerId,
        documentId
      ),
    createDocument: (customerId, documentDataObject) =>
      this.withAccessToken(
        this.#documentResource.createDocument,
        this.#documentResource,
        customerId,
        documentDataObject
      ),
    downloadDocument: (customerId, documentId, side = null) =>
      this.withAccessToken(
        this.#documentResource.downloadDocument,
        this.#documentResource,
        customerId,
        documentId,
        side
      ),
    updateDocument: (customerId, documentId, documentDataObject) =>
      this.withAccessToken(
        this.#documentResource.updateDocument,
        this.#documentResource,
        customerId,
        documentId,
        documentDataObject
      ),
    partiallyUpdateDocument: (customerId, documentId, patchDocumentData) =>
      this.withAccessToken(
        this.#documentResource.partiallyUpdateDocument,
        this.#documentResource,
        customerId,
        documentId,
        patchDocumentData
      ),
    listAllDocuments: (customerId) =>
      this.withAccessToken(
        this.#documentResource.listAllDocuments,
        this.#documentResource,
        customerId
      ),
  };

  // Identity Verifications resource
  identityVerifications = {
    getIdentityVerification: (customerId, identificationId) =>
      this.withAccessToken(
        this.#identityVerificationResource.getIdentityVerification,
        this.#identityVerificationResource,
        customerId,
        identificationId
      ),
    createIdentityVerification: (customerId, documentId, selfieImage) =>
      this.withAccessToken(
        this.#identityVerificationResource.createIdentityVerification,
        this.#identityVerificationResource,
        customerId,
        documentId,
        selfieImage
      ),
    listAllIdentityVerifications: (customerId) =>
      this.withAccessToken(
        this.#identityVerificationResource.listAllIdentityVerifications,
        this.#identityVerificationResource,
        customerId
      ),
    searchAllIdentityVerifications: () =>
      this.withAccessToken(
        this.#identityVerificationResource.searchAllIdentityVerifications,
        this.#identityVerificationResource
      ),
  };
}

module.exports = ClearDil;
