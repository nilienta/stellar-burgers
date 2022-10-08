import PropTypes from 'prop-types';

const PropTypesForIngredient = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  count: PropTypes.number,
};

const PropTypesForDataList = PropTypes.shape(PropTypesForIngredient);

export { PropTypesForDataList, PropTypesForIngredient };
