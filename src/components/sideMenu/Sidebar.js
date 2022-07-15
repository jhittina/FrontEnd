import SidebarItem from "./SidebarItem"
import items from "../sideMenu/data/sidebar.json"
import React from 'react'
import './index.css'

export default function Sidebar(){
    return (
        <div className="sidebar">
          { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        </div>
    )
}
