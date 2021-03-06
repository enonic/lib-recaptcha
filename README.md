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
    include "com.enonic.lib:lib-recaptcha:3.0.0"
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

The part "form" contains a simple usage example, which simply outputs a line of text (did it succeed or not) after submitting the form.

### Part controller (/src/resources/parts/my-form/my-form.js)

```javascript
const portal = require('/lib/xp/portal');
const thymeleaf = require('/lib/thymeleaf');
const recaptcha = require('/lib/recaptcha');

const view = resolve('form.html');

// Handle GET request
exports.get = handleGet;

// Handle POST request
exports.post = handlePost;

function handleGet(req) {

    function renderView() {
        const model = createModel(req);

        return {
            body: thymeleaf.render(view, model),
            pageContributions: {
                headBegin: [
                    `<script src="https://www.google.com/recaptcha/api.js?render=${recaptcha.getSiteKey()}"></script>`
                    '<script src="http://code.jquery.com/jquery-3.4.0.min.js"></script>'
                    ]
            }
        };
    }

    function createModel(req) {
        const model = {};

        model.recaptchaSiteKey = recaptcha.getSiteKey();
        model.recaptchaIsConfigured = recaptcha.isConfigured();

        // Check for live edit mode (we don't show the captcha in live edit mode)
        model.editMode = req.mode === 'edit';

        // The form post url is this component path
        const component = portal.getComponent();
        model.postUrl = portal.componentUrl({
            component: component.path
        });

        return model;
    }

    return renderView();
}

function handlePost(req) {
    // Verify the response
    const recaptchaResponse = recaptcha.verify(req.params['token']);
    let verify = false;

    if (recaptchaResponse.success && recaptchaResponse.score > 0.5) {
        verify = true;
    }

    return {
        contentType: 'application/json',
        body: JSON.stringify({
            recaptchaVerified: verify
        })
    }
}
```

### Part view (/src/resources/parts/my-form/my-form.html)

```html
<form method="POST" action="" data-th-action="${postUrl}" id="recaptchaForm">
    <div>
        <label>
            <span>Name:</span>
            <input type="text" name="name" />
        </label>
        <br /><br />
        <div
            data-th-if="${recaptchaIsConfigured and !editMode}"
            class="g-recaptcha"
            data-th-attr="data-sitekey=${recaptchaSiteKey}"
            data-sitekey="124"
            data-callback="recaptchaCallback"
        ></div>
        <div data-th-if="${!recaptchaIsConfigured}">
            Please configure reCAPTCHA
        </div>
        <br />
        <input type="submit" value="Submit" id="submit-button" />
    </div>
</form>

<div id="formResult" style="display: none;"></div>

<script>
    // Enables the submit button when CAPTCHA is verified
    function recaptchaCallback(token) {
        var submitBtn = document.getElementById("submit-button");
        submitBtn.removeAttribute("disabled");
    
        $("#recaptchaForm").submit(function (e) {
            var postData = $(this).serializeArray();
            // token included to the backend
            postData.push({name: "token", value, token});
            var formURL = $(this).attr("action");

            // Simple ajax submit with check if recaptcha verified ok or not
            $.ajax({
                type: "POST",
                url: formURL,
                data: postData,
                success: function (data) {
                    $("#recaptchaForm").hide();
                    var result;
                    if (data.recaptchaVerified) {
                        result = "Woohooo, it worked :)";
                    } else {
                        result = "Oh no, try again :(";
                    }
                    $("#formResult").text(result).show();
                },
                dataType: "json",
            });

            e.preventDefault();
        });
    };
</script>
```
