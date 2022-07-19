export const expirationDate = (rememberMe: boolean): Date => {
  const now = new Date();
  let expireTime;
  expireTime = now.getTime() + 60 * 1000;
  if (rememberMe) {
    expireTime = now.getTime() + 24 * 60 * 60 * 1000;
  }
  now.setTime(expireTime);
  return now;
};
