import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import models from '../../db/models';

const { User } = models;

dotenv.config();
const {
  SECRET_KEY,
} = process.env;

/**
 * Check Email existence
 *
 * @param {String} email fhhj
 * @returns {Boolean} true if email exists
 * @returns {Boolean} false if email does not exist
 */
export const checkEmailExistence = async (email) => {
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    return false;
  }
  return true;
};

/**
 * Check Email existence to prevent duplication
 * @param {String} email email to be checked
 @ @param {String} username username to be checked
 * @returns {Boolean} true if record exists
 * @returns {Boolean} false if record does not exist
 */

export const checkDuplicateUser = async (email, username) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }]
    }
  });
  if (existingUser === null) {
    return false;
  }
  return true;
};

export const errorResponse = (res, statusCode, message, errors) => res.status(statusCode).json({
  status: 'error',
  message,
  errors
});

export const successResponse = (res, statusCode, message, data) => res.status(statusCode).json({
  status: 'success',
  message,
  data
});

export const generateToken = async (payload) => {
  const token = await jwt.sign(payload, SECRET_KEY, {
    expiresIn: '14d',
  });
  return token;
};

export const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header === 'undefined') {
    return errorResponse(res, 401, 'You are not authorized to make this action');
  }

  const token = header.split(' ')[1];
  if (!token) {
    return errorResponse(res, 401, 'You are not authorized to make this action please login');
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};