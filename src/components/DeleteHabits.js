import React from "react";
import axios from "axios";
import styled from "styled-components";

export default function DeleteHabits(props) {
  const { id, callbackEffect, token, callbackDelete } = props;

  function deleteHabit(e) {
    e.preventDefault();

    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
    const promise = axios.delete(URL, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    promise.then(() => {
      callbackDelete(false);
      callbackEffect(true);
    });
    promise.catch((error) => {
      console.log(error.response.status);
    });
  }

  function cancelDelete() {
    callbackDelete(false);
  }

  return (
    <DeleteBox>
      <div>
        <h1>Tem certeza que deseja deletar este hábito?</h1>
        <div>
          <h2 onClick={cancelDelete}>Cancelar</h2>
          <button onClick={deleteHabit}>Confirmar</button>
        </div>
      </div>
    </DeleteBox>
  );
}

const DeleteBox = styled.div`
  width: 100%;
  height: 100vh;
  background: #00000050;

  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2;

  font-family: "Lexend Deca";
  color: #666666;

  div {
    position: relative;
    top: 35%;
    margin-right: 5%;
    margin-left: 5%;

    background: #ffffff;
    border-radius: 5px;
    padding: 20px;
    border: 1px solid #999999;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    & div {
      width: 250px;
      border: none;
      background-color: transparent;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }

  h1 {
    font-size: 18px;
    margin-top: 20px;
  }

  h2 {
    font-size: 16px;
  }

  button {
    width: 100px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: #52b6ff;

    font-size: 16px;
    font-family: "Lexend Deca";
    color: #ffffff;
  }
`;
