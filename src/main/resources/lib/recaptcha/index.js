var portal = require('/lib/xp/portal');
var httpClient = require('/lib/http-client');

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
 * @returns {boolean}
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

    var responseBody = JSON.parse(response.body);

    return responseBody.success;
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