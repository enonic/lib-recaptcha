# Types for reCAPTCHA library

Type definitions for the [Enonic XP reCAPTCHA library](https://github.com/enonic/lib-recaptcha).

## Install

```bash
npm i --save-dev @enonic-types/lib-recaptcha
```

## Setup

Add lib-recaptcha to `compilerOptions.paths` in the `tsconfig.json` file used for your application's server-side TypeScript code:

```json
{
  "compilerOptions": {
    "paths": {
      "/lib/recaptcha": ["./node_modules/@enonic-types/lib-recaptcha"]
    }
  }
}
```

## Use

```ts
import type {Request, Response} from '@enonic-types/core';
import {getSiteKey, isConfigured, verify} from '/lib/recaptcha';

export function get(req: Request): Response {
    return {
        body: {
            siteKey: getSiteKey(),
            isConfigured: isConfigured(),
        },
        contentType: 'application/json',
    };
}

export function post(req: Request): Response {
    const result = verify(req.params['g-recaptcha-response'] as string);
    const ok = result.success && (result.score === undefined || result.score > 0.5);
    return {
        body: ok ? 'Verified' : 'Failed',
        contentType: 'text/plain',
    };
}
```

All imports from `/lib/recaptcha` should now be typed.

## API

### `getSiteKey(): string`

Returns the reCAPTCHA site key configured on the current site, or an empty string if none is configured.

### `getSecretKey(): string`

Returns the reCAPTCHA secret key configured on the current site, or an empty string if none is configured.

### `isConfigured(): boolean`

Returns `true` when both the site key and secret key are configured on the current site.

### `verify(response: string): VerifyResponse`

Verifies a reCAPTCHA response token with Google's siteverify endpoint. `response` is the token produced by the reCAPTCHA client widget (the `g-recaptcha-response` form field for v2, or the result of `grecaptcha.execute(...)` for v3).

### `VerifyResponse`

| Property       | Type       | Description                                                                 |
|----------------|------------|-----------------------------------------------------------------------------|
| `success`      | `boolean`  | Whether this request was a valid reCAPTCHA token for your site.             |
| `challenge_ts` | `string`   | Timestamp of the challenge load (ISO format `yyyy-MM-dd'T'HH:mm:ssZZ`).      |
| `hostname`     | `string`   | The hostname of the site where the reCAPTCHA was solved.                    |
| `score`        | `number?`  | The score for this request (0.0 - 1.0). reCAPTCHA v3 only.                  |
| `action`       | `string?`  | The action name for this request. reCAPTCHA v3 only.                        |
| `error-codes`  | `string[]?`| Error codes returned by Google when `success` is `false`.                   |

See the [siteverify API response](https://developers.google.com/recaptcha/docs/verify#api_response) for details.

`Request` and `Response` are imported from [`@enonic-types/core`](https://www.npmjs.com/package/@enonic-types/core).

## Documentation

[reCAPTCHA library](https://github.com/enonic/lib-recaptcha#readme)
