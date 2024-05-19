# ClearDil Wrapper

The ClearDil wrapper is a easy to use and async ready API wrapper. It consists of following resources :

1. Customers
2. Risk Profile
3. Documents
4. Screenings
5. Matches
6. Associations
7. Ongoing Due Diligence
8. Document Verifications
9. Identity Verifications
10. Reports
11. Files
12. Notes

### Working

Create a ClearDil client instance with ClearDil client id and client secret obtained from dashboard.

```js
const clearDilClient = new ClearDil(clientId, clientSecret);
```

Use the client to call the corresponding methods of a resource asynchronously. The general syntax of calling an endpoint is

```js
clearDilClient.resourceName.resourceMethod(*requiredParameters)
```

For example,

```js
const clearDilClient = new ClearDil(clientId, clientSecret);

let customerData = await clearDilClient.customer.getCustomer(
  req.params.customerId
);
```

Following are the methods corresponding to each ClearDil resource name.

**Note: Arguments prefixed with asterisk are optional arguments.**

### 1. _customers_

- #### createCustomer( `customerData` )

```json
// Sample customer data
{
  "type": "INDIVIDUAL",
  "email": "john.doe@example.com",
  "title": "MR",
  "first_name": "John",
  "middle_name": "A.",
  "last_name": "Doe",
  "dob": "1980-01-01",
  "gender": "MALE",
  "addresses": [
    {
      "type": "PRIMARY",
      "property_name": "Custom House",
      "line": "Main Street",
      "extra_line": "City Square",
      "city": "Aldgate",
      "state_or_province": "London",
      "postal_code": "E99 0ZZ",
      "country": "GBR",
      "from_date": "2010-01-01"
    }
  ]
}
```

- #### getCustomer( `customerId` )

- #### updateCustomer( `customer`, `customerData` )

- #### partiallyUpdateCustomer( `customerId`, `customerPatchData` )

```json
// Sample customer patch data
[
  {
    "op": "replace",
    "path": "/first_name",
    "value": "Eric"
  },
  {
    "op": "replace",
    "path": "/last_name",
    "value": "Jones"
  },
  {
    "op": "replace",
    "path": "/addresses/0/to_date",
    "value": "2015-01-01"
  }
]
```

- #### deleteCustomer( `customerId` )

- #### getAllCustomers( )

### 2. _riskProfile_

- #### getRiskProfile( `customerId` )

### 3. _screenings_

- #### getScreening( `customerId`, `screeningId` )

- #### createScreening( `customerId`, `scope` )

```json
// Sample scope
["PEP", "WATCHLIST", "DISQUALIFIED_ENTITIES"]
```

- #### getAllScreenings( `customerId` )

- #### searchAllScreenings( )

### 4. _matches_

- #### getMatch( `customerId`, `screeningId`, `matchId` )

- #### getAllMatches( `customerId`, `screeningId` )

- #### confirmMatch( `customerId`, `screeningId`, `matchId` )

- #### dismissMatch( `customerId`, `screeningId`, `matchId` )

- #### confirmMultipleMatches( `customerId`, `screeningId`, `matchIds` )

- #### dismissMultipleMatches( `customerId`, `screeningId`, `matchIds` )

### 5. _associations_

- #### getAssociation( `customerId`, `screeningId`, `matchId`, `associationId` )

- #### getAllAssociations( `customerId`, `screeningId`, `matchId` )

### 6. _documentVerifications_

- #### getDocumentVerification( `customerId`, `verificationId` )

- #### createDocumentVerification( `customerId`, `type`, `documentId` )

  Valid values for type are: `IMAGE`, `MRZ`

- #### getAllDocumentVerifications( `customerId` )

- #### searchAllDocumentVerifications( )

### 7. _reports_

- #### getReport( `reportId` )

- #### downloadReport( `reportId`, `extension` )

- #### listAllReports( )

### 8. _files_

- #### getFile( `fileId` )

- #### downloadFile( `fileId`, `output` )

- #### updateFile( `fileId`, `fileName`, `fileSize`, `contentType`, `content` )

- #### partiallyUpdateFile( `fileId`, `filePatchData` )

- #### deleteFile( `fileId` )

- #### listAllFiles( )

### 9. _notes_

- #### getNote( `customerId`, `noteId` )

- #### createNote( `customerId`, `text` )

- #### updateNote( `customerId`, `noteId`, `text` )

- #### deleteNote( `customerId`, `noteId` )

- #### listAllNotes( `customerId` )

### 10. _odd_

- #### getODD( `customerId`, `oddId` )

- #### createODD( `customerId`, `scope`, `frequency`, `active` )

- #### getODDResult( `customerId`, `oddId` )

- #### updateODD( `customerId`, `oddId`, `scope`, `frequency`, `*active` )

- #### partiallyUpdateODD( `customerId`, `oddId`, `scope`, `frequency`, `*active` )

- #### deleteODD( `customerId`, `oddId` )

- #### listAllODD( `customerId` )

### 11. _documents_

- #### getDocument( `customerId`, `documentId` )

- #### createDocument( `customerId`, `documentDataObject` )

- #### downloadDocument( `customerId`, `documentId`, `*side` )

- #### updateDocument( `customerId`, `documentId`, `documentDataObject` )

- #### partiallyUpdateDocument( `customerId`, `documentId`, `patchDocumentData` )

- #### listAllDocuments( `customerId` )

### 12. identityVerifications

- #### getIdentityVerification( `customerId`, `identificationId` )

- #### createIdentityVerification( `customerId`, `documentId`, `selfieImage` )

- #### listAllIdentityVerifications( `customerId` )

- #### searchAllIdentityVerifications( )
