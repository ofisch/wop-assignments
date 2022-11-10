'use strict';
// userController
const {getUser, getAllUsers, addUser} = require('../models/userModel');
const {validationResult} = require('express-validator');
const {httpError} = require('../utils/errors');

const user_list_get = async (req, res) => {
  res.json(await getAllUsers());
};

const user_get = async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user.pop());
};

const user_post = async (req, res) => {
  console.log('user_post', req.body);
  res.send('Add user route');
};

const user_create_post = async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('user_create_post validation', errors.array());
      next(httpError('invalid data', 400));
      return;
    }

  const data = [
    req.body.name,
    req.body.email,
    req.body.passwd,
  ];

  const result = await addUser(data);
  if (result.affectedRows > 0) {
    res.json({
      message: 'user added',
      user_id: result.insertId,
    });
  } else {
    res.send('virhe');
  }
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_create_post,
};