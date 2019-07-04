module.exports = function(err, req, res, next) {
  console.log(err)
  const stringifiedErr = JSON.stringify(err);
  if (err.code === 404) {
    res.status(err.code).json({
      message: 'Invalid ' + err.resource,
    });
  } else if (stringifiedErr.indexOf('ValidatorError') !== -1) {
    const mongooseErrors = err.errors;
    const errors = [];

    for (let key in mongooseErrors) {
      errors.push(mongooseErrors[key].message);
    }

    res.status(400).json({ errors });
  } else if (stringifiedErr.indexOf('E11000') !== -1) {
    let errors = null;

    if (stringifiedErr.indexOf('email') !== -1) {
      errors = ['Email is already in use'];
    } else {
      errors = ['Phone Number is already in use'];
    }

    res.status(400).json({ errors });
  } else {
    const status = err.code || 500
    const message = err.msg || 'Internal server error, check the console'
    res.status(status).json({
      message: message,
    });
  }
};