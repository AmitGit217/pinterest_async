import CardSection from "./components/CardSection"
import Header from "./components/Header"
import "./styles/main.scss"

const app = document.querySelector("#app")
app.append(Header(),await CardSection())
