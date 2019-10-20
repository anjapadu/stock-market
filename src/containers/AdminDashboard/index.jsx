import React from 'react'
import { connect } from 'react-redux';
import Axios from 'axios';
import {
  setStocks
} from '../../actions'
import { stocksSelector } from '../../selectors';
import Card from '../../components/Card';

class AdminDashboard extends React.Component {
  async componentDidMount() {
    const { data } = await Axios.post(API_URL, {
      query: `{
            stocks {
              uuid
              name
              description
              companyname
              companylogo
              currency
              last_price {
                uuid
                close_price
                timestamp(format: "DD/MM/YYYY @ HH:mm")
                change_price
                change_percent
              }
              stock_price_history {
                uuid
                close_price
                timestamp(format: "DD/MM/YYYY @ HH:mm")
                change_price
                change_percent
              }
            }
          }
          `
    })
    if (!data.errors) {
      this.props.setStocks(data.data.stocks)
    }

    this.setState({
      loading: false,
    })
  }
  renderStocks(stockList) {
    return Object.keys(stockList).map((stockKey) => {
      // const stock = stockList[stockKey]
      return <Card
        onBuy={() => this.setState({ showBuy: true, stockToBuy: stockKey })}
        key={stockKey}
        item={stockList[stockKey]}
      />
    })
  }
  render() {
    return <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: window.innerHeight - 50,
      }}
    >
      <div
        style={{
          flex: 1,
          height: window.innerHeight - 50 - ((window.innerHeight - 50) * 0.8)
        }}
      >
        {/* <h2>Notices</h2> */}
      </div>
      <div
        style={{
          flex: 4,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          height: window.innerHeight - 50 - ((window.innerHeight - 50) * 0.2)
        }}
      >
        {this.renderStocks(this.props.stockList)}
      </div>

    </div>
  }
}


const mapStateToProps = state => {
  return {
    stockList: stocksSelector(state),

  }
}

export default connect(mapStateToProps, {
  setStocks
})(AdminDashboard)