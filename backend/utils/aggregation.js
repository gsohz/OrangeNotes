const Objective = require("../models/ObjectiveSchema");
const Goal = require("../models/GoalSchema");

async function percentage(fatherId) {
  const completedTrue = [
    {
      $match: {
        goalFather: fatherId,
        completed: true,
      },
    },
    {
      $group: {
        _id: `$_id`,
        sum: {
          $sum: 1,
        },
      },
    },
  ];

  const completedFalse = [
    {
      $match: {
        goalFather: fatherId,
        completed: false,
      },
    },
    {
      $group: {
        _id: `$_id`,
        sum: {
          $sum: 1,
        },
      },
    },
  ];

  const aggObjCursor1 = await Objective.aggregate(completedTrue);
  const aggObjCursor2 = await Objective.aggregate(completedFalse);
  const aggGoalCursor1 = await Goal.aggregate(completedTrue);
  const aggGoalCursor2 = await Goal.aggregate(completedFalse);

  let complete = 0,
    incomplete = 0,
    total = 0;

  aggObjCursor1.forEach((obj) => {
    complete++;
  });

  aggObjCursor2.forEach((obj) => {
    incomplete++;
  });

  aggGoalCursor1.forEach((obj) => {
    complete++;
  });

  aggGoalCursor2.forEach((obj) => {
    incomplete++;
  });

  total = complete + incomplete;

  total = (complete * 100) / total;

  const goalToUpdt = await Goal.findById(fatherId);
  const goalFatherToUpdt = await Goal.findById(goalToUpdt.goalFather);

  if (Math.round(total) === 100) {
    await goalToUpdt.updateOne({
      completed: true,
    });

    if (goalToUpdt.goalFather) {
      const pct = await percentage(goalFatherToUpdt._id);
      await goalFatherToUpdt.updateOne({
        percentage: pct,
      });
    }
  } else {
    await goalToUpdt.updateOne({
      completed: false,
    });
    if (goalToUpdt.goalFather) {
      const pct = await percentage(goalFatherToUpdt._id);
      await goalFatherToUpdt.updateOne({
        percentage: pct,
        completed: false,
      });
    }
  }

  return total !== 0 ? Math.round(total) : 0;
}

async function deleteAllWithFamily(fatherId) {
  const goalFamily = await Goal.find({ goalFather: fatherId });
  const objectiveFamily = await Objective.findOne({ goalFather: fatherId });

  try {
    if (goalFamily) {
      await Goal.deleteMany({ goalFather: fatherId });
      goalFamily.forEach((goal) => {
        deleteAllWithFamily(goal._id);
      });
    } else {
      await Goal.deleteMany({ goalFather: fatherId });
    }

    if (objectiveFamily) {
      await Objective.deleteMany({ goalFather: fatherId });
      objectiveFamily.forEach((obj) => {
        deleteAllWithFamily(obj.goalFather);
      });
    } else {
      await Objective.deleteMany({ goalFather: fatherId });
    }
  } catch (err) {
    return err;
  }
}

module.exports = { percentage, deleteAllWithFamily };
