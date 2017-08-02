import React from 'react'
import Auth from '../modules/Auth'
import { Link } from 'react-router-dom'

const menuItems = [
  {label: 'Account Details', path: '/me', icon: 'settings', access: 'owner,admin,user'},
  {label: 'Organization', path: '/organization', icon: 'business', access: 'owner,admin,user'},
  {label: 'Bank Accounts', path: '/banks', icon: 'account_balance', access: 'owner,admin'},
  {label: 'Projects', path: '/projects', icon: 'favorite', access: 'owner,admin'},
  {label: 'Users', path: '/users', icon: 'face', access: 'owner,admin'},
  {label: 'Virtual Cards', path: '/cards', icon: 'credit_card', access: 'owner,admin,user'},
  {label: 'Transaction History', path: '/history', icon: 'history', access: 'owner,admin,user'}
]

class MenuSideBar extends React.Component {
  render () {
    const items = menuItems.filter((i) => i.access.indexOf(Auth.getUser().access) !== -1)
    return (
      <div>
        <ul className='mdl-list'>
          { Object.keys(items).map((key, index) => {
            const i = items[key]
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
