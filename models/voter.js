"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voter extends Model {
   
    static associate(models) {
      // define association here

      Voter.belongsTo(models.Election, {
        foreignKey: "electionId",
      });
    }

    static getVoters(electionId) {
      return this.findAll({
        where: {
          electionId,
        },
        order: [["id", "ASC"]],
      });
    }

    static voting(electionId) {
      return this.findAll({
        where: {
          voted: true,
          electionId,
        },
        order: [["id", "ASC"]],
      });
    }

    static remainVote(electionId) {
      return this.findAll({
        where: {
          voted: false,
          electionId,
        },
        order: [["id", "ASC"]],
      });
    }

    static addVoter({ voterId, password, electionId }) {
      return this.create({
        voterId,
        password,
        electionId,
        voted: false,
      });
    }

    updateVoter(password) {
      return this.update({ password: password });
    }

    votedVoter() {
      return this.update({ voted: true });
    }

    static remove(id) {
      this.destroy({
        where: {
          id,
        },
      });
    }
  }
  Voter.init(
    {
      voterId: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      voted: DataTypes.BOOLEAN,
      role: {
        type: DataTypes.STRING,
        defaultValue: "voter",
      },
    },
    {
      sequelize,
      modelName: "Voter",
    }
  );
  return Voter;
};
