import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { Main } from "./LoginScreen";
import Logo from "../images/logoLogin.png";

export default function RegisterScreen() {

    const navigate = useNavigate();

    const { userData, setUserData } = useContext(UserContext);
    const [load, setLoad] = useState(false);

    function makeRegister(e) {
        e.preventDefault();

        setLoad(true);
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        const promise = axios.post(URL,
            {
                email: userData.email,
                password: userData.password,
                name: userData.name,
                image: userData.image
            }
        );

        promise.then(() => {
            navigate("/");
        });

        promise.catch((error) => {
            console.log(error.response.status);
            alert("Email já cadastrado!");
            setLoad(false);
            setUserData({ email: "", password: "", name: "", image: "" });
        });
    }

    return (
        <Main>
            <img src={Logo} alt="" />
            <form onSubmit={makeRegister}>

                <input
                    type="email"
                    value={userData.email}
                    onInput={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder="email"
                    disable={load}
                    required
                    
                />

                <input
                    type="password"
                    value={userData.password}
                    onInput={(e) => setUserData({ ...userData, password: e.target.value })
                    }
                    placeholder="senha"
                    required
                    disable={load}
                />

                <input
                    type="text"
                    value={userData.name}
                    onInput={(e) => setUserData({ ...userData, name: e.target.value })}
                    placeholder="nome"
                    required
                    disable={load}
                />

                <input
                    type="url"
                    value={userData.image}
                    onInput={(e) => setUserData({ ...userData, image: e.target.value })}
                    placeholder="foto"
                    required
                    disable={load}
                />

                <button>
                    {load ? (
                        <ThreeDots color="#FFFFFF" width="51px" height="13px" />
                    ) : (
                        <div>Cadastrar</div>
                    )}
                </button>
                
            </form>

            <Link to={"/"}>
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Main>
    );
}