import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5001/api/users/forgot-password";
    try {
      const lidhu = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // pranojme credincialet
        body: JSON.stringify({
          email,
        }),
      });

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Shkruani adresen e emailit me te cilen jeni regjistruar</h2>
      <br />
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
        <button type="submit">Dergo</button>
      </form>
    </div>
  );
};
export default ForgotPasswordPage;
