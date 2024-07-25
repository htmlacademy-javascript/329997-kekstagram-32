
const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');

const inputEffectNone = imgUploadEffects.querySelector('#effect-none');
const inputEffectChrome = imgUploadEffects.querySelector('#effect-chrome');
const inputEffectSepia = imgUploadEffects.querySelector('#effect-sepia');
const inputEffectMarvin = imgUploadEffects.querySelector('#effect-marvin');
const inputEffectPhobos = imgUploadEffects.querySelector('#effect-heat');

const Styles = {
  'CHROME': 'filter: grayscale',
  'SEPIA': 'filter: sepia',
  'MARVIN': 'filter: invert',
  'PHOBOS': 'filter: blur',
  'HEAT': 'filter: brightness',
};

const Parametres = {
  filterChrome: { range: { 'min': 0, 'max': 1 }, step: 0.1, start: 1 },
  filterSepia: { range: { 'min': 0,'max': 1 }, step: 0.1, start: 1 },
  filterMarvin: { range: { 'min': 0, 'max': 100 }, step: 1, start: 100 },
  filterPhobos: { range: { 'min': 0, 'max': 3 }, step: 0.1, start: 3 },
  filterHeat: { range: { 'min': 1, 'max': 3 }, step: 0.1, start: 3 },
  filterDefault: {},
};

noUiSlider.create(effectLevelSlider, {
  range: {
    'min': 0,
    'max': 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const updateSliderChrome = () => {
  effectLevelSlider.noUiSlider.updateOptions(Parametres.filterChrome);
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.setAttribute('style', `${Styles.CHROME}(${effectLevelValue.value})`);
});
};

inputEffectChrome.addEventListener('change', updateSliderChrome);


/* 2.2. Наложение эффекта на изображение:

По умолчанию должен быть выбран эффект «Оригинал».
На изображение может накладываться только один эффект.
Интенсивность эффекта регулируется перемещением ползунка в слайдере.
Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
Уровень эффекта записывается в поле .effect-level__value в виде числа.
При изменении уровня интенсивности эффекта (предоставляется API слайдера),
CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
Для эффекта «Оригинал» CSS-стили filter удаляются.
При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
слайдер, CSS-стиль изображения и значение поля должны обновляться. */

export { imgUploadPreview };
