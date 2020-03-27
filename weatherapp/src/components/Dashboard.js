import React from 'react'
import {NavigationBar} from './Navbar';
import { CookiesProvider } from 'react-cookie';
import DeviceDashboard from './Devices-dashboard';

export const Dashboard = () => (
	<div>

    <NavigationBar/>
    <CookiesProvider>
		  <DeviceDashboard>
		  </DeviceDashboard>
    </CookiesProvider>
	</div>
)
