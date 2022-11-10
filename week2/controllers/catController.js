'use strict';
const {getAllCats, addCat, updateCat, deleteCat} = require('../models/catModel');
const {getCat} = require('../models/catModel');

const cat_list_get =  async (req, res, next) => {
  res.json(await getAllCats(next));
};

const cat_get = async (req, res, next) => {
    const cat = await getCat(req.params.id, next);
    if (cat.length > 0) {
      res.json(cat.pop());
    } else {
      res.send('virhe');
    }
   
};

const cat_post = async (req, res) => {
  console.log('cat', req.body, req.file);
  const data = [
    req.body.name,
    req.body.birthdate,
    req.body.weight,
    req.body.owner,
    req.file.filename,
  ];

  const result = await addCat(data);
  if (result.affectedRows > 0) {
    res.json({
      message: 'cat added',
      cat_id: result.insertId,
    });
  } else {
    res.send('virhe');
  }
  
};

const cat_update_put = async (req, res) => {
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
    req.body.birthdate,
    req.body.weight,
    req.body.owner,
    req.body.id,
  ];

  const result = await updateCat(data);
  if (result.affectedRows > 0) {
    res.json({
      message: 'cat modified',
      cat_id: result.insertId,
    });
  } else {
    res.send('virhe');
  }
};

const cat_delete = async (req, res) => {
  const result = await deleteCat(req.params.id);
  if(result.affectedRows > 0) {
    res.json({
      message: 'cat deleted',
    });
  } else {
    res.send('virhe')
  }
}

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_update_put,
  cat_delete,
};