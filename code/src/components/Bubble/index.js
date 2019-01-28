import React from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { generateCountriesData } from '@nivo/generators'
import "./style.css"


const colors = ['#fae04d', '#ff744c', '#789792', '#b1646a', '#efa9a1', '#8470c7', '#97a66f']

  const Bubble = (props) => (
      <div className = "containerBubble">
      <h2>Cryptocurrentcy caps</h2>
          <ResponsiveBubble
              root={{
                  data: 'root',
                  children: [{"name": "Bitcoin",
                              "value": 100},
                              {"name": "Litecoin",
                              "value": 50},
                              {"name": "Ripple",
                              "value": 30 },
                              {"name": "Dash",
                              "value": 20 }]

              }}
              identity="name"
              value="value"
              leavesOnly={true}
              colors={['#fae04d', '#ff744c', '#789792', '#b1646a', '#efa9a1', '#8470c7', '#97a66f']}
              labelTextColor="#000"
              labelSkipRadius={12}
              colorBy="name"
              borderWidth={0}
              borderColor="#000"
              padding={6}
              isInteractive={true}
          />
          <div className="Title">BUBBLE</div>
      </div>
  )

  export default Bubble
