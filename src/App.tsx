
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/ChosenTitle"
import ScrollToTop from "./components/common/ScrollToTop"

const App = () => {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App