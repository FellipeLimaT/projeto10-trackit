import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../images/logoHeader.png";

export default function Header() {
    
    const navigate = useNavigate();

    const image = localStorage.getItem("image");    

    function exitApp() {
        localStorage.removeItem("token");
        localStorage.removeItem("image");
        navigate("/");
    }
    
    return (
        <HeaderBox>
          <img src={Logo} alt="" />
          <div>
            <img src={`${image}`} alt="" />
            <ion-icon onClick={exitApp} name="log-out-outline"></ion-icon>
          </div>
        </HeaderBox>
      );
    }
    
    const HeaderBox = styled.header`
      width: 100%;
      height: 70px;
      background-color: #126BA5;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      position: fixed;
      top: 0px;
      left: 0px;
      z-index: 2;      
      display: flex;
      justify-content: space-between;
      align-items: center;
    
      img {
        margin-left: 18px;
      }
    
      div {
        display: flex;
    
        img {
          width: 51px;
          height: 51px;
          border-radius: 98.5px;
          margin-right: 10px;
        }
    
        ion-icon {
          font-size: 18px;
          margin-right: 5px;
          color: #FFFFFF;
    
          &:hover {
            cursor: pointer;
          }
        }
      }
    `;
    