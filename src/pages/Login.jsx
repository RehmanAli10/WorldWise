import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

function Login() {
  // PRE-FILLED FOR DEVELOPMENT PURPOSES
  const [email, setEmail] = useState("rehman@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
