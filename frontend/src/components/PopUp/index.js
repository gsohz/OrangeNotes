import Button from "../Button/index";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./style.css";
import { useCallback, useState } from "react";
import { CreateGoal, DeleteGoal, UpdateGoal } from "../../service/goals";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import {
  CreateObjective,
  DeleteObjective,
  UpdateObjective,
} from "../../service/objectives";

function PopUp(props) {
  // const [modalOption, setModalOption] = useState();

  const [datasRequest, setDatasRequest] = useState({});
  const [deleteObj, setDeleteObj] = useState(false);
  const [updateObj, setUpdateObj] = useState(false);
  const [addGoal, setAddGoal] = useState(false);
  const [addObjective, setAddObjective] = useState(false);
  const [error, setError] = useState("");

  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const { id } = useParams();

  const handleChange = useCallback((e) => {
    const { value, id } = e?.target;

    setDatasRequest((datasRequest) => ({
      ...datasRequest,
      [id]: value,
    }));
  }, []);

  const handleDelete = useCallback(
    async (obj) => {
      setDeleteObj(false);
      try {
        if (props.goal) {
          const { id } = obj;
          const response = await DeleteGoal(id);

          if (response.status === 200) {
            setDeleteObj(true);
          } else {
            setError("Não foi possível deletar");
          }
        } else {
          const { id } = obj;
          const response = await DeleteObjective(id);

          if (response.status === 200) {
            setDeleteObj(true);
          } else {
            setError("Não foi possível deletar");
          }
        }
      } catch (err) {
        setError(err?.response?.data?.message || `Ocorreu um erro`);
      }
    },
    [props.goal]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      try {
        if (addObjective) {
          const { title, prediction, description } = datasRequest;

          const response = await CreateObjective(
            id,
            title,
            description,
            prediction
          );
          if (response.status === 201) {
            window.location.reload();
          } else setError("Não foi possível adicionar o objetivo");
        } else {
          const { title, prediction, description } = datasRequest;

          const response = await CreateGoal(id, title, description, prediction);

          if (response.status === 201) {
            window.location.reload();
          } else setError("Não foi possível adicionar a meta");
        }
      } catch (err) {
        setError(err?.response?.data?.message || `Ocorreu um erro`);
      }
    },
    [datasRequest, id, addObjective]
  );

  const handleUpdt = useCallback(
    async (obj) => {
      setUpdateObj(false);
      setError("");
      try {
        if (props.objective) {
          let { title, prediction, description } = datasRequest;

          if (title === "") {
            title = obj.title;
          } else if (prediction === "") {
            prediction = obj.prediction;
          } else if (description === "") {
            description = obj.description;
          }

          const { id } = obj;
          const response = await UpdateObjective(
            id,
            title,
            description,
            prediction
          );

          if (response.status === 200) {
            setUpdateObj(true);
            window.location.reload();
          } else setError("Não foi possível atualizar o objetivo");
        } else {
          let { title, prediction, description } = datasRequest;

          if (title === "") {
            title = obj.title;
          } else if (prediction === "") {
            prediction = obj.prediction;
          } else if (description === "") {
            description = obj.description;
          }

          const { id } = obj;
          const response = await UpdateGoal(id, title, description, prediction);

          if (response.status === 200) {
            setUpdateObj(true);
            window.location.reload();
          } else setError("Não foi possível atualizar a meta");
        }
      } catch (err) {
        setError(err?.response?.data?.message || `Ocorreu um erro`);
      }
    },
    [datasRequest, props.objective]
  );

  const hide = useCallback(() => {
    setAddGoal(false);
    setAddObjective(false);
  }, []);

  if (props?.type === "main" || props?.type === "updt") {
    let button_cancel = props.button_cancel;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        {console.log(props.objective)}
        {error && <Alert variant="danger">{error}</Alert>}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {updateObj === true
              ? "Atualizado com sucesso"
              : props.type === "main"
              ? `Adicionar meta princiapal`
              : props.goal
              ? `Atualizar a meta ${props.goal?.title}`
              : `Atualizar o objetivo ${props.objective?.title}`}
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={
            props.type === "main"
              ? handleSubmit
              : props.goal
              ? () => {
                  handleUpdt(props.goal);
                }
              : () => {
                  handleUpdt(props.objective);
                }
          }
        >
          <Modal.Body>
            {props.type === "main" ? (
              <p>Adicione a meta que você deseja atingir.</p>
            ) : (
              <p>Altere as informações que deseja.</p>
            )}
            <div className="modalForm">
              <Form.Group className="mb-2 line1">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  placeholder={
                    props.type === "main"
                      ? "Insira o título"
                      : props.goal
                      ? props.goal.title
                      : props.objective.title
                  }
                  onChange={(e) => handleChange(e)}
                  required={props.type === "main" ? true : false}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2 line2">
                <Form.Label>Previsão</Form.Label>
                <Form.Control
                  type="date"
                  id="prediction"
                  defaultValue={
                    props.type === "main"
                      ? ""
                      : props.goal?.prediction
                      ? props.goal?.prediction.toLocaleDateString(
                          "af-ZA",
                          options
                        )
                      : props.objective?.prediction
                      ? props.objective?.prediction.toLocaleDateString(
                          "af-ZA",
                          options
                        )
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-2 line3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  placeholder={
                    props.type === "main"
                      ? "Insira a descrição"
                      : props.goal
                      ? props.goal.description
                      : props.objective.description
                  }
                  as="textarea"
                  rows={3}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-footer">
              <div className="btn-cancel" onClick={hide}>
                {button_cancel}
              </div>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  } else if (props?.type === "del") {
    let button_cancel = props.button_cancel;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {deleteObj
              ? "Deletado com sucesso"
              : props.goal
              ? `Tem certeza que deseja deletar ${props.goal.title}?`
              : `Tem certeza que deseja deletar ${props.objective.title}?`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {deleteObj ? (
            <p>A meta foi deletada com sucesso.</p>
          ) : props.goal ? (
            <p>
              Se deletar esta meta{" "}
              <span style={{ fontWeight: "bold" }}>
                todo seu progesso, metas e objetivos serão apagados juntos
              </span>
              . Deseja mesmo deletar?
            </p>
          ) : (
            <p>
              Ao deletar um objetivo ele será retirado da sua meta e deixará de
              existir. Deseja mesmo deletar?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {deleteObj ? (
            <Button
              variant="primary"
              style={{ border: "none" }}
              onClick={() => window.location.reload()}
            >
              Voltar
            </Button>
          ) : (
            <div className="btn-footer">
              <div className="btn-cancel" onClick={hide}>
                {button_cancel}
              </div>
              <Button
                style={{ backgroundColor: "red", border: "none" }}
                onClick={() =>
                  handleDelete(props.goal ? props.goal : props.objective)
                }
              >
                Deletar
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    );
  } else if (props?.type === "choose") {
    let header;
    let body;
    let button_cancel = props.button_cancel;
    if (!addGoal && !addObjective) {
      header = (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Escolha o que deseja adicionar
          </Modal.Title>
        </Modal.Header>
      );
      body = (
        <Modal.Body className="modalBodyOptions">
          <h4 className="optionTitle">Meta</h4>
          <hr style={{ width: "100%", margin: "0 0 0.3em 0" }} />
          <p className="text-muted" style={{ margin: 0 }} hidden={addGoal}>
            As metas servem para você definir onde quer chegar. Defina uma meta
            para ter em mente seu destino final.
          </p>
          <Button
            style={{ margin: "1em auto" }}
            onClick={() => setAddGoal(true)}
          >
            Adicionar nova meta
          </Button>
          <h4 className="optionTitle">Objetivo</h4>
          <hr style={{ width: "100%", margin: "0 0 0.3em 0" }} />
          <p className="text-muted" style={{ margin: 0 }}>
            Os objetivos são o que compõem uma meta, eles precisam ser cumpridos
            para que uma meta seja atingida. Adicione um objetivo para ter em
            mente o que precisa ser feito para atingir sua meta.
          </p>
          <Button
            style={{ margin: "1em auto" }}
            onClick={() => setAddObjective(true)}
          >
            Adicionar novo objetivo
          </Button>
        </Modal.Body>
      );
    } else if (addGoal) {
      header = (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Defina sua submeta
          </Modal.Title>
        </Modal.Header>
      );
      body = (
        <Modal.Body className="modalBodyOptions">
          <Modal.Body>
            <p>Adicione a meta que você deseja atingir.</p>
            <div className="modalForm">
              <Form.Group className="mb-2 line1">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  placeholder="Insira o título"
                  onChange={(e) => handleChange(e)}
                  required={true}
                />
              </Form.Group>
              <Form.Group className="mb-2 line2">
                <Form.Label>Previsão</Form.Label>
                <Form.Control
                  type="date"
                  id="prediction"
                  placeholder="Insira o título"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-2 line3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  placeholder="Insira a descrição"
                  as="textarea"
                  rows={3}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </div>
          </Modal.Body>
        </Modal.Body>
      );
    } else if (addObjective) {
      header = (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Defina seu objetivo
          </Modal.Title>
        </Modal.Header>
      );
      body = (
        <Modal.Body className="modalBodyOptions">
          <Modal.Body>
            <p>
              Adicione o objetivo que você deseja definir para alcançar sua
              meta.
            </p>
            <div className="modalForm">
              <Form.Group className="mb-2 line1">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  placeholder="Insira o título"
                  onChange={(e) => handleChange(e)}
                  required={true}
                />
              </Form.Group>
              <Form.Group className="mb-2 line2">
                <Form.Label>Previsão</Form.Label>
                <Form.Control
                  type="date"
                  id="prediction"
                  placeholder="Insira o título"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-2 line3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  placeholder="Insira a descrição"
                  as="textarea"
                  rows={3}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </div>
          </Modal.Body>
        </Modal.Body>
      );
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        {header}
        <Form onSubmit={handleSubmit}>
          {body}
          <Modal.Footer>
            <div onClick={hide}>{button_cancel}</div>
            {addGoal || addObjective ? (
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            ) : (
              ""
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default PopUp;
