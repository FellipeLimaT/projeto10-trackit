import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

export default function HistoryScreen() {
    return (
        <Section>
            <Header />
            <ContainerBox>
                <h1>Histórico</h1>
            </ContainerBox>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Footer />
        </Section>
    );
}

const Section = styled.section`
    height: 100vh;
    background-color: #F2F2F2;
    overflow-y: scroll;
  
    p {
      font-size: 18px;
      font-weight: 400;
      font-family: "Lexend Deca";
      color: #666666;
      margin: 10% 18px;
    }
`;

const ContainerBox = styled.div`
    margin: 100px 0 0 18px;
    display: flex;
    align-items: center;
  
    h1 {
      font-size: 23px;
      font-weight: 400;
      font-family: "Lexend Deca";
      color: #126ba5;
    }
`;
