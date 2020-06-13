/*
 * Copyright (c) 2020. shtrih
 */

const dataSets = {
    inventory: [
        'Щit',
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
    ],
    effects: [
        'Мистер Ржавчик',
        'Облизанный ободок унитаза',
        'Ловушка Джокера',
        'Знаток выгоды',
        'Стримбернар',
        'В бухгалтерии все перепутали',
        'Скупщик гречи',
        'Грабли',
        'Выключенный ОБС',
        'ОПЯТЬ НДИДИ',
        'Шуточное колесо',
        'Вор',
        'Чат выбирает',
        'Ультрамошна',
        'Суд присяжных',
        'Тест на вирус',
        'Штаны на 40 хрывень',
        'Успешная вылазка',
        'ВзрывОчка',
        'Залутанная локация',
        'Конченное событие',
        'Комбо неудач',
        'Дух Рэмбо',
        'Настоящий бунтарь',
        // 'Чуйка на говно',
        'Не та позиция тебе выпала, стремлер',
        // 'Выбор Бумера',
        // 'Выбор Зумера',
        // 'Чат здесь закон',
        // 'Я здесь закон',
        'Три топора',
        'Сраное колдунье',
        'Два по цене одного',
        'Интрига',
        'РокировОЧКА',
        'По магазинам с чатом',
        'Открытая пачка сухариков',
        'Сырое мясо',
        'Проблев',
        'Кефир с замазанным сроком годности',
        'Таблетки без названия',
        'Сладкий рулет ХПГ',
        'Подземное убежище',
        'Аттракцион невиданной щедрости',
        // 'Never Lucky',
        'Сахарные бомбы',
        'Наелся и спит',
        'Предательский столб',
        'Падение пиццианской башни',
        'Полное свинство',
    ],
    coin: [
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Орёл',
        'Решка',
        'Ребро!',
    ],
    streamers: [
        'MistaFaker',
        'Lasqa',
        'Liz0n',
        'Melharucos',
        'UselessMouth',
        'UncleBjorn',
    ],
    debuffs: [
        'Мистер Ржавчик',
        'Облизанный ободок унитаза',
        'Скупщик гречи',
        'ОПЯТЬ НДИДИ',
        'Вор',
        'Чат здесь закон',
        'Тест на вирус',
        'Штаны на 40 хрывень',
        'Залутанная локация',
        'Конченное событие',
        'Комбо неудач',
        'Дух Рэмбо',
        'Чуйка на говно',
        'Три топора',
        'Аттракцион невиданной щедрости',
        'Предательский столб',
        'Падение пиццианской башни',
    ]
};
let currentDataSet = 'inventory';

function getImageURI(index) {
    let result = '../hpg-inventory/images/000.png',
        offset = 0
    ;
    switch (currentDataSet) {
        case "inventory":
            offset = 50;
            result = '../hpg-inventory/images/0' + ('0' + (index+1 + offset)).slice(-2) + '.png';
            break;

        case "effects":
            // костыли из-за удалённых спецроллов
            if (index > 23) {
                offset += 1;
            }
            if (index > 24) {
                offset += 4;
            }
            if (index > 38) {
                offset += 1;
            }

            result = '../hpg-inventory/images/0' + ('0' + (index+1 + offset)).slice(-2) + '.png';
            break;

        case "debuffs":
            const mapping = [
                1,
                2,
                7,
                10,
                12,
                13,
                16,
                18,
                20,
                21,
                22,
                23,
                25,
                31,
                44,
                48,
                49
            ];
            result = '../hpg-inventory/images/0' + ('0' + (mapping[index])).slice(-2) + '.png';
            break;

        case "coin":
            result = '../images/coin-obverse-20.png';
            if (index === 1) {
                result = '../images/coin-reverse-20.png';
            }
            if (index === 10) {
                result = '../images/coin-gurt.png';
            }
            break;

        case "streamers":
            result = '../images/streamers/'+ dataSets[currentDataSet][index] +'.png';
            break;
    }

    return result;
}

const p5Instance = new p5(wheelSketch);

p5Instance.setData(dataSets[currentDataSet]);
p5Instance.onAfterSetup = function () {
    p5Instance.setVideos([
        'videos/учит крутить рулём под phonk.mp4',
        'videos/Папич-марш  прощание славянки .9мая.mp4',
        'videos/Putin walking meme (Full version).mp4',
        'videos/BASSBOOSTED   Смешарики-От винта.mp4',
        'videos/JOJO\'S BIZARRE MAKEUP TUTORIAL.mp4',
        'videos/Пузантос - Бумаги [Morrowind].mp4',
        'videos/Сыновья России. Кто пчелок уважает.mp4',
        // 'videos/14278244937910.webm',
        'videos/14686000376951.webm',
        'videos/6 отвлекающих кадров.mp4',
        'videos/[Re-upload] [1080p] HONK HONK.mp4',
        'videos/Крутое ХПГ.webm',
        'videos/CHIKA VIBES   Kaguya-sama Love is War.mp4',
        'videos/best Chika meme ever   anime characters in Chika dance MV.mp4',
        'videos/Не Твое Дело - Я буду рядом.mp4',
        'videos/01.mp4',
        'videos/02.mp4',
        'videos/03.mp4',
        'videos/04.mp4',
        'videos/06.mp4',
        'videos/08.mp4',
        // 'videos/09.mp4',
        'videos/10.mp4',
        'videos/12.mp4',
        'videos/13.mp4',
        // 'videos/14.mp4',
        'videos/16.mp4',
        'videos/17.mp4',
        'videos/18.mp4',
        'videos/19.mp4',
        // 'videos/20.mp4',
        // 'videos/21.mp4',
    ], [
        5,
        7,
        32,
        22,
        6,
        129,
        26,
    ]);
};

const image = document.querySelector('#item-image img');
p5Instance.onSelectItem = function(data, selectedKey) {
    if (dataSets[currentDataSet]) {
        image.src = getImageURI(dataSets[currentDataSet].indexOf(data[selectedKey]));
    }
    else {
        image.src = '../hpg-inventory/images/000.png';
    }
};

const customDialog = document.getElementById('custom-list'),
    customTextarea = customDialog.getElementsByTagName('textarea')[0],
    customButton = customDialog.getElementsByTagName('button')[0]
;

customButton.addEventListener('click', function () {
    customDialog.style.display = 'none';

    p5Instance.setData(customTextarea.value.split('\n'));
    p5Instance.mouseDragEnable();
});

let radios = document.querySelectorAll('[name="list"]');
for(let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function () {
        currentDataSet = this.value;

        if (this.value === 'custom') {
            p5Instance.mouseDragEnable(false);
            customDialog.style.display = 'block';

            return;
        }

        customDialog.style.display = 'none';
        p5Instance.mouseDragEnable();

        p5Instance.setData(dataSets[currentDataSet]);
    });
}