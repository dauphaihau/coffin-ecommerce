import jwt from 'jsonwebtoken';
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

const signToken = (user, options) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    // process.env.JWT_SECRET,
    process.env.NEXT_PUBLIC_JWT_SECRET,
    // publicRuntimeConfig.JWT_SECRET,
    {
      expiresIn: '30d', ...options
    }
  );
};

const isAuth = async (req, res, next) => {
  const {authorization} = req.headers;
  // console.log('authorization at middleware isAuth', authorization)

  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decode) => {
      // jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({message: 'Token is not valid'});
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({message: 'Token is not suppiled'});
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(401).send({message: 'you are not authorized'});
  } else {
    next();
  }
};

const rolesCanView = async (req, res, next) => {
  if (req.user.role === 'customer') {
    res.status(401).send({message: 'you are not authorized'});
  } else {
    next();
  }
};

const rolesCanCreate = async (req, res, next) => {
  if (req.user.role === 'staff') {
    res.status(401).send({message: 'you are not authorized'});
  } else {
    next();
  }
};

const rolesCanUpdate = async (req, res, next) => {
  if (req.user.role === 'staff') {
    res.status(401).send({message: 'you are not authorized'});
  } else {
    next();
  }
};

const rolesCanDelete = async (req, res, next) => {
  if (req.user.role === 'staff') {
    res.status(401).send({message: 'you are not authorized'});
  } else {
    next();
  }
};

export {signToken, isAuth, isAdmin, rolesCanView, rolesCanCreate, rolesCanUpdate, rolesCanDelete};