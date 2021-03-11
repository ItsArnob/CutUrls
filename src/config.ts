export const port = process.env.PORT ?? 8080;
export const mongodbUri = process.env.MONGODB_URI ?? "";
export const dbName = process.env.DB_NAME ?? "CutUrls";
export const urlCollection = process.env.SHORTURL_COLLECTION ?? "shortened_urls";
export const multiShortURLPerLink = process.env.ALLOW_MULTIPLE_SHORTULR_PER_LINK ? process.env.ALLOW_MULTIPLE_SHORTULR_PER_LINK == "true" ? true : false : true;
export const shortUrlIdLength = process.env.SHORTURLID_LENGTH ? parseInt(process.env.SHORTURLID_LENGTH) : 6;
export const retryIdGen = process.env.RETRY_IDGEN_COUNT ? parseInt(process.env.RETRY_IDGEN_COUNT) : 3;
export const bannedIds = process.env.BANNED_CUSTOMIDS ? ["home", "about", "info", "tos", "contact", "urls", "credits", "credit", "static", "login", "signup",...process.env.BANNED_CUSTOMIDS.split(" ")] : ["home", "about", "info", "tos", "contact", "urls", "credits", "credit", "static"];
export const waitBeforeRedirect = process.env.WAIT_BEFORE_REDIRECT ? parseInt(process.env.WAIT_BEFORE_REDIRECT) : 5;