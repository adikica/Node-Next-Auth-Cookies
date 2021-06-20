import { useState } from "react";
import { useRouter } from "next/router";
const DeleteUserPage = ({ userId }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  //funksioni qe egzekutohet kur klikojme butoinin DELETE
  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5001/api/users/delete/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // pranojme credincialet
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => {
        localStorage.removeItem("user");
        router.push("/users/register");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Please enter your password to continue</p>

      <form onSubmit={handleDelete}>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="very_danger">DELETE</button>
      </form>
    </div>
  );
};

export const getServerSideProps = (req) => {
  const userId = req.params.id;
  const cookies = req;
  console.log(req.headers);

  return {
    props: { userId },
  };
};
export default DeleteUserPage;
