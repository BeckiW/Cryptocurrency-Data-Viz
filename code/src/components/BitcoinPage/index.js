import React from "react"
import openGdaxWebsocket from "../../gdax-websocket"
import { LineChart, Line, Scatter, ScatterChart, CartesianGrid, RadialBarChart, RadialBar, Label, ResponsiveContainer, Legend, Tooltip, YAxis, XAxis } from 'recharts'

class BitcoinPage extends React.Component {

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
          entryLog["LTC-EUR"] = previousEntry["LTC-EUR"]
          entryLog["BCH-EUR"] = previousEntry["BCH-EUR"]

        }} else if (newTickerMessage.product_id === "ETH-EUR") {
        entryLog["ETH-EUR"] = newTickerMessage.price
        if (previousEntry) {
          entryLog["BTC-EUR"] = previousEntry["BTC-EUR"]
          entryLog["LTC-EUR"] = previousEntry["LTC-EUR"]
          entryLog["BCH-EUR"] = previousEntry["BCH-EUR"]
        }}

        else if (newTickerMessage.product_id === "LTC-EUR") {
        entryLog["LTC-EUR"] = newTickerMessage.price
        if (previousEntry) {
          entryLog["BTC-EUR"] = previousEntry["BTC-EUR"]
          entryLog["ETH-EUR"] = previousEntry["ETH-EUR"]
          entryLog["BCH-EUR"] = previousEntry["BCH-EUR"]
        }}

        else {
        if (previousEntry) {
          entryLog["BTC-EUR"] = previousEntry["BTC-EUR"]
          entryLog["ETH-EUR"] = previousEntry["ETH-EUR"]
          entryLog["LTC-EUR"] = previousEntry["LTC-EUR"]
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

      <h2>Live cryptocurrency comparsion of prices (limited to the last ten purchases)</h2>

       <ResponsiveContainer width="90%" height="90%">
        <LineChart width={400} height={400} data={this.state.dataArray} margin={{top: 0, right: 10, left: -10, bottom: 40}}>>
          <Legend verticalAlign="top" height={36}/>
          <Tooltip />
          <Line type="monotone" dataKey="BTC-EUR" stroke="#d884d2" />
          <Line type="monotone" dataKey="ETH-EUR" stroke='#8ad884' />
          <Line type="monotone" dataKey="LTC-EUR" stroke='#d89784' />
          <Line type="monotone" dataKey="BCH-EUR" stroke='#d89784' />
          <XAxis dataKey="timestamp" tick={{ fill: "gray", fontSize: 16 }}>
            <Label value="Time" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis type="number" domain={["dataMin - 100", "dataMax + 100"]}
              tick={{ fill: "gray", fontSize: 16 }} >
            <Label value="Price (EUR)" offset={350} label={{angle: -90, position: 'insideLeft' }} />
          </YAxis>
        </LineChart>
       </ResponsiveContainer>

      </div>
    )
  }

  }
export default BitcoinPage
