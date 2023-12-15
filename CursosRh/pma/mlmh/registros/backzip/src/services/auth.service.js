const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { OtpToken } = require('../models');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Login with username and password
 * @param {string} cpf
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithCpfAndPassword = async (username, password) => {
  const user = await userService.getUserByCpf(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'CPF ou senha incorreto');
  }

  if (user.acesso) {
    return user;
  }
  return { message: 'Primeiro acesso' };
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

const resetPasswordPrimeiroAcesso = async (cpf, newPassword) => {
  const user = await userService.getUserByCpf(cpf);
  if (!user) {
    throw new Error();
  }
  await userService.updateUserById(user.id, { password: newPassword });
  await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

const createOtp = async (email) => {
  const user = await userService.getUserByEmail(email);
  const otpToken = `${Math.floor(1000 + Math.random() * 9000)}`;
  const saltRounds = 10;
  const hashedOTP = await bcrypt.hash(otpToken, saltRounds);

  OtpToken.create({
    userId: user._id,
    otpToken: hashedOTP,
    expires: Date.now() + 3600000,
  });

  const data = {
    otpToken,
    user,
  };

  return data;
};

const compareOtpToken = async (email, otpToken) => {
  const user = await userService.getUserByEmail(email);
  const userToken = await OtpToken.findOne({ userId: user._id });
  if (!userToken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token não encontrado!');
  }

  const expiresToken = userToken.expires;
  if (expiresToken < Date.now()) {
    await OtpToken.deleteMany({ userId: user._id });
    throw new ApiError(httpStatus.NOT_FOUND, 'Código expirado, Por favor, peça um novo código');
  }

  const hashedOtp = userToken.otpToken;
  const validOtp = await bcrypt.compare(otpToken, hashedOtp);
  if (!validOtp) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Código inválido, cheque seu email');
  }

  user.acesso = false;
  await OtpToken.updateOne({ userId: user._id }, { verificado: true });
  await OtpToken.deleteMany({ userId: user._id });

  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginUserWithCpfAndPassword,
  resetPasswordPrimeiroAcesso,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  createOtp,
  compareOtpToken,
};
