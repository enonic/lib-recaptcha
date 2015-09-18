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

        model.recaptchaSiteKey = '6LcECg0TAAAAAMdq2r1sItYGOO6-JdRzIYqvPpof';

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

    var recaptchaValidated = false;

    log.info('Captcha response code: ' + req.params['g-recaptcha-response']);

    var recaptchaResponse = httpclient.post({
        'url': 'https://www.google.com/recaptcha/api/siteverify',
        'params': {
            'secret': '6LcECg0TAAAAADcLwAVP_Vn1NopZqprng5LrY7Qh',
            'response': req.params['g-recaptcha-response']
        }
    });
    log.info('Captcha response: ' + recaptchaResponse);
    var recaptcha = JSON.parse(recaptchaResponse);


    return {
        contentType: 'text/json',
        body: {
            recaptchaValidated: recaptcha.success
        }
    }
}