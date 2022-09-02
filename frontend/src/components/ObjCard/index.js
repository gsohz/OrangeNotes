import Card from "react-bootstrap/Card";
import { BsCheckLg } from "react-icons/bs";

function ObjCard({ objective }) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return (
    <>
      <Card
        style={{
          width: "18rem",
          height: "fit-content",
          borderRadius: "20px",
          boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)",
          cursor: "pointer",
          backgroundColor: objective.completed ? "" : "lightgrey",
          color: objective.completed ? "" : "grey",
        }}
      >
        <Card.Body>
          <Card.Title>{objective.title}</Card.Title>
          {objective.completed ? (
            ""
          ) : (
            <BsCheckLg
              style={{
                position: "absolute",
                right: "3em",
                left: "auto",
                top: "3.5em",
              }}
              size={"3em"}
              opacity={0.5}
            />
          )}
          <Card.Text>{objective.description}</Card.Text>
          <Card.Subtitle className="text-muted" style={{ fontSize: "12px" }}>
            Acaba em: {objective.prediction.toLocaleString(undefined, options)}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
}

export default ObjCard;
