import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import ProgressBar from "../ProgressBar";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import "./style.css";
import { useEffect, useState } from "react";
import PopUp from "../PopUp";

function MetaCard({ goal, edit }) {
  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [deleteObj, setDeleteObj] = useState(false);
  const [updateObj, setUpdateObj] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      navigate(`/${goal.id}/goal`);
    }
  }, [open, navigate, goal.id]);

  useEffect(() => {
    setDeleteObj(false);
    setUpdateObj(false);
    if (edit) setShow(!edit.edit);
  }, [edit]);

  return (
    <>
      <Card
        style={{
          width: "18rem",
          height: "fit-content",
          borderRadius: "20px",
          boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)",
          cursor: "pointer",
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
          goal={goal}
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

        <Card.Body onClick={() => setOpen(true)}>
          <Card.Title>{goal.title}</Card.Title>
          <Card.Subtitle className="mb-1 text-muted">
            <ProgressBar done={Math.round(goal.percentage)} />
          </Card.Subtitle>
          <Card.Text>{goal.description}</Card.Text>
          <Card.Subtitle className="text-muted" style={{ fontSize: "12px" }}>
            {goal.prediction !== ""
              ? `Acaba em: ${goal.prediction.toLocaleString([], options)}`
              : ""}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
}

export default MetaCard;
