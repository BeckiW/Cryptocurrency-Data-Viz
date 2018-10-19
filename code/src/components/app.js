import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Tooltip, YAxis } from 'recharts'

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

      const entryLog = { timestamp: new Date()  }

      const previousEntry = previousState.dataArray[previousState.dataArray.length - 1]
      console.log(previousEntry)


      if (newTickerMessage.product_id === "BTC-EUR") {
        entryLog["BTC-EUR"] = newTickerMessage.price

        if (previousEntry) {
          entryLog["ETH-EUR"] = previousEntry["ETH-EUR"]
        }


      } else {
        entryLog["ETH-EUR"] = newTickerMessage.price

        if (previousEntry) {

          entryLog["BTC-EUR"] = previousEntry["BTC-EUR"]
        }
      }

      return {

        tickerMessages: previousState.tickerMessages.concat([newTickerMessage]),
        dataArray: previousState.dataArray.concat([entryLog])

      }
    })
  }

  render() {


    return (
      <div>
        <LineChart width={400} height={400} data={this.state.dataArray}>
        <Tooltip />
          <Line type="monotone" dataKey="BTC-EUR" stroke="#8884d8" />
          <Line type="monotone" dataKey="ETH-EUR" stroke="#8884d8" />

        </LineChart>
      </div>
    )
  }

}

export default App
