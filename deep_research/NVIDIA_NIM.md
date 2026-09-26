# NVIDIA NIM Provider – DSH Integration Research

## Summary
NVIDIA NIM (NVIDIA Inference Microservices) offers hosted OpenAI-compatible inference endpoints via build.nvidia.com and downloadable containers for self-hosting. Authentication for hosted APIs is API-key Bearer token based; no OAuth flow is documented for the developer-program free tier.

## Authentication / Login Method
* Account creation via NVIDIA Developer Program / build.nvidia.com
  * Sign-in required to generate API key: *Sign In to Get Started with NVIDIA AI* [build.nvidia.com](https://build.nvidia.com/settings/api-keys)
  * Quickstart guide: *In the right hand pane of the model page, click Get API Key* [docs.api.nvidia.com](https://docs.api.nvidia.com/nim/docs/api-quickstart)
* API key format
  * NVIDIA developer API key generated at build.nvidia.com, personal key `nvapi-...` [raw.githubusercontent.com](https://raw.githubusercontent.com/api-evangelist/nvidia-nim/refs/heads/main/authentication/nvidia-nim-authentication.yml)
  * Usage: `NVIDIA_API_KEY` authorizes HTTP calls to NVIDIA-hosted NIMs for example `ai.api.nvidia.com` and `integrate.api.nvi` [docs.nvidia.com](https://docs.nvidia.com/nemo/retriever/26.8.1/extraction/api-keys/)
* Hosted API auth scheme
  * All NVIDIA NIM APIs share a common base URL and auth scheme:
    * **Base URL:** `https://integrate.api.nvidia.com/v1`
    * **Auth:** Bearer token via `Authorization: Bearer $NVIDIA_API_KEY`
    * **API Key:** Generate one at https://build.nvidia.com/settings [build.nvidia.com](https://build.nvidia.com/llms.txt)
  * Example request from llms.txt:
    ```bash
    curl https://integrate.api.nvidia.com/v1/chat/completions \
      -H "Authorization: Bearer $NVIDIA_API_KEY" \
      -d '{"model":"nvidia/llama-3.1-70b-instruct","messages":[{"role":"user","content":"Hello"}]}'
    ```
* OpenAPI security declaration
  * NVIDIA NIM secures its APIs with http across 1 declared security scheme [apis.io](https://apis.io/security/nvidia-nim/nvidia-nim-authentication/)

No OAuth endpoints, scopes, or token refresh are documented for the free developer-program hosted endpoints. API keys are static.

## API Base URLs & Compatibility
* Hosted catalog base URL: `https://integrate.api.nvidia.com/v1` [build.nvidia.com](https://build.nvidia.com/llms.txt)
* Alternative references:
  * `ai.api.nvidia.com` and `integrate.api.nvidia.com` mentioned in NeMo docs [docs.nvidia.com](https://docs.nvidia.com/nemo/retriever/26.8.1/extraction/api-keys/)
* OpenAI-compatible:
  * *All NIM model endpoints at integrate.api.nvidia.com/v1 implement the OpenAI Chat Completions API* [build.nvidia.com](https://build.nvidia.com/llms.txt)
  * API Reference – NVIDIA NIM for Large Language Models documents `/v1/health/ready`, `/v1/models` etc. [docs.nvidia.com](https://docs.nvidia.com/nim/large-language-models/latest/reference/api-reference.html)

## Registration Requirements
* Developer Program membership
  * *Members of the NVIDIA Developer Program have free access to NIM API endpoints for prototyping* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nvidia-nim-faq/300317)
  * *Developers can join the free NVIDIA Developer Program and access NIM at any time via the NVIDIA API Catalog* [docs.api.nvidia.com](https://docs.api.nvidia.com/nim/docs/product)
* Phone verification for API key generation
  * Account verification via SMS OTP is required on build.nvidia.com. Community reports frequent issues:
    * Manual Account Verification Request – Germany (+49) [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/manual-account-verification-request-germany-49/373764)
    * *I am experiencing the exact same issue. I entered my German phone number for verification* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/account-access-verification-update/360900/11)
    * Support instruction: *If you’re having issues verifying your account on build.nvidia.com, please send an email to help@build.nvidia.com* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/resolving-account-access-issues/345920/4)
* Email type
  * Free tier sign-up grants 1000 credits. *If you signed up to use the API catalog with a personal email address, you will be asked to provide a business email to activate a free 90-day NVIDIA AI Enterprise license and unlock additional 4000 credits* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-api-credits/305703)
* No PayPal requirement for free developer tier. Payment is only needed for production/commercial use.

## Free Tier Limits & Pricing
* Free access description
  * *Members of the NVIDIA Developer Program have free access to NIM API endpoints for prototyping, and to downloadable NIM microservices for research, application development, and experimentation on up to 16 GPUs* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nvidia-nim-faq/300317)
  * *Members of the NVIDIA Developer program have free access to NIM API endpoints for prototyping* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nvidia-nim-faq/300317)
* Credits
  * *The NVIDIA API catalog is a trial experience of NVIDIA NIM limited to 5000 free API credits. Upon sign-up, users are granted 1000 API credits* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-api-credits/305703)
  * *To obtain more, click on your profile from within the API catalog → ‘Request More’* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-api-credits/305703)
* Rate limits
  * *The rate of requests will vary per model queried and may vary based on the number of concurrent users. To verify rate limits of the models being used, please check your account at the top right* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nvidia-nim-faq/300317)
  * Community notes: Many users use free tier API access with model-dependent rate limit [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/api-rate-limit-increase-is-not-granted-by-requesting-it-here/368420)
* Pricing model
  * Production pricing: *To use NIM In production, your organization must have an NVIDIA AI Enterprise license. These licenses start at $4500 per GPU per year or ~ $1 per GPU per hour in the cloud* [docs.api.nvidia.com](https://docs.api.nvidia.com/nim/docs/product)
  * Usage-based pricing observed externally: *NVIDIA NIM uses usage-based pricing from $0.900–$1.20 per million tokens* [costbench.com](https://costbench.com/software/llm-api-providers/nvidia-nim/)
* Free Endpoint vs Downloadable
  * *NVIDIA-hosted “Free Endpoint” models These models run on infrastructure that NVIDIA hosts* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-question/364032/1)
  * *“Downloadable” NIM microservices are containerized microservices that you download and run on your own hardware* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-question/364032/1)
  * Developer program allows free self-host on up to 16 GPUs for research/development/testing.

## Germany Geo Restrictions & SMS Verification Issues
* No explicit country ban documented, but verification friction is high.
* Forum evidence of German numbers:
  * Manual Account Verification Request – Germany (+49) with SMS never arriving [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/manual-account-verification-request-germany-49/373764)
  * *I am experiencing the exact same issue. I entered my German phone number for verification and have been waiting for the* [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/account-access-verification-update/360900/11)
* Similar reports for Austria, Netherlands, etc., indicating global SMS delivery problems rather than a Germany-specific block.
* Workaround guidance from NVIDIA: contact help@build.nvidia.com for manual verification [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/resolving-account-access-issues/345920/4)

## GDPR / Data Residency
* NVIDIA provides a Data Processing Addendum for cloud services, defining NVIDIA as Data Processor [docs.nvidia.com](https://docs.nvidia.com/cloud-services-dpa.pdf) – referenced via DPA summary [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/llm-model-endpoints-data-residency/299709/1)
* Regional compute initiatives:
  * DGX Cloud Lepton connects Europe’s developers to regional GPU resources [nvidianews.nvidia.com](https://nvidianews.nvidia.com/news/nvidia-dgx-cloud-lepton-connects-europes-developers-to-global-nvidia-compute-ecosystem)
  * Partners in France, Italy, Poland, Spain and Sweden deliver sovereign models [investor.nvidia.com](https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Partners-With-Europe-Model-Builders-and-Cloud-Providers-to-Accelerate-Regions-Leap-Into-AI/default.aspx)
* Free hosted NIM endpoints are accelerated by DGX Cloud with no guaranteed EU data residency for the free developer tier. Self-hosting via downloadable NIM gives full data control.

## Scopes / Token Refresh
* No OAuth scopes documented for build.nvidia.com developer API keys.
* API key is static; no refresh token flow described. Authentication is Bearer API key per request.

## Workarounds for Geo-blocking / Germany with German mobile only, no payment
1. **Phone verification bypass**
   * Request manual verification via help@build.nvidia.com with email and phone details. Many users report manual review is the only path when SMS fails [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/resolving-account-access-issues/345920/4)
2. **Account creation from allowed region**
   * Use a business email to trigger the free 90-day AI Enterprise trial for additional 4000 credits [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-api-credits/305703]
3. **VPN considerations**
   * No official geo IP block documented for Germany. VPN is not required for API access once authenticated. VPN may complicate SMS delivery and account trust signals. If SMS is the blocker, VPN does not solve it.
4. **Self-host fallback**
   * Download NIM containers for local/GPU self-hosting – free for research/development/testing on up to 16 GPUs under Developer Program, avoiding hosted endpoint limits and data residency concerns [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nvidia-nim-faq/300317)
5. **Partner hosted endpoints**
   * Production-grade serverless NIM API on ecosystem partners e.g., Hugging Face with per-pay-use pricing includes AI Enterprise license [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-api-credits/305703]

## Citations
* API base URL & auth: [build.nvidia.com](https://build.nvidia.com/llms.txt)
* Quickstart Get API Key: [docs.api.nvidia.com](https://docs.api.nvidia.com/nim/docs/api-quickstart)
* FAQ free access: [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nvidia-nim-faq/300317)
* Credits 5000/1000: [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-api-credits/305703)
* Free Endpoint vs Downloadable: [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/nim-question/364032/1)
* German SMS issue: [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/manual-account-verification-request-germany-49/373764)
* Verification update: [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/account-access-verification-update/360900)
* Support email: [forums.developer.nvidia.com](https://forums.developer.nvidia.com/t/resolving-account-access-issues/345920/4)
* Pricing $4500/GPU/year: [docs.api.nvidia.com](https://docs.api.nvidia.com/nim/docs/product)
* Usage pricing $0.9-$1.2/M tokens: [costbench.com](https://costbench.com/software/llm-api-providers/nvidia-nim/)
* DGX Cloud Lepton Europe: [nvidianews.nvidia.com](https://nvidianews.nvidia.com/news/nvidia-dgx-cloud-lepton-connects-europes-developers-to-global-nvidia-compute-ecosystem)

*Report generated 2026-09-17*
