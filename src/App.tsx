import React from "react";
import "./App.css";
import Visualizer from "./components/Visualizer"
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <h1>Sort It!</h1>
            <Visualizer />
            <Footer />
        </div>
    );
}

export default App;
