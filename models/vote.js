"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
   
    static associate(models) {
      // define association here
      Vote.belongsTo(models.Election, {
        foreignKey: "electionId",
      });

      Vote.belongsTo(models.Quetion, {
        foreignKey: "quetionId",
      });

      Vote.belongsTo(models.Voter, {
        foreignKey: "voterId",
      });
    }

    static addVote({ electionId, quetionId, voterId, voteVal }) {
      return this.create({ electionId, quetionId, voterId, voteVal });
    }

    static findChoise(electionId, quetionId, voterId) {
      return this.findOne({
        where: {
          electionId,
          voterId,
          quetionId,
        },
      });
    }

    static retriveVoteCount(optionName, electionId, quetionId) {
      return this.findAll({
        where: {
          voteVal: optionName,
          quetionId,
          electionId,
        },
      });
    }
  }
  Vote.init(
    {
      electionId: DataTypes.INTEGER,
      quetionId: DataTypes.INTEGER,
      voterId: DataTypes.INTEGER,
      voteVal: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
