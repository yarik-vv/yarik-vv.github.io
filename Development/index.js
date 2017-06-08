'use strict';

import css from './scss/main.scss';
import favicon from './img/favicon.png';
import img from './img/error.png';
var error = require('file-loader?name=[path][name].[ext]!./404.html');