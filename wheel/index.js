/*
 * Copyright (c) 2020. shtrih
 */

let counter,
    counterDelta,
    centerY,
    circleCenterY,
    animationsMap = new Map(),
    selectedKey,
    isCounterAnimation = false,
    isNotBottomTransparencyAnimation = true,
    sss = 0;
const data = [
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

const radius = 120,
    diameter = radius * 2,
    count = 7,
    padding = 10,
    height_str = diameter / count - padding,
    counterInitial = -(height_str), //   + padding
    centerX = 80;

function setup() {
    frameRate(24);
    createCanvas(600, 400);
    centerY = (height - diameter) / 2;
    circleCenterY = centerY + radius;
    cyclesCount = (data.length - 1) * (height_str + padding) + padding;
    counter = counterInitial;
    textSize(23);
    textFont('Calibri');
    fill(200);

    idle = function() {
        animate(function(v) {
            isCounterAnimation = true;
            counter = v;
            counterDelta = 1;
        }, counter, counter + height_str + padding, 1000, function() {
            isCounterAnimation = false;
            counterDelta = 0;
            // setTimeout(idle, 1000);
        }, easeInOutCubic);
    }
    // idle();

    button = createButton('Roll');
    button.position(width / 2, height);
    button.mousePressed(function() {
        if (!isCounterAnimation) {
            // counter = counterInitial;
            // const correction = data.length - selectedKey;
            const correction = 0;
            const randomKey = floor(random(data.length));
            //const randomKey = 0;
            button.elt.textContent = `Result ${randomKey} → ${data[data_key(data.length, 2 -randomKey)]}`;
// const totalRows = 1;

            const totalRows = (data.length + randomKey + correction);
            animate(
                tickCounter,
                counter,
                counter + (height_str + padding) * totalRows,
                15000,
                () => {
                    animCounterStop();
                    alignToRow();
                }
            );
        }
    });
}

function mouseReleased() {
    if (!isCounterAnimation) {
        setTimeout(alignToRow, 1000);
    }
}

function mouseDragged(event) {
    incrementCounter(movedY);

    return false;
}

function draw() {
    clear();
    // background(220);

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
    /* for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = bezierPoint(x1, x2, x3, x4, t);
      let y = bezierPoint(y1, y2, y3, y4, t);
      ellipse(x, y, 5, 5);
    } */

    let c = floor(map(counter, counterInitial, cyclesCount, 0, radius, true)) / radius;
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
        let t = i / steps;
        let x = bezierPoint(x1, x2, x3, x4, t);
        let y = bezierPoint(y1, y2, y3, y4, t);
        ellipse(x, y, 5, 5);
    }

    pop();

    animationsMap.forEach(function(startAnimation) {
        startAnimation();
    });

    if (counterDelta > 0) {
        if (counter < cyclesCount) {
            if (!isCounterAnimation) {
                incrementCounter(1);
            }
        } else {
            counter = counterInitial;
        }
    } else {
        if (counter < counterInitial) {
            counter = cyclesCount;
        }
        // else {
        //   incrementCounter(-1);
        // }
    }
    text(`${counter.toFixed(2)}, ${counterDelta}, ${cyclesCount}, ${isCounterAnimation}, ${deltaTime.toFixed(2)}`, 20, 20)

    for (let i = -data.length; i < count + 1; i++) {
        let x = crcl(counter + (height_str + padding) * i, radius, centerY, centerX);
        let y = counter + (height_str + padding) * i + radius;

        push()
        //rectMode(RADIUS);
        //rectMode(CORNER);
        //rectMode(CORNERS);
        //translate(0, -(height_str + padding)/2 - padding);
        translate(40, 0);


        textSize(map(x, centerX, centerX + radius, 15, 23, true));
        fill(255, round(map(x, centerX, centerX + radius, 0, 255, true)));

        let key = data_key(data.length, i);

        line(0, circleCenterY - (height_str + padding) / 2, width, circleCenterY - (height_str + padding) / 2);
        if (y < circleCenterY + (height_str + padding) / 2
            && y > circleCenterY - (height_str + padding) / 2
        ) {
            fill(255, 102, 0);
            stroke(255, 102, 0);

            line(0, y, width, y);

            textSize(25);
            // textStyle(BOLD);
            selectedKey = key;
        }
        line(0, circleCenterY + (height_str + padding) / 2, width, circleCenterY + (height_str + padding) / 2);

        text(key + '. ' + data[key], x, y - (height_str + padding)/2 + padding, 300);
        pop()
    }

    text(`Выпало: ${data[selectedKey]}`, 0, height);

    let overallDegrees = map(counter, counterInitial, cyclesCount, -90, 90);
    let v = p5.Vector.fromAngle(radians(overallDegrees), radius);
    let vx = v.x;
    let vy = v.y;
    let oneDegrees = map(counter, 0, diameter, -90, 90, true);
    let oneV = p5.Vector.fromAngle(radians(oneDegrees), radius);
    push();
    //{
        translate(centerX, height / 2);
        noFill();
        stroke(255);
        line(0, 0, radius, 0);
        stroke(250);
        line(0, 0, vx, vy);
        stroke(150);
        line(0, 0, oneV.x, oneV.y);
    //}
    pop();
}

function incrementCounter(delta = 1) {
    delta = (deltaTime / 100 * delta);
    counterDelta = delta;
    counter += delta;
}

function crcl(x, radius, x0, y0) {
    let a = pow(radius, 2) - pow(x - x0, 2);
    if (a < 0) {
        // a = abs(a);
    }
    return y0 + sqrt(a);
}

function data_key(data_len, key) {
    if (key >= 0 && key < data_len) {
        return key;
    }

    if (key > 0) {
        return data_key(data_len, abs(data_len - key));
    }

    return data_key(data_len, abs(data_len + key));
}

function alignToRow() {
    const half = (height_str + padding) / 2;
    const rest = counter % (height_str + padding);
    let newValue = counter - rest;
    if (rest > half) {
        newValue = counter + height_str + padding - rest;
    }
    animate(tickCounter, counter, newValue + padding, 1000, animCounterStop);
}

function tickCounter(v) {
    isCounterAnimation = true;

    if (!sss) {
        sss = counter;
    }
    counterDelta = v - sss;
    counter += counterDelta;
    // print(counter.toFixed(2));
    // incrementCounter(v - sss);
    sss = v;
}

function animCounterStop() {
    isCounterAnimation = false;
    counterDelta = 0;
    sss = 0;

    // setTimeout(idle, 1000);
}

function animate(tickHook, startNum, endNum, duration, callback, easingEq) {
    var easingEq = easingEq || easeInOutCubic,
        changeInNum = endNum - startNum,
        startTime = Date.now(), //millis(),
        engine = function() {
            var now = Date.now(), //millis(),
                timeSpent = now - startTime,
                timeNorm = timeSpent / duration,
                completionNorm = easingEq(timeNorm),
                newNum = startNum + completionNorm * changeInNum;

            text(`${startNum}:${endNum}=${newNum}`, 0, height - 30)

            if (timeSpent > duration) {
                // clearTimeout(engine);
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

function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    return x === 0 ?
           0 :
           x === 1 ?
           1 :
           pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}