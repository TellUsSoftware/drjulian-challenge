import { Router } from 'express';
import { User } from '../app/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default function () {
  const router = Router();

  router.post('/register', (req, res, next) => {
    const auth = true;
    if(auth === true) {
          const user = User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
          }).then(
            () => {
              res.status(200).json({
                message: 'User created successfully'
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
    } else {
      res.status(500).json({
        message: 'Unauthorized!'
      });
    }
  });

  router.post('/login', (req, res, next) => {
    const auth = true;
    if(auth === true) {
      User.findOne({ where: {email: req.body.email} }).then(
        (user) => {
          if(!user) {
              res.status(401).json({
              message: 'User not found!'
            });
          }
          bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
              if (!valid) {
                  res.status(401).json({
                  message: 'Incorrect password!'
                });
              }
              const token = jwt.sign(
                { id: user.id },
                'login',
                { expiresIn: '24h'});
              res.status(200).json({
                message: 'Connected',
                userType: user.userType,
                token: token
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    } else {
      res.status(500).json({
        message: 'Unauthorized!'
      });
    }
  });

  router.post('/logout', (req, res, next) => {
    const auth = true;
  if(auth === true) {
    User.findOne({ where: {email: req.body.email} }).then(
      (user) => {
        if(!user) {
            res.status(401).json({
            message: 'User not found!'
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
                res.status(401).json({
                message: 'Incorrect password!'
              });
            }
            const token = jwt.sign(
              { id: user.id },
              'logout',
              { expiresIn: '24h'});
            res.status(200).json({
              message: 'Logged out',
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  } else {
    res.status(500).json({
      message: 'Unauthorized!'
    });
  }
  });

  router.put('/modifyUser', (req, res, next) => {
    const admin = req.body.userType;
    if(admin === 'admin'){
      User.findOne({ where: {email: req.body.email} }).then(
        (foundUser) => {
          const user = User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.changeEmail,
            password: req.body.password,
            userType: req.body.userType,
          }, {
            where: {
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              email: foundUser.email,
              password: foundUser.password,
              userType: foundUser.userType,
            }
          }).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
          res.status(201).json({
            message: 'User updated successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    } else {
      res.status(500).json({
        message: 'Unauthorized!'
      });
    }
  });

  router.delete('/deleteUser', (req, res, next) => {
    const admin = req.body.userType;
    if(admin === 'admin'){
      User.destroy({ where: {email: req.body.email} }).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    } else {
      res.status(500).json({
        message: 'Unauthorized!'
      });
    }
  });


  return router;
}
