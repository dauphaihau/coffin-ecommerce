import jwt from 'jsonwebtoken';
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

let arr = [
  {name: 'John', id: 2},
  {name: 'John1', id: 4},
  {name: 'John2', id: 6},
  {name: 'John3', id: 8}
];

const filterValue = (obj, key, value) => {
  return obj.find((v) => v[key] === value)
}

filterValue(arr, "id", 2); //{a: 5, b: 6}

const signToken = (user) => {
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
      expiresIn: '30d',
    }
  );
};

const isAuth = async (req, res, next) => {
  const {authorization} = req.headers;
  // console.log('authorization at middleware isAuth', authorization)

  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    // console.log('token', token)
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decode) => {
      // jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({message: 'Token is not valid'});
      } else {
        req.user = decode;
        console.log('req-user', req.user)
        next();
      }
    });
  } else {
    res.status(401).send({message: 'Token is not suppiled'});
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(401).send({message: 'User is not admin'});
  } else {
    next();
  }
};

export {signToken, isAuth, isAdmin};