import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Label, ResponsiveContainer, Legend, Tooltip, YAxis, XAxis } from 'recharts'
import BitcoinPage from './BitcoinPage'
import Ethereum from './history'
import History from './Ethereum'
import "./style.css"

class App extends React.Component {


  render() {
    return (
      <div className="container">

      <h1>Crytocurrency Comparisons</h1>

      <div className="component-section">

      <BitcoinPage/>
      <Ethereum />
      <History />

      <h2> Comparisons of closing values using historical data </h2>

      <img src="/graph1.png" alt="Graph"/>



      </div>

      </div>
    )
  }

}

export default App
