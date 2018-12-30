import React from "react"
import openGdaxWebsocket from "../../gdax-websocket"
import { LineChart, BarChart, Bar, Line, Scatter, ScatterChart, CartesianGrid, RadialBarChart, RadialBar, Label, ResponsiveContainer, Legend, Tooltip, YAxis, XAxis } from 'recharts'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { generateCountriesData } from '@nivo/generators'



class Ethereum extends React.Component {

  state = {
    tickerMessages: [],
    dataArray: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket(["BTC-EUR", "ETH-EUR", "LTC-EUR"], this.handleNewTickerMessage)
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


    if (this.state.tickerMessages.length > 1) {
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
<RadialBarChart width={730} height={250} innerRadius="10%" outerRadius="80%" data={this.state.dataArray} startAngle={180} endAngle={0}>
  <RadialBar minAngle={15} label={{ fill: '#990066', position: 'insideStart' }} background clockWise={true} dataKey='BTC-EUR' />
    <RadialBar minAngle={15} label={{ fill: '#cc6633', position: 'insideStart' }} background clockWise={true} dataKey='ETH-EUR' />
    <RadialBar minAngle={15} label={{ fill: '#9900ff', position: 'insideStart' }} background clockWise={true} dataKey='LTC-EUR' />
    <RadialBar minAngle={15} label={{ fill: '#0000cc', position: 'insideStart' }} background clockWise={true} dataKey='BCH-EUR' />
  <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
  <Tooltip />
</RadialBarChart>

</ResponsiveContainer>



      </div>
    )
  }

  }
export default Ethereum
