import { body, param } from "express-validator";

export const createUserValidation = [
// TODO: completar las validaciones para crear un usuario

  body("username")
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Debe ingresar un nombre de usuario válido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });
      if (user) {
        throw new Error("El nombre de usuario ya esta en uso");
      }
      return true;
    }),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Debe ingresar un email valido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .isString()
    .withMessage("Debe ingresar una contraseña válida"),
  body("profile.firstName")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("Debe ingresar un nombre válido"),
  body("profile.lastName")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("Debe ingresar un apellido válido"),
  body("profile.employee_number")
    .notEmpty()
    .withMessage("Debe ingresar su numero de empleado"),
  body("profile.phone")
    .optional()
    .isString()
    .withMessage("Debe ingresar un telefono válido"),
];

export const updateProfileValidation = [
  body("profile.firstName").optional().isString().isLength({ min: 2, max: 50 }),
  body("profile.lastName").optional().isString().isLength({ min: 2, max: 50 }),
  body("profile.phone").optional().isString(),
];

export const updateUserValidation = [
  param("id")
    .notEmpty()
    .isMongoId()
    .withMessage("El ID es invalido")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return true;
    }),
  body("username")
    .optional()
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Debe ingresar un nombre de usuario válido")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({
        username: value,
        _id: { $ne: req.params.id },
      });
      if (user) {
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ingresar un email válido")
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({
        email: value,
        _id: { $ne: req.params.id },
      });
      if (user) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),
];