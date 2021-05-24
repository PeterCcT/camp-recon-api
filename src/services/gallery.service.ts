import { GalleryImage } from '../models/image_gallery.model'

export class GalleryImageService {
    formatGalleryImage(galleryImage: GalleryImage) {
        return {
            'image': galleryImage.url
        }
    }
}