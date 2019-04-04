import {
  generateToken, verifyToken, errorResponse, successResponse,
} from '../utils/helpers';
import models from '../../db/models';
import sendMailer from '../../config/mailConfig';

const { User } = models;

/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const tokenPayload = { id: user.id, email: user.email };
    const token = await generateToken(tokenPayload);
    const url = process.env.NODE_ENV === 'test' ? `${process.env.LOCAL_URL}/${token}` : `${process.env.PRODUCTION_URL}/${token}`;
    const emailDetails = {
      receivers: [`${user.email}`],
      subject: 'Verification email',
      text: '',
      html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
    };
    sendMailer(emailDetails);
    return successResponse(res, 201, 'You have successfully registered however you would need to check your mail to verify your account', [{ token }]);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

export const confirmUser = async (req, res) => {
  try {
    const decoded = await verifyToken(req.params.token);
    const { id } = decoded;
    const response = await User.update(
      { isEmailVerified: true },
      { returning: true, where: { id } },
    );
    const responseData = {
      confirmed: response[1][0].isEmailVerified,
    };
    return successResponse(res, 200, 'Your account has been verified', responseData);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
