
const { validationResult } = require('express-validator');
const Student = require('../models/Student');


exports.index = async (req, res) => {
  // let data = await Student.findOne({
  //   order: [['std_id', 'DESC']],
  // });
  // if (data != null) {
  (req.headers.accepts == 'application/json') ? req.send({ data: [], errorMessage: null }) :
    res.render('index', { title: 'Students Average Calculatorc App', data: [], errorMessage: null });
  // }
  // return res.render('index', { title: 'Students Average Calculatorc App', data: [0] });

}

exports.show = async (req, res) => {
  let validator = validationResult(req);
  if (validator.isEmpty()) {
    const std_number = req.query.std_number;
    const data = await Student.findOne({ where: { std_number: std_number } });

    (req.headers.accepts == 'application/json') ? res.send({ message: 'Student Found Successfully !', result: [data] }) :
      res.render('index', { title: 'Students Average Calculator App', data: [data], errorMessage: null });

  }
  const errorMessage = validator.array({ onlyFirstError: true });
  (req.headers.accepts == 'application/json') ? res.send({ message: 'Student Not Found !', errorMessage: errorMessage }) :
    res.render('index', { title: 'Students Average Calculator App', data: [], errorMessage: errorMessage });
}


exports.create = (req, res) => {
  //
}
exports.store = async (req, res) => {

  let validator = validationResult(req);
  if (validator.isEmpty()) {
    let result = await Student.create(req.body);
    (req.headers.accepts == 'application/json') ? res.send({ message: 'Student Added Successfully !', result: result })
      : res.redirect('/students', 302);
  }
  (req.headers.accepts == 'application/json') ? res.status(400).send({ status: false, message: validator.array({ onlyFirstError: true })[0].msg })
    : res.status(422).render('index', { title: 'Students Average Calculator App', data: [], errorMessage: validator.array({ onlyFirstError: true }) });

}

exports.edit = (req, res) => {
  //
}
exports.update = (req, res) => {
  //
}
exports.destroy = async (req, res) => {
  let deleted = await Student.destroy({ where: { std_id: req.params.id } });
  res.redirect('/students', 302);
}
exports.restore = (req, res) => {
  //
}
