var UTIL = require('/lib/enonic/util/util');
var menu = require('/lib/enonic/menu/menu');
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
        model.sitePath = me.site['_path'];
        model.currentPath = me.content._path;
        model.pageTitle = getPageTitle();
        model.metaDescription = getMetaDescription();
        model.menuItems = menu.getMenuTree(3);
        model.siteName = me.site.displayName;

        return model;
    }

    function getPageTitle() {
        return me.content['displayName'] + ' - ' + me.site['displayName'];
    }

    function getMetaDescription() {
        var appNamePropertyName = app.name.replace(/\./g,'-');
        var metaDescription = null;

        if (me.content.x[appNamePropertyName]) {
            if (me.content.x[appNamePropertyName]['html-meta']) {
                if (me.content.x[appNamePropertyName]['html-meta']['htmlMetaDescription']) {
                    metaDescription = me.content.x[appNamePropertyName]['html-meta']['htmlMetaDescription'];
                }
            }
        }
        return metaDescription;
    }

    return renderView();
}