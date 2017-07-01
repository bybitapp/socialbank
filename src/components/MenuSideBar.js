import React from 'react'
import { Link } from 'react-router-dom'

const menuItems = [
  {label: 'Account Details', path: '/me', icon: 'settings'},
  {label: 'Organization', path: '/organization', icon: 'business'},
  {label: 'Users', path: '/users', icon: 'face'},
  {label: 'Bank Accounts', path: '/banks', icon: 'account_balance'},
  {label: 'Projects', path: '/projects', icon: 'favorite'},
  {label: 'Virtual Cards', path: '/cards', icon: 'credit_card'},
  {label: 'Transaction History', path: '/history', icon: 'history'}
]

class MenuSideBar extends React.Component {
  render () {
    return (
      <div>
        <ul className='mdl-list'>
          { Object.keys(menuItems).map((key, index) => {
            const i = menuItems[key]
            return (
              <li className='mdl-list__item' key={key}>
                <Link className='mdl-list__item-primary-content' to={i.path}>
                  <i className='material-icons mdl-list__item-avatar sb-icon-list_item'>{ i.icon }</i>
                  <span>{ i.label }</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default MenuSideBar
