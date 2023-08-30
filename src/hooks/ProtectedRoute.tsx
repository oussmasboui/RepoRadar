/**
 * ProtectedRoute is a React functional component used for creating protected routes.
 * It allows rendering nested child routes within the protected route.
 *
 * @component
 */
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute: FC = () => {
  return ( <Outlet /> )
}
