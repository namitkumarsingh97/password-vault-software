# Password Vault — Offline Desktop App

A simple, beautiful offline **password manager** built with **Electron** and **React**.
Store your credentials locally with basic encryption — completely private, with no internet access required.

## Features

- Add, edit, and delete login credentials
- Data saved securely in local encrypted JSON file (`vault.json`)
- Beautiful and minimal UI (React)
- Desktop experience with `.exe` build
- No online sync — 100% offline and private
- Optional login/master password (commented for now)

## Tech Stack

- **Frontend**: React (JSX)
- **Backend**: Node.js (Electron main process)
- **Storage**: Encrypted JSON in local AppData
- **Bundler**: Webpack
- **Packager**: `electron-builder` for creating `.exe`

## Folder Structure

```bash
password-vault-app/
├── src/                # React frontend code
│   └── App.jsx         # Main app component
├── public/
│   └── index.html      # App entry
├── main.js             # Electron main process
├── package.json        # App config
├── .gitignore
├── electron-builder.yml
└── dist/               # (Ignored) Electron-built .exe and setup files
```

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/namitkumarsingh97/first-desktop-software.git
cd password-vault-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app in dev mode

```bash
npm start
```

## Build .exe Installer

To generate a Windows installer (`PasswordVault Setup.exe`):

```bash
npm run dist
```

> The `.exe` and setup files will be created inside the `/dist` folder.
> You can share the installer with others — it **does not include your vault data.**

## Data Storage & Security

- Passwords are saved locally at:

  ```
  C:\Users\<YourUsername>\AppData\Roaming\PasswordVault\vault.json
  ```

- Vault is encrypted using basic `crypto` module in Node.js
- No data is sent over the internet

## To Do / Optional Features

- [ ] Enable master password login again
- [ ] Export/import vault
- [ ] Add password generator
- [ ] Use stronger encryption (AES)
- [ ] Add dark/light themes

## Disclaimer

> This app is built for **personal use only**.
> It is a simple offline tool and does **not implement advanced encryption/security**.
> For sensitive information or professional use, please use audited password managers.

## Author

**Namit Kumar Singh**
GitHub: [@namitkumarsingh97](https://github.com/namitkumarsingh97)
