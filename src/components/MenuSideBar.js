import React from 'react'
import { Link } from 'react-router-dom'

const menuItems = [
    {label: 'Account Details', path: '/details', icon: 'settings'},
    {label: 'Projects', path: '/projects', icon: 'account_balance'},
    {label: 'Transaction History', path: '/history', icon: 'history'},
    {label: 'Virtual Cards', path: '/cards', icon: 'credit_card'},
]

class MenuSideBar extends React.Component {

  render() {
    return (
    <div>
        <ul className="mdl-list">
        { Object.keys(menuItems).map((key, index) => {
            const i = menuItems[key]
            return (
                <li className="mdl-list__item" key={ key }>
                  <Link className="mdl-list__item-primary-content" to={ i.path }>
                    <i className="material-icons mdl-list__item-avatar sb-icon-list_item">{ i.icon }</i>
                    <span>{ i.label }</span>
                  </Link>
                </li>
            )
        })}
        </ul>
    </div>
    );
  }
}

export default MenuSideBar
