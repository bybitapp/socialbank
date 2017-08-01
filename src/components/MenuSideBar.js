import React from 'react'
import Auth from '../modules/Auth'
import { Link } from 'react-router-dom'

const menuItems = [
  {label: 'Account Details', path: '/me', icon: 'settings', access: 'OWNER,ADMIN,USER'},
  {label: 'Organization', path: '/organization', icon: 'business', access: 'OWNER,ADMIN,USER'},
  {label: 'Bank Accounts', path: '/banks', icon: 'account_balance', access: 'OWNER,ADMIN'},
  {label: 'Projects', path: '/projects', icon: 'favorite', access: 'OWNER,ADMIN'},
  {label: 'Users', path: '/users', icon: 'face', access: 'OWNER,ADMIN'},
  {label: 'Virtual Cards', path: '/cards', icon: 'credit_card', access: 'OWNER,ADMIN,USER'},
  {label: 'Transaction History', path: '/history', icon: 'history', access: 'OWNER,ADMIN,USER'}
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
