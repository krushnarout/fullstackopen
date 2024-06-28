import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const persons = [{ name: "Arto Hellas", number: "346-2223643" }]

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App persons={persons} />
  </React.StrictMode>
)
