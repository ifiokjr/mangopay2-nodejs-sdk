import MangoPay from "mangopay2-nodejs-sdk";

// $ExpectError
const invalidConfig: MangoPay.Config = {};

/* General Types */

const validConfig: MangoPay.Config = {
  clientId: "your_client_id",
  clientApiKey: "your_client_api_key",
  baseUrl: "https://api.mangopay.com"
};

// $ExpectType MangoPay
const api = new MangoPay(validConfig);

/* Users */

const legalUser = new MangoPay.models.UserLegal({
  Name: "MangoPay",
  Email: "info@mangopay.com",
  LegalPersonType: "BUSINESS",
  LegalRepresentativeFirstName: "Mango",
  LegalRepresentativeLastName: "Pay",
  LegalRepresentativeEmail: "mango@mangopay.com",
  HeadquartersAddress: new MangoPay.models.Address({
    AddressLine1: "4101 Reservoir Rd NW",
    AddressLine2: "",
    City: "Washington",
    Region: "District of Columbia",
    PostalCode: "20007",
    Country: "US"
  }),
  LegalRepresentativeBirthday: 1300186358,
  LegalRepresentativeNationality: "FR",
  LegalRepresentativeCountryOfResidence: "FR",
  Tag: "custom tag"
});

api.Users.create(legalUser).then(data => {
  const d = data; // $ExpectType UserLegalData
  const value = data.PersonType; // $ExpectType "LEGAL"

  console.log(`${legalUser.Name} user created at ${legalUser.CreationDate}`);
});

api.Users.create(legalUser, { readResponseHeaders: true }).then(data => {
  const d = data; // $ExpectType WithResponse<UserLegalData>
  const value = data.body; // $ExpectType UserLegalData
});

api.Users.create(legalUser, { headers: {} }).then(data => {
  const d = data; // $ExpectType UserLegalData
});

const naturalUser = new MangoPay.models.UserNatural({
  Email: "info@mangopay.com",
  Birthday: 1300186358,
  FirstName: "Sara",
  LastName: "McNick",
  CountryOfResidence: "GB",
  Nationality: "US"
});

api.Users.create(naturalUser, {}).then(data => {
  const d = data; // $ExpectType UserNaturalData
  const value = data.PersonType; // $ExpectType "NATURAL"
  return;
});

api.Users.create(
  {
    PersonType: "NATURAL",
    Email: "info@mangopay.com",
    Birthday: 1300186358,
    FirstName: "Sara",
    LastName: "McNick",
    CountryOfResidence: "GB",
    Nationality: "US"
  },
  data => {
    const d = data; // $ExpectType UserNaturalData
    console.log("create", data);
  }
);

api.Users.get("1234").then(data => {
  const d = data; // $ExpectType UserLegalData | UserNaturalData
  if (data.PersonType === "LEGAL") {
    const legalData = data; // $ExpectType UserLegalData
  } else {
    const naturalData = data; // $ExpectType UserNaturalData
  }
});

api.Users.getAll().then(users => {
  users.forEach(user => {
    const d = user; // $ExpectType UserLegalData | UserNaturalData
    if (user.PersonType === "LEGAL") {
      const legalData = user; // $ExpectType UserLegalData
    } else {
      const naturalData = user; // $ExpectType UserNaturalData
    }
  });
});

api.Users.update({
  Id: "1234",
  PersonType: "NATURAL",
  Email: "info@mangopay.com",
  Birthday: 1300186358,
  FirstName: "Sara",
  LastName: "McNick",
  CountryOfResidence: "GB",
  Nationality: "US"
}).then(data => {
  const d = data; // $ExpectType UserNaturalData
});

api.Users.createBankAccount("user-id", {
  Type: "GB",
  AccountNumber: "12345678",
  SortCode: "123456",
  OwnerAddress: "",
  OwnerName: ""
}).then(data => {
  const d = data; // $ExpectType GBData
});

api.Users.getBankAccount("userId", "bankAccountId").then(data => {
  const d = data; // $ExpectType Data
});

api.Users.getBankAccounts("userId").then(data => {
  const d = data; // $ExpectType Data[]
});

api.Users.deactivateBankAccount("userId", "bankAccountId").then(data => {
  const d = data; // $ExpectType void
});

api.Users.getTransactions("userId").then(data => {
  const d = data; // $ExpectType TransactionData[]
});

api.Users.getWallets("userId").then(data => {
  const d = data; // $ExpectType WalletData[]
});

api.Users.getCards("userId").then(data => {
  const d = data; // $ExpectType CardData[]
});

api.Users.createKycDocument("userId", { Type: "ADDRESS_PROOF" }).then(data => {
  const d = data; // $ExpectType KycDocumentData
});

api.Users.getKycDocuments("userId").then(data => {
  const d = data; // $ExpectType KycDocumentData[]
});

api.Users.getKycDocument("userId", "kycDocumentId").then(data => {
  const d = data; // $ExpectType KycDocumentData
});

api.Users.updateKycDocument("userId", { Status: "VALIDATION_ASKED" }).then(
  data => {
    const d = data; // $ExpectType KycDocumentData
  }
);

api.Users.createKycPage("userId", "kycDocumentId", {
  File: "...base64data..."
}).then(data => {
  const d = data; // $ExpectType KycDocumentData
});

api.Users.createKycPageFromFile("userId", "kycDocumentId", "path/to/file").then(
  data => {
    const d = data; // $ExpectType KycDocumentData
  }
);

api.Users.getEMoney("userId").then(data => {
  const d = data; // $ExpectType EMoneyData
});

api.Users.createUboDeclaration("userId", { DeclaredUBOs: ["user1"] }).then(
  data => {
    const d = data; // $ExpectType UboDeclarationData
  }
);

api.Users.getPreAuthorizations("userId").then(data => {
  const d = data; // $ExpectType CardPreAuthorizationData[]
});

/* KycDocuments */

api.KycDocuments.getAll().then(data => {
  const d = data; // $ExpectType KycDocumentData[]
});

api.KycDocuments.get("kyc-id").then(data => {
  const d = data; // $ExpectType KycDocumentData
});

api.KycDocuments.createKycDocumentConsult("kyc-id").then(data => {
  const d = data; // TODO unsure of expected type
});

/* UboDeclarations */

api.UboDeclarations.get("ubo-id").then(data => {
  const d = data; // $ExpectType UboDeclarationData
});

api.UboDeclarations.update({
  Id: "ubo-id",
  DeclaredUBOs: ["user1", "user2"]
}).then(data => {
  const d = data; // $ExpectType UboDeclarationData
});

/* BankAccounts */

api.BankAccounts.getTransactions("account-id").then(data => {
  const d = data; // $ExpectType TransactionData[]
});

/* Wallets */

api.Wallets.create({
  Currency: "GBP",
  Description: "A description",
  Owners: ["userId"]
}).then(data => {
  const d = data; // $ExpectType WalletData
});

const wallet = new MangoPay.models.Wallet({
  Currency: "GB",
  Description: "A description",
  Owners: ["userId"]
});

api.Wallets.create(wallet).then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.update({
  Description: "A description"
}).then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.get("walletId").then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.getTransactions("walletId").then(data => {
  const d = data; // $ExpectType TransactionData[]
});

/* Cards */

api.Cards.get("card-id").then(data => {
  const d = data; // $ExpectType CardData
});
api.Cards.getByFingerprint("fingerprinthash").then(data => {
  const d = data; // $ExpectType CardData[]
});
api.Cards.update({ Active: false, Id: "card-id" }).then(data => {
  const d = data; // $ExpectType CardData
});
api.Cards.getTransactions("cardId").then(data => {
  const d = data; // $ExpectType TransactionData[]
});

/* CardRegistrations */

api.CardRegistrations.create({
  CardType: "BCMC",
  Currency: "GBP",
  UserId: "user-id"
}).then(data => {
  const d = data; // $ExpectType CardRegistrationData
});
api.CardRegistrations.get("reg-id").then(data => {
  const d = data; // $ExpectType CardRegistrationData
});
api.CardRegistrations.update({ RegistrationData: "hmmm" }).then(data => {
  const d = data; // $ExpectType CardRegistrationData
});

/* CardPreAuthorizations */

api.CardPreAuthorizations.create({
  AuthorId: "user",
  CardId: "card-id",
  DebitedFunds: { Currency: "AUD", Amount: 4000 },
  SecureModeRedirectUrl: "https://secureurl.com"
}).then(data => {
  const d = data; // $ExpectType CardPreAuthorizationData
});

api.CardPreAuthorizations.get("auth-id").then(data => {
  const d = data; // $ExpectType CardPreAuthorizationData
});

api.CardPreAuthorizations.update({
  Id: "auth-id",
  PaymentStatus: "CANCELED"
}).then(data => {
  const d = data; // $ExpectType CardPreAuthorizationData
});
