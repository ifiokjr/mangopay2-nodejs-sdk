import MangoPay from "mangopay2-nodejs-sdk";

// $ExpectError
const invalidConfig: MangoPay.Config = {};

/* General Types */

const validConfig: MangoPay.Config = {
  clientId: "your_client_id",
  clientApiKey: "your_client_api_key",
  baseUrl: "https://api.mangopay.com"
};

const T = new MangoPay.Models.Address({});

const api = new MangoPay(validConfig); // $ExpectType MangoPay
const payIn: MangoPay.Models.PayIn = new api.models.PayIn({}); // $ExpectType PayIn
const address: MangoPay.Models.Address = new api.models.Address({}); // $ExpectType Address

const addressData: MangoPay.Models.Address.AddressData = {
  AddressLine1: "20 T Street",
  AddressLine2: "",
  City: "London",
  Country: "UK",
  PostalCode: "FR43 2WE",
  Region: "London"
};

/* Users */

const legalUser = new api.models.UserLegal({
  Name: "MangoPay",
  Email: "info@mangopay.com",
  LegalPersonType: "BUSINESS",
  LegalRepresentativeFirstName: "Mango",
  LegalRepresentativeLastName: "Pay",
  LegalRepresentativeEmail: "mango@mangopay.com",
  HeadquartersAddress: new api.models.Address({
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

const naturalUser = new api.models.UserNatural({
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

api.Users.getBankAccount("user-id", "bankAccount-id").then(data => {
  const d = data; // $ExpectType Data
});

api.Users.getBankAccounts("user-id").then(data => {
  const d = data; // $ExpectType Data[]
});

api.Users.deactivateBankAccount("user-id", "bankAccount-id").then(data => {
  const d = data; // $ExpectType void
});

api.Users.getTransactions("user-id").then(data => {
  const d = data; // $ExpectType TransactionData[]
});

api.Users.getWallets("user-id").then(data => {
  const d = data; // $ExpectType WalletData[]
});

api.Users.getCards("user-id").then(data => {
  const d = data; // $ExpectType CardData[]
});

api.Users.createKycDocument("user-id", { Type: "ADDRESS_PROOF" }).then(data => {
  const d = data; // $ExpectType KycDocumentData
});

api.Users.getKycDocuments("user-id").then(data => {
  const d = data; // $ExpectType KycDocumentData[]
});

api.Users.getKycDocument("user-id", "kycDocument-id").then(data => {
  const d = data; // $ExpectType KycDocumentData
});

api.Users.updateKycDocument("user-id", { Status: "VALIDATION_ASKED" }).then(
  data => {
    const d = data; // $ExpectType KycDocumentData
  }
);

api.Users.createKycPage("user-id", "kycDocument-id", {
  File: "...base64data..."
}).then(data => {
  const d = data; // $ExpectType KycDocumentData
});

api.Users.createKycPageFromFile(
  "user-id",
  "kyc-document-id",
  "path/to/file"
).then(data => {
  const d = data; // $ExpectType KycDocumentData
});

// MangoPay.

api.Users.getEMoney("user-id").then(data => {
  const d = data; // $ExpectType EMoneyData
});

api.Users.createUboDeclaration("user-id", { DeclaredUBOs: ["user1"] }).then(
  data => {
    const d = data; // $ExpectType UboDeclarationData
  }
);

api.Users.getPreAuthorizations("user-id").then(data => {
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
  Owners: ["user-id"]
}).then(data => {
  const d = data; // $ExpectType WalletData
});

const wallet = new api.models.Wallet({
  Currency: "GB",
  Description: "A description",
  Owners: ["user-id"]
});

api.Wallets.create(wallet).then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.update({
  Description: "A description"
}).then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.get("wallet-id").then(data => {
  const d = data; // $ExpectType WalletData
});

api.Wallets.getTransactions("wallet-id").then(data => {
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

api.Cards.getTransactions("card-id").then(data => {
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

/* Refunds */

api.Refunds.get("refund-id").then(data => {
  const d = data; // $ExpectType RefundData
});

/* PayIns */

api.PayIns.create({
  PaymentType: "CARD",
  ExecutionType: "DIRECT",
  AuthorId: "user-id",
  CardId: "card-id",
  CreditedWalletId: "wallet-id",
  Fees: { Amount: 100, Currency: "GBP" },
  DebitedFunds: { Amount: 2000, Currency: "GBP" },
  SecureModeReturnURL: "https://secure-return.co"
}).then(data => {
  const d = data; // $ExpectType CardDirectPayInData
});

api.PayIns.create({
  PaymentType: "CARD",
  ExecutionType: "WEB",
  AuthorId: "user-id",
  CreditedWalletId: "wallet-id",
  Fees: { Amount: 100, Currency: "GBP" },
  DebitedFunds: { Amount: 2000, Currency: "GBP" },
  ReturnURL: "https://secure-return.co",
  Culture: "AD",
  CardType: "MAESTRO"
}).then(data => {
  const d = data; // $ExpectType CardWebPayInData
});

api.PayIns.get("payin-id").then(data => {
  const d = data; // $ExpectType PayInData
});

api.PayIns.createRefund("payin-id", { AuthorId: "user-id" }).then(data => {
  const d = data; // $ExpectType RefundData
});

api.PayIns.getRefunds("payin-id").then(data => {
  const d = data; // $ExpectType RefundData[]
});

/* Clients */
api.Clients.get().then(data => {
  const d = data; // $ExpectType ClientData
});

api.Clients.update({ PlatformType: "CROWDFUNDING_DONATION" }).then(data => {
  const d = data; // $ExpectType ClientData
});

api.Clients.uploadLogo("...logobase64...").then(data => {
  const d = data; // $ExpectType ClientData
});

api.Clients.uploadLogoFromFile("path/to/file").then(data => {
  const d = data; // $ExpectType ClientData
});

api.Clients.getClientWallets().then(data => {
  const d = data; // $ExpectType ClientWalletData[]
});

api.Clients.getClientWallet("CREDIT", "GBP").then(data => {
  const d = data; // $ExpectType ClientWalletData
});

api.Clients.getClientWalletsByFundsType("FEES").then(data => {
  const d = data; // $ExpectType ClientWalletData[]
});

api.Clients.getClientWalletTransactions("CREDIT", "GBP").then(data => {
  const d = data; // $ExpectType TransactionData[]
});

/* PayOuts */

api.PayOuts.create({
  Fees: { Amount: 0, Currency: "GBP" },
  AuthorId: "user-id",
  DebitedFunds: { Amount: 2000, Currency: "GBP" },
  BankAccountId: "bank-id",
  DebitedWalletId: "wallet-id"
}).then(data => {
  const d = data; // $ExpectType PayOutData
});

api.PayOuts.get("payout-id").then(data => {
  const d = data; // $ExpectType PayOutData
});

api.PayOuts.getRefunds("payout-id").then(data => {
  const d = data; // $ExpectType RefundData[]
});

/* Transfers */

api.Transfers.create({
  Fees: { Amount: 0, Currency: "GBP" },
  AuthorId: "user-id",
  DebitedFunds: { Amount: 2000, Currency: "GBP" },
  DebitedWalletId: "debit-wallet-id",
  CreditedWalletId: "credit-wallet-id"
}).then(data => {
  const d = data; // $ExpectType TransferData
});

api.Transfers.get("transfer-id").then(data => {
  const d = data; // $ExpectType TransferData
});

api.Transfers.createRefund("transfer-id", { AuthorId: "user-id" }).then(
  data => {
    const d = data; // $ExpectType RefundData
  }
);

api.Transfers.getRefunds("transfer-id").then(data => {
  const d = data; // $ExpectType RefundData[]
});
