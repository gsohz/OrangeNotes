import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./style.css";
import { useCallback, useState } from "react";
import { CreateMainGoal } from "../../service/goals";
import Alert from "react-bootstrap/Alert";

function PopUp(props) {
  // const [modalOption, setModalOption] = useState();

  const [datasGoal, setDatasGoal] = useState({});
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { value, id } = e.target;

    setDatasGoal((datasGoal) => ({
      ...datasGoal,
      [id]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      try {
        const { title, prediction, description } = datasGoal;
        const user = props.user.id;
        const response = await CreateMainGoal(
          user,
          title,
          description,
          prediction
        );

        if (response.status === 201) {
          window.location.reload();
        } else setError("Não foi possível adicionar a meta");
      } catch (err) {
        setError(err?.response?.data?.message || `Ocorreu um erro`);
      }
    },
    [datasGoal, props.user?.id]
  );

  if (props?.type === "main") {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        {error && <Alert variant="danger">{error}</Alert>}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adicionar {props.title}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
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
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  } else if (props?.type === "del") {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Tem certeza que deseja deletar {props.goal.title}?
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <p>
              Se deletar esta meta{" "}
              <bold style={{ fontWeight: "bold" }}>
                todo seu progesso, metas e objetivos serão apagados juntos
              </bold>
              . Deseja mesmo deletar?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ backgroundColor: "red", border: "none" }}>
              Deletar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default PopUp;
