# lib-recaptcha

This library will let you add the popular [reCAPTCHA](https://developers.google.com/recaptcha/) service to your Enonic XP app.

## Configuration

Create your reCAPTCHA API keys on the [official reCAPTCHA site](https://www.google.com/recaptcha/admin). The site key and secret key generated will be used to configure the lib on your site.


### site.xml
The site.xml for your app needs to be updated with two input fields for reCAPTCHA configuration (secret key and site key).

    <?xml version="1.0" encoding="UTF-8"?>
    <site>
      <config>
        <input type="Text" name="recaptchaSecretKey">
          <label>Secret Key for reCAPTCHA</label>
          <custom-text/>
          <help-text/>
          <occurrences minimum="0" maximum="1"/>
        </input>
        <input type="Text" name="recaptchaSiteKey">
          <label>Site Key for reCAPTCHA</label>
          <custom-text/>
          <help-text/>
          <occurrences minimum="0" maximum="1"/>
        </input>
      </config>
    </site>
