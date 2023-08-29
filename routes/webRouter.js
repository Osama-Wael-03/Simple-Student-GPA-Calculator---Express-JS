


const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');
const { body, query } = require('express-validator');
const Student = require('../models/Student');


router.use((req, res, next) => {
  if (req.body._method == 'delete') {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
});

router.get('/students', webController.index);
router.get('/students/:id', query('std_number').notEmpty().withMessage('Student Number Cannot Be Empty !').custom(async (value) => {
  if (!value.startsWith('12023') && !value.startsWith('22023')) {
    throw new Error('Invalid Student Number !');
  }
  let count = await Student.count({ where: { std_number: value } });
  if (count == 0) {
    return Promise.reject('Cannot Find Student Number !');
  }
})

  , webController.show);
router.get('/students/create', webController.create);

// ...


router.post('/students', [
  body('std_full_name')
    .trim()
    .matches(/^[A-Za-z\s]+$/).withMessage('Name Must Contain Only Letters and Spaces!')
    .isLength({ min: 4, max: 100 }).withMessage('Name Length Must Be Between 4 and 100 Characters')
    .notEmpty().withMessage('Name Cannot Be Empty!'),

  body('std_number')
    .trim()
    .notEmpty().withMessage('Student Number Cannot Be Empty!')
    .isNumeric().withMessage('Student Number Must Be a Number!')
    .custom((value) => {
      if (!value.startsWith('12023') && !value.startsWith('22023')) {
        throw new Error('Student Number Must Start with 12023 or 22023!');
      }
      return true;
    }),

  body('mid_term_mark')
    .trim()
    .notEmpty().withMessage('Mid-Term Mark Cannot Be Empty!')
    .isFloat({ min: 0, max: 30 }).withMessage('Mid-Term Mark Must Be Between 0 and 30'),

  body('final_mark')
    .trim()
    .notEmpty().withMessage('Final Mark Cannot Be Empty!')
    .isFloat({ min: 0, max: 50 }).withMessage('Final Mark Must Be Between 0 and 50'),

  body('activities_mark')
    .trim()
    .notEmpty().withMessage('Activities Mark Cannot Be Empty!')
    .isFloat({ min: 0, max: 20 }).withMessage('Activities Mark Must Be Between 0 and 20'),

], webController.store);


router.get('/students/:id/edit', webController.edit);
router.put('/students/:id', webController.update);
router.delete('/students/:id', webController.destroy);
router.get('/students/:id/restore', webController.restore);



module.exports = router;  