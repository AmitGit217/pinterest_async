import Header from "./components/Header"
import "./styles/main.scss"

const app = document.querySelector<HTMLDivElement>("#app")!
app.appendChild(Header())
