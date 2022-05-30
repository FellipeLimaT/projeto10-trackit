import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import TableDaysWeek from "./TableDaysWeek";
import DeleteHabits from "./DeleteHabits";

export default function HabitsScreen() {

    const token = localStorage.getItem("token");
    const [habitsTable, setHabitsTable] = useState(false);
    const [renderHabits, setRenderHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({ name: "", days: new Map() });
    const [load, setLoad] = useState(false);
    const [callUseEffect, setCallUseEffect] = useState(false);
    const [turnOff, setTurnOff] = useState("");

    useEffect(() => {
        
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        promise.then((response) => {
            const { data } = response;
            setRenderHabits(data);
            setCallUseEffect(false);
            showHabitsList();
        });

        promise.catch((error) => {
            console.log("erro", error.response.status);
        });

    }, [callUseEffect]);

    function askDeleteHabit(id) {
        setTurnOff(id);
    }

    function showHabitsList() {

        const weekDays = [
            { letter: "D", number: 0 },
            { letter: "S", number: 1 },
            { letter: "T", number: 2 },
            { letter: "Q", number: 3 },
            { letter: "Q", number: 4 },
            { letter: "S", number: 5 },
            { letter: "S", number: 6 }
        ];

        return renderHabits.map((habit) => {

            const { id, name, days } = habit;
            return (
                <HabitContainer key={id}>
                    <h1>{name}</h1>
                    <button onClick={() => askDeleteHabit(id)}>
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>

                    <section>
                        {weekDays.map((day, index) => {
                            return (
                                <ThemeProvider
                                    theme={days.includes(day.number) ? invertedColor : color}
                                    key={index}
                                >
                                    <Day>{day.letter}</Day>
                                </ThemeProvider>
                            );
                        })}
                    </section>
                </HabitContainer>
            );
        });
    }

    const showTotalHabits = showHabitsList();

    return (
        <Section>
            <Header />
            <ContainerBox>
                <h1>Meus hábitos</h1>
                <button onClick={() => setHabitsTable(!habitsTable)}>
                    <ion-icon name="add-outline"></ion-icon>
                </button>
            </ContainerBox>

            <Main>
                {habitsTable ? (
                    <TableDaysWeek
                        habit={newHabit}
                        token={token}
                        callback={setNewHabit}
                        callbackEffect={setCallUseEffect}
                        callbackTable={setHabitsTable}
                        load={load}
                        callbackLoad={setLoad}
                    />
                ) : (
                    " "
                )}

                {turnOff && (
                    <DeleteHabits
                        id={turnOff}
                        callbackEffect={setCallUseEffect}
                        token={token}
                        callbackDelete={setTurnOff}
                    />
                )}

                {renderHabits.length > 0 ? (
                    showTotalHabits
                ) : (
                    <p>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </p>
                )}
            </Main>

            <Footer />
        </Section>
    );
}

const Section = styled.section`
  height: 100vh;
  background-color: #F2F2F2;
  font-family: "Lexend Deca";
  overflow-y: scroll;

  p {
    font-size: 18px;
    font-weight: 400;
    color: #666666;

    margin: 10% 18px;
  }
`;

const ContainerBox = styled.div`
  font-family: "Lexend Deca";
  margin: 100px 18px 15px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 23px;
    font-weight: 400;
    color: #126BA5;
  }

  button {
    width: 40px;
    height: 35px;
    border: none;
    border-radius: 5px;    
    background-color: #52B6FF;

    font-size: 27px;
    font-weight: 400;  
    color: #FFFFFF;
    
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
  }
`;

const Main = styled.main`
  margin-bottom: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HabitContainer = styled.div`
  width: 340px;
  background-color: #FFFFFF;
  border-radius: 5px;
  margin-top: 10px;

  font-size: 18px;
  font-weight: 400;
  font-family: "Lexend Deca";
  color: #666666;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  button {
    border: none;
    background-color: transparent;    
    position: absolute;
    top: 10px;
    right: 10px;    
  }

  ion-icon {
    font-size: 15px;

    &:hover {
      cursor: pointer;
    }
  }

  section {
    margin: 10px 15px;
  }

  h1 {
    margin: 10px 30px 0px 15px;
  }
`;

const Day = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #D4D4D4;
  margin-right: 3px;

  display: inline-block;
  text-align: center;
  line-height: 30px;

  color: ${(props) => props.theme.dfColor};
  background-color: ${(props) => props.theme.dfBack};
`;

const color = {
    dfColor: "#D4D4D4",
    dfBack: "#FFFFFF"
};

const invertedColor = {
    dfColor: "#FFFFFF",
    dfBack: "#D4D4D4"
};
