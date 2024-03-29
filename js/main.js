import { createPhotos } from './data-generation.js';
import { renderThumbnails } from './thumbnails.js';
import './upload-form.js';

renderThumbnails(createPhotos());
