# url-shortener
a simple self-hosted URL shortener 

Im new to typescript, using this project to learn more about it.

# Environment variables

defaults are in src/config.ts

- PORT  (default: 8080)
- MONGODB_URI (required)
- DB_NAME (default: url_shortener)
- SHORTURL_COLLECTION (default: shortened_urls)
- ALLOW_MULTIPLE_SHORTULR_PER_LINK (default: true) 
- HORTURLID_LENGTH (default: 6)
- RETRY_IDGEN_COUNT (default: 3)
- BANNED_CUSTOMIDS (default: home about info tos contact urls credits credit. Separated with space.)