import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../context/User-Context";

import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;

  const logout = async () => {
    const logaut = await fetch("http://localhost:5001/api/users/logout", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    localStorage.removeItem("user");
    //router.push("/users/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <a onClick={logout} href="/users/login">
                Logout
              </a>
            </li>
            <li>
              <Link href="/users/profile">
                <a>Profile</a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/users/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/users/register">
                <a>Register</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
