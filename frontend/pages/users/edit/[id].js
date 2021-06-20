import withAuth from "../../../helpers/withAuth";
import { UserContext } from "../../../context/User-Context";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
const EditSingleUser = () => {
  const { state } = useContext(UserContext);
  const router = useRouter();
  const [fullName, setFullName] = useState(state.user.fullName);
  const [email, setEmail] = useState(state.user.email);
  const [password, setPassword] = useState("");

  console.log(fullName);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const lidhu = await fetch(
        `http://localhost:5001/api/users/edit/${state.user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // pranojme credincialet
          body: JSON.stringify({
            fullName,
            email,
          }),
        }
      );

      if (lidhu.status == 201) {
        router.push("/users/profile?succes=true");
      } else {
        router.push("/users/profile?succes=false");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form_wrapper">
      <p>Edit Your Profile</p>
      <form onSubmit={handleSubmit}>
        <div className="flex_col">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex_col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default withAuth(EditSingleUser);

export const getServerSideProps = (ctx) => {
  return withAuth.isAuthorized(ctx);
};
