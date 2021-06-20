import { useState } from "react";
import { useRouter } from "next/router";
const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5001/api/users/login";
    try {
      const lidhu = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // pranojme credincialet
        body: JSON.stringify({
          email,
          password,
        }),
      });

      router.push("/users/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit}>
        <div className="flex_col">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex_col">
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>

      <div>
        <h3> Keni harruar passordin ? </h3>{" "}
        <a href="/users/auth/password/forgot"> Kliko Ketu</a>
        <h3> Nuk keni nje llogari ? </h3>{" "}
        <a href="/users/register"> Kliko Ketu</a>
      </div>
    </div>
  );
};
export default LoginPage;
