import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { FiLogOut } from "react-icons/fi";

function Navbar({ user }) {
  const navigate = useNavigate();

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

        <div id="navcol-5" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto"></ul>
        </div>
        <div>
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
    </nav>
  );
}

export default Navbar;
