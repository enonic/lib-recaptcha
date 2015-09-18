# lib-recaptcha

Protect your website from spam and abuse while letting real people pass through with ease.
This library will let you add the popular [reCAPTCHA](https://developers.google.com/recaptcha/) service to your Enonic XP app.

## Compatibility

To be updated...

## Configuration

Create your reCAPTCHA API keys on the [official reCAPTCHA site](https://www.google.com/recaptcha/admin). The site key and secret key generated will be used to configure the lib on your site.


### site.xml
The site.xml for your app needs to be updated with two input fields for reCAPTCHA configuration (secret key and site key).

    <?xml version="1.0" encoding="UTF-8"?>
    <site>
      <config>
        <input type="Text" name="recaptchaSecretKey">
          <label>Secret Key for reCAPTCHA</label>
          <occurrences minimum="0" maximum="1"/>
        </input>
        <input type="Text" name="recaptchaSiteKey">
          <label>Site Key for reCAPTCHA</label>
          <occurrences minimum="0" maximum="1"/>
        </input>
      </config>
    </site>

## Usage example
The part "form" contains a simple usage example, which simply outputs a line of text (did it succeed or not) after submitting the form.
