export default function Averages({ averages }) {
  return (
    <div className="mt-6">
      <p className="text-lg">
        <strong>Average WT:</strong> {averages.avgWT} |{" "}
        <strong>Average TAT:</strong> {averages.avgTAT}
      </p>
    </div>
  );
}
