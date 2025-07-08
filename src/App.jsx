import React, { useEffect, useState } from "react";
const fs = window.require("fs");
const path = window.require("path");
const crypto = window.require("crypto");
const os = window.require("os");

const algorithm = "aes-256-cbc";
const iv = Buffer.alloc(16, 0);
const password = "my-personal-pass";

const vaultPath = path.join(
  os.homedir(),
  "AppData",
  "Roaming",
  "password-vault-app",
  "vault.json"
);

const encrypt = (text) => {
  const key = crypto.scryptSync(password, "salt", 32);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (encrypted) => {
  try {
    const key = crypto.scryptSync(password, "salt", 32);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch {
    return null;
  }
};

const App = () => {
  const [vaultData, setVaultData] = useState([]);
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [userpass, setUserpass] = useState("");

  useEffect(() => {
    if (fs.existsSync(vaultPath)) {
      const raw = fs.readFileSync(vaultPath, "utf8");
      const decrypted = decrypt(raw);
      if (decrypted) {
        setVaultData(JSON.parse(decrypted));
      }
    }
  }, []);

  const saveVault = (data) => {
    const encrypted = encrypt(JSON.stringify(data));
    fs.writeFileSync(vaultPath, encrypted);
  };

  const addEntry = () => {
    if (!site || !username || !userpass) return;
    const updated = [...vaultData, { site, username, password: userpass }];
    setVaultData(updated);
    saveVault(updated);
    setSite("");
    setUsername("");
    setUserpass("");
  };

  const deleteEntry = (index) => {
    const updated = vaultData.filter((_, i) => i !== index);
    setVaultData(updated);
    saveVault(updated);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "2rem",
        backgroundColor: "#f4f8fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#008080",
          fontSize: "2rem",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Personal Password Vault
      </h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Password"
          value={userpass}
          onChange={(e) => setUserpass(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addEntry} style={addButton}>
          Add
        </button>
      </div>

      {vaultData.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          No credentials saved yet.
        </p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {vaultData.map((entry, i) => (
            <div key={i} style={cardStyle}>
              <h3 style={{ margin: 0 }}>{entry.site}</h3>
              <p style={{ margin: "4px 0" }}>{entry.username}</p>
              <p style={{ margin: "4px 0" }}>{entry.password}</p>
              <button onClick={() => deleteEntry(i)} style={deleteButton}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  flex: "1",
  minWidth: "180px",
};

const addButton = {
  padding: "10px 20px",
  borderRadius: "8px",
  backgroundColor: "#008080",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const cardStyle = {
  padding: "1rem",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  position: "relative",
};

const deleteButton = {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  backgroundColor: "#ff4d4d",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  padding: "5px 10px",
  cursor: "pointer",
};

export default App;
