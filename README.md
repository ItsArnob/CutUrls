# CutUrls
a simple self-hosted URL shortener 

Im new to typescript, using this project to learn more about it.

This project's UI is inspired by [https://kutt.it](https://kutt.it).

# Environment variables

defaults are in src/config.ts

- PORT  (default: 8080)
- HOSTNAME (default: "")
- MONGODB_URI (required)
- DB_NAME (default: CutUrls)
- SHORTURL_COLLECTION (default: shortened_urls)
- ALLOW_MULTIPLE_SHORTULR_PER_LINK (default: true) 
- SHORTURLID_LENGTH (default: 6)
- RETRY_IDGEN_COUNT (default: 3)
- BANNED_CUSTOMIDS (default: home about info tos contact urls credits credit. Separated with space.)
- WAIT_BEFORE_REDIRECT (default: 5. Gives the user "Redirecting to example.com in 5 seconds". If 0 is provided then users directly get redirected.)

# Credits
 The icons used in this project are from [https://www.flaticon.com/](https://www.flaticon.com/).
 These icons are made by:
 - [https://www.flaticon.com/authors/vectors-market](https://www.flaticon.com/authors/vectors-market)
 - [https://www.freepik.com](https://www.freepik.com)
 - [https://www.flaticon.com/authors/google](https://www.flaticon.com/authors/google)
