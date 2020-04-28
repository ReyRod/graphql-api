'use strict';

module.exports.handler = (event, context, callback) => {
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        'https://hasura.io/jwt/claims': JSON.stringify({
          'x-hasura-allowed-roles': ['anonymous', 'user'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': event.request.userAttributes.sub
        })
      }
    }
  };

  callback(null, event);
};
