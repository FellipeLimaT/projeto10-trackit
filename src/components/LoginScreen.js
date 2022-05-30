import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
import Logo from "../images/logoLogin.png";

export default function LoginScreen() {

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem("token")) {
            navigate("/hoje");
        }

    }, [])

    const [userLogin, setUserLogin] = useState({ email: "", password: "" });
    const [load, setLoad] = useState(false);

    function makeLogin(e) {

        e.preventDefault();

        setLoad(true);
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const promise = axios.post(URL,
            {
                email: userLogin.email,
                password: userLogin.password
            }
        );

        promise.then((response) => {
            const { data } = response;
            localStorage.setItem("image", data.image);
            localStorage.setItem("token", data.token);
            navigate("/hoje");
        });

        promise.catch((error) => {
            console.log(error.status)
            alert("Login ou senha estão incorretos!");
            setLoad(false);
            setUserLogin({ email: "", password: "" });
        });
    }

    return (
        <Main>
            <img src={Logo} alt="" />
            <form onSubmit={makeLogin}>

                <input
                    type="email"
                    value={userLogin.email}
                    onInput={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                    placeholder="email"
                    disabled={load}
                    required
                />

                <input
                    type="password"
                    value={userLogin.password}
                    onInput={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                    placeholder="senha"
                    disabled={load}
                    required
                />

                <button>
                    {load ? (
                        <ThreeDots color="#FFFFFF" width="51px" height="13px" />
                    ) : (
                        <div>Entrar</div>
                    )}
                </button>

            </form>

            <Link to={"/cadastro"}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </Main>
    );
}

export const Main = styled.main`
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 180px;
        height: 178px;
    }

    form {
        margin-top: 15vh;
        display: flex;
        flex-direction: column;
    }

    input {
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        background-color: #FFFFFF;

        margin-bottom: 2%;
        left: 36px;
        top: 279px;

        box-sizing: border-box;
        padding: 0 10px;
        font-size: 20px;
        font-weight: 400;    
        line-height: 25px;
        color: #666666;

        &::placeholder{
            font-size: 20px;
            font-weight: 400;    
            color: #DBDBDB;
        }
    }
    
    button {
        height: 45px;
        border: none;
        border-radius: 5px;
        background-color: #52B6FF;

        font-size: 21px;
        font-weight: 400;        
        color: #FFFFFF;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        font-size: 14px;
        font-weight: 400;  
        line-height: 17px;  
        color: #52B6FF;    
        margin-top: 25px;
        text-decoration-line: underline;
    }
`