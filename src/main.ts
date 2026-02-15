import CardSection from "./components/CardSection"
import Header from "./components/Header"
import "./styles/main.scss"

const app = document.querySelector<HTMLDivElement>("#app")!
app.append(Header(),await CardSection())
