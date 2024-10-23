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
            <Link to="/admin" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Projects
              </li>
            </Link>
            <Link to="/admin/homeHeader" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Home Header
              </li>
            </Link>
            <Link to="/admin/homeProjects" className="link">
              <li className="sidebarListItem">
                <TabUnselectedOutlined className="sidebarIcon" />
                Home Projects
              </li>
            </Link>
            <Link to="/admin/footer" className="link">
              <li className="sidebarListItem">
                <DashboardOutlined className="sidebarIcon" />
                Footer
              </li>
            </Link>
            <Link to="/admin/contact" className="link">
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
