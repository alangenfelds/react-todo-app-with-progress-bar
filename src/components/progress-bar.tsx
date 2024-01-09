import "./progress-bar.scss";

type Props = {};

const ProgressBar = (props: Props) => {
  return (
    <div className="progress-bar-container">
      <div className="title">Progress</div>
      <div className="bar" />
      <div className="counter">12 Completed</div>
    </div>
  );
};

export default ProgressBar;
