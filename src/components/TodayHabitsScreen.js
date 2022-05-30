import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import styled from "styled-components";
import HabitsContext from "../contexts/HabitsContext";
import Header from "./Header";
import Footer from "./Footer";

export default function TodayHabitsScreen() {

    const token = localStorage.getItem("token");
    const { habitsPercentage, setHabitsPercentage } = useContext(HabitsContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const [callTodayHabits, setCallTodayHabits] = useState(false);

    dayjs.locale("pt-br");
    require("dayjs/locale/pt-br");
    let now = dayjs();
    let getToday = dayjs(now).locale("pt-br").format("dddd, DD/MM");
    let firstLetter = getToday[0].toUpperCase();
    let end = getToday.slice(1);
    let today = firstLetter + end;

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const promise = axios.get(URL,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        promise.then((response) => {
            const { data } = response;
            setTodayHabits(data);
            getPercentage();
        });

        promise.catch((error) => {
            console.log("erro", error.response.status);
        });

    }, [callTodayHabits]);

    function getPercentage() {

        const doneHabits = todayHabits.filter((habit) => habit.done === true);
        let percentage = 0;

        if (todayHabits.length > 0) {
            percentage = Math.round((doneHabits.length / todayHabits.length) * 100);
        }
        setHabitsPercentage(percentage);
    }

    function checkHabit(id, done) {

        let URL = "";

        const author = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        if (done) {
            URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
        } else {
            URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
        }

        const promise = axios.post(URL, "", author);

        promise.then(() => {
            setCallTodayHabits(!callTodayHabits);
        });

        promise.catch((error) => {
            console.log("erro", error.response.status);
        });
    }

    function showTodayList() {

        return todayHabits.map((habit) => {

            const { id, name, done, currentSequence, highestSequence } = habit;
            return (
                <HabitBox key={id}>
                    <h4>{name}</h4>

                    <SectionList>
                        <p>
                            Sequência atual:
                            <SpanCurrent selected={done}>
                                {" "}
                                {currentSequence}
                                {currentSequence !== "0" && currentSequence !== "1"
                                    ? " dia"
                                    : " dias"}
                            </SpanCurrent>
                        </p>
                        <p>
                            Seu recorde:
                            <SpanHighest
                                currentSeq={currentSequence}
                                highestSeq={highestSequence}
                            >
                                {" "}
                                {highestSequence}
                                {highestSequence !== "0" && highestSequence !== "1"
                                    ? " dia"
                                    : " dias"}
                            </SpanHighest>
                        </p>
                    </SectionList>

                    <ThemeProvider theme={done ? selectedTheme : defaultTheme}>
                        <Checkbox onClick={() => checkHabit(id, done)}>
                            <ion-icon name="checkmark-outline"></ion-icon>
                        </Checkbox>
                    </ThemeProvider>
                </HabitBox>
            );
        });
    }

    const showHabits = showTodayList();

    getPercentage();

    return (
        <Section>
            <Header />
            <ContainerBox>
                <h1>{today}</h1>
                {habitsPercentage ? (
                    <p>{habitsPercentage}% dos hábitos concluídos</p>
                ) : (
                    <h2>Nenhum hábito concluído ainda</h2>
                )}
            </ContainerBox>

            <HabitsList>
                {todayHabits.length > 0 ? (
                    showHabits
                ) : (
                    <h3>Vá na página Hábitos para poder começar a criar seus hábitos!</h3>
                )}
            </HabitsList>
            <Footer />
        </Section>
    );
}

function currentDaysColor(props) {

    const { selected } = props;

    if (selected) {
        return selectedTheme.dfColor;
    } else {
        return defaultDayColor.dfColor;
    }
}

function highestDayColor(currentSeq, highestSeq) {

    if (highestSeq !== 0) {

        if (currentSeq === highestSeq) {
            return selectedTheme.dfColor;
        } else {
            return defaultDayColor.dfColor;
        }
    }
}

/* Style */

const Section = styled.section`
  height: 100vh;
  background-color: #f2f2f2;
  font-family: "Lexend Deca";
  overflow-y: scroll;

  h3 {
    font-size: 18px;
    font-weight: 400;
    color: #666666;
    margin: 10% 18px;
  }
`;

const ContainerBox = styled.div`
  font-family: "Lexend Deca";
  margin: 100px 0 0 18px;

  h1 {
    font-size: 23px;
    font-weight: 400;
    color: #126ba5;
    margin-bottom: 7px;
  }

  h2 {
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: #bababa;
  }

  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: #8fc549;
  }
`;

const HabitsList = styled.div`
  margin-bottom: 30%;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HabitBox = styled.div`
  width: 340px;
  border-radius: 5px;
  background-color: #ffffff;
  margin-top: 10px;

  font-size: 18px;
  font-weight: 400;
  font-family: "Lexend Deca";
  color: #666666;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h4 {
    margin: 13px 15px;
  }

  p {
    margin-left: 15px;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
  }
`;

const SectionList = styled.div`
  margin-bottom: 13px;
`;

const Checkbox = styled.div`
  width: 69px;
  height: 69px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  background-color: ${(props) => props.theme.dfColor};
  text-align: center;

  position: absolute;
  right: 10px;
  bottom: 10px;

  &:hover {
    cursor: pointer;
  }

  ion-icon {
    font-size: 65px;
    color: #ffffff;
  }
`;

const defaultTheme = {
    dfColor: "#EBEBEB"
};

const selectedTheme = {
    dfColor: "#8FC549"
};

const defaultDayColor = {
    dfColor: "#666666"
};

const SpanHighest = styled.span`
  color: ${(props) => highestDayColor(props.currentSeq, props.highestSeq)};
`;

const SpanCurrent = styled.span`
  color: ${(selected) => currentDaysColor(selected)};
`;
