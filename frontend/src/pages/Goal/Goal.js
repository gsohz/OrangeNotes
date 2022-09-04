import { useCallback, useEffect, useState } from "react";
import MetaCard from "../../components/MetaCard";
import Navbar from "../../components/Navbar";
import PopUp from "../../components/PopUp/index";
import Button from "../../components/Button";
import ObjCard from "../../components/ObjCard";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { OpenGoal } from "../../service/goals";
import { BsPlusLg } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";

function Goal() {
  const [modalShow, setModalShow] = useState(false);

  const [datasUser, setDatasUser] = useState({});
  const [mainGoal, setMainGoal] = useState();
  const [goals, setGoals] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [edit, setEdit] = useState(false);

  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const { id } = useParams();

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

  const openedGoal = useCallback(async () => {
    setGoals([]);
    setObjectives([]);
    const response = await OpenGoal(id);
    const resMainGoal = await formatResponse(response.goal);
    setMainGoal(resMainGoal);

    if (response.goals.length > 0) {
      OpenGoal(id)
        .then((response) => {
          var result = response.goals.map((goals) => {
            return formatResponse(goals);
          });

          return Promise.all(result);
        })
        .then((result) => setGoals(result))
        .catch((err) => console.log(err));
    }

    if (response.objectives.length > 0) {
      OpenGoal(id)
        .then((response) => {
          var result = response.objectives.map((objectives) => {
            return formatResponse(objectives);
          });

          return Promise.all(result);
        })
        .then((result) => setObjectives(result))
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("@ogNotes")) || {};

    if (user?.token) {
      setDatasUser(user);
      openedGoal();
      return;
    }

    navigate("/");
  }, [navigate, openedGoal]);

  return datasUser?.token ? (
    <div>
      <Navbar user={datasUser} />
      <div className="container-page">
        <div className="info">
          <h1 key={mainGoal?.id}>{mainGoal?.title}</h1>
          <p className="textDesc">{mainGoal?.description}</p>
          <span>
            {mainGoal?.prediction
              ? `Acaba em: ${mainGoal?.prediction.toLocaleString(
                  undefined,
                  options
                )}`
              : ""}
          </span>
        </div>
        <div className="menu-metas">
          <div className="division-box">
            <h3 style={{ marginBottom: "0" }}>
              Seus objetivos para {mainGoal?.title}
            </h3>
            <Button
              secundario={true}
              style={{ marginLeft: "auto", marginRight: "0.5em" }}
              icon={MdModeEdit()}
              onClick={() => {
                setEdit(!edit);
              }}
            />
            <Button onClick={() => setModalShow(true)}>{BsPlusLg()}</Button>

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
          {goals?.length === 0 && objectives?.length === 0 ? (
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
              {objectives.map((objectives) => (
                <ObjCard
                  key={objectives.id}
                  objective={objectives}
                  edit={{ edit }}
                ></ObjCard>
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

export default Goal;
