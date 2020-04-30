'use strict';

let cells = [];
const items = [
    {
        img: 'images/000.png',
        title: 'Пустая ячейка'
    },
    {
        img: 'images/051.png',
        title: 'Щit',
        count: 2,
    },
    {
        img: 'images/052.png',
        title: 'Комбинезон химзащиты'
    },
    {
        img: 'images/053.png',
        title: 'Рулон туалетной бумаги',
        count: 2,
    },
    {
        img: 'images/054.png',
        title: 'Респиратор',
        count: 10,
    },
    {
        img: 'images/055.png',
        title: 'Одноразовые перчатки'
    },
    {
        img: 'images/056.png',
        title: 'Банка шпината'
    },
    {
        img: 'images/057.png',
        title: 'Крышка от мусорного бака',
    },
    {
        img: 'images/058.png',
        title: 'Ремонтный набор',
        count: 2,
    },
    {
        img: 'images/059.png',
        title: 'Антисептик'
    },
    {
        img: 'images/060.png',
        title: 'Рука для фистинга имени Билли Херрингтона',
        count: 4,
    },
    {
        img: 'images/061.png',
        title: 'Сексуальные чулки',
        count: 2,
    },
    {
        img: 'images/062.png',
        title: 'Четырехлистный клевер'
    },
    {
        img: 'images/063.png',
        title: 'Кукла вуду'
    },
    {
        img: 'images/064.png',
        title: 'Набор выживальщика',
        count: 3,
    },
    {
        img: 'images/065.png',
        title: 'Наперсток удачи'
    },
    {
        img: 'images/066.png',
        title: 'Переносной телепорт'
    },
    {
        img: 'images/067.png',
        title: 'Футляр'
    },
    {
        img: 'images/068.png',
        title: 'Жилетка Вассермана',
        count: 2,
    },
    {
        img: 'images/069.png',
        title: 'Стул мамы Мерфи',
        count: 2,
    },
    {
        img: 'images/070.png',
        title: 'Шиш кебаб',
        count: 7,
    },
    {
        img: 'images/071.png',
        title: 'Альпинистский трос'
    },
    {
        img: 'images/072.png',
        title: 'Хакерский компьютер'
    },
    {
        img: 'images/073.png',
        title: 'Корона короля петучей',
        count: 3,
    },
    {
        img: 'images/074.png',
        title: 'Благословение Хакса',
        count: 3,
        isNotSlot: true
    },
    {
        img: 'images/075.png',
        title: 'Порошок прозрения',
        count: 2
    },

    {
        img: 'images/01.png',
        title: 'Силовая броня (Корона короля петучей, Щit, Одноразовые перчатки)',
        count: 2,
        isNotSlot: true
    },
    {
        img: 'images/02.png',
        title: 'Костюм мудреца (Порошок прозрения, хакерский компьютер, Жилетка Вассермана)',
        count: 3,
        isNotSlot: true
    },
    {
        img: 'images/03.png',
        title: 'Костюм "Элегантный рекетир" (Наперсток удачи, сексуальные чулки, Рука для фистинга имени Билли Херрингтона)',
        count: 3,
        isNotSlot: true
    },
    {
        img: 'images/04.png',
        title: 'Костюм "Исследователь Пустошей" (Набор выживальщика, Комбинезон химзащиты, Крышка от мусорного бака)',
        count: 3,
        isNotSlot: true
    },
    {
        img: 'images/05.png',
        title: 'Рейдерские лохмотья (Шиш-Кебаб, Кукла вуду, Альпинистский трос)',
        count: 2,
        isNotSlot: true
    },
];
let selectedCellKey = false;

const inventory = $('.inventory'),
    cellTemplate = $('<div class="cell"><img/><div class="count">1</div></div>'),
    controlIncrementCounter = $('<a/>', {
        text: '+',
        title: 'Увеличить кол-во зарядов/прочность',
        class: 'inc',
        href: '#',
        click: function () {
            const idx = $(this).closest('.cell').index();

            if (cells[idx].count) {
                cells[idx].count += 1;
            }
            else {
                cells[idx].count = 2;
            }
            cellUpdateDOM(idx);
            saveState(cells);

            return false;
        }
    }),
    controlDecrementCounter = $('<a/>', {
        text: '–',
        title: 'Уменьшить кол-во зарядов/прочность',
        class: 'dec',
        href: '#',
        click: function () {
            const idx = $(this).closest('.cell').index();

            if (cells[idx].count && cells[idx].count > 1) {
                cells[idx].count -= 1;
            }
            // кончились заряды
            else if (cells[idx].count === 1) {
                // пустая ячейка
                cells[idx].item = items[0]
            }
            cellUpdateDOM(idx);
            saveState(cells);

            return false;
        }
    }),
    controlNotSlot = $('<input/>', {
        type: 'checkbox',
        title: 'Предмет, не занимающий слот в инвентаре',
        click: function (e) {
            e.stopPropagation();

            const idx = $(this).closest('.cell').index();

            cells[idx].isNotSlot = $(this).is(':checked');
            cellUpdateDOM(idx);
            saveState(cells);
        }
    }),
    controlDelete = $('<a/>', {
        text: '×',
        title: 'Удалить ячейку',
        class: 'remove',
        href: '#',
        click: function () {
            const $cell = $(this).closest('.cell'),
                idx = $cell.index();

            delete cells[idx];
            cells.splice(idx, 1);

            $cell.find(cellControlsTemplate).detach();
            $cell.remove();
            saveState(cells);

            return false;
        }
    }),
    cellControlsTemplate = $('<div class="controls"></div>')
        .append(controlDecrementCounter)
        .append(controlIncrementCounter)
        .append(controlNotSlot)
        .append(controlDelete)
    ,
    addCell = function () {
        const newCell = cellTemplate.clone();
        inventory.append(newCell);
        $('.count', newCell).hide();

        newCell.on('click', cellOnClick);
        newCell.on('mouseenter', cellOnHover);
        newCell.on('mouseleave', function () {
            $(this).find(cellControlsTemplate).detach()
        });
    },
    cellUpdateDOM = function (key) {
        if (!cells[key] || !cells[key].item) {
            return
        }

        const $cell = inventory.children('.cell').eq(key);

        $('img', $cell).attr({
            src: cells[key].item.img,
            title: cells[key].item.title
        });

        if (cells[key].count && cells[key].count > 1) {
            $('.count', $cell).show()
        }
        else {
            $('.count', $cell).hide()
        }
        $('.count', $cell).text(cells[key].count);

        if (cells[key].isNotSlot) {
            $cell.addClass('not-slot');
        }
        else {
            $cell.removeClass('not-slot');
        }
    },
    selectCell = function (key) {
        selectedCellKey = key;

        const cells = $('.cell', inventory)
            .removeClass('active');

        if (typeof(key) === "number") {
            cells.eq(key).addClass('active');
        }
    },
    cellOnClick = function () {
        const $cell = $(this),
            currIndex = $cell.index()
        ;
        if (selector.is(':visible')) {
            if (selectedCellKey === currIndex) {
                selector.hide();
                selectCell(false);
            }
            else {
                selectCell(currIndex);
            }
        }
        else {
            selector.show();
            selectCell(currIndex);
        }
    },
    addCellOnClick = function () {
        cells.push({});
        addCell();
        saveState(cells);
    },
    cellOnHover = function () {
        const idx = $(this).index();

        controlNotSlot.prop('checked', Boolean(cells[idx].isNotSlot));

        $(this).append(cellControlsTemplate);
    },
    createCells = function (cellsArray) {
        for (let i in cellsArray) {
            addCell();
            cellUpdateDOM(i);
        }
    },
    getStorageKeySuffix = function () {
        return location.search.substring(1, 20);
    },
    saveState = function (cellsArray) {
        localStorage.setItem('inventory-' + getStorageKeySuffix(), JSON.stringify(cellsArray));
    },
    loadState = function () {
        let result = [];

        try {
            result = JSON.parse(localStorage.getItem('inventory-' + getStorageKeySuffix()));
        } catch (e) {
            console.error('Loading state', e);
        }

        if (!result || !result.length) {
            result = [
                {},
                {},
                {},
            ];
        }

        return result;
    },
    selector = $('.selector'),
    selectorOnClick = function () {
        const $itemKey = $(this).data('key');

        cells[selectedCellKey] = {
            item: items[$itemKey],
            count: items[$itemKey].count || 1,
            isNotSlot: items[$itemKey].isNotSlot || false
        };
        cellUpdateDOM(selectedCellKey);

        saveState(cells);
        selectCell(false);
        selector.hide();
    },
    createSelector = function(items) {
        const list = $('ul', selector);
        for(let i in items) {
            list.append(
                $('<li/>', {
                    ['data-key']: i,
                    html: $('<img/>', {
                        src: items[i].img,
                        title: items[i].title
                    }),
                    click: selectorOnClick
                })
            )
        }
    }
;

$('.add-cell').on('click', addCellOnClick);

cells = loadState();
console.log(cells);
createCells(cells);
createSelector(items);

