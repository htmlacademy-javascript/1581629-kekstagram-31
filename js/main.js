import { createPhotos } from './data-generation.js';
import { drawThumbnails } from './thumbnails.js';

drawThumbnails(createPhotos());
