import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Label, ResponsiveContainer, Legend, Tooltip, YAxis, XAxis } from 'recharts'
import "./style.css"

class App extends React.Component {

  state = {
    tickerMessages: [],
    dataArray: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket(["BTC-EUR", "ETH-EUR"], this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = (newTickerMessage) => {
    this.setState(previousState => {

      const entryLog = { timestamp: new Date().toLocaleTimeString() }

      const previousEntry = previousState.dataArray[previousState.dataArray.length - 1]
      console.log(previousEntry)


      if (newTickerMessage.product_id === "BTC-EUR") {
        entryLog["BTC-EUR"] = newTickerMessage.price
        if (previousEntry) {
          entryLog["ETH-EUR"] = previousEntry["ETH-EUR"]
        }} else {
        entryLog["ETH-EUR"] = newTickerMessage.price
        if (previousEntry) {
          entryLog["BTC-EUR"] = previousEntry["BTC-EUR"]
        }
      }


    if (this.state.tickerMessages.length > 9) {
      previousState.tickerMessages.shift()
      previousState.dataArray.shift()
    }

      return {

        tickerMessages: previousState.tickerMessages.concat([newTickerMessage]),
        dataArray: previousState.dataArray.concat([entryLog])

      }
    })
  }

  render() {


    return (
      <div className="container">

       <ResponsiveContainer width="90%" height="90%">

        <LineChart width={400} height={400} data={this.state.dataArray}>
        <Tooltip />
          <Line type="monotone" dataKey="BTC-EUR" stroke="#8884d8" />
          <Line type="monotone" dataKey="ETH-EUR" stroke="#8884d8" />

          <Legend verticalAlign="top" height={36}/>

          <XAxis dataKey="timestamp">
            <Label value="Time" offset={0} position="insideBottom" />
             </XAxis>
          <YAxis type="number" domain={["dataMin - 100", "dataMax + 100"]} />
            <Label value="Date" offset={0} position="insideBottom" />


        </LineChart>

       </ResponsiveContainer>

      </div>
    )
  }

}

export default App
