import Card from "react-bootstrap/Card";
import { BsCheckLg } from "react-icons/bs";
import Alert from "react-bootstrap/Alert";
import { UpdateObjective } from "../../service/objectives";
import { useCallback, useEffect, useState } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import Button from "../Button/index";
import PopUp from "../PopUp";

function ObjCard({ objective, user, edit }) {
  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const [datasUser, setDatasUser] = useState({});
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const [deleteObj, setDeleteObj] = useState(false);
  const [updateObj, setUpdateObj] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const completeGoal = useCallback(
    async (objective) => {
      const { id } = objective;
      const user = datasUser.id;
      const completed = !objective.completed;

      try {
        const response = await UpdateObjective(id, completed, user);

        if (response.status === 200) {
          window.location.reload();
        }
      } catch (err) {
        setError(err?.response?.data?.message || `Ocorreu um erro`);
      }
    },
    [datasUser.id]
  );

  useEffect(() => {
    if (edit) setShow(!edit.edit);
  }, [edit]);

  useEffect(() => {
    setDeleteObj(false);
    setUpdateObj(false);
    setDatasUser(user);
  }, [user]);

  return (
    <>
      <Card
        style={{
          width: "18rem",
          height: "fit-content",
          borderRadius: "20px",
          boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)",
          cursor: "pointer",
          backgroundColor: objective.completed ? "lightgrey" : "",
          color: objective.completed ? "grey" : "",
        }}
      >
        <Button
          icon={MdDeleteForever()}
          style={{
            position: "absolute",
            right: "0.3em",
            top: "-1.5em",
            backgroundColor: "red",
            width: "2.6em",
            padding: "0",
            margin: "0.5em 0.3em",
            zIndex: "9",
          }}
          hidden={show}
          onClick={() => {
            setDeleteObj(true);
            setModalShow(true);
          }}
        />
        <PopUp
          show={modalShow}
          type={deleteObj ? "del" : updateObj ? "updt" : ""}
          objective={objective}
          onHide={() => setModalShow(false)}
          button_cancel={
            <Button
              style={{ border: "none", backgroundColor: "grey" }}
              onClick={() => setModalShow(false)}
            >
              Cancelar
            </Button>
          }
        />
        <Button
          icon={MdModeEdit()}
          secundario={true}
          style={{
            position: "absolute",
            right: "0.3em",
            top: "2em",
            width: "2.6em",
            margin: "0.3em",
            padding: "0",
            backgroundColor: "#5072A7",
          }}
          hidden={show}
          onClick={() => {
            setUpdateObj(true);
            setModalShow(true);
          }}
        />
        <Card.Body onClick={() => completeGoal(objective)}>
          <Card.Title>{objective.title}</Card.Title>
          {objective.completed ? (
            <BsCheckLg
              style={{
                position: "absolute",
                right: "auto",
                left: "auto",
                marginLeft: "75%",
                top: "40%",
              }}
              size={"3em"}
              opacity={0.3}
            />
          ) : (
            ""
          )}
          <Card.Text>{objective.description}</Card.Text>
          <Card.Subtitle className="text-muted" style={{ fontSize: "12px" }}>
            {objective.prediction !== ""
              ? `Acaba em: ${objective.prediction.toLocaleString([], options)}`
              : ""}
            {error && <Alert variant="danger">{error}</Alert>}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
}

export default ObjCard;
