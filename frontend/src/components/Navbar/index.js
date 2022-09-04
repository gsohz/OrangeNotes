import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { FiLogOut } from "react-icons/fi";
import Offcanvas from "react-bootstrap/Offcanvas";

function Navbar({ user }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function logOut() {
    if (user.token) {
      sessionStorage.removeItem("@ogNotes");

      navigate("/login");
    }
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-md bg-dark py-2">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/#">
          <span style={{ color: "var(--bs-orange)" }}>Orange</span>
          <span style={{ color: "var(--bs-light)" }}>Notes</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleShow}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto"></ul>

          <Button
            onClick={() => navigate("/completeds")}
            secundario={true}
            style={{ background: "none", marginLeft: "1em" }}
          >
            Meu Progresso
          </Button>

          <div id="navcol-2" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto"></ul>
          </div>

          <div className="nav-item">
            <Button
              onClick={logOut}
              icon={FiLogOut()}
              secundario={true}
              style={{ background: "none" }}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        placement={"end"}
        style={{ width: "45%" }}
      >
        <Offcanvas.Header
          closeButton
          style={{ backgroundColor: "rgb(102 102 102)" }}
        ></Offcanvas.Header>
        <Offcanvas.Body className="bg-dark" style={{ color: "white" }}>
          <Button
            onClick={() => navigate("/")}
            secundario={true}
            style={{ background: "none" }}
          >
            Início
          </Button>
          <Button
            onClick={() => navigate("/completeds")}
            secundario={true}
            style={{ background: "none" }}
          >
            Meu Progresso
          </Button>
          <Button
            onClick={logOut}
            icon={FiLogOut()}
            secundario={true}
            style={{ background: "none" }}
          >
            Sair
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
}

export default Navbar;
