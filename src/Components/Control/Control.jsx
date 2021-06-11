import PropTypes from "prop-types";
import styles from "./Control.module.scss";

const Control = ({ value }) => {
  return (
    <li className={styles.control}>
      <button className={styles.button} type="button">
        {value}
      </button>
    </li>
  );
};

Control.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Control;
