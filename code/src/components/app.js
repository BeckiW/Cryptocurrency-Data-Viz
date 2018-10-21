import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Label, ResponsiveContainer, Legend, Tooltip, YAxis, XAxis } from 'recharts'
import BitcoinPage from './BitcoinPage'
import "./style.css"

class App extends React.Component {



  render() {


    return (
      <div className="container">

      <BitcoinPage/>

      </div>
    )
  }

}

export default App
