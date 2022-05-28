/* eslint-disable space-before-function-paren */
import React from 'react'
import { connect } from 'redux-bundler-react'
import { withTranslation } from 'react-i18next'
// import { Title } from './Commons'

import filesize from 'filesize'

import RetroContainer from '../components/common/atoms/RetroContainer'
import RetroText from '../components/common/atoms/RetroText'
import TrafficUpDownView from '../components/common/atoms/TrafficUpDownView'
import styled from 'styled-components'
// import RetroCounter from '../components/common/molecules/RetroCounter'

const TrafficWidgetContainer = styled.div`
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 30px;
  @media (max-width: 524px) {
    flex-direction: column;
  }
`
class NetworkTraffic extends React.Component {
  state = {
    downSpeed: {
      filled: 0,
      total: 125000 // Starts with 1 Mb/s max
    },
    upSpeed: {
      filled: 0,
      total: 125000 // Starts with 1 Mb/s max
    },
    upGrowRate: 0,
    downGrowRate: 0
  }

  getGrowRate(prevState, up, down) {
    let downRate = 0
    let upRate = 0
    if (prevState?.downSpeed?.filled !== 0) {
      downRate = Math.round((down - prevState.downSpeed.filled) * 100 / prevState.downSpeed.filled)
    } else {
      downRate = 0
    }

    if (prevState?.upSpeed?.filled !== 0) {
      upRate = Math.round((up - prevState.upSpeed.filled) * 100 / prevState.upSpeed.filled)
    } else {
      upRate = 0
    }
    return { downRate, upRate }
  }

  componentDidUpdate(_, prevState) {
    const { nodeBandwidth } = this.props

    const down = nodeBandwidth ? parseInt(nodeBandwidth.rateIn.toFixed(0), 10) : 0
    const up = nodeBandwidth ? parseInt(nodeBandwidth.rateOut.toFixed(0), 10) : 0
    const { downRate, upRate } = this.getGrowRate(prevState, up, down)
    console.log({
      downRate, upRate
    })
    if (down !== prevState.downSpeed.filled || up !== prevState.upSpeed.filled) {
      this.setState({
        downSpeed: {
          filled: down,
          total: Math.max(down, prevState.downSpeed.total)
        },
        upSpeed: {
          filled: up,
          total: Math.max(up, prevState.upSpeed.total)
        },
        downGrowRate: downRate,
        upGrowRate: upRate
      })
    }
  }

  render() {
    const { t } = this.props
    const { downSpeed, upSpeed, downGrowRate, upGrowRate } = this.state

    const down = filesize(downSpeed.filled, {
      standard: 'iec',
      base: 2,
      output: 'array',
      round: 0,
      bits: false
    })
    const up = filesize(upSpeed.filled, {
      standard: 'iec',
      base: 2,
      output: 'array',
      round: 0,
      bits: false
    })

    return (
      <div style={{ marginTop: 10 }} className='flex flex-column justify-between h-100'>
        {/* <Title>{t('networkTraffic')}</Title> */}
        <TrafficWidgetContainer>
          <RetroContainer margin={5} className='flex flex-column justify-between mt1' minWidth='220px' width='270px' height='74px'>
            <div className='flex flex-row  ph3 pv2 ' style={{ alignItems: 'center', height: '100%' }}>
              <RetroText color='white' fontSize={16} className='pr2'>
                {t('app:terms.downSpeed')}
              </RetroText>
              <div className='pl2 bl' style={{ borderLeftColor: '#312F62' }}>
                <RetroContainer inset className='flex flex-row' style={{ alignItems: 'center' }} bgColor={'transparent'}>
                  <div style={{ fontWeight: 700, fontSize: '20px', lineHeight: '26px', color: 'white' }}>
                    {down[0]}
                  </div>
                  <RetroText className='pt1' style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {down[1]}/s
                  </RetroText>
                </RetroContainer>
                <TrafficUpDownView growRate={downGrowRate} />
              </div>
            </div>
          </RetroContainer>
          <RetroContainer padding={5} margin={5} className='flex flex-column justify-between  mt1' minWidth='220px' width='270px' height='74px'>
            <div className='flex flex-row ph3 pv2 ' style={{ alignItems: 'center', height: '100%' }}>
              <RetroText color='white' fontSize={16} className='pr2'>
                {t('app:terms.upSpeed')}
              </RetroText>
              <div className='pl2 bl' style={{ borderLeftColor: '#312F62' }}>
                <RetroContainer inset className='flex flex-row' style={{ alignItems: 'center' }} bgColor={'transparent'}>
                  <div style={{ fontWeight: 700, fontSize: '20px', lineHeight: '26px', color: 'white' }}>
                    {up[0]}
                  </div>
                  <RetroText className='pt1' style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {up[1]}/s
                  </RetroText>
                </RetroContainer>
                <TrafficUpDownView growRate={upGrowRate} />
              </div>
            </div>
          </RetroContainer>
        </TrafficWidgetContainer>
      </div>
    )
  }
}

export default connect(
  'selectNodeBandwidth',
  withTranslation('status')(NetworkTraffic)
)
