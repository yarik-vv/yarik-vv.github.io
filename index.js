'use strict';

import css from './main';
var favicon = require('file-loader!./favicon.png');
var img = require('file-loader!./error.png');
var error = require('file-loader?name=[path][name].[ext]!./404.html');