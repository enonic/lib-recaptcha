var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var recaptcha = require('/lib/enonic/recaptcha/recaptcha');

// Handle GET request
exports.get = handleGet;

// Handle POST request
exports.post = handlePost;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('form.html');
        var model = createModel(req);

        return {
            body: thymeleaf.render(view, model),
            pageContributions: {
                headEnd: [
                    '<script src="https://www.google.com/recaptcha/api.js"></script>',
                    '<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>'
                    ]
            }
        };
    }

    function createModel(req) {
        var model = {};

        model.recaptchaSiteKey = recaptcha.siteKey;
        model.recaptchaIsConfigured = recaptcha.isConfigured();

        model.editMode = req.mode === 'edit';

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
    var recaptchaVerified = recaptcha.verify(req.params['g-recaptcha-response']);

    return {
        contentType: 'text/json',
        body: {
            recaptchaVerified: recaptchaVerified
        }
    }
}