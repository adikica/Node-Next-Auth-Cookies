import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/User-Context";
import Link from "next/link";
import withAuth from "../../helpers/withAuth";

const ProfilePage = () => {
  //const [user, setUser] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(state.user));
  //   console.log("setItem", state.user);
  // }, [state.user]);
  //marrim userin nga backend
  useEffect(() => {
    fetch("http://localhost:5001/api/users/user", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        //setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({
          type: "LOGIN",
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);

        dispatch({
          type: "LOGIN",
          payload: {},
        });
      });
  }, []);

  if (!state.user) {
    return <h2>Loading ... .... </h2>;
  }

  return (
    <div className="profile_wrapper">
      <div>
        <img
          style={{ width: "150px" }}
          src={`http://localhost:5001/images/users/${state.user.image}`}
        />
        <h3>Welcome: {state.user.fullName}</h3>
      </div>

      <div>
        <Link href="/">
          <a>Go Homepage</a>
        </Link>
        <br />
        <Link href={`/users/edit/${state.user._id}`}>
          <a className="button">Edit Profile</a>
        </Link>
        <br />
        <Link href={`/users/delete/${state.user._id}`}>
          <a className="button">Delete Profile</a>
        </Link>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);

export const getServerSideProps = (ctx) => {
  return withAuth.isAuthorized(ctx);
};
