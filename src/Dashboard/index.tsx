import React, { useState } from 'react'
import { Space, Button } from 'antd-mobile'
import { DemoBlock } from '../demos'

import styles from './index.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.App}>
      <h1>Vite + React</h1>
      <DemoBlock title="Fullfill Mode">
        <Space wrap>
          <Button color="primary" fill="solid">
            Solid
          </Button>
          <Button color="primary" fill="outline">
            Outline
          </Button>
          <Button color="primary" fill="none">
            None
          </Button>
        </Space>
      </DemoBlock>
      <div className={styles.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
