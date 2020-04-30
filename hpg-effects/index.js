'use strict';

let cells = [],
    cellsMargin
;
const EFFECT_TYPES = {
    NONE: 'NONE',
    BUFF: 'BUFF',
    DEBUFF: 'DEBUFF',
    TARGET_TRAP: 'TARGET_TRAP',
    NONTARGET_TRAP: 'NONTARGET_TRAP',
    SPECIFIC_WHEEL_ROLL: 'SPECIFIC_WHEEL_ROLL',
    FOOD: 'FOOD'
};
const items = [
    {
        img: 'images/000.png',
        title: 'Пустая ячейка',
        type: EFFECT_TYPES.NONE,
    },
    {
        img: 'images/001.png',
        title: 'Мистер Ржавчик',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/002.png',
        title: 'Облизанный ободок унитаза',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/003.png',
        title: 'Ловушка Джокера',
        type: EFFECT_TYPES.TARGET_TRAP,
    },
    {
        img: 'images/004.png',
        title: 'Знаток выгоды',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/005.png',
        title: 'Стримбернар',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/006.png',
        title: 'В бухгалтерии все перепутали',
        type: EFFECT_TYPES.NONTARGET_TRAP,
    },
    {
        img: 'images/007.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/008.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/009.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/010.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/011.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/012.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/013.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/014.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/015.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/016.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/017.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/018.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/019.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/020.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/021.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/022.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/023.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/024.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/025.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/026.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/027.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/028.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/029.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/030.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/031.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/032.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/033.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/034.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/035.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/036.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/037.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/038.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/039.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/040.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/041.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/042.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/043.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/044.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/045.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/046.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/047.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/048.png',
        title: '',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/049.png',
        title: 'Падение пиццианской башни',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/050.png',
        title: 'Полное свинство',
        type: EFFECT_TYPES.DEBUFF,
    },
];
let selectedCellKey = false;

const inventory = $('.inventory'),
    cellTemplate = $('<div><div class="cell"><img/></div></div>'),
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
            saveState();

            return false;
        }
    }),
    cellControlsTemplate = $('<div class="controls"></div>')
        .append(controlDelete)
    ,
    addCell = function () {
        const newCell = cellTemplate.clone();
        inventory.append(newCell);

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

        const $cell = inventory.find('.cell').eq(key);

        $('img', $cell).attr({
            src: cells[key].item.img,
            title: cells[key].item.title
        });

        const cellType = cells[key].item.type ? cells[key].item.type : EFFECT_TYPES.NONE;
        $cell.parent().attr("class", cellType);
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
        saveState();
    },
    cellOnHover = function () {
        $('.cell', this).append(cellControlsTemplate);
    },
    setCellMargin = function (number) {
        cellsMargin = number;
        document.documentElement.style.setProperty('--cell-margin-left', number + 'px');
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
    saveState = function () {
        const data = {
            cells,
            cellsMargin
        };

        localStorage.setItem('effects-' + getStorageKeySuffix(), JSON.stringify(data));
    },
    loadState = function () {
        let data;

        try {
            data = JSON.parse(localStorage.getItem('effects-' + getStorageKeySuffix()));
        } catch (e) {
            console.error('Loading state', e);
        }

        if (!data || !data.cells) {
            data = {
                cellsMargin: -14,
                cells: [
                    {},
                    {},
                    {},
                ]
            };
        }

        ({cells, cellsMargin} = data);
    },
    selector = $('.selector'),
    selectorOnClick = function () {
        const $itemKey = $(this).data('key');

        cells[selectedCellKey] = {
            item: items[$itemKey],
        };
        cellUpdateDOM(selectedCellKey);

        saveState();
        selectCell(false);
        selector.hide();
    },
    createSelector = function(items) {
        const list = $('ul', selector);
        for(let i in items) {
            list.append(
                $('<li/>', {
                    'data-key': i,
                    html: $('<img/>', {
                        src: items[i].img,
                        title: items[i].title
                    }),
                    click: selectorOnClick
                })
            )
        }
    },
    loadMarginState = function () {
        if (/^[-\d]+$/.test(cellsMargin)) {
            setCellMargin(cellsMargin);
            $('#cell-left-margin').val(cellsMargin);
        }
    }
;

$('.add-cell').on('click', addCellOnClick);

$('#cell-left-margin').on('change', function () {
    setCellMargin($(this).val());
    saveState()
});

loadState();

console.log(cells);

loadMarginState();
createCells(cells);
createSelector(items);

