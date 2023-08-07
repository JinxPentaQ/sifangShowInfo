/**
 * 邮箱校验
 * */
export var checkEmail = (value) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return mailReg.test(value.trim());
}
