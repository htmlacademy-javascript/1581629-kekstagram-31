import { renderThumbnails } from './thumbnails.js';
import './upload-form.js';
import { getData } from './api.js';
import { showErrorText } from './messages.js';

getData(renderThumbnails, showErrorText);
