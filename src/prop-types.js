import PropTypes from 'prop-types';

const PropTypesForDataList = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
});

export default PropTypesForDataList;
