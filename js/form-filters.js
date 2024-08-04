const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const imgUploadEffectsList = imgUploadEffects.querySelector('.effects__list');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');

const Style = {
  CHROME: { id: 'effect-chrome', effect: 'grayscale', units: '', slider: true, sliderOptions: { range: { 'min': 0, 'max': 1 }, step: 0.1, start: 1 } },
  SEPIA: { id: 'effect-sepia', effect: 'sepia', units: '', slider: true, sliderOptions: { range: { 'min': 0,'max': 1 }, step: 0.1, start: 1 } },
  MARVIN: { id: 'effect-marvin', effect: 'invert', units: '%', slider: true, sliderOptions: { range: { 'min': 0, 'max': 100 }, step: 1, start: 100 } },
  PHOBOS: { id: 'effect-phobos', effect: 'blur', units: 'px', slider: true, sliderOptions: { range: { 'min': 0, 'max': 3 }, step: 0.1, start: 3 } },
  HEAT: { id: 'effect-heat', effect: 'brightness', units: '', slider: true, sliderOptions: { range: { 'min': 1, 'max': 3 }, step: 0.1, start: 3 } },
  NONE: { id: 'effect-none', effect: 'none', units: '', slider: false, sliderOptions: { range: { 'min': 0, 'max': 100 }, step: 1, start: 100 } },
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

const setFilterAttribute = (style = 'none', units) => {
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${style}(${effectLevelValue.value}${units})`;
  });
};

const updateImgUploadPreview = (style, units, sliderOption, availability) => {
  toggleSliderAvailability(availability);
  effectLevelSlider.noUiSlider.updateOptions(sliderOption);
  setFilterAttribute(style, units);
};

imgUploadEffectsList.addEventListener('change', (evt) => {
  evt.preventDefault();
  const effectItemId = evt.target.id;
  if (effectItemId === Style.NONE.id) {
    setDefaultFormStyles();
    return;
  }
  const filter = Object.values(Style).find((element) => element.id === effectItemId);
  updateImgUploadPreview(filter.effect, filter.units, filter.sliderOptions, filter.slider);
});

export { imgUploadPreview, setDefaultFormStyles };
