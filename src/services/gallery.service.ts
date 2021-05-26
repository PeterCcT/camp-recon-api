import { GalleryImage } from '../models/image_gallery.model'

export class GalleryImageService {
    formatGalleryImage(galleryImage: GalleryImage) {
        return {
            'image': galleryImage.url
        }
    }

    sortGalleryImages(galleryImages: GalleryImage[]) {
        return galleryImages.sort((a, b) => b.uploadDate.getDate() - a.uploadDate.getDate()).map(this.formatGalleryImage)
    }
}