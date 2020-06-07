/*
 * Copyright (c) 2020. shtrih
 */
class Video {
    /**
     * @type Array videoURLs
     * @type Array startTimes
     */
    constructor(videoURLs, startTimes = []) {
        console.log(videoURLs, startTimes);
        this._current_index = null;
        this._previous_url = null;
        this._urls = videoURLs;
        this._startTimes = startTimes;
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
        this._resetCurrentTime();
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
            this._current_index = this._getRandomIndex();
            this._source.src = this._urls[ index ];
        } while (this._previous_url === this._source.src);

        this._previous_url = this._source.src;

        this._video.load();
    }

    _getRandomIndex() {
        return Math.floor(Math.random() * this._urls.length);
    }

    _saveVolume() {
        localStorage.setItem('volume', this._range.value);
    }

    _loadVolume() {
        const vol = localStorage.getItem('volume');
        if (vol) {
            this._range.value = vol;
        }
    }

    _resetCurrentTime() {
        this._video.currentTime = this._startTimes[ this._current_index ] || 0;
    }
}
