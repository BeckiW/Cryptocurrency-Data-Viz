import React from 'react'
import './style.css'

class History extends React.Component {


  render() {
    return (
    <div>
      <div className = "section" >
       <h3>History of cryptocurrency</h3>
       <hr />
      </div>

      <div class="vertical">
        <ul>
          <li> <div><img src="/cardano.jpg" alt="cardano" /> </div></li>
          <li> <img src="/bitcoincash.jpg" alt="bitcoincash" /> </li>
          <li> <img src="/eos.jpg" alt="eos" /> </li>
          <li> <img src="/iota.jpg" alt="iota" /> </li>
          <li> <img src="/etherium.jpg" alt="etherium" /> </li>
          <li> <img src="/stellar.jpg" alt="stellar" /> </li>
          <li> <img src="/neo.jpg" alt="neo" /> </li>
          <li> <img src="/ripple.jpg" alt="ripple" /> </li>
          <li> <img src="/litecoin.jpg" alt="litecoin" /> </li>
          <li> <img src="/bitcoin.jpg" alt="bitcoin" /> </li>
        </ul>
      </div>
    </div>
  )

}
}




export default History
