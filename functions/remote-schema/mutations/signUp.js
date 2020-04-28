const AWS = require('aws-sdk');
const apollo = require('apollo-server-lambda');

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const signUp = async (parent, args) => {
  const { email, password } = args;
  if (!email || !password) {
    throw new apollo.UserInputError('You must specify the email and password');
  }

  return cognitoIdentityServiceProvider.signUp({
    Username: email,
    Password: password,
    ClientId: process.env.COGNITO_CLIENT_ID,
  }).promise().then(() => 'Signed up successfully, please check your email')
    .catch((error) => {
      throw new apollo.AuthenticationError(error.message)
    });
};

exports.default = signUp;
