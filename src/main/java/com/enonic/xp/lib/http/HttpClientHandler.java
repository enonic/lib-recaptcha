package com.enonic.xp.lib.http;

import java.io.IOException;
import java.util.Map;

import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

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
        throws IOException
    {
        System.out.println( "EXECUTE" );

        final RequestBody requestBody = generateRequestBody();
        sendRequest( url, requestBody );

        return "Request: " + method;

    }

    private RequestBody generateRequestBody()
    {
        final StringBuilder content = new StringBuilder( "{" );
        for ( Map.Entry<String, String> param : params.entrySet() )
        {
            content.append( param.getKey() ).append( ":" ).append( param.getValue() );
        }
        content.append( "}" );
        return RequestBody.create( MediaType.parse( "application/x-www-form-urlencoded; charset=utf-8" ), content.toString() );
    }

    private String sendRequest( final String url, final RequestBody post )
        throws IOException
    {
        final OkHttpClient okHttpClient = new OkHttpClient();

        //Builds the request
        Request.Builder requestBuilder = new Request.Builder().url( url );
        if ( post != null )
        {
            requestBuilder.post( post );
        }
        Request request = requestBuilder.build();

        //Executes the request
        Response response = okHttpClient.newCall( request ).execute();
        System.out.println( "Message: " + response.message() );
        final String responseBody = response.body().string();
        System.out.println( "ResponseBody: " + responseBody );
        return responseBody;
    }

}
