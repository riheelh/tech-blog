// ----------- import modules -----------
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// ----------- import files -----------
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

