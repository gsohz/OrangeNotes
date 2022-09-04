import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import ProgressBar from "../ProgressBar";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import "./style.css";
import { useEffect, useState } from "react";
import PopUp from "../PopUp";
import { GiStairsGoal } from "react-icons/gi";
import { IoMdTrophy } from "react-icons/io";

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
          maxHeight: "10rem",
          borderRadius: "20px",
          cursor: "pointer",
          background: Math.round(goal.percentage === 100)
            ? "linear-gradient(120deg, rgba(225,225,225,0.5) 0%, rgba(255,164,44,0.9) 100%)"
            : "",
        }}
        className="card"
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
            zIndex: "9",
          }}
          hidden={show}
          onClick={() => {
            setUpdateObj(true);
            setModalShow(true);
          }}
        />

        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            textOverflow: "ellipses",
          }}
        >
          {Math.round(goal.percentage) === 100 ? (
            <IoMdTrophy
              style={{
                position: "absolute",
                top: "0",
                zIndex: "1",
                width: "100%",
                height: "100%",
              }}
              size={"3em"}
              opacity={0.1}
            />
          ) : (
            <GiStairsGoal
              style={{ position: "absolute", top: "0", zIndex: "1" }}
              size={"100%"}
              opacity={0.1}
            />
          )}

          <div style={{ position: "relative", zIndex: "3" }}>
            <Card.Title className="card-title" onClick={() => setOpen(true)}>
              {goal.title}
            </Card.Title>
            <Card.Subtitle className="mb-1 text-muted">
              <ProgressBar done={Math.round(goal.percentage)} />
            </Card.Subtitle>

            <Card.Text className="desc">{goal.description}</Card.Text>
            <Card.Subtitle
              className="text-muted"
              style={{ fontSize: "12px", marginTop: "auto" }}
            >
              {goal.prediction !== ""
                ? `Acaba em: ${goal.prediction.toLocaleString([], options)}`
                : ""}
            </Card.Subtitle>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default MetaCard;
