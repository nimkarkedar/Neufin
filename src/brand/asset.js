// Resolves a file in /public against the site's base path, so the site works at / and at /neufin-brand/.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
