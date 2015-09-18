var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var httpclient = require('/lib/httpclient');

// Handle GET request
exports.get = handleGet;

// Handle POST request
exports.post = handlePost;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('form.html');
        var model = createModel();

        return {
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        var model = {};

        var siteConfig = portal.getSiteConfig();
        model.recaptchaSiteKey = siteConfig.recaptchaSiteKey || '';

        var component = portal.getComponent();
        // Form post url is this component path
        model.postUrl = portal.componentUrl({
            component: component.path
        });

        return model;
    }

    return renderView();
}

function handlePost(req) {
    var siteConfig = portal.getSiteConfig();

    // Check with Google if user is verified
    var recaptchaResponse = httpclient.post({
        'url': 'https://www.google.com/recaptcha/api/siteverify',
        'params': {
            'secret': siteConfig.recaptchaSecretKey || '',
            'response': req.params['g-recaptcha-response']
        }
    });

    var recaptcha = JSON.parse(recaptchaResponse);

    return {
        contentType: 'text/json',
        body: {
            recaptchaValidated: recaptcha.success
        }
    }
}