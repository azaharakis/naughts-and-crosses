class Video {
    constructor({id, title, img}) {
        this.id = id;
        this.title = title;
        //All placeholder images should be Nicholas Cage must be why netflix is so successful...
        this.img = img ? img : 'http://www.placecage.com/200/300';
    }
}

module.exports.Video = Video;