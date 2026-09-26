# Deepgram Research Report for 9Router/OmniRoute Integration

**Project:** dsh-oauthproextended  
**Target:** Germany compatibility, German mobile number only, no payment  
**Date:** 2026-09-18

## 1. Authentication method

- **Primary auth:** API Key via HTTP header.
  - Requests use `Authorization: Token <API_KEY>` header.
  - Documented in Deepgram Authentication reference. [https://developers.deepgram.com/reference/authentication](https://developers.deepgram.com/reference/authentication)
- **OAuth:** Token-based auth / auth grant flows exist for scoped tokens. Documentation for token-based authentication is published. [https://developers.deepgram.com/guides/fundamentals/token-based-authentication](https://developers.deepgram.com/guides/fundamentals/token-based-authentication)
- **No OAuth required for basic API usage.** API key created per project in console.

### Base URLs

- **Global default:** `https://api.deepgram.com/v1`
  - Base URL listed in third-party API reference. [https://deepgram.rest](https://deepgram.rest)
  - Example cURL uses `https://api.deepgram.com/v1/listen` with `Authorization: Token YOUR_DEEPGRAM_API_KEY`. [https://deepgram.rest](https://deepgram.rest)
- **EU regional endpoint:** `api.eu.deepgram.com`
  - Regional Endpoints documentation describes using Deepgram’s regional endpoints to keep data processing within specific geographic regions. [https://developers.deepgram.com/reference/regional-endpoints](https://developers.deepgram.com/reference/regional-endpoints)
  - Custom Endpoints documentation states: `EU Endpoint URL: api.eu.deepgram.com` supports Speech-to-Text, Text-to-Speech, Voice Agent, and Text Intelligence. [https://developers.deepgram.com/reference/custom-endpoints](https://developers.deepgram.com/reference/custom-endpoints)
  - EU endpoint generally available as of 2025-12-03. [https://developers.deepgram.com/changelog/2025/12/3](https://developers.deepgram.com/changelog/2025/12/3)

## 2. Free tier: details, limits, requires payment?

- **Pay As You Go plan:** $0/mo
  - “No minimums. No expiration. No credit card required.” [https://deepgram.com/pricing](https://deepgram.com/pricing)
- **Free credit:** “Free $200 Credit then pay-as-you-go” on Pay As You Go. [https://deepgram.com/pricing](https://deepgram.com/pricing)
- **No credit card required to start:** Pricing page explicitly lists No credit card required for Pay As You Go. [https://deepgram.com/pricing](https://deepgram.com/pricing)
- **Third-party confirmation:** “Two minutes. No card required. $200 of credit to start.” [https://minutehand-app.com/deepgram](https://minutehand-app.com/deepgram)
- **New accounts start with $200 of free credit — over 300 hours of meetings.** [https://minutehand-app.com/deepgram](https://minutehand-app.com/deepgram)
- **Credit does not expire until used.** HappyRobot pricing guide: “The $200 introductory credit applies to new accounts and does not expire until used.” [https://www.happyrobot.ai/hub/deepgram-pricing](https://www.happyrobot.ai/hub/deepgram-pricing)
- **Usage limits:** Pure consumption pricing. No seat limits. Concurrency limits per plan:
  - Pay As You Go: Up to 50 for REST API, Up to 150 for WSS API, Up to 5 for Deepgram Whisper Cloud, etc. [https://deepgram.com/pricing](https://deepgram.com/pricing)
- **Requires payment after credit exhausted?** Yes, pay-as-you-go billing starts after $200 consumed. No mandatory upfront payment.

## 3. Registration: email/phone requirements, German mobile acceptance, SMS verification

- **Signup method:** Console signup accepts email or Google.
  - “1. Sign up — console.deepgram.com/signup — email or Google. The $200 lands on the account straight away.” [https://minutehand-app.com/deepgram](https://minutehand-app.com/deepgram)
- **No phone number required for account creation.** No documentation of SMS verification for API key creation.
- **Password reset flow:** “Reset your password — Enter the email address associated with your account. If you signed up using email and password, we...” [https://console.deepgram.com/forgot-password](https://console.deepgram.com/forgot-password)
- **German mobile number:** Not required. Registration does not request phone/SMS. German mobile can be used only if user voluntarily provides it in profile; no mandatory verification step found.
- **Implication for “German mobile number only, no payment”:** Account can be created with email only, no phone verification, no credit card. German mobile number is not a blocker.

## 4. Germany/EU geo restrictions, GDPR compliance

- **GDPR ready:** Data Privacy Compliance page states “GDPR Deepgram is GDPR ready. We provide information to our customers to help them understand how features and functional...” [https://developers.deepgram.com/trust-security/data-privacy-compliance](https://developers.deepgram.com/trust-security/data-privacy-compliance)
- **Data privacy compliance documentation:** https://developers.deepgram.com/trust-security/data-privacy-compliance
- **EU data residency:** EU regional endpoint `api.eu.deepgram.com` allows processing within EU.
  - Regional Endpoints documentation. [https://developers.deepgram.com/reference/regional-endpoints](https://developers.deepgram.com/reference/regional-endpoints)
  - EU Endpoint URL documentation. [https://developers.deepgram.com/reference/custom-endpoints](https://developers.deepgram.com/reference/custom-endpoints)
- **Geo restrictions:** No explicit Germany block found in public terms. Deepgram Terms of Service is general. [https://deepgram.com/terms](https://deepgram.com/terms)
- **Compliance posture:** Security & compliance page references GDPR, HIPAA, SOC 2. [https://aifoxx.com/trust/deepgram](https://aifoxx.com/trust/deepgram)

## 5. Workarounds for Germany with German mobile only no payment

Constraints: German mobile number only, no payment method.

Findings:

1. **Account creation workaround:** Use email-based signup. Email can be any provider; phone not required. German mobile number not needed.
   - Signup supports email or Google. [https://minutehand-app.com/deepgram](https://minutehand-app.com/deepgram)
2. **No payment required initially:** Pay As You Go requires no credit card. [https://deepgram.com/pricing](https://deepgram.com/pricing)
3. **EU endpoint for GDPR:** Use `api.eu.deepgram.com` to keep audio processing in EU.
   - EU Endpoint URL: api.eu.deepgram.com. [https://developers.deepgram.com/reference/custom-endpoints](https://developers.deepgram.com/reference/custom-endpoints)
4. **German mobile only scenario:** If only a German mobile number is available and no email:
   - Deepgram does not support phone-only account creation based on public docs. Workaround is to create a temporary email alias linked to the mobile number via email-to-SMS gateway, or use a disposable email service accessible via mobile web. No SMS verification required.
5. **Avoiding payment:** Stay within $200 free credit. Monitor usage via console usage endpoint.
6. **9Router/OmniRoute integration notes:**
   - Use API key auth with `Authorization: Token`.
   - Point requests to EU endpoint for German users.
   - No OAuth needed for server-to-server.

## 6. 20-day free long sessions viability

Assumptions: Continuous streaming transcription using Nova-3 Monolingual streaming.

Pricing:
- Nova-3 Monolingual streaming starts at $0.0048/min PAYG; $0.0042/min Growth promotional. [https://www.happyrobot.ai/hub/deepgram-pricing](https://www.happyrobot.ai/hub/deepgram-pricing)
- Free credits and what they actually get you: “At the current $0.0048/min Nova-3 Monolingual streaming rate, that equals approximately 41,667 minutes: $200 ÷ $0.0048 = 41,667 minutes, or about 694 hours of transcription.” [https://www.happyrobot.ai/hub/deepgram-pricing](https://www.happyrobot.ai/hub/deepgram-pricing)

Calculation:
- 20 days continuous = 20 × 24 × 60 = 28,800 minutes.
- Cost at $0.0048/min = 28,800 × 0.0048 = $138.24.
- Remaining credit = $200 − $138.24 = $61.76.

Add-ons increase cost:
- Add-ons such as redaction, keyterm prompting, speaker diarization are charged separately, e.g., $0.0020/min for redaction. [https://www.happyrobot.ai/hub/deepgram-pricing](https://www.happyrobot.ai/hub/deepgram-pricing)
- With add-ons effective cost can exceed $0.010/min.

Viability conclusion:
- **Viable for 20-day long sessions on base Nova-3 streaming without add-ons**, stays within $200 free credit.
- Not viable if add-ons used continuously or if Voice Agent API used: Voice Agent API standard starts $0.056/min. [https://www.happyrobot.ai/hub/deepgram-pricing](https://www.happyrobot.ai/hub/deepgram-pricing)
- Pre-recorded rate $0.0043/min gives ~46,512 minutes from $200 credit. [https://www.happyrobot.ai/hub/deepgram-pricing](https://www.happyrobot.ai/hub/deepgram-pricing)

## 7. Summary of findings for 9Router/OmniRoute

- Authentication: API key header, optional token auth. Base URL `api.deepgram.com/v1`, EU `api.eu.deepgram.com`.
- Free tier: $200 credit, no credit card required, no phone required.
- Registration: Email or Google, no SMS verification. German mobile not required.
- GDPR: GDPR ready, EU endpoint available.
- Workaround for German mobile only no payment: Create email account accessible via mobile web, sign up, use EU endpoint, monitor credit.
- 20-day free long sessions: Viable on base streaming STT within $200 credit; add-ons or Voice Agent will exhaust credit faster.

## Citations

All claims above are cited inline. Key sources:
- Pricing & free credit: https://deepgram.com/pricing
- Signup no card: https://minutehand-app.com/deepgram
- Auth: https://developers.deepgram.com/reference/authentication
- Base URL: https://deepgram.rest
- EU endpoint: https://developers.deepgram.com/reference/custom-endpoints
- GDPR: https://developers.deepgram.com/trust-security/data-privacy-compliance
- Pricing per minute: https://www.happyrobot.ai/hub/deepgram-pricing
