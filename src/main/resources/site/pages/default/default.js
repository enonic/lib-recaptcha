var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var me = this;

    function renderView() {
        var view = resolve('default.html');
        var model = createModel();

        return {
            body: thymeleaf.render(view, model)
        };
    }

    function createModel() {
        me.site = portal.getSite();
        me.content = portal.getContent();

        var model = {};
        model.mainRegion = me.content.page.regions['main'];
        return model;
    }

    return renderView();
}