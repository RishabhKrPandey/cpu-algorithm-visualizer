import './Averages.css';

export default function Averages({ averages }) {
  return (
    <div className="averages">
      <p>
        <strong>Average WT:</strong> {averages.avgWT} |{" "}
        <strong>Average TAT:</strong> {averages.avgTAT}
      </p>
    </div>
  );
}
