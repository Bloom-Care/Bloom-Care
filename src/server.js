const express = require('express');
const path = require('path');
const handleCookieSessions = require('./middleware/handle-cookie-sessions');
const router = require('./router');
const logRoutes = require('./middleware/log-routes');
const PostRouter = require('./PostRoutes')
const LikesRouter = require('./LikesRoutes')
const EventRouter = require('./EventRoutes');
const JoinedRouter = require('./JoinedRoutes');
const app = express();

app.use(handleCookieSessions);  // adds a session property to each request representing the cookie
app.use(logRoutes);       // print information about each incoming request
app.use(express.json());  // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static assets from the public folder

app.use('/api', router);
app.use('/api', PostRouter);
app.use('/api', LikesRouter);
app.use('/api', EventRouter);
app.use('/api', JoinedRouter);

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the public folder.
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next();
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
