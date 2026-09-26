# Replicate – 9Router / OmniRoute Integration Research

## Summary for Germany – German mobile only, no payment

Replicate is an AI model hosting platform. Authentication is API-token based. Registration is via GitHub OAuth, no phone/SMS required. Free usage exists via a “Try for Free” collection and a one-time $5 credit, both limited. Payment is pay-as-you-go with prepaid credit; auto-charge is opt-in. No Germany-specific ban is documented, and the service references GDPR. With German mobile only and no payment, viable use is limited to the free collection / $5 credit and GitHub login; long 20-day free sessions are not sustainable without adding a payment method.

---

## Authentication method

* **API key / token.** All API requests must include a valid API token in the Authorization header. The token must be prefixed by “Bearer”, followed by a space and the token value. Example: `Authorization: Bearer r8_Hw...` [https://replicate.com/docs/reference/api](https://replicate.com/docs/reference/api)
* Replicate’s HTTP API reference states: “All API requests must be authenticated with a token. Include this header with all requests: Authorization: Token” [https://replicate.com/docs/reference/api](https://replicate.com/docs/reference/api)
* The public documentation describes authentication with a bearer `REPLICATE_API_TOKEN` and calling `replicate.run` with owner/model id. [https://comparedge.com/tools/replicate/api](https://comparedge.com/tools/replicate/api)
* **Base URL.** API documentation is hosted under `https://api.replicate.com/v1` e.g. `POST https://api.replicate.com/v1/predictions` [https://replicate.com/docs/reference/api](https://replicate.com/docs/reference/api)
* No OAuth flow for API calls is described; authentication is API-token based. Web sign-in uses GitHub OAuth.

---

## Free tier: details, limits, requires payment?

* **Try for Free collection.** Replicate maintains a curated collection of models that can be run without purchasing credit after creating an account. [https://replicate.com/collections/try-for-free](https://replicate.com/collections/try-for-free)
* Official FAQ: “The Try for Free collection is our list of models that you can run without purchasing credit after creating a Replicate account.” [https://replicate.com/collections/try-for-free](https://replicate.com/collections/try-for-free)
* “Are these models free forever? No. The models in this collection are free for a limited number of runs. After you've hit the free use limit, you'll need to add billing and purchase credit to continue using these models.” [https://replicate.com/collections/try-for-free](https://replicate.com/collections/try-for-free)
* **One-time credit.** Independent coverage notes Replicate offers a one-time $5 free credit, expires in 30 days, then pay-as-you-go per GPU second. [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* “Every new user gets a one-time $5 credit (about 300–500 runs of a small model…)” [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* “After that, you pay per second of GPU time.” [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* Pricing page confirms pay-as-you-go: “You only pay for what you use on Replicate. Some models are billed by hardware and time, others by input and output.” [https://replicate.com/pricing](https://replicate.com/pricing)
* Billing docs: minimum threshold $5 and minimum reload $15 for prepaid credit. [https://replicate.com/docs/topics/billing/prepaid-credit](https://replicate.com/docs/topics/billing/prepaid-credit)
* No auto-charge by default: “Replicate does not auto-charge unless you explicitly enable 'auto-top-up' in your billing settings. By default, when your balance hits $0, API calls fail with a 402 error.” [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* Prepaid credits are non-refundable; accidental overpayments can be refunded within 14 days. [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)

---

## Registration: email/phone requirements, German mobile acceptance, SMS verification

* **Sign-in method.** Sign-in page shows “Sign in with GitHub” only. [https://replicate.com/signin](https://replicate.com/signin)
* Terms of Service §2.3 Account Set-Up: “To use our Services, you must sign on to Replicate using your GitHub account (“Account”) using your applicable GitHub login credentials.” [https://replicate.com/terms](https://replicate.com/terms)
* No phone number is required for account creation. Privacy Policy lists information collected on registration: “Information when you register for an account, including if you sign in with GitHub credentials.” [https://replicate.com/privacy](https://replicate.com/privacy)
* Phone number is only mentioned as optional support interaction data: “Information from your interactions with our support team or inquiries into our Services, which may include providing us with your name, work or personal email, phone number…” [https://replicate.com/privacy](https://replicate.com/privacy)
* No SMS verification step is documented in public sign-up / terms / privacy pages.
* German mobile number is therefore not required and not used for verification. Account eligibility is tied to GitHub login and age ≥18.

---

## Germany / EU geo restrictions, GDPR compliance

* **Export compliance.** Terms §12.8 Compliance with Laws and Export Regulations requires customers to confirm they are not located in a U.S. embargoed country or on prohibited lists. Germany is not listed as restricted. Customer warrants: “By using the Services, CUSTOMER CONFIRMS AND WARRANT THAT YOU ARE NOT LOCATED IN SUCH A COUNTRY OR LISTED ON ANY SUCH PROHIBITED LIST.” [https://replicate.com/terms](https://replicate.com/terms)
* **Data privacy references.** Privacy Policy last updated April 1, 2026, states commitment to protecting personal information and right to privacy. [https://replicate.com/privacy](https://replicate.com/privacy)
* Additional Terms for Flux models explicitly reference GDPR: “in any manner that violates any applicable law, including any privacy or security laws, rules, regulations, directives, or governmental requirements (including the General Data Privacy Regulation (Regulation (EU) 2016/679)…)” [https://replicate.com/terms](https://replicate.com/terms)
* Privacy Policy lists data processing purposes, sharing with vendors, and user rights to access, delete, correct personal information. [https://replicate.com/privacy](https://replicate.com/privacy)
* No explicit geo-block for Germany/EU is published. Replicate is a U.S. company, San Francisco, CA, with California governing law per Terms §12.2. [https://replicate.com/terms](https://replicate.com/terms)

---

## Workarounds for Germany with German mobile only, no payment

* **GitHub-only registration avoids phone.** Sign-up requires GitHub credentials, not email/phone/SMS. German mobile number is unnecessary. [https://replicate.com/signin](https://replicate.com/signin)
* **Use Try for Free collection.** Models listed under Try for Free can be run without purchasing credit after account creation, within a limited number of runs per model. [https://replicate.com/collections/try-for-free](https://replicate.com/collections/try-for-free)
* **Use the one-time $5 credit.** New accounts receive a one-time $5 credit with 30-day expiry; this can be used for any model without immediate credit card entry, until balance is exhausted. [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* **No payment method required for free usage.** API calls fail with 402 when balance is $0 and auto-top-up is disabled. Auto-charge is opt-in. [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* **Limitations:** Free collection runs are capped; private deployments and sustained API usage require prepaid credit and a payment method. Prepaid credit minimum reload is $15. [https://replicate.com/docs/topics/billing/prepaid-credit](https://replicate.com/docs/topics/billing/prepaid-credit)
* **No SMS/phone workaround needed.** Since registration does not require phone, a German mobile number does not block access.

---

## 20-day free long sessions viability

* **Credit expiry.** The $5 new-user credit expires in 30 days. [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* **Cost per run.** Example costs from pricing page: black-forest-labs/flux-1.1-pro $0.04 / output image; flux-dev $0.025 / output image; deepseek-r1 $0.01 / thousand output tokens. [https://replicate.com/pricing](https://replicate.com/pricing)
* With $5, ≈125 images at $0.04 each, or ≈300–500 runs of small models per third-party analysis. [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* Long-running sessions, e.g., continuous GPU time, will exhaust the $5 credit quickly. Hardware pricing e.g., Nvidia A100 $5.04/hr, H100 $5.49/hr. [https://replicate.com/pricing](https://replicate.com/pricing)
* After credit exhaustion, API returns 402 error until payment method is added. [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* Try for Free models are limited to a limited number of free runs per model; not designed for sustained 20-day usage. [https://replicate.com/collections/try-for-free](https://replicate.com/collections/try-for-free)
* **Conclusion:** A 20-day continuous free long session is not viable without payment. Short experimentation and limited free runs are possible; sustained usage requires prepaid credit and a payment method.

---

## Citations summary

* Authentication & base URL: [https://replicate.com/docs/reference/api](https://replicate.com/docs/reference/api)
* Pricing / pay-as-you-go: [https://replicate.com/pricing](https://replicate.com/pricing)
* Try for Free collection: [https://replicate.com/collections/try-for-free](https://replicate.com/collections/try-for-free)
* Free credit details: [https://ainavhub.cc/article/replicate-free](https://ainavhub.cc/article/replicate-free)
* Sign-in with GitHub: [https://replicate.com/signin](https://replicate.com/signin)
* Account set-up requirement: [https://replicate.com/terms](https://replicate.com/terms)
* Privacy Policy: [https://replicate.com/privacy](https://replicate.com/privacy)
* Terms of Service including GDPR reference and export compliance: [https://replicate.com/terms](https://replicate.com/terms)
* Prepaid credit minimums: [https://replicate.com/docs/topics/billing/prepaid-credit](https://replicate.com/docs/topics/billing/prepaid-credit)
