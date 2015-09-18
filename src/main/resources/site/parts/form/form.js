var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

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

        model.recaptchaSiteKey = '6LdjDQ0TAAAAAP5jorxHpl7k5nvjYPMUUZs7dVC7';

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

    return {
        contentType: 'text/json',
        body: {
            recaptchaValidated: recaptchaValidated
        }
    }
}