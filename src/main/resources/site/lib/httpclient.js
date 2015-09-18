exports.post = function (params) {
    var bean = __.newBean('com.enonic.xp.lib.http.HttpClientHandler');

    bean.method = 'post';
    //bean.params = params;

    return __.toNativeObject(bean.execute());
};