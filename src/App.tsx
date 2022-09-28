import React, { useState } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { NavBar, Popup, Space, Button } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'

import Dashboard from './Dashboard'
import ImageUploader from './ImageUploader'
import TextArea from './TextArea'
import Form from './Form'
import Input from './Input'
import Liff from './LIFF'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<ImageUploader />} />
          <Route path="textarea" element={<TextArea />} />
          <Route path="form" element={<Form />} />
          <Route path="input" element={<Input />} />
          <Route path="liff" element={<Liff />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  const [visible4, setVisible4] = useState(false)

  const right = (
    <div style={{ fontSize: 24 }}>
      <Button
        onClick={() => {
          setVisible4(true)
        }}
        fill="none"
      >
        <Space style={{ '--gap': '16px' }}>
          <MoreOutline />
        </Space>
      </Button>
    </div>
  )

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <NavBar backArrow={false} right={right}>
        スギノクリニック
      </NavBar>
      <Popup
        visible={visible4}
        onMaskClick={() => {
          setVisible4(false)
        }}
        position="right"
        bodyStyle={{ width: '60vw' }}
      >
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/textarea">TextArea</Link>
            </li>
            <li>
              <Link to="/form">Form</Link>
            </li>
            <li>
              <Link to="/input">Input</Link>
            </li>
            <li>
              <Link to="/liff">Liff</Link>
            </li>
          </ul>
        </nav>
      </Popup>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the dashboard page</Link>
      </p>
    </div>
  )
}
