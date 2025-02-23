import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors } from "./validate.error.js"
import { existUsername } from "./db.validators.js"
//registerValidator
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

//userValidator
export const UpdateValidator = [
    body('name', 'Name cannot be empty')
    .optional().notEmpty(),
    body('surname', 'Surname cannot be empty')
    .optional().notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .isEmail()
        .optional().notEmpty(),
    body('username', 'Username cannot be empty')
        .optional().notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .optional().notEmpty()
        .isMobilePhone(),
    validateErrors
]


//passwordValidator
export const passUpdatevalidator = [
    body('newpassword', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('oldpassword', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        
        validateErrors
]

//loginValidator

export const loginValidator = [
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrors
]