/**
 * Main application routes
 */

'use strict';
import errors from './components/errors';
import path from 'path';

var techRouter = require('./api/technologies/index');
var catRouter = require('./api/categories/index');
var testResultsRouter = require('./api/test-results/index');
var usersRouter = require('./api/users/index');
var authRouter = require('./auth/auth.router');
export default function(app) {
  // Insert routes below
  app.use('/api', techRouter);
  app.use('/api', catRouter);
  app.use('/api', testResultsRouter);
  app.use('/api', usersRouter);
  app.use('/api', authRouter);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
