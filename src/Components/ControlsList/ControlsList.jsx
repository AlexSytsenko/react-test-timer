import PropTypes from "prop-types";

import Control from '../Control';
import styles from "./ControlList.module.scss";

const Controls = ({ onClick, controls }) => {
  return (
    <ul className={styles.controls} onClick={onClick}>
      {controls.map((item) => {
        return (
          <Control key={item} value={item} />
        );
      })}
    </ul>
  );
};

Control.defaultProps = {
  controls: [],
};

Control.propTypes = {
  onClick: PropTypes.func,
  controls: PropTypes.arrayOf(PropTypes.string),
};


export default Controls;
