import React from 'react'
import './css/sidebar.css'
import { AttachMoney, BarChartOutlined, ChatBubbleOutline, Dashboard, DashboardOutlined, DesktopMac, DynamicFeed, LineStyle, MailOutline, PermIdentity, Report, Storefront, TabUnselectedOutlined, Timeline, TimelineOutlined, TrendingUp, WorkOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Projects
              </li>
            </Link>
            <Link to="/homeHeader" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Home Header
              </li>
            </Link>
            <Link to="/homeProjects" className="link">
              <li className="sidebarListItem">
                <TabUnselectedOutlined className="sidebarIcon" />
                Home Projects
              </li>
            </Link>
            <Link to="/footer" className="link">
              <li className="sidebarListItem">
                <DashboardOutlined className="sidebarIcon" />
                Footer
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
          <Link to="/contact" className="link">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Sidebar
