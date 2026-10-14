declare module "/lib/recaptcha" {
    /**
     * Google's siteverify response.
     *
     * `score` and `action` are only present when the token was produced by
     * reCAPTCHA v3. `error-codes` is present when `success` is `false`.
     *
     * @see https://developers.google.com/recaptcha/docs/verify#api_response
     */
    export interface VerifyResponse {
        /** Whether this request was a valid reCAPTCHA token for your site. */
        success: boolean;
        /** Timestamp of the challenge load (ISO format `yyyy-MM-dd'T'HH:mm:ssZZ`). */
        challenge_ts: string;
        /** The hostname of the site where the reCAPTCHA was solved. */
        hostname: string;
        /** The score for this request (0.0 - 1.0). reCAPTCHA v3 only. */
        score?: number;
        /** The action name for this request. reCAPTCHA v3 only. */
        action?: string;
        /** Error codes returned by Google when `success` is `false`. */
        "error-codes"?: string[];
    }

    /**
     * Returns the reCAPTCHA site key configured on the current site,
     * or an empty string if none is configured.
     */
    export function getSiteKey(): string;

    /**
     * Returns the reCAPTCHA secret key configured on the current site,
     * or an empty string if none is configured.
     */
    export function getSecretKey(): string;

    /**
     * Verifies a reCAPTCHA response token with Google's siteverify endpoint.
     *
     * @param response The token produced by the reCAPTCHA client widget.
     * @returns The parsed siteverify response from Google.
     */
    export function verify(response: string): VerifyResponse;

    /**
     * Returns `true` when both the site key and secret key are configured
     * on the current site.
     */
    export function isConfigured(): boolean;
}

export {};
