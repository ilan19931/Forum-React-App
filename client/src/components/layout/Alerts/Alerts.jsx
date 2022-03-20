import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts?.length > 0 &&
  alerts.map((alert) => (
    <div
      key={alert._id}
      className={`alert alert-${alert.alertType}`}
      style={{ width: "100%" }}
    >
      {alert?.msg?.msg.toString()}
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Alerts);
