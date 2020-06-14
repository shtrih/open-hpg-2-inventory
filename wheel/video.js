/*
 * Copyright (c) 2020. shtrih
 */
class Video {
    /**
     * @type Array videoURLs
     */
    constructor(videoURLs) {
        this._current_index = null;
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
        Video._shuffle(this._urls);
        this.changeVideo(0);
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
        this.changeVideo();
    }

    setVolume(number) {
        this._video.volume = number;
    }

    get volume() {
        return Number(this._range.value);
    }

    changeVideo(forceIndex) {
        if (Number.isInteger(forceIndex)) {
            this._current_index = forceIndex;
        }
        else {
            this._current_index++;
        }

        if (this._current_index >= this._urls.length) {
            Video._shuffle(this._urls);
            this._current_index = 0;
        }

        this._source.src = this._urls[ this._current_index ];
        if (Array.isArray(this._urls[ this._current_index ])) {
            this._source.src = this._urls[ this._current_index ][0];
        }

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
        this._video.currentTime = 0;
        if (Array.isArray(this._urls[ this._current_index ])) {
            this._video.currentTime = this._urls[ this._current_index ][1] || 0;
        }
    }

    static _shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
