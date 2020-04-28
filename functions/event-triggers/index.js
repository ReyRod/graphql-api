// Import and use function to handle each trigger (by trigger name) on operation

const triggersHandle = {
  INSERT: {

  },
  UPDATE: {

  },
  DELETE: {

  }
};

exports.handler = async args => {
  const body = JSON.parse(args.body);
  const {
    event: {
      op,
      data: { old: oldData, new: newData }
    },
    table
  } = body;

  if (triggersHandle[op] && triggersHandle[op][table.name]) {
    return triggersHandle[op][table.name](newData, oldData).then(() => {
      return {
        statusCode: 200,
        body: 'success',
      };
    }).catch((error) => {
      console.log('error', error);
      return {
        statusCode: 404,
        body: error
      };
    });
  } else {
    return {
      statusCode: 404,
      body: 'No trigger associated'
    };
  }
};
