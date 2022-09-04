import { useCallback, useEffect, useState } from "react";
import MetaCard from "../../components/MetaCard";
import Navbar from "../../components/Navbar";
import PopUp from "../../components/PopUp/index";
import Button from "../../components/Button";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { ListCompletedGoals } from "../../service/goals";
import { MdModeEdit } from "react-icons/md";

function Completed() {
  const [modalShow, setModalShow] = useState(false);

  const [datasUser, setDatasUser] = useState({});
  const [completed, setCompleted] = useState({});
  const [goals, setGoals] = useState([]);
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  async function formatResponse(response) {
    return {
      id: response._id,
      createdAt: response?.createdAt ? new Date(response?.createdAt) : "",
      prediction: response?.prediction ? new Date(response?.prediction) : "",
      title: response?.title,
      description: response?.description,
      percentage: response?.percentage,
      completed: response?.completed,
    };
  }

  const listCompletedGoals = useCallback(async () => {
    const response = await ListCompletedGoals();

    if (response.goals.length > 0) {
      ListCompletedGoals()
        .then((response) => {
          var result = response.goals.map((goals) => {
            return formatResponse(goals);
          });

          return Promise.all(result);
        })
        .then((result) => setGoals(result))
        .catch((err) => console.log(err));
    }

    if (response.completeds) {
      ListCompletedGoals()
        .then((response) => setCompleted(response.completeds))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("@ogNotes")) || {};

    if (user?.token) {
      setDatasUser(user);
      listCompletedGoals();
      return;
    }

    navigate("/login");
  }, [navigate, listCompletedGoals]);

  return datasUser?.token ? (
    <div>
      <Navbar user={datasUser} />
      <div className="container-page">
        <div className="info">
          <h1>
            {completed?.resultMainGoal
              ? `Parabéns, você concluiu ${completed.resultMainGoal} meta principal`
              : "Aqui ficarão registradas suas metas que forem completadas"}
          </h1>
          <p>
            {completed?.resultGoal && completed?.resultObj
              ? `Para atingir este marco você concluiu ${completed.resultObj} objetivos e ${completed.resultGoal} metas secundárias!`
              : completed?.resultObj
              ? `Para atingir este marco você concluiu ${completed.resultObj} objetivos!`
              : "Mantenha o foco para atingir seus objetivos!"}
          </p>
        </div>
        <div className="menu-metas">
          <div className="division-box">
            <h3 style={{ marginBottom: "0" }}>Metas que foram completadas</h3>
            <Button
              secundario={true}
              style={{ marginLeft: "auto", marginRight: "2px" }}
              icon={MdModeEdit()}
              onClick={() => {
                setEdit(!edit);
              }}
            />

            <PopUp
              type={"choose"}
              show={modalShow}
              onHide={() => setModalShow(false)}
              user={datasUser}
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
          {goals?.length === 0 ? (
            <div className="metas"></div>
          ) : (
            <div className="metas">
              {goals.map((goals) => (
                <MetaCard
                  key={goals.id}
                  goal={goals}
                  edit={{ edit }}
                ></MetaCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Completed;
