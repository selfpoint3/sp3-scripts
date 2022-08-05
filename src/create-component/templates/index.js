module.exports = (name) => {
    return `
import React from 'react'

const ${name} = props => {
  return <div>This is an example component ${name}</div>
}

export default ${name}
    `
}


