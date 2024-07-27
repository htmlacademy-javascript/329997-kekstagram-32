const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const imgUploadEffectsList = imgUploadEffects.querySelector('.effects__list');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');

const EffectId = {
  CHROME: 'effect-chrome',
  SEPIA: 'effect-sepia',
  MARVIN: 'effect-marvin',
  PHOBOS: 'effect-phobos',
  HEAT: 'effect-heat',
};

const Style = {
  CHROME: 'grayscale',
  SEPIA: 'sepia',
  MARVIN: 'invert',
  PHOBOS: 'blur',
  HEAT: 'brightness',
};

const SliderOption = {
  CHROME: { range: { 'min': 0, 'max': 1 }, step: 0.1, start: 1 },
  SEPIA: { range: { 'min': 0,'max': 1 }, step: 0.1, start: 1 },
  MARVIN: { range: { 'min': 0, 'max': 100 }, step: 1, start: 100 },
  PHOBOS: { range: { 'min': 0, 'max': 3 }, step: 0.1, start: 3 },
  HEAT: { range: { 'min': 1, 'max': 3 }, step: 0.1, start: 3 },
  NONE: { range: { 'min': 0, 'max': 100 }, step: 1, start: 100 },
};

noUiSlider.create(effectLevelSlider, {
  range: {
    'min': 0,
    'max': 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

const toggleSliderAvailability = (isAvailable) => {
  effectLevelSlider.classList.toggle('hidden', !isAvailable);
  imgUploadEffectLevel.classList.toggle('hidden', !isAvailable);
};

const setDefaultFormStyles = () => {
  imgUploadPreview.removeAttribute('style');
  toggleSliderAvailability(false);
};

const setDefaultFilter = () => {
  toggleSliderAvailability(false);
  imgUploadPreview.style.filter = '';
};

const setFilterAttribute = (style, eUnits = '') => {
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${style}(${effectLevelValue.value}${eUnits})`;
  });
};

const updateImgUploadPreview = (style, eUnits = '', sliderOption, availability) => {
  toggleSliderAvailability(availability);
  effectLevelSlider.noUiSlider.updateOptions(sliderOption);
  setFilterAttribute(style, eUnits);
};

imgUploadEffectsList.addEventListener('change', (evt) => {
  evt.preventDefault();
  const effectItem = evt.target
    .closest('.effects__item')
    .querySelector('input[type="radio"]');

  switch (effectItem.id) {
    case EffectId.CHROME:
      updateImgUploadPreview(Style.CHROME,'', SliderOption.CHROME, true);
      break;
    case EffectId.SEPIA:
      updateImgUploadPreview(Style.SEPIA,'', SliderOption.SEPIA, true);
      break;
    case EffectId.MARVIN:
      updateImgUploadPreview(Style.MARVIN,'%', SliderOption.MARVIN, true);
      break;
    case EffectId.PHOBOS:
      updateImgUploadPreview(Style.PHOBOS,'px', SliderOption.PHOBOS, true);
      break;
    case EffectId.HEAT:
      updateImgUploadPreview(Style.HEAT,'', SliderOption.HEAT, true);
      break;
    case EffectId.NONE:
      setDefaultFilter();
      break;
    default:
      setDefaultFilter();
  }
});

export { imgUploadPreview, setDefaultFormStyles };
