exports.login = function (params) {
    var bean = __.newBean('com.enonic.xp.lib.http.HttpClientHandler');

    bean.params = params;

    return __.toNativeObject(bean.execute());
};