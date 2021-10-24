const express = require('express');
const passport = require('passport');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {isNotLoggedIn} = require('../lib/auth');

router.get('/signup', isNotLoggedIn,(req, res) => {
    res.render('auth/signup');
});
router.post('/signup', [
    check('first_name').not().isEmpty().withMessage('Ingresar Nombre'),
    check('last_name').not().isEmpty().withMessage('Ingresar Apellido'),
    check('username').not().isEmpty().withMessage('Ingresar Nombre de Usuario'),
    check('email').isEmail().withMessage('Ingresar Correo').isEmail().withMessage('Correo Inválido'),
    // por una linea de .isEmail() no me funcionaba el guardado
    check('password').not().isEmpty().withMessage('Ingresar Contraseña')
], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('auth/signup', { data: req.body, errors: errors.array() });
    } else {
        next();
    }
}, passport.authenticate('local.signup', {
    successRedirect: '/listPoll',
    failureRedirect: '/signup',

}));
router.get('/signin', isNotLoggedIn,(req, res) => {
    res.render('auth/signin');
});
router.post('/signin', [
    check('email').isEmail().withMessage('Ingresar Correo').isEmail().withMessage('Correo Inválido'),
    // por una linea de .isEmail() no me funcionaba el guardado
    check('password').not().isEmpty().withMessage('Ingresar Contraseña')
], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('auth/signin', { data: req.body, errors: errors.array() });
    } else {
        next();
    }
}, passport.authenticate('local.signin', {
    successRedirect: '/listPoll',
    failureRedirect: '/signin',

}));
//cerrar sesion
router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/');
});
module.exports = router;