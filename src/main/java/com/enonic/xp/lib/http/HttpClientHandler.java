package com.enonic.xp.lib.http;

import java.util.Map;

public final class HttpClientHandler
{
    private String method;

    private String url;

    private Map<String, String> params;

    public void setMethod( final String method )
    {
        this.method = method;
    }

    public void setUrl( final String url )
    {
        this.url = url;
    }

    public void setParams( final Map<String, String> params )
    {
        this.params = params;
    }

    public String execute()
    {
        System.out.println( "EXECUTE" );
        return "Request: " + method;
    }

}
