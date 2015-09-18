package com.enonic.xp.lib.http;

public final class HttpClientHandler
{
    private String method;

    public void setMethod( final String method )
    {
        this.method = method;
    }

    public String execute()
    {
        System.out.println( "EXECUTE" );
        return "Request: " + method;
    }

}
