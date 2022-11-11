const AlbumService = {

    createAlbum(name) {
        let albums = AlbumService.getAlbums();
        const id = Math.floor(Math.random() * Date.now());
        albums.push({
            id: id,
            name: name,
            images: []
        });
        AlbumService.saveAlbums(albums);

        return id;
    },

    getAlbums() {
        return JSON.parse(localStorage.getItem('albums') || '[]');
    },

    getAlbum(id) {
        let albums = AlbumService.getAlbums();
        albums = albums.filter(a => a.id == id);

        return albums[0];
    },

    saveAlbums(albums) {
        localStorage.setItem('albums', JSON.stringify(albums));
    },

    addImage(album_id, image_id) {
        let albums = AlbumService.getAlbums();

        albums = albums.map(a => {
            if (a.id == album_id) {
                a.images.push(image_id);
            }
            return a;
        });

        AlbumService.saveAlbums(albums);
    },

    deleteImage(album_id, image_id) {
        let albums = AlbumService.getAlbums();

        albums = albums.map(a => {
            if (a.id == album_id) {
                a.images = a.images.filter(i => i != image_id);
            }
            return a;
        });
        AlbumService.saveAlbums(albums);
    }
}

export default AlbumService;
