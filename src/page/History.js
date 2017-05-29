import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'

const enhance = compose(
  connect((state, props) => ({ project: state.projects.find((v) => v.id == props.match.params.id ) }) ),
)

class History extends React.Component {

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleH3 = {margin: 0}
    const styleH3Right = {margin: 0, textAlign: 'right'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}

    const { project } = this.props

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <main className="mdl-layout__content">
            <div className="page-content">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col">
                        <MenuSideBar />
                    </div>
                    <div className="mdl-cell mdl-cell--9-col" style={styleBorderLeft}>
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--9-col">
                                <h3 style={styleH3}>test</h3>
                            </div>
                            <div className="mdl-cell mdl-cell--3-col" >
                                <h3 style={styleH3Right}>sssss</h3>
                            </div>
                        </div>
                        <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
                          <thead>
                            <tr>
                              <th className="mdl-data-table__cell--non-numeric">Material</th>
                              <th>Date</th>
                              <th>Quantity</th>
                              <th>Unit price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
                              <td>2017-04-20 16:44:00</td>
                              <td>25</td>
                              <td>$2.90</td>
                            </tr>
                            <tr>
                              <td className="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
                              <td>2017-04-20 16:44:00</td>
                              <td>50</td>
                              <td>$1.25</td>
                            </tr>
                            <tr>
                              <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                              <td>2017-04-20 16:44:00</td>
                              <td>10</td>
                              <td>$2.35</td>
                            </tr>
                            <tr>
                              <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                              <td>2017-04-20 16:44:00</td>
                              <td>10</td>
                              <td>$2.35</td>
                            </tr>
                            <tr>
                              <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                              <td>2017-04-20 16:44:00</td>
                              <td>10</td>
                              <td>$2.35</td>
                            </tr>
                            <tr>
                              <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                              <td>2017-04-20 16:44:00</td>
                              <td>10</td>
                              <td>$2.35</td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </main>
          <Footer />
        </div>
    )
  }

}

export default enhance(History)
