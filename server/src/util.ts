export const escapeRegExp = (value: string) =>
  value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
