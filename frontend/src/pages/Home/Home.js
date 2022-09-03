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
    ListUserGoals(datasUser.email)
      .then((response) => response.map((goals) => formatGoal(goals)))
      .then((goalsFormated) => setGoals(goalsFormated))
      .catch((err) => console.log(err));
  }, [datasUser.email]);

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
        <h1>OrangeNotes</h1>
        <div className="menu-metas">
          <div className="division-box">
            <h2>Suas metas</h2>
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
            <Button
              secundario={true}
              style={{ marginLeft: "auto", marginRight: "2px" }}
              icon={MdModeEdit()}
              onClick={() => setEdit(!edit)}
            />
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
