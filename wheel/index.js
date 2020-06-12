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
        'Чуйка на говно',
        'Не та позиция тебе выпала, стремлер',
        'Выбор Бумера',
        'Выбор Зумера',
        'Чат здесь закон',
        'Я здесь закон',
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
        'Never Lucky',
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
};

const p5Instance = new p5(wheelSketch);

p5Instance.setData(dataSets['inventory']);
p5Instance.onAfterSetup = function () {
    p5Instance.setVideos([
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
        32,
        22,
        6,
        129,
        26,
    ]);
};


const customDialog = document.getElementById('custom-list'),
    customTextarea = customDialog.getElementsByTagName('textarea')[0],
    customButton = customDialog.getElementsByTagName('button')[0]
;

customButton.addEventListener('click', function () {
    customDialog.style.display = 'none';

    p5Instance.setData(customTextarea.value.split('\n'));
});

let radios = document.querySelectorAll('[name="list"]');
for(let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', function () {
        customDialog.style.display = 'none';
        if (this.value === 'custom') {
            customDialog.style.display = 'block';

            return;
        }

        p5Instance.setData(dataSets[this.value]);
    });
}