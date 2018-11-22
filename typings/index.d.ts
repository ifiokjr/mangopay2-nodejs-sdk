// TypeScript Version: 3.0

/// <reference types="node" />

import {
  ApiMethod,
  CountryISO,
  CurrencyISO,
  MakeKeysNullable,
  MakeKeysOptional,
  MakeKeysRequired,
  Omit,
  DeepPartial,
  OmitType
} from "./types";

export = MangoPay;

declare class MangoPay {
  constructor(config: MangoPay.Config);
  config: MangoPay.Config;
  requestOptions: MangoPay.RequestOptions;
  Users: MangoPay.Users;
  BankAccounts: MangoPay.BankAccounts;
  Wallets: MangoPay.Wallets;
  KycDocuments: MangoPay.KycDocuments;
  UboDeclarations: MangoPay.UboDeclarations;
  Cards: MangoPay.Cards;
  CardRegistrations: MangoPay.CardRegistrations;
  CardPreAuthorizations: MangoPay.CardPreAuthorizations;

  Log(...args: any[]): void;
  authorize(callback: (data: MangoPay.AuthorizationData) => void): void;
  authorize(): Promise<MangoPay.AuthorizationData>;
  buildRequestData(entity: any): any;
  canReadSubRequestData(entity: any, propertyName: any): boolean;
  isExpired(): boolean;
  method(
    method: ApiMethod,
    callback: (...args: any[]) => void,
    options: RequestOptions
  ): any;
}

declare namespace MangoPay {
  interface AuthorizationData {
    access_token: string;
    token_type: string;
    expires_in: number;
  }

  interface Headers {
    "Content-Type": string;
    "User-Agent": string;
    "Idempotency-Key": string;
    Authorization: string;
    [header: string]: string | undefined;
  }

  /** A UTC timestamp in seconds */
  type Timestamp = number;
  type ColumnAndDirection = "ASC" | "DESC";
  type AVSResult =
    | "NO_CHECK"
    | "NO_MATCH"
    | "ADDRESS_MATCH_ONLY"
    | "POSTAL_CODE_MATCH_ONLY"
    | "FULL_MATCH";
  type SecureMode = "DEFAULT" | "FORCE";
  type PreAuthorizationExecutionType = "DIRECT";
  type PaymentStatus = "WAITING" | "CANCELED" | "EXPIRED" | "VALIDATED";
  type PreAuthorizationStatus = "CREATED" | "SUCCEEDED" | "FAILED";

  interface SecurityInfo {
    AVSResult: AVSResult;
  }

  interface Money {
    /**
     * The currency - should be ISO_4217 format
     */
    Currency: CurrencyISO;

    /**
     * An amount of money in the smallest sub-division of the currency, e.g. 12.60 EUR would be represented as 1260 whereas 12 JPY would be represented as just 12)
     */
    Amount: number;
  }

  interface WithResponse<T> {
    statusCode: number;
    body: T;
    headers: Headers;
  }

  interface NoArgMethodOverload<R> {
    (options: MethodOptionWithResponse): Promise<WithResponse<R>>;
    (options?: MethodOptionWithoutResponse): Promise<R>;
    (
      callback: (data: WithResponse<R>) => void,
      options?: MethodOptionWithResponse
    ): void;
    (callback: (data: R) => void, options?: MethodOptionWithoutResponse): void;
  }

  interface MethodOverload<T, R> {
    (data: T, options: MethodOptionWithResponse): Promise<WithResponse<R>>;
    (data: T, options?: MethodOptionWithoutResponse): Promise<R>;
    (
      data: T,
      callback: (data: WithResponse<R>) => void,
      options: MethodOptionWithResponse
    ): void;
    (
      data: T,
      callback: (data: R) => void,
      options?: MethodOptionWithoutResponse
    ): void;
  }

  interface TwoArgsMethodOverload<T, U, R> {
    (data: T, extra: U, options: MethodOptionWithResponse): Promise<
      WithResponse<R>
    >;
    (data: T, extra: U, options?: MethodOptionWithoutResponse): Promise<R>;
    (
      data: T,
      extra: U,
      callback: (data: WithResponse<R>) => void,
      options?: MethodOptionWithResponse
    ): void;
    (
      data: T,
      extra: U,
      callback: (data: R) => void,
      options?: MethodOptionWithoutResponse
    ): void;
  }

  interface ThreeArgsMethodOverload<T, U, V, R> {
    (data: T, extra: U, lastArg: V, options: MethodOptionWithResponse): Promise<
      WithResponse<R>
    >;
    (
      data: T,
      extra: U,
      lastArg: V,
      options?: MethodOptionWithoutResponse
    ): Promise<R>;
    (
      data: T,
      extra: U,
      lastArg: V,
      callback: (data: WithResponse<R>) => void,
      options?: MethodOptionWithResponse
    ): void;
    (
      data: T,
      extra: U,
      lastArg: V,
      callback: (data: R) => void,
      options?: MethodOptionWithoutResponse
    ): void;
  }

  interface Config {
    /**
     * API Client Id
     */
    clientId: string;

    /**
     * API Client Api Key
     */
    clientApiKey: string;

    /**
     * API Base URL.The fault base value points to sandbox.
     * Production is 'https://api.mangopay.com'
     *
     * @default "https://api.sandbox.mangopay.com"
     */
    baseUrl?: string;

    /**
     * Active debugging
     * @default false
     */
    debugMode?: boolean;

    /**
     * Log function to be used for debug
     * @default `console.log`
     */
    logClass?(...args: any[]): void;

    /**
     * Set the connection timeout limit(in milliseconds)
     * @default 30000
     */
    connectionTimeout?: number;

    /**
     * Set the response timeout limit(in milliseconds)
     * @default 80000
     */
    responseTimeout?: number;

    /**
     * API Version
     * @default 'v2.01'
     */
    apiVersion?: string;

    /**
     * Set a custom error handler
     * @default `console.error`
     */
    errorHandler?(options: any, err: any): void;
  }

  interface RequestOptions {
    requestConfig: {
      timeout: number;
    };
    responseConfig: {
      timeout: number;
    };

    /**
     * Path options are replacing the ${placeholders} from apiMethods
     */
    path: {
      clientId: string;
      apiVersion: string;
      readonly id: string;
    };
    headers: Headers;
  }

  type WithToJson<T extends object> = T & { toJSON(): any };

  // Determines the shape of the response
  interface ReadResponseHeaders {
    readResponseHeaders: true;
  }

  interface PaginationOptions {
    /**
     * The page number of results you wish to return
     * @default 1
     */
    Page?: int;

    /**
     * The number of results to return per page: Max 100;
     * @default 10
     */
    Per_Page?: int;
  }

  interface FilterOptions {
    /**
     * The column to sort against and direction - only CreationDate (or Date for the events) is available and ASC or DESC for the direction
     */
    Sort?: ColumnAndDirection;

    /**
     * To return only resources that have CreationDate BEFORE this date
     */
    BeforeDate?: Timestamp;

    /**
     * To return only resources that have CreationDate AFTER this date
     */
    AfterDate?: Timestamp;

    [key: string]: string | number | boolean;
  }

  // type FilterOptions<T extends {}> = BaseFilterOptions &
  //   { [P in T]?: T[P] extends string ? T[P] : never };

  interface MethodOptions extends DeepPartial<RequestOptions> {
    data?: WithToJson<object> | string;
    parameters?: FilterOptions & PaginationOptions;
  }

  interface MethodOptionWithResponse extends MethodOptions {
    readResponseHeaders: true;
  }

  interface MethodOptionWithoutResponse extends MethodOptions {
    readResponseHeaders?: false;
  }

  interface DependsObject {
    dependsPropertyName: string;
    propertyName: string;
    propertyValueMapping: Record<string, Model>;
  }

  interface ModelMethods<T extends {}> {
    new (data: T): this;
    initialize(): void;

    /**
     * Returns object property value
     * @param attribute   - Property value to return
     * @returns {*}
     */
    getData<K extends keyof T>(attribute: K): T[K];

    /**
     * @param attribute   - attribute's value to be set or hash of properties with values
     * @param value       - value to be set
     */
    setData<K extends keyof T>(attribute: K, value: T[K]): this;
    setData(attribute: Partial<T>): this;

    getReadOnlyProperties(): Array<keyof T>;
    getDependsObjects(): DependsObject[];
    parse(): void;
  }

  interface Model<T extends {}> extends ModelMethods<T> {}

  namespace models {
    namespace EntityBase {
      interface EntityBaseData {
        Id: string;
        Tag: string;
        CreationDate: number;
      }
    }
    class EntityBase<T extends EntityBase.EntityBaseData> extends Model<T> {
      initialize(): void;

      /**
       * Returns object property value
       * @param attribute   - Property value to return
       * @returns {*}
       */
      getData<K extends keyof T>(attribute: K): T[K];

      /**
       * @param attribute   - attribute's value to be set or hash of properties with values
       * @param value       - value to be set
       */
      setData<K extends keyof T>(attribute: K, value: T[K]): this;
      setData(attribute: Partial<T>): this;

      getReadOnlyProperties(): Array<keyof T>;
      getDependsObjects(): DependsObject[];
      parse(): void;
      toJSON(): any;
    }
    namespace Address {
      interface AddressData {
        AddressLine1: string;
        AddressLine2: string;
        City: string;
        Region: string;
        PostalCode: string;
        Country: string;
      }
    }

    class Address extends EntityBase<Address.AddressData> {
      constructor(data: Partial<Address.AddressData>);
    }

    namespace BankAccount {
      type BankAccountType = "IBAN" | "GB" | "US" | "CA" | "OTHER";
      type DepositAccountType = "CHECKING" | "SAVINGS";

      interface BaseData extends EntityBase.EntityBaseData {
        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The type of bank account
         */
        Type: BankAccountType;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;

        /**
         * @deprecated
         */
        Details?: BankAccountDetails;

        /**
         * Whether the bank account is active or not
         */
        Active: boolean;
      }

      interface IBANDetails {
        Type: "IBAN";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: Address;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The IBAN of the bank account
         */
        IBAN: string;

        /**
         * The BIC of the bank account
         */
        BIC?: string;
      }
      interface IBANData extends BaseData, IBANDetails {}

      interface USDetails {
        Type: "US";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The account number of the bank account. US account numbers must be digits only.
         */
        AccountNumber: string;

        /**
         * The ABA of the bank account. Must be numbers only, and 9 digits long
         */
        ABA: string;

        /**
         * The type of account
         */
        DepositAccountType?: DepositAccountType;
      }
      interface USData extends BaseData, USDetails {}

      interface CADetails {
        Type: "CA";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The branch code of the bank where the bank account. Must be numbers only, and 5 digits long
         */
        BranchCode: string;

        /**
         * The institution number of the bank account. Must be numbers only, and 3 or 4 digits long
         */
        InstitutionNumber: string;

        /**
         * The account number of the bank account. Must be numbers only. Canadian account numbers must be a maximum of 20 digits.
         */
        AccountNumber: string;

        /**
         * The name of the bank where the account is held. Must be letters or numbers only and maximum 50 characters long.
         */
        BankName: string;
      }
      interface CAData extends BaseData, CADetails {}

      interface GBDetails {
        Type: "GB";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The sort code of the bank account. Must be numbers only, and 6 digits long
         */
        SortCode: string;

        /**
         * The account number of the bank account. Must be numbers only. GB account numbers must be 8 digits long.
         */
        AccountNumber: string;
      }
      interface GBData extends BaseData, GBDetails {}

      interface OtherDetails {
        Type: "OTHER";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string | Address.AddressData | Address;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The Country of the Address
         */
        Country: string;

        /**
         * The BIC of the bank account
         */
        BIC: string;

        /**
         * The account number of the bank account. Must be numbers only. Canadian account numbers must be a maximum of 20 digits.
         */
        AccountNumber: string;
      }
      interface OtherData extends BaseData, OtherDetails {}

      type Data = OtherData | CAData | GBData | IBANData | USData;
      type CreationDetails =
        | OtherDetails
        | CADetails
        | GBDetails
        | IBANDetails
        | USDetails;
    }

    class BankAccount extends EntityBase<BankAccount.BaseData> {
      constructor(data: BankAccount.CreationDetails);
    }

    class BankAccountDetails {
      constructor(data: any);
    }

    class BankAccountDetailsCA extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsCA extends BankAccount.CADetails {}

    class BankAccountDetailsOther extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsOther extends BankAccount.OtherDetails {}

    class BankAccountDetailsGB extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsGB extends BankAccount.GBDetails {}

    class BankAccountDetailsIBAN extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsIBAN extends BankAccount.IBANDetails {}

    class BankAccountDetailsUS extends BankAccountDetails {
      constructor(data: any);
    }
    interface BankAccountDetailsUS extends BankAccount.USDetails {}

    class BankAccountType {
      constructor(data: any);
    }

    interface BankAccount extends BankAccount.Data {}

    namespace Transaction {
      type TransactionNature =
        | "REGULAR"
        | "REPUDIATION"
        | "REFUND"
        | "SETTLEMENT";
      type TransactionType = "PAYIN" | "TRANSFER" | "PAYOUT";
      type TransactionStatus = "CREATED" | "SUCCEEDED" | "FAILED";

      interface TransactionData extends EntityBase.EntityBaseData {
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: Money;

        /**
         * Details about the funds that are being credited (DebitedFunds – Fees = CreditedFunds)
         */
        CreditedFunds: Money;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: Money;

        /**
         * The ID of the wallet that was debited
         */
        DebitedWalletId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId: string;

        /**
         * The nature of the transaction
         */
        Nature: TransactionNature;

        /**
         * The status of the transaction
         */
        Status: TransactionStatus;

        /**
         * When the transaction happened
         */
        ExecutionDate: Timestamp;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * The type of the transaction
         */
        Type: TransactionType;
      }
    }

    class Transaction extends EntityBase<Transaction.TransactionData> {
      constructor(data: Transaction.TransactionData);
    }
    interface Transaction extends Transaction.TransactionData {}

    namespace Wallet {
      type FundsType = "DEFAULT" | "FEES" | "CREDIT";

      interface WalletData extends EntityBase.EntityBaseData {
        /**
         * An array of userIDs of who own's the wallet. For now, you only can set up a unique owner.
         */
        Owners: [string];

        /**
         * The current balance of the wallet
         */
        Balance: Money;

        /**
         * The type of funds in the wallet
         */
        FundsType: FundsType;

        /**
         * A desciption of the wallet
         */
        Description: string;

        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyISO;
      }

      type CreateWallet = UpdateWallet &
        Pick<WalletData, "Owners" | "Currency" | "Description">;
      type UpdateWallet = Partial<Pick<WalletData, "Tag" | "Description">>;
    }

    class Wallet extends EntityBase<Wallet.WalletData> {
      constructor(data: Wallet.CreateWallet | Wallet.UpdateWallet);
    }

    namespace KycDocument {
      type KycDocumentType =
        | "IDENTITY_PROOF"
        | "REGISTRATION_PROOF"
        | "ARTICLES_OF_ASSOCIATION"
        | "SHAREHOLDER_DECLARATION"
        | "ADDRESS_PROOF";
      type DocumentStatus =
        | "CREATED"
        | "VALIDATION_ASKED"
        | "VALIDATED"
        | "REFUSED";

      interface KycDocumentData extends EntityBase.EntityBaseData {
        /**
         * Gives the type of the KYC document
         */
        Type: KycDocumentType;

        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The status of this KYC/Dispute document
         */
        Status: DocumentStatus;

        /**
         * The message accompanying a refusal
         */
        RefusedReasonMessage: string;

        /**
         * The type of reason for refusal
         */
        RefusedReasonType: KYCDocRefusedReasonType;

        /**
         * The date when the document was processed by MANGOPAY
         */
        ProcessedDate: timestamp;
      }
      interface CreateKycDocument {
        /**
         * Gives the type of the KYC document
         */
        Type: KycDocumentType;
        Tag?: string;
      }
      interface SubmitKycDocument {
        /**
         * The status of this KYC/Dispute document
         */
        Status: "VALIDATION_ASKED";
        Tag?: string;
      }

      /**
       * - Documents have to be in "CREATED" Status
       * - You can create as many pages as needed
       *
       * Remember to change Status to "VALIDATION_ASKED" to submit KYC documents
       * The maximum size per page is about 7Mb (or 10Mb when base64encoded). The following formats are accepted for the documents : .pdf, .jpeg, .jpg, .gif and .png. The minimum size is 1Kb.
       */
      interface CreateKycPage {
        /**
         * The base64 encoded file which needs to be uploaded
         *
         * You need to fill in only the binary code. Do not send the first part that some converters add into the binary code which is
         * `<img src=" data:image/png;base64..." />`
         *
         * e.g.
         * ```json
         * {
         *   "File": "/9j/4AAQSkZJRgABAQEBLAEsAAD/.../wgARCAAyADIDAREAAhEBAxEB/8QAGwAAAgMBAQEA"
         * }
         * ```
         */
        File: string;
      }
    }

    class KycDocument extends EntityBase<KycDocument.KycDocumentData> {
      constructor(
        data: KycDocument.CreateKycDocument | KycDocument.UpdateKycDocument
      );
    }
    interface KycDocument extends KycDocument.KycDocumentData {}

    class KycDocumentStatus {
      constructor(data: any);
    }

    class KycDocumentType {
      constructor(data: any);
    }

    class KycPage {
      constructor(data: KycDocument.CreateKycPage);
    }

    interface KycPage extends KycDocument.CreateKycPage {}

    namespace EMoney {
      interface EMoneyData {
        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The amount of money that has been credited to this user
         */
        CreditedEMoney: Money;

        /**
         * The amount of money that has been debited from this user
         */
        DebitedEMoney: Money;
      }
    }

    class EMoney {
      constructor(data: EMoney.EMoneyData);
    }
    interface EMoney extends EMoney.EMoneyData {}

    namespace UboDeclaration {
      interface UboDeclarationData extends EntityBase.EntityBaseData {
        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * Status of a UBO Declaration
         */
        Status: KycDocument.DocumentStatus;

        /**
         * Reason types for a UBO Declaration
         */
        RefusedReasonTypes: string[];

        /**
         * Refused Reason Message for a UBO Declaration
         */
        RefusedReasonMessage: string;

        /**
         * An array of UserIDs declared as Ultimate Beneficial Owners of a BUSINESS Legal User.
         */
        DeclaredUBOs: string[];
      }

      interface CreateUboDeclaration {
        DeclaredUBOs?: string[];
      }

      interface UpdateUboDeclaration {
        Id: string;
        Tag?: string;
        Status?: "VALIDATION_ASKED";

        /**
         * An array of UserIDs declared as Ultimate Beneficial Owners of a BUSINESS Legal User.
         */
        DeclaredUBOs?: string[];
      }
    }

    class UboDeclaration extends EntityBase<UboDeclaration.UboDeclarationData> {
      constructor(
        data:
          | UboDeclaration.CreateUboDeclaration
          | UboDeclaration.UpdateUboDeclaration
      );
    }

    interface UboDeclaration extends UboDeclaration.UboDeclarationData {}

    namespace CardRegistration {
      interface CardRegistrationData extends EntityBase.EntityBaseData {
        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyISO;

        /**
         * A special key to use when registering a card
         */
        AccessKey: string;

        /**
         * A specific value to pass to the CardRegistrationURL
         */
        PreregistrationData: string;

        /**
         * The URL to submit the card details form to
         */
        CardRegistrationURL: string;

        /**
         * Having registered a card, this confirmation hash needs to be updated to the card item
         */
        RegistrationData: string;

        /**
         * The type of card
         */
        CardType: Card.CardType;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * Status of the card registration
         */
        Status: Card.CardStatus;
      }

      type CreateCardRegistration = Partial<
        Pick<CardRegistrationData, "CardType" | "Tag">
      > &
        Pick<CardRegistrationData, "UserId" | "Currency" | "CardType">;
      type UpdateCardRegistration = Partial<
        Pick<CardRegistrationData, "Tag" | "RegistrationData">
      >;
    }

    class CardRegistration extends EntityBase<
      CardRegistration.CardRegistrationData
    > {
      constructor(
        data:
          | CardRegistration.CreateCardRegistration
          | CardRegistration.UpdateCardRegistration
      );
    }

    interface CardRegistration extends CardRegistration.CardRegistrationData {}

    namespace Card {
      type CardType =
        | "CB_VISA_MASTERCARD"
        | "DINERS"
        | "MASTERPASS"
        | "MAESTRO"
        | "P24"
        | "IDEAL"
        | "BCMC"
        | "PAYLIB";
      type CardStatus = "CREATED" | "VALIDATED" | "ERROR";
      type CardValidity = "UNKNOWN" | "VALID" | "INVALID";

      interface CardData {
        /**
         * The expiry date of the card - must be in format MMYY
         */
        ExpirationDate: string;

        /**
         * A partially obfuscated version of the credit card number
         */
        Alias: string;

        /**
         * The provider of the card
         */
        CardProvider: string;

        /**
         * The type of card
         */
        CardType: CardType;

        /**
         * The Country of the Address
         */
        Country: string;

        /**
         * The card product type - more info
         */
        Product: string;

        /**
         * The bank code
         */
        BankCode: string;

        /**
         * Whether the card is active or not
         */
        Active: boolean;

        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyIso;

        /**
         * Whether the card is valid or not. Once they process (or attempt to process) a payment with the card we are able to indicate if it is "valid" or "invalid".
         * If they didn’t process a payment yet the "Validity" stay at "unknown".
         */
        Validity: CardValidity;

        /**
         * A unique representation of a 16-digits card number
         */
        Fingerprint: string;
      }

      interface UpdateCard {
        Id: string;
        Active?: false;
      }
    }

    class Card extends EntityBase<Card.CardData> {
      constructor(data: Card.CardData);
    }

    interface Card extends Card.CardData {}

    namespace CardPreAuthorization {
      interface Billing {
        Address: Address | Address.AddressData | string;
      }

      interface CardPreAuthorizationData extends EntityBase.EntityBaseData {
        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: Money;

        /**
         * Status of the PreAuthorization
         */
        Status: PreAuthorizationStatus;

        /**
         * The status of the payment after the PreAuthorization. You can pass the PaymentStatus from "WAITING" to "CANCELED" should you need/want to
         */
        PaymentStatus: PaymentStatus;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * How the PreAuthorization has been executed
         */
        ExecutionType: PreAuthorizationExecutionType;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually.
         * The field lets you activate it automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ),
         * "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectUrl: string;

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The date when the payment is to be processed by
         */
        ExpirationDate: Timestamp;

        /**
         * The Id of the associated PayIn
         */
        PayInId: string;

        /**
         * Contains every useful informations related to the user billing
         */
        Billing: Billing;

        /**
         * Contains useful informations related to security and fraud
         */
        SecurityInfo: SecurityInfo;
      }

      type CreateCardPreAuthorization = Partial<
        Pick<CardPreAuthorizationData, "Tag" | "Billing" | "Secure">
      > &
        Pick<
          CardPreAuthorizationData,
          "AuthorId" | "DebitedFunds" | "CardId" | "SecureModeRedirectUrl"
        >;
      type UpdateCardPreAuthorization = Partial<
        Pick<CardPreAuthorizationData, "Tag">
      > &
        Pick<CardPreAuthorizationData, "PaymentStatus" | "Id">;
    }

    class CardPreAuthorization {
      constructor(
        data:
          | CardPreAuthorization.CardPreAuthorizationData
          | CardPreAuthorization.UpdateCardPreAuthorization
      );
    }

    interface CardPreAuthorization
      extends CardPreAuthorization.CardPreAuthorizationData {}

    class SecurityInfo extends EntityBase<
      SecurityInfo & EntityBase.EntityBaseData
    > {
      constructor(data: SecurityInfo);
    }

    namespace User {
      /**
       * Should be only one of these values:
       * 1 - for incomes <18K€),
       * 2 - for incomes between 18 and 30K€,
       * 3 - for incomes between 30 and 50K€,
       * 4 - for incomes between 50 and 80K€,
       * 5 - for incomes between 80 and 120K€,
       * 6 - for incomes >120K€
       */
      type IncomeRange = 1 | 2 | 3 | 4 | 5 | 6;
      type PersonType = "NATURAL" | "LEGAL";
      type KYCLevel = "LIGHT" | "REGULAR";
      type StaticKeys =
        | "KYCLevel"
        | "PersonType"
        | "Id"
        | "CreationDate"
        | "ProofOfIdentity"
        | "ProofOfAddress"
        | "ProofOfRegistration"
        | "LegalRepresentativeProofOfIdentity"
        | "ShareholderDeclaration"
        | "Statute";
      interface UserData extends EntityBase.EntityBaseData {
        /**
         * Type of user
         */
        PersonType: PersonType;

        /**
         * The person's email address (not more than 12 consecutive numbers) - must be a valid email
         */
        Email: string;

        /**
         * KYC Level (LIGHT or REGULAR)
         */
        KYCLevel: KYCLevel;
      }

      interface UserLegalData extends UserData {
        PersonType: "LEGAL";

        /**
         * The name of the legal user
         */
        Name: string;

        /**
         * Type for legal user.
         */
        LegalPersonType: "BUSINESS" | "ORGANIZATION" | "SOLETRADER";

        /**
         * The address of the company’s headquarters
         */
        HeadquartersAddress: string | Address | Address.AddressData;

        /**
         * The first name of the company’s Legal representative person
         */
        LegalRepresentativeFirstName: string;

        /**
         * The last name of the company’s Legal representative person
         */
        LegalRepresentativeLastName: string;

        /**
         * The address of the company’s Legal representative person
         */
        LegalRepresentativeAddress: string | Address | Address.AddressData;

        /**
         * The email of the company’s Legal representative person - must be valid
         */
        LegalRepresentativeEmail: string;

        /**
         * The date of birth of the company’s Legal representative person - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        LegalRepresentativeBirthday: Timestamp;

        /**
         * The nationality of the company’s Legal representative person
         */
        LegalRepresentativeNationality: CountryISO;

        /**
         * The country of residence of the company’s Legal representative person
         */
        LegalRepresentativeCountryOfResidence: CountryISO;
        ProofOfIdentity: string | null;

        /**
         * The business statute of the company
         */
        Statute: string | null;

        /**
         * A MANGOPAY reference to the validated document of the proof of registration of the company
         */
        ProofOfRegistration: string | null;

        /**
         * The shareholder declaration of the company
         */
        ShareholderDeclaration: string | null;
      }

      interface UserNaturalData extends UserData {
        PersonType: "NATURAL";

        /**
         * The name of the user
         */
        FirstName: string;

        /**
         * The last name of the user
         */
        LastName: string;

        /**
         * The user address
         */
        Address: string | Address.AddressData;

        /**
         * The date of birth of the user - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        Birthday: Timestamp;

        /**
         * The user’s nationality. ISO 3166-1 alpha-2 format is expected
         */
        Nationality: CountryISO;

        /**
         * The user’s country of residence. ISO 3166-1 alpha-2 format is expected
         */
        CountryOfResidence: CountryISO;

        /**
         * User’s occupation, ie. Work
         */
        Occupation: string;
        IncomeRange: IncomeRange;

        /**
         * Maximum length is 255 characters
         */
        ProofOfIdentity: string | null;

        /**
         * Maximum length is 255 characters
         */
        ProofOfAddress: string | null;

        /**
         * The capacity of this user - for use with UBO declarations
         */
        Capacity: "NORMAL" | "DECLARATIVE";
      }

      type RequiredUserLegalData =
        | "LegalPersonType"
        | "Name"
        | "LegalRepresentativeBirthday"
        | "LegalRepresentativeCountryOfResidence"
        | "LegalRepresentativeNationality"
        | "LegalRepresentativeFirstName"
        | "LegalRepresentativeLastName"
        | "Email";

      type RequiredUserNaturalData =
        | "FirstName"
        | "LastName"
        | "Birthday"
        | "Nationality"
        | "CountryOfResidence"
        | "Email";

      interface BaseUserLegalData
        extends Partial<Omit<UserLegalData, StaticKeys>> {
        PersonType: "LEGAL";
      }
      interface UpdateUserLegalData extends BaseUserLegalData {
        Id: string;
      }
      interface CreateUserLegalData
        extends MakeKeysRequired<
          BaseUserLegalData,
          RequiredUserLegalData | "PersonType"
        > {}

      interface BaseUserNaturalData
        extends Partial<Omit<UserNaturalData, StaticKeys>> {
        PersonType: "NATURAL";
      }
      interface UpdateUserNaturalData extends BaseUserNaturalData {
        Id: string;
      }

      interface CreateUserNaturalData
        extends MakeKeysRequired<
          BaseUserNaturalData,
          RequiredUserNaturalData | "PersonType"
        > {}
    }

    class UserLegal extends EntityBase<User.UserLegalData> {
      PersonType: "LEGAL";
      constructor(
        data: MakeKeysRequired<
          Partial<User.UserLegalData>,
          User.RequiredUserLegalData
        >
      );

      /**
       * Sets the person type for the model
       * @param personType
       */
      setPersonType(type: User.PersonType): void;
    }
    interface UserLegal extends User.UserLegalData {}

    class UserNatural extends EntityBase<User.UserNaturalData> {
      PersonType: "NATURAL";
      constructor(
        data: MakeKeysRequired<
          Partial<User.UserNaturalData>,
          User.RequiredUserNaturalData
        >
      );

      /**
       * Sets the person type for the model
       * @param personType
       */
      setPersonType(type: User.PersonType): void;
    }
    interface UserNatural extends User.UserNaturalData {}

    class User extends EntityBase<User.UserData> {
      constructor(data: User.UserData);

      /**
       * Sets the person type for the model
       * @param personType
       */
      setPersonType(type: User.PersonType): void;
    }
    interface User extends User.UserData {}
  }

  class Users {
    /**
     * Create a new user
     * @param user
     */
    create: MethodOverload<
      models.UserLegal | models.User.CreateUserLegalData,
      models.User.UserLegalData
    > &
      MethodOverload<
        models.UserNatural | models.User.CreateUserNaturalData,
        models.User.UserNaturalData
      >;

    /**
     * Update a user
     * @param user
     * @param options
     */
    update: MethodOverload<
      models.UserLegal | models.User.UpdateUserLegalData,
      models.User.UserLegalData
    > &
      MethodOverload<
        models.UserNatural | models.User.UpdateUserNaturalData,
        models.User.UserNaturalData
      >;

    /**
     * Get natural or legal user by ID
     * @param userId
     * @param options
     */
    get: MethodOverload<
      string,
      models.User.UserLegalData | models.User.UserNaturalData
    >;

    /**
     * Get natural user by ID
     * @param userId
     * @param options
     */
    getNatural: MethodOverload<string, models.User.UserNaturalData>;

    /**
     * Get legal user by ID
     * @param userId
     * @param options
     */
    getLegal: MethodOverload<string, models.User.UserLegalData>;

    /**
     * Get all users
     */
    getAll: NoArgMethodOverload<
      Array<models.User.UserLegalData | models.User.UserNaturalData>
    >;

    /**
     * Create bank account for user
     * @param userId
     * @param bankAccount
     * @param options
     */
    createBankAccount: TwoArgsMethodOverload<
      string,
      models.BankAccount.USDetails,
      models.BankAccount.USData
    > &
      TwoArgsMethodOverload<
        string,
        models.BankAccount.OtherDetails,
        models.BankAccount.OtherData
      > &
      TwoArgsMethodOverload<
        string,
        models.BankAccount.IBANDetails,
        models.BankAccount.IBANData
      > &
      TwoArgsMethodOverload<
        string,
        models.BankAccount.GBDetails,
        models.BankAccount.GBData
      > &
      TwoArgsMethodOverload<
        string,
        models.BankAccount.CADetails,
        models.BankAccount.CAData
      >;

    /**
     * Deactivate a bank account
     *
     * Note that once deactivated, a bank account can't be reactivated afterwards
     * @param userId
     * @param bankAccountId
     * @param options
     */
    deactivateBankAccount: TwoArgsMethodOverload<string, string, void>;

    /**
     * Get all bank accounts for user
     * @param userId
     * @param options
     */
    getBankAccounts: MethodOverload<string, models.BankAccount.Data[]>;

    /**
     * Get all bank accounts for user
     * @param userId
     * @param bankAccountId
     * @param options
     */
    getBankAccount: TwoArgsMethodOverload<
      string,
      string,
      models.BankAccount.Data
    >;

    /**
     * Get all wallets accounts for user
     */
    getWallets: MethodOverload<string, models.Wallet.WalletData[]>;

    /**
     * Get all transactions for user
     * @param userId
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      models.Transaction.TransactionData[]
    >;

    /**
     * Get all cards for user
     * @param userId
     * @param options
     */
    getCards: MethodOverload<string, models.Card.CardData[]>;

    /**
     * Create new KYC document
     * @param  userId
     * @param  kycDocument
     * @param  options
     */
    createKycDocument: TwoArgsMethodOverload<
      string,
      models.KycDocument.CreateKycDocument,
      models.KycDocument.KycDocumentData
    >;

    /**
     * Get all KYC documents for user
     * @param userId
     * @param options
     */
    getKycDocuments: MethodOverload<
      string,
      models.KycDocument.KycDocumentData[]
    >;

    /**
     * Get KYC document
     * @param userId
     * @param kycDocumentId
     * @param options
     */
    getKycDocument: TwoArgsMethodOverload<
      string,
      string,
      models.KycDocument.KycDocumentData
    >;

    /**
     * Update status of KYC Document (Currently only allows for submitting the document)
     * @param userId
     * @param kycDocument
     * @param options
     */
    updateKycDocument: TwoArgsMethodOverload<
      string,
      models.KycDocument.SubmitKycDocument,
      models.KycDocument.KycDocumentData
    >;

    /**
     * Create page for KYC document
     * @param userId
     * @param kycDocumentId
     * @param kycPage
     * @param options
     */
    createKycPage: ThreeArgsMethodOverload<
      string,
      string,
      models.KycDocument.CreateKycPage,
      models.KycDocument.KycDocumentData
    >;

    /**
     * Create page for KYC document
     * @param userId
     * @param kycDocumentId
     * @param filePath
     * @param options
     */
    createKycPageFromFile: ThreeArgsMethodOverload<
      string,
      string,
      string,
      models.KycDocument.KycDocumentData
    >;

    /**
     * Get users's EMoney
     * @param userId
     * @param options
     */
    getEMoney: MethodOverload<string, models.EMoney.EMoneyData>;

    /**
     * Create an UboDeclaration for the user
     * @param userId
     * @param uboDeclaration
     * @param options
     */
    createUboDeclaration: TwoArgsMethodOverload<
      string,
      models.UboDeclaration.CreateUboDeclaration,
      models.UboDeclaration.UboDeclarationData
    >;

    /**
     * Get all user preauthorizations
     * @param userId
     * @param options
     */
    getPreAuthorizations: MethodOverload<
      string,
      models.CardPreAuthorization.CardPreAuthorizationData[]
    >;
  }

  /**
   * You need to create document in order to upload pages on this document.
   *
   * 1. The KYC Document Object is a request to validate a required document. There is one request for one Type of document
   * 2. Upload a file through a Page. A document should get several pages
   * 3. Edit the object Document and set the Status field to "VALIDATION_ASKED" (instead of "CREATED")
   * 4. The demand is received by our team. The object is waiting for a "VALIDATED" status
   *
   * Note that you are not allowed to store KYC documents on your side unless you have permission from the approriate authorities in your country
   */
  class KycDocuments {
    /**
     * Get all KycDocuments
     * @param options
     */
    getAll: NoArgMethodOverload<models.KycDocument.KycDocumentData[]>;

    /**
     * Get KycDocument
     * @param kycDocumentId
     * @param options
     */
    get: MethodOverload<string, models.KycDocument.KycDocumentData>;

    /**
     * Creates temporary URLs where each page of a KYC document can be viewed.
     * @param documentId
     */
    createKycDocumentConsult: MethodOverload<
      string,
      any // Unsure of data structure from docs
    >;
  }

  /**
   * An UBO Declaration is an electronic version of the previous KYC document "Shareholder Declaration", in order to declare all the Ultimate Beneficial Owners of a BUSINESS-typed legal User
   * (ie the shareholders with >25% of capital or voting rights).
   *
   * 1. Create each Ultimate Beneficial Owner as a Natural User, who must have a "DECLARATIVE" Capacity.
   * 2. Create a new UBO Declaration for your legal user, and link every Ultimate Beneficial Owners created previously thanks to DeclaredUBOs.
   *  - This list can be empty if your legal user has no Ultimate Beneficial Owner, or no eligible one (ie. no Ultimate Beneficial Owner that owns more than 25% of this company).
   * 3. Edit the UBODeclaration object and set the Status field to "VALIDATION_ASKED" (instead of "CREATED")
   * 4. The demand is received by our team and once processed, it will either get a "VALIDATED" status, or "REFUSED" with more information provided in the RefusedReasonTypes parameter
   *
   * Note that UBO declarations are not yet a requirement for your user to be KYC verified and are optional at this stage
   */
  class UboDeclarations {
    /**
     * Retrieves a UBO declaration object from the API.
     * @param id
     * @param options
     */
    get: MethodOverload<string, models.UboDeclaration.UboDeclarationData>;

    /**
     * Updates a UBO declaration entity.
     * @param uboDeclaration Updated UBO declaration entity - must have ID
     * @param options
     */
    update: MethodOverload<
      models.UboDeclaration.UpdateUboDeclaration,
      models.UboDeclaration.UboDeclarationData
    >;
  }

  class BankAccounts {
    /**
     * Retrieve list of transactions for a bank account
     * @param bankAccountId
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      models.Transaction.TransactionData[]
    >;
  }

  class Wallets {
    /**
     * Create new wallet
     * @param wallet
     * @param options
     */
    create: MethodOverload<
      models.Wallet.CreateWallet | models.Wallet,
      models.Wallet.WalletData
    >;

    /**
     * Update wallet
     * @param wallet
     * @param options
     */
    update: MethodOverload<
      models.Wallet.UpdateWallet | models.Wallet,
      models.Wallet.WalletData
    >;

    /**
     * Get a specific wallet
     * @param walletId
     */
    get: MethodOverload<string, models.Wallet.WalletData>;

    /**
     * Get transactions for the wallet
     * @param walletId
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      models.Transaction.TransactionData[]
    >;
  }

  class Cards {
    /**
     * Get card
     * @param cardId
     * @param ptions
     */
    get: MethodOverload<string, models.Card.CardData>;

    /**
     * Gets a list of cards having the same fingerprint.
     * The fingerprint is a hash uniquely generated per 16-digit card number.
     *
     * @param fingerprint The fingerprint hash
     */
    getByFingerprint: MethodOverload<string, models.Card.CardData[]>;

    /**
     * Update card (currently only supports deactivation)
     * @param card
     * @param options
     */
    update: MethodOverload<models.Card.UpdateCard, models.Card.CardData>;

    /**
     * Get list of Transactions of a Card
     * @param cardId
     * @param options
     */
    getTransactions: MethodOverload<
      string,
      models.Transaction.TransactionData[]
    >;

    /**
     * Gets list of PreAuthorizations of a Card.
     * @param cardId
     * @param options
     */
    getPreAuthorizations: MethodOverload<
      string,
      models.CardPreAuthorization.CardPreAuthorizationData[]
    >;
  }

  /**
   * You need to register a card in order to process a Direct PayIn. Card registration enables you to tokenize a Card. These are the steps to follow:
   *
   * 1. Create a CardRegistration Object
   * 2. Get a PreRegistrationData
   * 3. The user posts PreRegistrationData, AccessKey and card details through a form (PHP & JS samples) to the CardRegistrationURL (5. in the diagram)
   * 4. Get a RegistrationData back
   * 5. Edit the CardRegistration Object (POST method) with the RegistrationData just received
   * 6. Get the CardId ready to use into the Direct PayIn Object
   *
   * - If you don’t want to save the card you must change the field ACTIVE in the card object to false
   */
  class CardRegistrations {
    /**
     * Create new card registration
     * @param cardRegistration
     * @param options
     */
    create: MethodOverload<
      models.CardRegistration.CreateCardRegistration,
      models.CardRegistration.CardRegistrationData
    >;

    /**
     * Create new card registration
     * @param cardRegistrationId
     * @param options
     */
    get: MethodOverload<string, models.CardRegistration.CardRegistrationData>;

    /**
     * Update card registration
     * @param  cardRegistration
     */
    update: MethodOverload<
      models.CardRegistration.UpdateCardRegistration,
      models.CardRegistration.CardRegistrationData
    >;
  }

  /**
   * The PreAuthorization Object ensures the solvency of a registered card for 7 days. The overall process is as follows:
   *
   * 1. Register a card (CardRegistration)
   * 2. Create a PreAuthorization with the CardId. This allows you to charge an amount on a card
   * 3. Charge the card through the PreAuthorized PayIn object (Payins/preauthorized/direct)
   *
   * How does PreAuthorization work?
   * - Once the PreAuthorization object is created the Status is "CREATED" until 3D secure validation.
   * - If the authorization is successful the status is "SUCCEEDED" if it failed the status is "FAILED".
   * - Once Status = "SUCCEEDED" and PaymentStatus = "WAITING" you can charge the card.
   * - The Pay-In amount has to be less than or equal to the amount authorized.
   */
  class CardPreAuthorizations {
    /**
     * Create new pre-authorization
     * @param cardPreAuthorization
     * @param options
     */
    create: MethodOverload<
      models.CardPreAuthorization.CreateCardPreAuthorization,
      models.CardPreAuthorization.CardPreAuthorizationData
    >;

    /**
     * Get data for Card pre-authorization
     * @param cardPreAuthorizationId
     * @param options
     */
    get: MethodOverload<
      string,
      models.CardPreAuthorization.CardPreAuthorizationData
    >;

    /**
     * Update pre-authorization object (currently only supports cancellation)
     * @param  cardPreAuthorization
     */
    update: MethodOverload<
      models.CardPreAuthorization.UpdateCardPreAuthorization,
      models.CardPreAuthorization.CardPreAuthorizationData
    >;
  }
}
