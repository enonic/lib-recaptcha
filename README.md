# lib-recaptcha

Protect your website from spam and abuse while letting real people pass through with ease.
This library will let you add the popular [reCAPTCHA](https://developers.google.com/recaptcha/) service to your Enonic XP app.
Support v2 and v3 of reCAPTCHA.

## Compatibility

| Lib version | XP version |
| ----------- | ---------- |
| 3.0.0       | 7.0.0      |
| 2.0.0       | 7.0.0      |
| 1.1.2       | 6.2.1      |
| 1.1.1       | 6.2.1      |
| 1.1.0       | 6.1.0      |
| 1.0.1       | 6.0.0      |
| 1.0.0       | 6.0.0      |

## Configuration

Create your reCAPTCHA API keys on the [official reCAPTCHA site](https://www.google.com/recaptcha/admin). The site key and secret key generated will be used to configure the lib on your site.

### Gradle build dependency

```
dependencies {
    include "com.enonic.lib:lib-recaptcha:4.0.0"
}

repositories {
    maven {
        url 'http://repo.enonic.com/public'
    }
}
```

### site.xml

The site.xml for your app needs to be updated with a mixin reference that will add the reCAPTCHA configuration (secret key and site key).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<site>
  <form>
    <mixin name="recaptcha"/>
  </form>
</site>
```

### ReCAPTCHA widget configuration

How the reCAPTCHA widget is displayed can be configured according to the [official reCAPTCHA documentation](https://developers.google.com/recaptcha/docs/display/).
As an example, the color scheme and size of the widget can be tuned. reCAPTCHA also supports audio CAPTCHA.

## Usage example

Minimal reCAPTCHA **v2 checkbox** wiring for a part: render the widget on GET, verify the token on POST.

### Part controller (`src/main/resources/parts/my-form/my-form.js`)

```javascript
const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');
const recaptcha = require('/lib/recaptcha');

const view = resolve('my-form.html');

exports.get = function () {
    const model = {
        siteKey: recaptcha.getSiteKey(),
        isConfigured: recaptcha.isConfigured(),
        postUrl: portal.componentUrl({ component: portal.getComponent().path })
    };
    return {
        body: thymeleaf.render(view, model),
        pageContributions: {
            headBegin: [
                '<script src="https://www.google.com/recaptcha/api.js" async defer></script>'
            ]
        }
    };
};

exports.post = function (req) {
    const result = recaptcha.verify(req.params['g-recaptcha-response']);
    return {
        contentType: 'text/plain',
        body: result.success ? 'Verified' : 'Failed'
    };
};
```

### Part view (`src/main/resources/parts/my-form/my-form.html`)

```html
<form method="POST" data-th-action="${postUrl}">
    <input type="text" name="name" />
    <div data-th-if="${isConfigured}" class="g-recaptcha" data-th-attr="data-sitekey=${siteKey}"></div>
    <p data-th-if="${!isConfigured}">Please configure reCAPTCHA in the site settings.</p>
    <button type="submit">Submit</button>
</form>
```

The reCAPTCHA script injects a hidden `g-recaptcha-response` field into the form when the user solves the
challenge; a normal form POST then delivers it to the controller for `recaptcha.verify(...)`.

### reCAPTCHA v3

For [v3](https://developers.google.com/recaptcha/docs/v3) (score-based, no visible widget), load the API with
your site key and pass the token you obtain from `grecaptcha.execute(...)` to `recaptcha.verify(token)`. The
response includes a `score` (0.0 – 1.0) and an `action`; decide your own threshold, e.g.:

```javascript
const result = recaptcha.verify(token);
const ok = result.success && result.score > 0.5;
```
