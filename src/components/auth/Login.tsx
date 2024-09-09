import { FormEvent, useEffect, useState } from "react";
import SVGComponent from "../UI/SVGComponent";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ApiService } from "../../helpers/API/ApiSerivce";
import useActions from "../../helpers/hooks/useActions";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import ErrorMessage from "../UI/ErrorMessage";

function Login({ showRecoveryPass }: { showRecoveryPass: () => void }) {
  const [user, setUser] = useState({ login: "", password: "" });
  const accessTKN = useAppSelector((state) => state.auth.access_token);
  const [loading, setLoading] = useState(false);
  const errorStateMsg = useAppSelector((state) => state.auth.authError);
  const dispatch = useActions();
  const navigate = useNavigate();
  useEffect(() => {
    !accessTKN || !localStorage.getItem('rt') ? fetchRefreshTKN() : navigate("/");
  }, []);
  async function fetchRefreshTKN() {
    const refreshToken = localStorage.getItem("rt");
    dispatch.setAuthLoading(true);
    if (refreshToken) {
      try {
        const result = await ApiService.refreshToken(refreshToken);
        dispatch.setCurToken(result.data.access_token);
        localStorage.setItem("rt", result.data.refresh_token);
        navigate("/");
      } catch (error) {
        console.log("Refresh is rejected", error);
        localStorage.removeItem('rt');
        dispatch.setAuthLoading(false)
      }
    } else {
      dispatch.setAuthLoading(false)
      return;
    }
  }
  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (user.login !== "" || user.password !== "") {
      try {
        setLoading(true);
        const result = await ApiService.login(user.login, user.password);
        if (result.status === 200) {
          dispatch.setCurToken(result.data.access_token);
          localStorage.setItem("rt", result.data.refresh_token);
          navigate("/");
        }
      } catch (error: any) {
        dispatch.setAuthError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {errorStateMsg && (
        <ErrorMessage
          shownMessage={errorStateMsg}
          setShownMessage={(msg) => dispatch.setAuthError(msg)}
        />
      )}
      <form
        onSubmit={handleAuthSubmit}
        className="authForm h-[647px] flex flex-col justify-around w-[420px] rounded-[40px] p-[48px] bg-transparent/55 backdrop-blur-[90px] mb-80"
      >
        <fieldset disabled={loading}>
          <h3 className="text-[24px] text-center font-bold text-white">
            Авторизация в систему
          </h3>
          <div className="overflow-hidden">
            <p className="text-center text-white">
              сканируйте отпечаток пальца
            </p>
            <SVGComponent title={"fprint"} />
            <motion.div
              className="h-[14px] rounded-md w-5/12 bg-gradient-to-b from-lombard-btn-green mx-auto"
              animate={{ y: [0, -75, -200, -75, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatDelay: 0,
                ease: "linear",
                bounce: 0,
              }}
            />
            <p className="text-center text-gray-400">или</p>
          </div>
          <div>
            <div className="border-2 border-white rounded-md relative flex items-center">
              <label htmlFor="login" />
              <input
                type="text"
                name="login"
                id="login"
                placeholder="Логин"
                className={`h-[56px] w-full ${user.login !== '' ? 'bg-white/80' : 'bg-white/30'}  px-4`}
                value={user.login}
                onChange={(e) => setUser({ ...user, login: e.target.value })}
              />
              <i className="absolute right-2">
                <SVGComponent title={"loginKey"} />
              </i>
            </div>
            <div className="border-2 border-white my-4 rounded-md relative flex items-center">
              <label htmlFor="password" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className={`h-[56px] w-full px-4 ${user.password !== '' ? 'bg-gray-50/95' : 'bg-white/30'}`}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <i className="absolute right-2">
                <SVGComponent title={"passKey"} />
              </i>
            </div>
          </div>
          <div className="flex flex-col">
            <button className="authButton text-white font-bold">Войти</button>
            <button
              className="text-lombard-bg-inactive-grey underline text-center"
              onClick={showRecoveryPass}
            >
              Забыли пароль?
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Login;
