import { useCallback, useEffect, useState } from "react";
import MetaCard from "../../components/MetaCard";
import Navbar from "../../components/Navbar";
import PopUp from "../../components/PopUp/index";
import Button from "../../components/Button";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { ListUserGoals } from "../../service/goals";
import { MdModeEdit } from "react-icons/md";

function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [datasUser, setDatasUser] = useState({});
  const [goals, setGoals] = useState([]);
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  function formatGoal(goal) {
    return {
      id: goal._id,
      createdAt: goal?.createdAt ? new Date(goal?.createdAt) : "",
      prediction: goal?.prediction ? new Date(goal?.prediction) : "",
      title: goal?.title,
      description: goal?.description,
      percentage: goal?.percentage,
    };
  }

  const listGoals = useCallback(() => {
    ListUserGoals()
      .then((response) => response.map((goals) => formatGoal(goals)))
      .then((goalsFormated) => setGoals(goalsFormated))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("@ogNotes")) || {};

    if (user.token) {
      setDatasUser(user);
      listGoals();
      return;
    }

    navigate("/login");
  }, [navigate, listGoals]);

  return datasUser?.token ? (
    <div>
      <Navbar user={datasUser} />
      <div className="container-page">
        <div className="info">
          <h1>OrangeNotes</h1>
          <p>
            {goals.length !== 0
              ? "Continue com o ótimo trabalho!"
              : "Bem vindo ao OrangeNotes, esse é um site para ajudar na sua organização. Ele funciona com um sistema de metas e objetivos. Defina sua meta principal e explore suas opções clicando nela para abri-lá."}
          </p>
        </div>
        <div className="menu-metas">
          <div className="division-box">
            <h2>Suas metas</h2>
            <Button
              secundario={true}
              style={{ marginLeft: "auto", marginRight: "0.5em" }}
              icon={MdModeEdit()}
              onClick={() => setEdit(!edit)}
            />
            <Button onClick={() => setModalShow(true)}>Adicionar Meta </Button>

            <PopUp
              show={modalShow}
              onHide={() => setModalShow(false)}
              user={datasUser}
              type={"main"}
              button_cancel={
                <Button
                  style={{ border: "none", backgroundColor: "grey" }}
                  onClick={() => setModalShow(false)}
                >
                  Cancelar
                </Button>
              }
            />
          </div>

          <div className="division">
            <hr style={{ margin: "0.5em" }} />
          </div>
        </div>
        <div className="content">
          <div className="metas">
            {goals.map((goal) => (
              <MetaCard key={goal.id} goal={goal} edit={{ edit }}></MetaCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p></p>
  );
}

export default Home;
