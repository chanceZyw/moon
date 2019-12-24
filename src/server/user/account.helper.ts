const accountReg = /\bw+\@w+\.com\b | d+/g;
const passwordLevel = /[a-z]+/g;

export const isAccount = (ac: String) => ac.match(accountReg);
export const upPasswordLevel = (pw: String) => pw.match(passwordLevel);
