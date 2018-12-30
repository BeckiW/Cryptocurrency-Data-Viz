import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Label, ResponsiveContainer, Legend, Tooltip, YAxis, XAxis } from 'recharts'
import BitcoinPage from './BitcoinPage'
import Ethereum from './history'
import Bubble from './Bubble'
import History from './Ethereum'
import "./style.css"

class App extends React.Component {


  render() {
    return (

      <div class='sky'>
        <div class='stars'></div>

        <div className="container">

        <h1>Crytocurrency Comparisons</h1>

        <div className="component-section">

          <BitcoinPage/>
          <Bubble />
          <Ethereum />
          <History />

          </div>

      </div>
        </div>
    )
  }

}

export default App
