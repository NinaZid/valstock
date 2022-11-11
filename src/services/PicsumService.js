const PicsumService = {
    
    host: 'https://picsum.photos',

    list(page = 1, limit = 30) {
        const query = PicsumService.host + '/v2/list?page' + page + '&limit=' + limit;
        return fetch(query).then(response => response.json());
    },

    getImage(id) {
        const query = PicsumService.host + '/id/' + id + '/info';
        return fetch(query).then(response => response.json());
    },

    getOptimizedImage(img) {
        const maxWidth = 400, maxHeight = 400;
        var ratio = Math.min(maxWidth / img.width, maxHeight / img.height);

        const newWidth = parseInt(img.width * ratio, 10);
        const newHeight = parseInt(img.height * ratio, 10);

        return PicsumService.host + '/id/' + img.id + '/' + newWidth + '/' + newHeight;
    },

    async downloadImage(url) {
        const originalImage = url;
        const image = await fetch(originalImage)

        const nameSplit = originalImage.split("/");
        const duplicateName = nameSplit.pop();

        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
        const link = document.createElement('a')

        link.href = imageURL;
        link.download = ""+duplicateName+"";
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)  
    }
}

export default PicsumService;