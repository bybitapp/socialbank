import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import MenuSideBar from '../components/MenuSideBar'

function mapStateToProps(state) {
  const { projects } = state
  return {
    projects
  }
}


const enhance = compose(
  connect(mapStateToProps),
)

class History extends React.Component {

  render () {
    const styleBorderLeft = {borderLeft: '1px solid rgba(0,0,0,.12)'}
    const styleH3Right = {margin: 0, textAlign: 'right', paddingTop: '25px'}
    const styleTable = {width: '98%', padding: '16px', borderLeft: 0, margin: '0 0 0 16px', borderRight: 0}
    const stylePadding = {padding: '15px'}

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
                        <div style={stylePadding}>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--9-col">
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fullwidth">
                                        <input className="mdl-textfield__input" id="selectedProject" name="selectedProject" value="Project Name 1" type="text" readOnly tabIndex="-1" data-val="BLR"/>
                                        <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu" htmlFor="selectedProject">
                                            <li className="mdl-menu__item" data-val="1">Project Name 1</li>
                                            <li className="mdl-menu__item" data-val="2">Project Name 2</li>
                                            <li className="mdl-menu__item" data-val="2">Project Name 3</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <h5 style={styleH3Right}>£100.000</h5>
                                </div>
                            </div>
                            <table className="mdl-data-table mdl-data-table--selectable" style={styleTable}>
                              <thead>
                                <tr>
                                  <th className="mdl-data-table__cell--non-numeric">Material</th>
                                  <th>Date</th>
                                  <th>Card Holder</th>
                                  <th>Unit price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Seweryn Bidolach</td>
                                  <td>$2.90</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Seweryn Bidolach</td>
                                  <td>$1.25</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Seweryn Bidolach</td>
                                  <td>$2.35</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Aga Gajownik</td>
                                  <td>$2.35</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Aga Gajownik</td>
                                  <td>$2.35</td>
                                </tr>
                                <tr>
                                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                                  <td>2017-04-20 16:44:00</td>
                                  <td>Seweryn Bidolach</td>
                                  <td>$2.35</td>
                                </tr>
                              </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
          </main>
        </div>
    )
  }

}

export default enhance(History)
