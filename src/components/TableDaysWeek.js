import React from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";

export default function TableDaysWeek(props) {

  const {
    habit,
    token,
    callback,
    callbackEffect,
    callbackTable,
    load,
    callbackLoad
  } = props;

  const { name, days } = habit;

  const weekDays = [
    { name: "domingo", letter: "D", number: 0 },
    { name: "segunda", letter: "S", number: 1 },
    { name: "terca", letter: "T", number: 2 },
    { name: "quarta", letter: "Q", number: 3 },
    { name: "quinta", letter: "Q", number: 4 },
    { name: "sexta", letter: "S", number: 5 },
    { name: "sabado", letter: "S", number: 6 }
  ];

  function markOffTable() {
    callbackTable(false);
    callbackLoad(false);
  }

  function forwardHabit(e) {
    e.preventDefault();
    callbackLoad(true);

    if (days.size > 0) {

      const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
      const promise = axios.post(URL,
        {
          name,
          days: Array.from(days.values())
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      promise.then(() => {
        callback({ name: "", days: [] });
        callbackLoad(false);
        callbackTable(false);
        callbackEffect(true);
      });

      promise.catch((error) => {
        console.log(error.response.status);
        callbackLoad(false);
        alert(`Não foi possível inserir o hábito. ${error.response.status}`);
        callback({ name: "", days: [] });
      });

    } else {
      alert("Escolha quais dias da semana você vai executar esse hábito.");
      callbackLoad(false);
    }
  }

  function getDay(id, number) {

    const selectDay = days.has(id);

    if (selectDay) {
      days.delete(id);
      callback({ ...habit, days: new Map(days) });
    } else {
      callback({ ...habit, days: new Map(days.set(id, number)) });
    }
  }

  return (
    <FormBox>
      <form onSubmit={forwardHabit}>
        <section>

          <input
            type="text"
            id="name"
            value={name}
            onInput={(e) => callback({ ...habit, name: e.target.value })}
            placeholder="nome do hábito"
            disabled={load}
            required
          />
          <article>
            {weekDays.map((day, index) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    id={day.name}
                    value={days}
                    onInput={() => getDay(day.name, day.number)}
                    key={index}
                    disabled={load}
                  />
                  <label htmlFor={day.name}>{day.letter}</label>
                </div>
              );
            })}
          </article>

        </section>
        <Options>
          <h4 onClick={markOffTable}>Cancelar</h4>
          <button>
            {load ? (
              <ThreeDots color="#FFFFFF" width="51px" height="13px" />
            ) : (
              <div>Salvar</div>
            )}
          </button>
        </Options>
      </form>
    </FormBox>
  );
}

const FormBox = styled.div`
  width: 340px;
  height: 180px;
  margin-top: 5%;
  border-radius: 5px;
  background-color: #ffffff;
  font-family: "Lexend Deca";

  section {
    margin-left: 18px;
  }

  input[type="text"] {
    width: 303px;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    margin-top: 18px;

    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    color: #666666;

    &::placeholder {
        font-size: 18px;
        font-family: "Lexend Deca";
        color: #d4d4d4;
        padding-left: 10px;
    }
  }

  article {
    display: flex;
  }
  article div input {
    display: none !important;
  }

  article div input[type="checkbox"] + label {
    width: 30px;
    height: 30px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    background-color: #ffffff;
    margin-top: 8px;
    margin-right: 3px;

    display: inline-block;
    color: #d4d4d4;
    text-align: center;
    line-height: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  article div input[type="checkbox"]:checked + label {
    background-color: #cfcfcf;
    color: #ffffff;
  }
`;

const Options = styled.div`
  margin: 30px 0 15px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 84px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: #52b6ff;
    margin: 0 15px 0 30px;

    font-size: 16px;
    font-family: "Lexend Deca";
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }
  }

  h4 {
    font-size: 16px;
    font-weight: 400;
    color: #52b6ff;

    &:hover {
      cursor: pointer;
    }
  }
`;
