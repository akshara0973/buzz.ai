import React, { useState } from "react";
import bgImage from "../assets/bg.png"; // make sure path is correct

const AuthCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "", role: "ADMIN" });

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

const handleLoginSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    });

    if (res.ok) {
      const data = await res.json();

      // Save token and role to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ✅ Redirect directly to /queen
      window.location.href = "/queen";
    } else {
      alert("❌ Login failed!");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
};



  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm)
      });
      if (res.ok) {
        alert("✅ Registered Successfully");
        setIsFlipped(false);
      } else alert("❌ Registration failed!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.card, transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        {/* Front (Login) */}
        <div style={{ ...styles.face, ...styles.front }}>
          <h2 style={styles.title}>Login</h2>
          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <p onClick={() => window.location.href = "http://localhost:5500/landing/index.html"} style={styles.backBtn}>
  ← Back to Home
</p>

            {/* <a href="http://localhost:5500/landing/index.html" style={styles.backBtn}>← Back to Home</a> */}
          <input type="text" name="username" placeholder="Username" value={loginForm.username} onChange={handleLoginChange} required autoComplete="off" style={styles.input} />
<input type="password" name="password" placeholder="Password" value={loginForm.password} onChange={handleLoginChange} required autoComplete="new-password" style={styles.input} />

            
            <button type="submit" style={styles.button}>Login</button>
            <p style={styles.toggleText}>Don’t have an account? <span onClick={flipCard} style={styles.link}>Register</span></p>
          </form>
        </div>

        {/* Back (Register) */}
        <div style={{ ...styles.face, ...styles.back }}>
          <h2 style={styles.title}>Register</h2>
          <form onSubmit={handleRegisterSubmit} style={styles.form}>
         <input type="text" name="username" placeholder="Username" value={registerForm.username} onChange={handleRegisterChange} required autoComplete="off" style={styles.input} />
<input type="email" name="email" placeholder="Email" value={registerForm.email} onChange={handleRegisterChange} required autoComplete="off" style={styles.input} />
<input type="password" name="password" placeholder="Password" value={registerForm.password} onChange={handleRegisterChange} required autoComplete="new-password" style={styles.input} />

            <select name="role" value={registerForm.role} onChange={handleRegisterChange} style={styles.input}>
              <option value="BEEHIVER">Beehiver</option>
              <option value="RESEARCHER">Researcher</option>
            </select>
            <button type="submit" style={styles.button}>Register</button>
            <p style={styles.toggleText}>Already have an account? <span onClick={flipCard} style={styles.link}>Login</span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    width: "360px",
    height: "520px",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.8s",
  },
  face: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    backgroundColor: "#1B1B1B",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 0 25px #445022",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#eef8ce"
  },
  front: {
    zIndex: 2
  },
  back: {
    transform: "rotateY(180deg)"
  },
  title: {
    fontSize: "28px",
    fontFamily: "'Devil Breeze', cursive",
    textAlign: "center",
    marginBottom: "20px",
    color: "#d1ff48"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #73814B",
    backgroundColor: "#222",
    color: "#eef8ce",
    fontSize: "14px"
  },
  button: {
    padding: "12px",
    backgroundColor: "#73814B",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  toggleText: {
    textAlign: "center",
    fontSize: "13px"
  },
  link: {
    color: "#d1ff48",
    fontWeight: "bold",
    cursor: "pointer"
  },
backBtn: {
  color: "#eef8ce",
  marginBottom: "10px",
  fontSize: "13px",
  cursor: "pointer"
}

};

export default AuthCard;
