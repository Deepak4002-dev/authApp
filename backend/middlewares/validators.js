import joi from "joi";

const userSchemaLogin = joi.object({
  email: joi.string().email().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  password: joi.string().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
}).required();

const loginValidator = (req, res, next) => {
  const { error } = userSchemaLogin.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(422).json({
      errors: error.details.map(err => err.message),
    });
  }

  next();
};


const userSchemaSignup = joi.object({
  username: joi.string().min(3).max(30).messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be at most 30 characters",
  }),
  email: joi.string().email().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  password: joi.string().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
}).required();

const signupValidator = (req, res, next) => {
  const { error } = userSchemaSignup.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(422).json({
      errors: error.details.map(err => err.message),
    });
  }

  next();
};

export { loginValidator,signupValidator };
