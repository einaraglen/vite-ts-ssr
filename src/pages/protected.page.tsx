import ProtectedProvider, { useProtectedContext } from '@components/context/useProtectedContext'
import AdminLayout from '@components/layout/layers/AdminLayout'
import ProtectedLayout from '@components/layout/layers/ProtectedLayout'
import SystemLayout from '@components/layout/layers/SystemLayout'
import VesselsLayout from '@components/layout/layers/VesselsLayout'
import { Routes, Route, Navigate } from 'react-router-dom'

export { ProtectedPage as Page }

const ProtectedPage = () => {
  const { isLoading } = useProtectedContext()

  return (
    <ProtectedProvider>
      <Routes>
        <Route path="/protected" element={<ProtectedLayout />}>
          <Route path="map" element={<div>map</div>} />
          <Route path="vessels" element={<VesselsLayout />}>
          <Route index element={<div>vessels</div>} />
            <Route path=":vessel_id">
              <Route path=":system_id" element={<SystemLayout />}>
                <Route path="operational" />
                <Route path="monitoring" />
                <Route path="documentation" />
                <Route path="logs" />
                <Route path="*" element={<Navigate to="dashboard" />} />
              </Route>
            </Route>
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="vessels" />
            <Route path="systems" />
            <Route path="organizations" />
            <Route path="users" />
            <Route path="*" element={<Navigate to="vessels" />} />
          </Route>
          <Route path="*" element={<Navigate to="map" />} />
        </Route>
      </Routes>
    </ProtectedProvider>
  )
}
