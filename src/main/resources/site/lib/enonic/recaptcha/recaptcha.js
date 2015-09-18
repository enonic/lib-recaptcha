var portal = require('/lib/xp/portal');
var siteConfig = portal.getSiteConfig();

/**
 * The reCAPTCHA site key
 * @type {string}
 */
exports.siteKey = siteConfig.recaptchaSiteKey || '';

/**
 * The reCAPTCHA secret key
 * @type {string}
 */
exports.secretKey = siteConfig.recaptchaSecretKey || '';

/**
 * Checks with Google if user is verified
 * @returns {boolean}
 */
exports.verify = function(response) {
    var url = 'https://www.google.com/recaptcha/api/siteverify';

    var recaptchaVerified = post({
        'url': url,
        'params': {
            'secret': exports.secretKey,
            'response': response
        }});

    var recaptchaVerifiedJSON = JSON.parse(recaptchaVerified);

    return recaptchaVerifiedJSON.success;
};

/**
 * Check if site key and secret key are configured
 * @returns {boolean}
 */
exports.isConfigured = function() {
    var isConfigured = exports.siteKey && exports.secretKey ? true : false;

    return isConfigured;
};

/**
 *
 * @param params
 * @returns {*}
 */
function post(params) {
    var bean = __.newBean('com.enonic.xp.lib.http.HttpClientHandler');

    bean.url = params.url;
    bean.params = params.params;

    return __.toNativeObject(bean.execute());
}