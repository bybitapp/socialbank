import React, { Component } from 'react'
import Async from '../util/asyncComponent'
import Box from './util/box'
import { Row, Col } from 'antd'
import LayoutWrapper from './util/layoutWrapper'
import ContentHolder from './util/contentHolder'
import basicStyle from './util/basicStyle'

const GoogleChart = (props) => <Async load={import(/* webpackChunkName: "googleChart" */ 'react-google-charts')} componentProps={props} componentArguement={'googleChart'} />

const width = '100%'
const height = '400px'

const DonutChart = {
  title: 'Spendings',
  key: 'DonutChart',
  chartType: 'PieChart',
  width,
  height,
  data: [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ],
  options: {
    title: 'My Daily Activities',
    titleTextStyle: {
      color: '#788195'
    },
    legend: {
      textStyle: {
        color: '#788195'
      }
    },
    pieHole: 0.4,
    pieSliceTextStyle: {
      color: '#ffffff'
    },
    is3D: true,
    colors: ['#9678AE', '#F99FB4', '#C8E4FB', '#01C0C8', '#ffbf00'],
    tooltip: {
      textStyle: {
        color: '#788195'
      }
    }
  }
}

export default class SpendingsChart extends Component {
  render () {
    const { rowStyle, colStyle, gutter } = basicStyle
    return (
      <LayoutWrapper className='isoMapPage'>
        <Row style={rowStyle} gutter={gutter} justify='start'>
          <Col style={colStyle}>
            <Box title={DonutChart.title}>
              <ContentHolder>
                <GoogleChart {...DonutChart} />
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>)
  }
}
