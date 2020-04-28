const AWS = require('aws-sdk');
const apollo = require('apollo-server-lambda');

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const signIn = async (parent, args) => {
  const { email, password } = args;
  if (!email || !password) {
    throw new apollo.UserInputError('You must specify the email and password');
  }

  return cognitoIdentityServiceProvider.initiateAuth({
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
    ClientId: process.env.COGNITO_CLIENT_ID,
  }).promise().then((result) => result.AuthenticationResult)
    .catch((error) => {
      throw new apollo.AuthenticationError(error.message)
    });
};

exports.default = signIn;
