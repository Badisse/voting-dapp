/*[object Object]*/
import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { IOptions, RecursivePartial } from 'tsparticles-engine'
import particlesConfig from './config/particles.config'

function ParticlesBackground (): JSX.Element {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: any) => {
    await console.log(container)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesConfig as RecursivePartial<IOptions>}
    />
  )
}

export default ParticlesBackground
