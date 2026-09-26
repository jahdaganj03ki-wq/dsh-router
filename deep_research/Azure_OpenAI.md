# Azure OpenAI – 9Router/OmniRoute Integration Research
**Focus:** Germany compatibility, German mobile number only, no payment

## 1. Authentication method

### API Key
- Azure Foundry / Azure OpenAI inference endpoint is `https://<resource-name>.openai.azure.com` [1].
- Deployment URLs are formed by concatenating the base URL and `/deployments/<model-deployment-name>`. When using the OpenAI v1 API, call `https://<resource>.openai.azure.com/openai/v1/` and pass the deployment name in the `model` field [1].
- API key authentication: requests include the API key in the `api-key` HTTP header. The Microsoft docs show API key usage for Foundry Models with `api_key` in the client config [1].
- API keys are per resource, grant full access to the resource, and are recommended to be rotated. Production guidance prefers keyless auth [1].

### Keyless / OAuth
- Keyless authorization with Microsoft Entra ID is supported: `DefaultAzureCredential` + bearer token provider for `https://ai.azure.com/.default` [1].
- Example client config:
  ```python
  token_provider = get_bearer_token_provider(DefaultAzureCredential(), "https://ai.azure.com/.default")
  client = OpenAI(base_url="https://<resource>.openai.azure.com/openai/v1/", api_key=token_provider)
  ```
  [1]

**Base URL pattern**
- `https://<resource-name>.openai.azure.com`
- v1 route: `https://<resource-name>.openai.azure.com/openai/v1/`

## 2. Free tier – details, limits, requires payment?

### Azure account free trial
- Standard Azure sign-up requires credit card information in the “About you” step: country/region, first name, last name, email address, phone number, credit card information [2].
- Sign-up flow includes:
  1. About you
  2. Identity verification by phone
  3. Identity verification by card
  4. Agreement [2]
- Identity verification by card is required; virtual or prepaid credit cards are not accepted [2].
- “Free trial isn’t available” if you already had an Azure subscription; first-time users only [2].

### Azure OpenAI specific
- Azure OpenAI in Microsoft Foundry is pay-as-you-go, billed by usage/tokens. No standalone free tier for the service itself; consumption draws from Azure subscription credits [3].
- New customers can get $200 in Azure credits for 30 days via the Azure Free Trial offer. The offer page states “Pay as you go or try Azure free for up to 30 days” [4].
- Azure for Students provides $100 credit for 12 months, no credit card required, but requires a valid academic email and student verification [5][6].

**Requires payment?**
Yes for standard sign-up. A valid credit/debit card must be provided and validated during sign-up, even for the free trial. Prepaid/gift cards are explicitly rejected [2].

## 3. Registration – email/phone requirements, German mobile acceptance, SMS verification

### Required fields
- Country/region, first name, last name, email address, phone number, credit card information [2].

### Phone verification
- Azure uses phone authentication to help identify you during sign-up. Azure doesn’t support every country/region for sign-up. If your country/region doesn’t appear in the Country code list, you can’t sign up [2].
- Phone verification tips from Microsoft docs:
  - You can use any phone number for verification as long as it meets the requirements. The number entered for verification isn’t stored as a contact number [2].
  - Voice-over-IP VoIP numbers can’t be used [2].
  - Check that your phone can receive calls or SMS messages from a United States-based telephone number [2][7].
  - Double-check the country code selected in the drop-down [2][7].
  - If SMS fails, use the “Call me” option [2].

### German mobile
- Germany is listed as a supported country for Azure subscription payment methods, with Visa, Mastercard, Amex and SEPA supported [8].
- Community reports show German users attempting phone verification. Official guidance references the general verification page above and advises correct country code selection and ability to receive US-originated SMS/call [7].
- No explicit block on German mobile numbers is documented; the main constraints are:
  1. Country must be in the supported sign-up list.
  2. Phone must be able to receive SMS/call from US numbers.
  3. Not VoIP.

SMS verification is therefore feasible with a German mobile, subject to carrier acceptance of US-originated messages.

## 4. Germany/EU geo restrictions, GDPR compliance

### Data residency
- Azure OpenAI Service can be deployed in EU DataZone. InferCheck notes EU-only data residency with regions including Sweden Central, France Central, **Germany West Central**, Norway East, Poland Central, Italy North, Spain Central, Switzerland North, Switzerland West [9].
- EU deployments keep all data within EU member nations. Microsoft EU Data Boundary provides contractual guarantee that EU customer data stays within Europe [9].
- Abuse monitoring uses human reviewers located in the EEA; customers can apply for modified abuse monitoring to disable human review [9].

### GDPR
- Azure OpenAI is described as GDPR-compliant for German companies when configured with EU data residency and DPA [9].
- Data Processing Agreement is available via online acceptance [9].
- No training on customer data; opt-out available. Standard Contractual Clauses and EU adequacy decision applicable [9].
- Certifications include ISO27001, ISO27017, ISO27018, ISO27701, C5, HDS [9].
- EU AI Act status listed as compliant with published governance framework [9].

### Geo restrictions
- Azure OpenAI in Foundry Models quotas are scoped at subscription level with DataZoneStandard pools per data zone e.g., EU [10].
- Using EU regions e.g., Germany West Central ensures inference stays in EU. GlobalStandard deployments may process data outside designated geography [9].

## 5. Workarounds for Germany with German mobile only, no payment

### No-payment options
1. **Azure for Students**
   - Free, no credit card required.
   - Requires valid academic email and student status verification [5][6].
   - Includes $100 Azure credit for 12 months renewable annually while student [5].
   - Azure OpenAI usage consumes credit; not truly “free” beyond credit allowance.

2. **Always-free Azure services**
   - Some Azure services have F0/always-free tiers, but Azure OpenAI is not in the always-free list; it is pay-as-you-go.

3. **Existing paid subscription sharing**
   - No official workaround to bypass credit card validation for standard free trial. Microsoft docs state credit card information is required and identity verification by card is a mandatory step [2].

### German mobile only
- Phone verification can be done with a German mobile number provided it can receive SMS/call from US numbers and is not VoIP [2][7].
- No requirement for German phone number for billing; billing address country must match credit card country [2].

**Practical conclusion**
With German mobile only and zero payment:
- Standard Azure free trial is *not* possible without a credit card for validation.
- The only documented no-credit-card path is Azure for Students with academic email verification.
- Using a third-party virtual prepaid card is explicitly rejected [2].

## 6. 20-day free long sessions viability

- Free trial provides $200 credits valid for 30 days [4]. Azure for Students provides $100 credit for 12 months [5].
- Azure OpenAI pricing is per token / per PTU. Even modest sustained sessions consume credits quickly; long-running interactive sessions with GPT-4 class models will exhaust $100-$200 within days to weeks depending on usage.
- Quota tiers auto-upgrade with usage, but billing continues once credits are exhausted; resources are suspended if no payment method is on file [5].
- No free tier guarantees continuous long sessions without payment. 20-day continuous free long sessions are not viable on a zero-payment basis; they would require credit card validation and eventual charges once credits deplete.

## Citations

[1] Endpoints for Microsoft Foundry Models – Azure OpenAI inference endpoint, base URL, API key and keyless auth. https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/endpoints

[2] Troubleshoot issues when you sign up for a new account in the Azure portal – About you fields, identity verification by phone and card requirements. https://learn.microsoft.com/en-us/azure/cost-management-billing/troubleshoot-subscription/troubleshoot-azure-sign-up

[3] Azure OpenAI Service Pricing – pay-as-you-go consumption pricing. https://azure.microsoft.com/en-us/pricing/details/azure-openai/

[4] Create Your Azure Free Account Or Pay As You Go – Try Azure free for up to 30 days. https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account

[5] Microsoft Q&A – Azure for Students activation, no credit card required, $100 credit. https://learn.microsoft.com/en-us/answers/questions/5699314/how-to-activate-azure-for-students-and-create-a-fr

[6] Microsoft Q&A – Azure for Students no credit card required, academic email verification. Same as [5]

[7] Microsoft Q&A – Verification via phone number not working - Germany, references identity verification by phone and US-based SMS/call requirement. https://learn.microsoft.com/en-ca/answers/questions/2152170/verification-via-phone-number-not-working-germany

[8] Supported payment methods for Azure subscriptions – Germany supports Amex, Mastercard, Visa, SEPA. https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/supported-payment-methods

[9] InferCheck – Azure OpenAI Service GDPR Compliance Profile, EU-only data residency, Germany West Central, EU Data Boundary, DPA. https://infercheck.eu/en/provider/azure

[10] Azure OpenAI in Microsoft Foundry Models quotas and limits – subscription-level quota, DataZoneStandard. https://learn.microsoft.com/en-us/azure/foundry/openai/quotas-limits
