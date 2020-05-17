/*
 * Copyright (c) 2020. shtrih
 */

const data = [
    // 'Orel',
    // 'Reshka',
    // 'Orel',
    // 'Reshka',
    // 'Orel',
    // 'Reshka',
    // 'Orel',
    // 'Reshka',
    // 'Orel',
    // 'Reshka',
    // 'Rebro',
    'Комбинезон химзащиты',
    'Рулон туалетной бумаги',
    'Респиратор',
    'Одноразовые перчатки',
    'Банка шпината',
    'Крышка от мусорного бака',
    'Ремонтный набор',
    'Антисептик',
    'Рука для фистинга имени Билли Херрингтона',
    'Сексуальные чулки',
    'Четырехлистный клевер',
    'Кукла вуду',
    'Набор выживальщика',
    'Наперсток удачи',
    'Переносной телепорт',
    'Футляр',
    'Жилетка Вассермана',
    'Стул мамы Мерфи',
    'Шиш кебаб',
    'Альпинистский трос',
    'Хакерский компьютер',
    'Корона короля петучей',
    'Благословение Хакса',
    'Порошок прозрения',
];

const radius = 160,
    diameter = radius * 2,
    itemsPerScreen = 7,
    padding = 0,
    height_str = diameter / itemsPerScreen,
    counterInitial = 0,
    counterMax = data.length * height_str,
    centerX = 60
;
let counter,
    counterDelta = 0,
    circleTop,
    circleCenterY,
    animationsMap = new Map(),
    selectedKey,
    isCounterAnimation = false,
    counterPrevTickValue = 0,
    video,
    scaleFactor,
    fontRegular
;

function preload() {
    fontRegular = loadFont('./Oswald-Regular.ttf');
}

function setup() {
    const canvas = createCanvas(750, 400);
    canvas.parent('canvas');

    circleTop = (height - diameter) / 2;
    circleCenterY = circleTop + radius;
    // counter = height_str * 3 + radius - circleTop + radius;
    counter = counterInitial;
    // counter = height_str/2;
    video = new Video([
        // 'videos/2019-06-13 19-36-43.mkv',
        // 'videos/HONK_HONK.mp4',
        'videos/14278244937910.webm',
        'videos/14286028220660.webm',
        'videos/14503864709740.webm',
        'videos/14686000376951.webm',
        'videos/15372952606420.mp4',
    ]);

    // frameRate(30);
    textSize(23);
    // textFont('Calibri');
    textFont(fontRegular);
    textLeading(24);
    fill(200);

    // alignToRow();

    const background = document.querySelector('.image-grid');

    button = createButton('Roll');
    button.parent(document.querySelector('.content'));
    // button.position(width / 2, height);
    button.mousePressed(function() {
        if (!isCounterAnimation) {
            const duration = 20000,
                correction = data_key(data.length, 2 - selectedKey),
                randomKey = floor(random(data.length)),
                totalRows = (data.length * circlesCountForDataLength() + randomKey - correction)
            ;
            video.play().catch(console.error);
            decreaseVolume(duration);

            const $dataKey = data_key(data.length, 2 - randomKey);
            button.elt.textContent = `Result ${randomKey} → ${$dataKey}. ${data[$dataKey]}`;

            print(circlesCountForDataLength());
            print(totalRows);
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
}

function decreaseVolume(videoDurationMs) {
    const decreasingDuration = 3000;
    setTimeout(function () {
        animate(function (v) {
            video.setVolume(v);
        }, video.volume, 0, decreasingDuration, null, easeLinear);
    }, videoDurationMs - decreasingDuration);
}

function circlesCountForDataLength() {
    const needHeight = height_str * itemsPerScreen * 5;
    return ceil(needHeight / (height_str * data.length));
}

function mouseReleased() {
    if (mouseX > width || mouseY > height) {
        return;
    }
    if (isCounterAnimation) {
        return;
    }

    // setTimeout(alignToRow, 1000);
}

function mouseDragged(event) {
    if (mouseX > width || mouseY > height) {
        return;
    }
    if (isCounterAnimation) {
        return;
    }

    incrementCounter(movedY * 3);

    return false;
}

function draw() {
    clear();
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

    vect(counter, counterInitial, counterMax);

    animationsMap.forEach(function(startAnimation) {
        startAnimation();
    });

    if (counterDelta > 0) {
        if (counter < counterMax) {
            if (!isCounterAnimation) {
                incrementCounter(1);
            }
        } else {
            counter = counterInitial;
        }
    } else {
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
        if (x < centerX - 30) {
            continue;
        }

        push();
        translate(centerX, circleCenterY);

        // textSize(map(x, centerX, centerX + radius, 18, 24, true));

        scaleFactor = map(x, centerX, centerX + radius, 1, 1.5, false);
        x = x * (2 - scaleFactor);
        y = y * (2 - scaleFactor);
        scale(scaleFactor);

        fill(255, Math.round(map(x + 50, centerX, centerX + radius, 0, 255, true)));

        let key = data_key(data.length, i);
        // stroke(255, 102, 110);
        // line(0, -textAscent()/2, width, -textAscent()/2);
        if (y < textAscent() / 2
            && y > -textAscent()
        ) {
            fill(255, 102, 0);
            noStroke();

            // stroke(255, 102, 110);
            // line(0, y, width, y);

            // textSize(25);
            // textStyle(BOLD);
            selectedKey = key;
        }
        // line(0, textAscent(), width, textAscent());

        text(data[key], x, y, 400);
        pop()
    }

    // text(`Выпало: ${data[selectedKey]}`, 0, height);
}

function vect(current, from, to, overflow = true) {
    const offset = -11.44, // выравниваем центральный элемент списка вертикально по центру
        overallDegrees = map(current + offset, from + offset, to, -80, 80, !overflow),
        v = p5.Vector.fromAngle(radians(overallDegrees), radius)
    ;

    // push();
    // translate(centerX, height / 2);
    // noFill();
    // stroke(255);
    // line(0, 0, radius, 0);
    // stroke(250);
    // line(0, 0, v.x, v.y);
    // pop();

    return v;
}

function incrementCounter(delta = 1) {
    delta = (deltaTime / 100 * delta);
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
        newValue + padding,
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
        engine = function() {
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
            } else {
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
           pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
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
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}

/**
 * @see https://easings.net/#easeOutBack
 * @param x
 * @return {number}
 */
function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}

/**
 * @see https://easings.net/#easeOutExpo
 * @param x
 * @return {number}
 */
function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - pow(2, -10 * x);
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
             : x < 0.5 ? pow(2, 20 * x - 10) / 2
                       : (2 - pow(2, -20 * x + 10)) / 2;
}

/**
 * @see https://easings.net/#easeInOutSine
 * @param x
 * @return {number}
 */
function easeInOutSine(x) {
    return -(cos(PI * x) - 1) / 2;
}