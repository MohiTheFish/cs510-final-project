import PropTypes from 'prop-types';
function Loading({size="normal", className, style, color,  ...otherProps  }) {
  const colorStyle = {borderTopColor: color};
  return (
    <div className={`_lds-ring _${size} ${className}`} style={{...colorStyle, ...style}} {...otherProps} >
      <div style={colorStyle} />
      <div style={colorStyle} />
      <div style={colorStyle} />
      <div style={colorStyle} />
    </div>
  )
}
Loading.propTypes = {
  size: PropTypes.oneOf(['normal', 'half']),
  style: PropTypes.any, // Should be an object corresponding to a list of CSS styles. Not sure how to type this though
}

export default Loading;
