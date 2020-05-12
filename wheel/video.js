/*
 * Copyright (c) 2020. shtrih
 */
class Video {
    /**
     * @type Array videoURLs
     */
    constructor(videoURLs) {
        this._previous_url = null;
        this._urls = videoURLs;
        /**@type HTMLVideoElement */
        this._video = document.querySelector('video');
        /**@type HTMLSourceElement*/
        this._source = this._video.firstElementChild;
        this._range = document.getElementById('volume-control');
        this._loadVolume();
        this._range.addEventListener('change', () => {
            this.setVolume(this._range.value);
            this._saveVolume();
        });
        this.randomizeVideo();
    }

    async play() {
        this._video.currentTime = 0;
        this._video.volume = this.volume;
        this._video.style.display = 'unset';
        await this._video.play();
    }

    pause() {
        this._video.pause();
        this._video.style.display = 'none';
        this.randomizeVideo();
    }

    setVolume(number) {
        this._video.volume = number;
    }

    get volume() {
        return Number(this._range.value);
    }

    randomizeVideo() {
        do {
            this._source.src = this._urls[ this._getRandomIndex() ];
        } while (this._previous_url === this._source.src);

        this._previous_url = this._source.src;

        this._video.load();
    }

    _getRandomIndex() {
        return Math.floor(Math.random() * this._urls.length);
    }

    _saveVolume() {
        storeItem('volume', this._range.value * 10);
    }

    _loadVolume() {
        const vol = getItem('volume');
        if (typeof(vol) === "number") {
            this._range.value = vol / 10;
        }
    }
}
