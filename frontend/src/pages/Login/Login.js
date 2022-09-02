import Button from "../../components/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./style.css";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logar, Register } from "../../service/user";
import Alert from "react-bootstrap/Alert";

function Login() {
  const navigate = useNavigate();
  const [datasLogin, setDatasLogin] = useState({});
  const [register, setRegister] = useState(false);

  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { value, id } = e.target;

    setDatasLogin((datasLogin) => ({
      ...datasLogin,
      [id]: value,
    }));
  }, []);

  const registerHandler = () => {
    setRegister(!register);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!register) {
        try {
          const { email, password } = datasLogin;
          const response = await Logar(email, password);

          if (response.status === 201) {
            sessionStorage.setItem("@ogNotes", JSON.stringify(response.data));
            navigate("/");
          } else {
            setError("Não foi possível realizar o login");
          }
        } catch (err) {
          setError(
            err?.response?.data?.message || `Não foi possível realizar o login`
          );
        }
      } else {
        try {
          const { username, email, password } = datasLogin;
          const response = await Register(username, email, password);

          if (response.status === 201) {
            sessionStorage.setItem("@ogNotes", JSON.stringify(response.data));
            navigate("/");
            window.location.reload();
          } else {
            setError("Não foi possível realizar o login");
          }
        } catch (err) {
          setError(
            err?.response?.data?.message || `Não foi possível realizar o login`
          );
        }
      }
    },
    [datasLogin, navigate, register]
  );

  return (
    <div className="login-container">
      {error && <Alert variant="danger">{error}</Alert>}
      <h1 className="login-title">OrangeNotes</h1>

      <div className="login-card">
        <Card
          style={{
            boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "2.5em",
                padding: "0.5em",
                margin: "0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!register ? "Nome" : "Registro"}
            </Card.Title>

            <Form style={{ padding: "0.5em 2em" }} onSubmit={handleSubmit}>
              {register ? (
                <Form.Group className="mb-2">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    placeholder="Insira o nome"
                    onChange={(e) => handleChange(e)}
                    required={true}
                  />
                </Form.Group>
              ) : (
                ""
              )}

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Insira o email"
                  onChange={(e) => handleChange(e)}
                  required={true}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Insira a senha"
                  id="password"
                  onChange={(e) => handleChange(e)}
                  required={true}
                />
                <Form.Text className="text-muted">
                  {!register
                    ? "Ainda não possui uma conta?"
                    : "Já possui uma conta?"}{" "}
                  <span
                    onClick={registerHandler}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "blue",
                    }}
                  >
                    {!register ? "Registre aqui" : "Entre agora"}
                  </span>
                </Form.Text>
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="primary" type="submit">
                  {!register ? "Entrar" : "Criar conta"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Login;
