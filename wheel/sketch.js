/*
 * Copyright (c) 2020. shtrih
 */

function wheelSketch(_p5) {
    const radius = 160,
        diameter = radius * 2,
        itemsPerScreen = 7,
        height_str = diameter / itemsPerScreen,
        counterInitial = 0,
        centerX = 60
    ;
    let data = [],
        videosList = [
            'videos/14278244937910.webm',
            'videos/14686000376951.webm',
        ],
        counter,
        counterDelta = 0,
        counterMax,
        circleTop,
        circleCenterY,
        animationsMap = new Map(),
        selectedKey,
        isCounterAnimation = false,
        counterPrevTickValue = 0,
        video,
        scaleFactor,
        fontRegular,
        mouseDragEnable = true
    ;

    _p5.setData = function (_data) {
        data = [..._data];

        counterMax = data.length * height_str;
        counter = counterInitial;
        _p5.triggerSelectItem();
    };

    _p5.setVideos = function (videosList, startTimes) {
        video = new Video(videosList, startTimes);
    };

    _p5.onAfterSetup = function() {};

    _p5.onSelectItem = function (items, selectedKey) {};
    _p5.triggerSelectItem = function () {
        _p5.onSelectItem(data, selectedKey);
    };

    _p5.preload = () => {
        fontRegular = _p5.loadFont('./Oswald-Regular.ttf');
    };

    _p5.setup = () => {
        counterMax = data.length * height_str;

        const canvas = _p5.createCanvas(750, 400);
        canvas.parent('canvas');

        _p5.textSize(23);
        // textFont('Calibri');
        _p5.textFont(fontRegular);
        _p5.textLeading(24);
        _p5.fill(200);

        circleTop = (_p5.height - diameter) / 2 + _p5.textAscent() / 3;
        circleCenterY = circleTop + radius;
        // counter = height_str * 3 + radius - circleTop + radius;
        counter = counterInitial;
        // counter = height_str/2;

        video = new Video(videosList);

        document.addEventListener("visibilitychange", function() {
            if (document.visibilityState === 'visible') {
                video.setVolume(video.volume);
            } else {
                video.setVolume(0);
            }
        });

        // frameRate(30);


        // alignToRow();

        const background = document.querySelector('.image-grid');

        button = _p5.createButton('Roll');
        button.parent(document.querySelector('.content'));
        // button.position(width / 2, height);
        button.mousePressed(function () {
            if (!isCounterAnimation) {
                const duration = 22000,
                    correction = data_key(data.length, 2 - selectedKey),
                    randomKey = Math.floor(_p5.random(data.length)),
                    totalRows = (data.length * circlesCountForDataLength() + randomKey - correction)
                ;
                video.play().catch(console.error);
                decreaseVolume(duration);

                array_shuffle(data);
                const $dataKey = data_key(data.length, 2 - randomKey);
                // button.elt.textContent = `Result ${randomKey} → ${$dataKey}. ${data[$dataKey]}`;
                // _p5.print(`Result ${randomKey} → ${$dataKey}. ${data[$dataKey]}`);

                // _p5.print(circlesCountForDataLength());
                // _p5.print(totalRows);
                animate(
                    tickCounter,
                    counter,
                    counter + height_str * totalRows,
                    duration,
                    () => {
                        animCounterStop();
                        video.pause();
                        alignToRow();
                        // background.style.display = null;
                        background.classList = 'image-grid';
                    },
                    easeInOutSine
                );
            }

            // background.style.display = 'none';
            background.classList = 'image-grid animation-paused';

            return false;
        });

        _p5.onAfterSetup();
    };

    function decreaseVolume(videoDurationMs) {
        const decreasingDuration = 3000;
        setTimeout(function () {
            animate(function (v) {
                video.setVolume(v);
            }, video.volume, 0, decreasingDuration, null, easeLinear);
        }, videoDurationMs - decreasingDuration);
    }

    function circlesCountForDataLength() {
        const needHeight = height_str * itemsPerScreen * 7;
        return Math.ceil(needHeight / (height_str * data.length));
    }

    /*
    _p5.mouseReleased = () => {
        if (_p5.mouseX > _p5.width || _p5.mouseY > _p5.height) {
            return;
        }
        if (isCounterAnimation) {
            return;
        }

        // setTimeout(alignToRow, 1000);
    };
    */

    _p5.mouseDragEnable = (state = true) => {
        mouseDragEnable = state;
    };

    _p5.mouseDragged = (event) => {
        if (_p5.mouseX > _p5.width || _p5.mouseY > _p5.height) {
            return;
        }
        if (isCounterAnimation) {
            return;
        }

        if (!mouseDragEnable) {
            return;
        }

        incrementCounter(_p5.movedY * 4);

        return false;
    };

    _p5.draw = () => {
        _p5.clear();
        // background(220);
        /*

            //<editor-fold desc="Bezier">
            push();
            stroke(255, 102, 0);
            noFill();

            let x1 = centerX,
                y1 = circleCenterY - radius,
                x2 = centerX + 0.552284749831 * radius,
                y2 = circleCenterY - radius,
                x3 = centerX + radius,
                y3 = circleCenterY - radius * 0.552284749831,
                x4 = centerX + radius,
                y4 = circleCenterY
            ;
            bezier(
                x1, y1,
                x2, y2,

                x3, y3,
                x4, y4
            );
            line(
                x1, y1,
                x2, y2,
            );
            line(
                x3, y3,
                x4, y4
            );

            let steps = 10;
            /!* for (let i = 0; i <= steps; i++) {
              let t = i / steps;
              let x = bezierPoint(x1, x2, x3, x4, t);
              let y = bezierPoint(y1, y2, y3, y4, t);
              ellipse(x, y, 5, 5);
            } *!/

            let c = floor(map(counter, counterInitial, counterMax, 0, radius, true)) / radius;
            let x = bezierPoint(x1, x2, x3, x4, c);
            let y = bezierPoint(y1, y2, y3, y4, c);

            stroke(255, 112, 255);
            ellipse(x, y, 5, 5);
            ellipse(diameter * 1.1665 - y, x + radius, 5, 5);

            x1 = centerX + radius;
            y1 = circleCenterY;
            x2 = centerX + radius;
            y2 = circleCenterY + 0.552284749831 * radius;
            x3 = 0.552284749831 * radius + centerX;
            y3 = circleCenterY + radius;
            x4 = centerX;
            y4 = circleCenterY + radius;

            bezier(
                x1, y1,
                x2, y2,

                x3, y3,
                x4, y4
            );
            line(
                x1, y1,
                x2, y2,
            );
            line(
                x3, y3,
                x4, y4
            );

            for (let i = 0; i <= steps; i++) {
                let t = i / steps + c;
                let x = bezierPoint(x1, x2, x3, x4, t);
                let y = bezierPoint(y1, y2, y3, y4, t);
                ellipse(x, y, 5, 5);
            }

            pop();
            //</editor-fold>
        */

        // vect(counter, counterInitial, counterMax);

        // _p5.line(centerX + 60, 0, centerX + 60, _p5.height);
        // _p5.line(0, _p5.height / 2, _p5.width, _p5.height / 2);

        animationsMap.forEach(function (startAnimation) {
            startAnimation();
        });

        if (counterDelta > 0) {
            if (counter < counterMax) {
                if (!isCounterAnimation) {
                    incrementCounter(3);
                }
            }
            else {
                counter = counterInitial;
            }
        }
        else {
            if (counter < counterInitial) {
                counter = counterMax;
            }
            // else {
            //   incrementCounter(-1);
            // }
        }
        // text(`${Math.floor(frameRate())} ${counter.toFixed(2)}, ${counterDelta.toFixed(2)}`, 20, 20);

        for (let i = -data.length - 2; i < itemsPerScreen + 1; i++) {
            // let x = crcl(counter + height_str * i, radius, circleTop, centerX);
            let {x, y} = vect(counter + height_str * i + radius, circleTop, circleTop + diameter, false);
            // x += centerX;
            if (x < centerX - 45) {
                continue;
            }

            _p5.push();
            _p5.translate(centerX, circleCenterY);

            // textSize(map(x, centerX, centerX + radius, 18, 24, true));

            scaleFactor = _p5.map(x, centerX, centerX + radius, 1, 1.5, false);
            x = x * (2 - scaleFactor);
            y = y * (2 - scaleFactor);
            _p5.scale(scaleFactor);

            _p5.fill(255, Math.round(_p5.map(x + 50, centerX, centerX + radius, 0, 255, true)));

            let key = data_key(data.length, i);
            // stroke(255, 102, 110);
            // line(0, -textAscent()/2, width, -textAscent()/2);
            if (y < _p5.textAscent() / 2
                && y > -_p5.textAscent()
            ) {
                _p5.fill(255, 102, 0);
                _p5.noStroke();

                // stroke(255, 102, 110);
                // line(0, y, width, y);

                // textSize(25);
                // textStyle(BOLD);
                if (key !== selectedKey) {
                    selectedKey = key;

                    _p5.onSelectItem(data, selectedKey);
                }
            }
            // line(0, textAscent(), width, textAscent());

            _p5.text(data[key], x, y, 400);
            _p5.pop()
        }

        // text(`Выпало: ${data[selectedKey]}`, 0, height);
    };

    function vect(current, from, to, overflow = true) {
        const offset = 7, // выравниваем центральный элемент списка вертикально по центру
            overallDegrees = _p5.map(current + offset, from + offset, to, -85, 85, !overflow),
            v = p5.Vector.fromAngle(_p5.radians(overallDegrees), radius)
        ;

        // _p5.push();
        // _p5.translate(centerX, _p5.height / 2);
        // _p5.noFill();
        // _p5.stroke(255);
        // _p5.line(0, 0, radius, 0);
        // _p5.stroke(250);
        // _p5.line(0, 0, v.x, v.y);
        // _p5.pop();

        return v;
    }

    function incrementCounter(delta = 1) {
        delta = (_p5.deltaTime / 100 * delta);
        counterDelta = delta;
        counter += delta;
    }

    function data_key(data_len, key) {
        if (key >= 0 && key < data_len) {
            return key;
        }

        if (key > 0) {
            return data_key(data_len, Math.abs(data_len - key));
        }

        return data_key(data_len, data_len + key);
    }

    function alignToRow(endCallback) {
        const half = height_str / 2;
        const rest = counter % height_str;
        let newValue = counter - rest;
        if (rest > half) {
            newValue = counter + height_str - rest;
        }
        animate(
            tickCounter,
            counter,
            newValue,
            1000,
            function () {
                animCounterStop();
                if (endCallback) {
                    endCallback();
                }
            },
            easeOutBack
        );
    }

    function tickCounter(v) {
        isCounterAnimation = true;

        if (!counterPrevTickValue) {
            counterPrevTickValue = counter;
        }
        counterDelta = v - counterPrevTickValue;
        counter += counterDelta;
        // print(counter.toFixed(2));
        // incrementCounter(v - counterPrevTickValue);
        counterPrevTickValue = v;
    }

    function animCounterStop() {
        isCounterAnimation = false;
        counterDelta = 0;
        counterPrevTickValue = 0;

        // setTimeout(idle, 1000);
    }

    function animate(tickHook, startNum, endNum, duration, callback, easingEq) {
        easingEq = easingEq || easeOutExpo;
        var changeInNum = endNum - startNum,
            startTime = Date.now(), //millis(),
            engine = function () {
                var now = Date.now(), //millis(),
                    timeSpent = now - startTime,
                    timeNorm = timeSpent / duration,
                    completionNorm = easingEq(timeNorm),
                    newNum = startNum + completionNorm * changeInNum;

                // text(`${startNum}:${endNum}=${newNum}`, 0, height - 30);

                if (timeSpent > duration) {
                    animationsMap.delete(`${startNum},${endNum},${duration}`);
                    if (callback) {
                        callback();
                    }
                }
                else {
                    tickHook(newNum);
                }
            }
        ;

        animationsMap.set(`${startNum},${endNum},${duration}`, engine);
    }

    /**
     * @see https://easings.net/#easeOutElastic
     * @param x
     * @return {number}
     */
    function easeOutElastic(x) {
        const c4 = (2 * Math.PI) / 3;

        return x === 0 ?
               0 :
               x === 1 ?
               1 :
               Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }

    function easeLinear(x) {
        return x;
    }

    /**
     * @see https://easings.net/#easeInOutCubic
     * @param x
     * @return {number}
     */
    function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    /**
     * @see https://easings.net/#easeOutBack
     * @param x
     * @return {number}
     */
    function easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    /**
     * @see https://easings.net/#easeOutExpo
     * @param x
     * @return {number}
     */
    function easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    /**
     * @see https://easings.net/#easeInOutExpo
     * @param x
     * @return {number}
     */
    function easeInOutExpo(x) {
        return x === 0
               ? 0
               : x === 1
                 ? 1
                 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                           : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }

    /**
     * @see https://easings.net/#easeInOutSine
     * @param x
     * @return {number}
     */
    function easeInOutSine(x) {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    function array_shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}