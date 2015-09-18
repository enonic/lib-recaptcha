exports.post = function (params) {
    var bean = __.newBean('com.enonic.xp.lib.http.HttpClientHandler');

    bean.method = 'post';
    bean.url = params.url;
    bean.params = params.params;

    return __.toNativeObject(bean.execute());
};