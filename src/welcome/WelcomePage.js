import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'redux-bundler-react'
import { withTranslation } from 'react-i18next'
import ReactJoyride from 'react-joyride'
import withTour from '../components/tour/withTour'
import { welcomeTour } from '../lib/tours'
import { getJoyrideLocales } from '../helpers/i8n'

// Components
import IsConnected from '../components/is-connected/IsConnected'
import IsNotConnected from '../components/is-not-connected/IsNotConnected'
import AboutIpfs from '../components/about-ipfs/AboutIpfs'
import AboutWebUI from '../components/about-webui/AboutWebUI'
import ComponentLoader from '../loader/ComponentLoader.js'
import Box from '../components/box/Box'

const WelcomePage = ({ t, apiUrl, ipfsInitFailed, ipfsConnected, ipfsReady, toursEnabled, handleJoyrideCallback }) => {
  if (!ipfsInitFailed && !ipfsReady) {
    return <ComponentLoader />
  }

  const isSameOrigin = window.location.origin === apiUrl

  return (
    <div>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className='lh-copy charcoal'>
        <ConnectionStatus connected={ipfsConnected} sameOrigin={isSameOrigin} t={t} />
      </div>
      <ReactJoyride
        run={toursEnabled}
        steps={welcomeTour.getSteps({ t })}
        styles={welcomeTour.styles}
        callback={handleJoyrideCallback}
        scrollToFirstStep
        locale={getJoyrideLocales(t)} />
    </div>
  )
}

const ConnectionStatus = ({ t, connected, sameOrigin }) => {
  if (connected) {
    return (
      <Box>
        <IsConnected />
        <div className='flex-ns mt3'>
          <div className='mr3-ns lh-copy mid-gray w-50-ns'>
            <AboutWebUI />
          </div>
          <div className='lh-copy mid-gray w-50-ns mt3 mt0-ns'>
            <AboutIpfs />
          </div>
        </div>
      </Box>
    )
  }
  return (
    <IsNotConnected />
  )
}

export default connect(
  'selectIpfsInitFailed',
  'selectIpfsConnected',
  'selectIpfsReady',
  'selectApiUrl',
  'selectToursEnabled',
  withTour(withTranslation('welcome')(WelcomePage))
)
