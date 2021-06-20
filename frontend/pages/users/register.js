import { useState } from "react";
import { useRouter } from "next/router";
const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("fullName", fullName);
    formData.append("password", password);
    formData.append("image", image);
    const dergoTeDhenatNeBackend = await fetch(
      "http://localhost:5001/api/users/register",
      {
        method: "POST",
        body: formData,
      }
    );
    router.push("/users/login");
  };
  return (
    <div className="form_wrapper">
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
        <div className="flex_col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex_col">
          <label htmlFor="image">Picture</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <div>
        <h3> Tashme i regjistruar ? </h3> <a href="/users/login"> Kliko Ketu</a>
      </div>
    </div>
  );
};

export default RegisterPage;
