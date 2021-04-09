const portal = require('/lib/xp/portal');
const httpClient = require('/lib/http-client');

/**
 * The reCAPTCHA site key
 * @type {string}
 */
exports.getSiteKey = function() {
    return portal.getSiteConfig().recaptchaSiteKey || '';
};

/**
 * The reCAPTCHA secret key
 * @type {string}
 */
exports.getSecretKey = function() {
    return portal.getSiteConfig().recaptchaSecretKey || '';
};

/**
 * Checks with Google if user is verified
 * @returns {Object}
 * {
        "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
        "score": number             // the score for this request (0.0 - 1.0)
        "action": string            // the action name for this request (important to verify)
        "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
        "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
        "error-codes": [...]        // optional
    }
 */
exports.verify = function(response) {
    var url = 'https://www.google.com/recaptcha/api/siteverify';

    var response = post({
        'url': url,
        'params': {
            'secret': exports.getSecretKey(),
            'response': response
        }
    });

    return JSON.parse(response.body);
};

/**
 * Check if site key and secret key are configured
 * @returns {boolean}
 */
exports.isConfigured = function() {
    var isConfigured = exports.getSiteKey() && exports.getSecretKey() ? true : false;

    return isConfigured;
};

/**
 *
 * @param params
 * @returns {*}
 */
function post(params) {
    return httpClient.request({
        url: params.url,
        method: 'POST',
        body: 'secret=' + params.params.secret + '&response=' + params.params.response,
        contentType: 'application/x-www-form-urlencoded'
    });

}