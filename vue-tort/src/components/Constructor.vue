<template>
    <div class="constructor">
        <div class="constructor__img">
            <img :src="defoultImg" alt="">
            <img :src="fillingImgOne" alt="" class="filling-img-1">
            <img :src="fillingImgTwo" alt="" class="filling-img-2">
            <img :src="fillingImgThree" alt="" class="filling-img-3">
            <img :src="coatingImg" alt="" class="filling-img-4">
            <img :src="glazeImg" alt="" class="filling-img-5">
        </div>

        <div class="constructor__action">
            <div class="constructor__header">
                <div class="constructor__title">Конструктор тортов</div>
                <div class="constructor__step">
                    <div class="constructor__step-title">{{ aboutStep }}</div>
                    <div class="constructor__step-count">Шаг {{ step }} из 7</div>
                </div>
            </div>

            <div class="constructor__body">
                <div class="step-group" v-if="step === 1">
                    <div class="group">
    
                        <!-- <InputRadio :inputsFigure="inputsFigure" /> -->
    
                        <div class="radio" v-for="input in inputsFigure">
                            <input :onChange="selectFigure" v-model="figure" type="radio" :name="input.name" :value="input.nameId" :id="input.nameId" :disabled="input.isDisabled" class="radio__input hidden">
                            <label :for="input.nameId" class="radio__label">{{ input.text }}</label>
                        </div>
                        
                    </div>
                    
                    <div class="group">
                        <div class="textarea">
                            <label for="specification" class="textarea__label hidden">Здесь вы можете ввести свой текст с описанием необходимой формы</label>
                            <textarea name="specification" v-model="specification" id="specification" :disabled="figure != 'cutout'" class="textarea__input" placeholder="Здесь вы можете ввести свой текст с описанием необходимой формы"></textarea>
                        </div>
                    </div>
                </div>


                <div class="step-group" v-if="step === 2">
                    <div class="group">
                        <div class="group__title">Вес</div>
                        <div class="radio" v-for="input in inputsWeight">
                            <input v-model="weight" :onChange="selectWeight" type="radio" :name="input.name" :value="input.nameId" :id="input.nameId" class="radio__input hidden">
                            <label :for="input.nameId" class="radio__label">{{ input.text }}</label>
                        </div>
                        <div class="input input--constructor">
                            <label for="myWeight" class="input__label hidden">Свой вариант</label>
                            <input type="text" id="myWeight" v-model="weightMy" value="" :onInput="selectCustomWeight" :disabled="weight != 'myWeight'" class="input__input">
                            <span class="input__placeholder">кг</span>
                        </div>
                    </div>

                    <div class="group">
                        <div class="group__title">Количество ярусов</div>
                        <div class="radio" v-for="input in inputTiers">
                            <input :onChange="selectTier" v-model.number="tiers" type="radio" :name="input.name" :value="input.value" :id="input.nameId" :disabled="weight < input.moreWeight" class="radio__input hidden">
                            <label :for="input.nameId" class="radio__label">{{ input.text }}</label>
                        </div>
                    </div>
                </div>

                




                <div class="step-group" v-if="step === 3">
                    <div class="group">
                        <div class="group__title">Покрытие</div>
                        <div class="radio" v-for="input in inputsCoating">
                            <input type="radio" v-model="coating" :onChange="selectCoating" :disabled="input.value === 'ganash'" :name="input.name" :value="input.value" :id="input.id" class="radio__input hidden">
                            <label :for="input.id" class="radio__label">{{ input.text }}</label>

                            <div class="group" v-if="input.innerCoating">
                                <div class="radio" v-for="inputInner in input.innerCoating">
                                    <input type="radio" v-model="coatingKrem" :onChange="selectCoatingCrem" :disabled="coating != 'crem'" :name="inputInner.name" :value="inputInner.value" :id="inputInner.id" class="radio__input hidden">
                                    <label :for="inputInner.id" class="radio__label">{{ inputInner.text }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





                <div class="step-group" v-if="step === 4">
                    <div class="group">
                        <div class="group__title">Выбор цвета покрытия</div>
                        <div class="group-color">
                            <div class="radio-color" v-for="input in inputsColorCoating">
                                <input type="radio" :onChange="selectCoatingColor" v-model="coatingColor" :name="input.name" :id="input.id" :value="input.value" class="radio-color__input hidden">
                                <label :style="{ '--color-bg': input.value }" :for="input.id" class="radio-color__label"></label>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="step-group" v-if="step === 5">
                    <div class="group-btn-radio">
                        <div class="radio-btn" v-for="tier in tiers">
                            <input :id="tier" type="radio" v-model="fillingTier" :onChange="selectTierFill" class="radio-btn__input hidden" name="tierSelect" :value="tier">
                            <label :for="tier" class="radio-btn__label">{{ tier }} ярус</label>
                        </div>
                        <div class="radio-btn" v-if="tiers > 1">
                            <input id="tier-all" type="radio" v-model="fillingTier" :onChange="selectTierFill" class="radio-btn__input hidden" name="tierSelect" value="tiersAll">
                            <label for="tier-all" class="radio-btn__label">Весь торт</label>
                        </div>
                    </div>

                    <div class="group">
                        <div class="group__subtitle">Вы можете выбрать классическую или муссовую начинку для торта</div>
                        <div class="group__columns">
                            <div class="group__column" v-if="tiers > 1">
                                <div class="group__title">Классическая</div>
                                <div class="group__column-wrap">
                                    <div class="radio" v-for="input in inputFillingClassic">
                                        <input ref="classic" type="radio" v-model="filling" :onChange="selectFilling" :name="input.name" :value="input.value" :id="input.id" class="radio__input hidden">
                                        <label :for="input.id" class="radio__label">{{ input.text }}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="group__column">
                                <div class="group__title">Муссовая</div>
                                <div class="group__column-wrap">
                                    <div class="radio" v-for="input in inputFillingMus">
                                        <input ref="mus" type="radio" v-model="filling" :onChange="selectFilling" :name="input.name" :value="input.value" :id="input.id" class="radio__input hidden">
                                        <label :for="input.id" class="radio__label">{{ input.text }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="step-group" v-if="step === 6">
                    <div class="group">
                        <div class="group__title">Выбор цвета глазури</div>
                        <div class="group-color">
                            <div class="radio-color" v-for="input in inputsColorGlaze">
                                <input type="radio" :onChange="selectGlazeColor" v-model="glazeColor" :name="input.name" :id="input.id" :value="input.value" class="radio-color__input hidden">
                                <label :style="{ '--color-bg': input.value }" :for="input.id" class="radio-color__label"></label>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="step-group" v-if="step === 7">
                    <div class="foram-wrap">
                        <form action="" class="main-form">
                            <div class="main-form__row">
                                <label for="name" class="main-form__label">Ваше имя</label>
                                <input type="text" v-model="formData.name" id="name" name="name" class="main-form__input">
                            </div>
                            <div class="main-form__row">
                                <label for="email" class="main-form__label">E-mail</label>
                                <input type="email" v-model="formData.email" id="email" name="email" class="main-form__input">
                            </div>
                            <div class="main-form__row">
                                <label for="tel" class="main-form__label">Телефон</label>
                                <input type="tel" v-model="formData.phone" id="tel" name="tel" class="main-form__input">
                            </div>
                            <div class="main-form__row main-form__row--textarea">
                                <label for="comment" class="main-form__label main-form__label--textarea">Комментарий</label>
                                <textarea name="comment" v-model="formData.comment" id="comment" class="main-form__textarea"></textarea>
                            </div>
                            <div class="main-form__footer">
                                <div class="main-form__text">Вы можете загрузить своё изображение, чтобы наши кондитеры вдохновились им!</div>
                                <div class="main-form__row-file">
                                    <input type="file" id="file" name="file" :onChange="selectFile" class="main-form__input-file hidden" accept=".png, .jpg, .jpeg">
                                    <label for="file" class="main-form__label-file label-file">
                                        <div class="label-file__link">Выбрать файлы</div>
                                        <div ref="fileName" class="label-file__info">Файл не выбран</div>
                                    </label>
                                </div>

                                <div class="main-form__row-checkbox">
                                    <div class="main-form__checkbox">
                                        <input type="checkbox" v-model="formData.policy" name="policy" id="policy" class="main-form__input-checkbox hidden">
                                        <label for="policy" class="main-form__label-checkbox">Отправляя форму, я даю согласие на <a href="#">обработку персональных данных</a></label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>



            </div>

            <div class="constructor__footer">
                <div class="constructor__price total-price">
                    <div class="total-price__label">Ваш торт:</div>
                    <div class="total-price__num">
                        {{ price }} ₽
                        <div class="total-price__info" title="Информация про цену!">
                            <img src="./../../src/img/icon-info.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="constructor__btn-wrap">
                    <button class="btn btn--grey btn-reset constructor__btn" v-if="step > 1" :onClick="prevStep">Назад</button>
                    <button class="btn btn-reset constructor__btn" :disabled="!stepInit":onClick="nextStep">Далее</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import InputRadio from './InputRadio.vue';

const inputsFigure = [
    {
        id: 1,
        nameId: 'circle',
        name: 'figure',
        text: 'Круг',
        isDisabled: false,
    },
    {
        id: 2,
        nameId: 'oval',
        name: 'figure',
        text: 'Овал',
        isDisabled: true,
    },
    {
        id: 3,
        nameId: 'rectangle',
        name: 'figure',
        text: 'Прямоугольник',
        isDisabled: true,
    },
    {
        id: 4,
        nameId: 'square',
        name: 'figure',
        text: 'Квадрат',
        isDisabled: true,
    },
    {
        id: 5,
        nameId: 'cutout',
        name: 'figure',
        text: 'Вырезная',
        isDisabled: false,
    },
];

const inputsWeight = [
    {
        id: 11,
        text: '2 кг',
        name: 'weight',
        nameId: '2'
    },
    {
        id: 12,
        text: '3 кг',
        name: 'weight',
        nameId: '3'
    },
    {
        id: 14,
        text: '5 кг и более',
        name: 'weight',
        nameId: '5'
    },
    {
        id: 15,
        text: 'Свой вариант',
        name: 'weight',
        nameId: 'myWeight'
    },
];

const inputTiers = [
    {
        id: 21,
        text: 'Одноярусные',
        name: 'tier',
        nameId: 'singleTier',
        value: 1,
        moreWeight: 2,
    },
    {
        id: 22,
        text: 'Двухъярусные',
        name: 'tier',
        nameId: 'twoTier',
        value: 2,
        moreWeight: 3,
    },
    {
        id: 23,
        text: 'Трёхярусные',
        name: 'tier',
        nameId: 'threeTier',
        value: 3,
        moreWeight: 5,
    },
    {
        id: 24,
        text: 'Четыре и более ярусов',
        name: 'tier',
        nameId: 'fourMoreTiers',
        value: 4,
        moreWeight: 5,
    },
];

const inputFillingClassic = [
    {
        id: 31,
        text: 'Медовый',
        name: 'filling',
        value: 'med',
    },
    {
        id: 32,
        text: 'Кофейный',
        name: 'filling',
        value: 'kof',
    },
    {
        id: 33,
        text: 'Вишнёвый',
        name: 'filling',
        value: 'vis',
    },
    {
        id: 34,
        text: 'Прага',
        name: 'filling',
        value: 'pra',
    },
    {
        id: 35,
        text: 'Медовик с грецким орехом',
        name: 'filling',
        value: 'gre',
    },
    {
        id: 36,
        text: 'С черносливом',
        name: 'filling',
        value: 'che',
    },
    {
        id: 37,
        text: 'Ореховый',
        name: 'filling',
        value: 'ore',
    },
    {
        id: 38,
        text: 'Сказка от Палыча',
        name: 'filling',
        value: 'ska',
    },
    {
        id: 39,
        text: 'Киевский',
        name: 'filling',
        value: 'kie',
    },
    {
        id: 40,
        text: 'Маковый',
        name: 'filling',
        value: 'mam',
    },
    {
        id: 41,
        text: 'Мамина любовь',
        name: 'filling',
        value: 'mak',
    },
    {
        id: 42,
        text: 'Эстерхази',
        name: 'filling',
        value: 'eks',
    },
    {
        id: 43,
        text: 'Нежный',
        name: 'filling',
        value: 'nez',
    },
];

const inputFillingMus = [
    {
        id: 61,
        text: 'Красный бархат',
        name: 'filling',
        value: 'kra',
    },
    {
        id: 62,
        text: 'Крем-Чиз',
        name: 'filling',
        value: 'kre',
    },
    /* {
        id: 63,
        text: 'Ананасовый рай',
        name: 'filling',
        value: '',
    }, */
    {
        id: 64,
        text: 'Белая вишня',
        name: 'filling',
        value: 'bel',
    },
    {
        id: 65,
        text: 'Единорог',
        name: 'filling',
        value: 'edn',
    },
    {
        id: 66,
        text: 'Рикотта с грушей',
        name: 'filling',
        value: 'rik',
    },
    {
        id: 67,
        text: 'Шоколадная симфония',
        name: 'filling',
        value: 'sho',
    },
    {
        id: 68,
        text: 'Молочная девочка',
        name: 'filling',
        value: 'mol',
    },
    {
        id: 69,
        text: 'Фисташковый',
        name: 'filling',
        value: 'fis',
    },
    {
        id: 70,
        text: 'Фруктовый микс',
        name: 'filling',
        value: 'fru',
    },
    /* {
        id: 71,
        text: 'Карамельная девочка',
        name: 'filling',
        value: '',
    }, */
];

const fillingMus = ['kra', 'kre', 'bel', 'edn', 'rik', 'sho', 'mol', 'fis', 'fru'];

const inputsCoating = [
    {
        id: 80,
        text: 'Крем',
        name: 'coating',
        value: 'crem',
        innerCoating: [
            {
                id: 91,
                text: 'Сливочно-масляный',
                name: 'coatingCrem',
                value: 'slivochii-krem', 
            },
            {
                id: 92,
                text: 'Сырный (крем-чиз)',
                name: 'coatingCrem',
                value: 'slivochii-krem-chiz', 
            },
            {
                id: 93,
                text: 'Сливки',
                name: 'coatingCrem',
                value: 'slivki', 
            },
        ],
    },
    {
        id: 81,
        text: 'Ганаш',
        name: 'coating',
        value: 'ganash',
    },
    {
        id: 82,
        text: 'Мастика',
        name: 'coating',
        value: 'mastika',
    },
];

const inputsColorCoating = [
    {
        id: 101,
        name: 'color-coating',
        value: 'rgb(251,192,34)',
    },
    {
        id: 102,
        name: 'color-coating',
        value: 'rgb(4,170,79)',
    },
    {
        id: 103,
        name: 'color-coating',
        value: 'rgb(2,128,167)',
    },
    {
        id: 104,
        name: 'color-coating',
        value: 'rgb(32,35,184)',
    },
    {
        id: 105,
        name: 'color-coating',
        value: 'rgb(120,12,141)',
    },
    {
        id: 106,
        name: 'color-coating',
        value: 'rgb(245,0,245)',
    },
    {
        id: 107,
        name: 'color-coating',
        value: 'rgb(240,4,4)',
    },
    {
        id: 108,
        name: 'color-coating',
        value: 'rgb(122,4,4)',
    },
    {
        id: 109,
        name: 'color-coating',
        value: 'rgb(49,49,49)',
    },
    {
        id: 110,
        name: 'color-coating',
        value: 'rgb(0,0,0)',
    },
];

const inputsColorGlaze = [
    {
        id: 121,
        name: 'color-glaze',
        value: 'rgb(251,192,34)',
    },
    {
        id: 122,
        name: 'color-glaze',
        value: 'rgb(4,170,79)',
    },
    {
        id: 123,
        name: 'color-glaze',
        value: 'rgb(2,128,167)',
    },
    {
        id: 124,
        name: 'color-glaze',
        value: 'rgb(32,35,184)',
    },
    {
        id: 125,
        name: 'color-glaze',
        value: 'rgb(120,12,141)',
    },
    {
        id: 126,
        name: 'color-glaze',
        value: 'rgb(245,0,245)',
    },
    {
        id: 127,
        name: 'color-glaze',
        value: 'rgb(240,4,4)',
    },
    {
        id: 128,
        name: 'color-glaze',
        value: 'rgb(122,4,4)',
    },
    {
        id: 129,
        name: 'color-glaze',
        value: 'rgb(49,49,49)',
    },
    {
        id: 130,
        name: 'color-glaze',
        value: 'rgb(0,0,0)',
    },
];


export default {
    components: {
        // InputRadio
    },

    data() {
        return {
            inputsFigure,
            inputsWeight,
            inputTiers,
            inputFillingClassic,
            inputFillingMus,
            inputsCoating,
            inputsColorCoating,
            inputsColorGlaze,

            price: 2000,
            stepInit: false,
            step: 1,
            aboutStep: 'Выбор формы',

            figure: '',

            weight: '2',
            weightMy: '',

            tiers: 1,
            specification: '',
            
            filling: '',
            fillingOne: '',
            fillingTwo: '',
            fillingThree: '',
            fillingAll: '',
            fillingTier: 1,

            fillingTypeOne: '',
            fillingTypeTwo: '',
            fillingTypeThree: '',

            coating: '',
            coatingKrem: '',

            coatingColor: '',

            glazeColor: '',

            defoultImg: './src/img/constructo-tort-1.png',
            fillingImgOne: '',
            fillingImgTwo: '',
            fillingImgThree: '',
            coatingImg: '',
            glazeImg: '',
            tiersImg: '1',

            formData: {
                name: '',
                email: '',
                phone: '',
                comment: '',
                policy: ''
            }
        }
    },

    watch: {
        tiers(newTier) {
            this.coatingImg = `./src/img/coating-color/C_${newTier}_mas_${this.coatingColor}.png`;
            this.glazeImg = `./src/img/glaze-color/C_${newTier}_glz_${this.glazeColor}.png`;
        }
    },

    methods: {
        selectFile(ev) {
            if (ev.target.files.length) {
                this.$refs.fileName.textContent = ev.target.files[0].name;
            } else {
                this.$refs.fileName.textContent = 'Файл не выбран';
            }
        },

        resetTort() {
            this.defoultImg = '';
            this.fillingImgOne = '';
            this.fillingImgTwo = '';
            this.fillingImgThree = '';
            this.fillingTier = 1;
            this.weightMy = '';
            this.tiers = 1;
            this.filling = '';
            this.specification = '';
            this.tiersImg = '1';
            this.weight = '2';
        },

        resetInputFillst() {
            const arrElemClassic = this.$refs.classic;
            const arrElemMus = this.$refs.mus;
            for (let i = 0; i < arrElemClassic.length; i++) {
                arrElemClassic[i].disabled = false;
            }
            for (let i = 0; i < arrElemMus.length; i++) {
                arrElemMus[i].disabled = false;
            }
        },

        selectFigure(ev) {
            this.stepInit = true;
            if (this.figure === 'circle' || this.figure === 'cutout') {
                this.resetTort();
                this.defoultImg = `./src/img/C_1_tarelka.png`;
            }
        },

        selectCustomWeight() {
            if (!/^\d+$/.test(this.weightMy)) {
				this.weightMy = this.weightMy.replace(/[^\d]/g, '');
			}
        },

        selectWeight() {
            if (this.weight <= 2 && this.tiers >= 2) {
                this.tiers = 1;
                this.tiersImg = 1;
                this.defoultImg = `./src/img/C_${this.tiersImg}_tarelka.png`;
                this.fillingImgTwo = '';
                this.fillingImgThree = '';
                this.fillingTier = 1;
                return;
            }
            if (this.weight <= 3 && this.tiers >= 3) {
                this.tiers = 2;
                this.tiersImg = 2;
                this.defoultImg = `./src/img/C_${this.tiersImg}_tarelka.png`;
                this.fillingImgThree = '';
                this.fillingTier = 1;
                return;
            }

            this.price = this.weight * 1000;
        },

        selectTier() {
            if (this.tiers > 3) {
                this.tiersImg = 3;
            } else {
                this.tiersImg = this.tiers;
            }
            this.defoultImg = `./src/img/C_${this.tiersImg}_tarelka.png`;
            if (this.tiers == 1) {
                this.fillingImgTwo = '';
                this.fillingImgThree = '';
                this.fillingTier = 1;
            }
            if (this.tiers == 2) {
                this.fillingImgThree = '';
                this.fillingTier = 1;
            }
        },

        selectTierFill() {
            if (this.fillingTier == 1) {
                this.filling = this.fillingOne;
                this.resetInputFillst();
                return;
            }
            if (this.fillingTier == 2) {
                this.filling = this.fillingTwo;
                this.resetInputFillst();
                if (this.fillingTypeOne == 'mus') {
                    const arrElemClassic = this.$refs.classic;
                    for (let i = 0; i < arrElemClassic.length; i++) {
                        arrElemClassic[i].disabled = true;
                    }
                }
                return;
            }
            if (this.fillingTier == 3) {
                this.filling = this.fillingThree;
                this.resetInputFillst();
                if (this.fillingTypeTwo == 'mus') {
                    const arrElemClassic = this.$refs.classic;
                    for (let i = 0; i < arrElemClassic.length; i++) {
                        arrElemClassic[i].disabled = true;
                    }
                }
                return;
            }
            if (this.fillingTier == 'tiersAll') {
                this.filling = this.fillingAll;
                this.resetInputFillst();
            }
        },

        selectFilling() {
            if (this.fillingTier == 1) {
                this.fillingImgOne = `./src/img/filling/C_${this.filling}${this.fillingTier}.png`;
                this.fillingOne = this.filling;
                this.fillingAll = '';
                if (fillingMus.includes(this.filling)) {
                    this.fillingTypeOne = 'mus';
                } else {
                    this.fillingTypeOne = 'classic';
                }

                if (this.fillingTypeTwo == 'classic' && this.fillingTypeOne == 'mus') {
                    this.fillingTypeTwo = '';
                    this.fillingTwo = '';
                    this.fillingImgTwo = '';
                    this.fillingTypeThree = '';
                    this.fillingThree = '';
                    this.fillingImgThree = '';
                }
            }
            if (this.fillingTier == 2) {
                this.fillingImgTwo = `./src/img/filling/C_${this.filling}${this.fillingTier}.png`;
                this.fillingTwo = this.filling;
                this.fillingAll = '';
                if (fillingMus.includes(this.filling)) {
                    this.fillingTypeTwo = 'mus';
                } else {
                    this.fillingTypeTwo = 'classic';
                }
                
                if (this.fillingTypeThree == 'classic' && this.fillingTypeTwo == 'mus') {
                    this.fillingTypeThree = '';
                    this.fillingThree = '';
                    this.fillingImgThree = '';
                }
            }
            if (this.fillingTier == 3) {
                this.fillingImgThree = `./src/img/filling/C_${this.filling}${this.fillingTier}.png`;
                this.fillingThree = this.filling;
                this.fillingAll = '';
                if (fillingMus.includes(this.filling)) {
                    this.fillingTypeThree = 'mus';
                } else {
                    this.fillingTypeThree = 'classic';
                }
            }
            if (this.fillingTier == 'tiersAll') {
                this.fillingAll = this.filling;
                this.fillingOne = this.filling;
                this.fillingTwo = this.filling;
                this.fillingThree = this.filling;
                if (fillingMus.includes(this.filling)) {
                    this.fillingTypeOne = 'mus';
                    this.fillingTypeTwo = 'mus';
                    this.fillingTypeThree = 'mus';
                } else {
                    this.fillingTypeOne = 'classic';
                    this.fillingTypeTwo = 'classic';
                    this.fillingTypeThree = 'classic';
                }
                if (this.tiers == 1) {
                    this.fillingImgOne = `./src/img/filling/C_${this.filling}1.png`;
                }
                if (this.tiers == 2) {
                    this.fillingImgOne = `./src/img/filling/C_${this.filling}1.png`;
                    this.fillingImgTwo = `./src/img/filling/C_${this.filling}2.png`;
                }
                if (this.tiers == 3) {
                    this.fillingImgOne = `./src/img/filling/C_${this.filling}1.png`;
                    this.fillingImgTwo = `./src/img/filling/C_${this.filling}2.png`;
                    this.fillingImgThree = `./src/img/filling/C_${this.filling}3.png`;
                }
            }

            if (this.tiers === 1 && this.fillingOne != '') {
                this.stepInit = true;
            }
            if (this.tiers === 2 && this.fillingTwo != '' && this.fillingOne != '') {
                this.stepInit = true;
            }
            if (this.tiers === 3 && this.fillingThree != '' && this.fillingTwo != '' && this.fillingOne != '') {
                this.stepInit = true;
            }
        },

        selectCoating() {
            if (this.coating != 'crem') {
                this.stepInit = true;
                this.coatingKrem = '';
            }

            if (this.coating != 'ganash') {

            }

            if (this.coating === 'crem' && this.coatingKrem === '' ) {
                this.stepInit = false;
            }
            
        },

        selectCoatingCrem() {
            this.stepInit = true;
        },

        selectCoatingColor() {
            this.coatingImg = `./src/img/coating-color/C_${this.tiers}_mas_${this.coatingColor}.png`;
            this.stepInit = true;
        },

        selectGlazeColor() {
            this.glazeImg = `./src/img/glaze-color/C_${this.tiers}_glz_${this.glazeColor}.png`;
            this.stepInit = true;
        },

        selectTitleStep() {
            switch (this.step) {
                case 1:
                    this.aboutStep = 'Выбор формы';
                    break;
            
                case 2:
                    this.aboutStep = 'Выбор веса и количества ярусов';
                    break;
            
                case 3: 
                    this.aboutStep = 'Выбор покрытия';
                    break;
                case 4:
                    this.aboutStep = 'Выбор цвета покрытия';
                    break;
            
                case 5:
                    this.aboutStep = 'Выбор начинки';
                    break;
            
                case 6:
                    this.aboutStep = 'Выбор цвета глазури';
                    break;
            
                case 7:
                    this.aboutStep = 'оформление заказа';
                    break;
            }
        },

        nextStep() {
            if (this.step >= 7) return;
            this.step++;
            this.selectTitleStep();
            if (this.step === 2) {
                this.stepInit = true;
            }
            if (this.step === 3 && this.coating == '') {
                this.stepInit = false;
            }
            if (this.step === 4 && this.coatingColor == '') {
                this.stepInit = false;
            }
            if (this.step === 5) {
                if (this.tiers === 1 && this.fillingOne == '') {
                    this.stepInit = false;
                }
                if (this.tiers === 2 && this.fillingTwo == '' && this.fillingOne == '') {
                    this.stepInit = false;
                }
                if (this.tiers === 3 && this.fillingThree == '' && this.fillingTwo == '' && this.fillingOne == '') {
                    this.stepInit = false;
                }
            }
            if (this.step === 6 && this.glazeColor == '') {
                this.stepInit = false;
            }
        },

        prevStep() {
            if (this.step === 1) return;
            this.step--;
            this.selectTitleStep();
            this.stepInit = true;
        }
    }
}

</script>

<style>

</style>