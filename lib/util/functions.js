'use strict'

const openPayments = require('lib/external/open_payments')
const { Project } = require('lib/models')

exports.getProjects = async function getProjects (orgId) {
  let projectList = await Project.find({ organization: orgId, status: 'active' }).exec()
  if ( projectList.length ) {
    // TODO filter doesn't work properly in ixaris.
    // No filter by friendlyName or IDs
    const menagedAccounts = await openPayments.getManagedAccounts()
    const pIds = projectList.map((item) => {return item.managedAccountName})

    let mAccounts = {}
    menagedAccounts.accounts
      .filter((item) => {return pIds.includes(item.friendlyName)})
      .forEach((item) => {
        const actual = item.balances.actual;
        mAccounts[item.friendlyName] = {
          balances: {
            actual: (actual) ? (actual / 100) : 0
          },
          created: item.creationTimestamp
        }
      })

    const projects = projectList.map((item) => {
      const isManaged = mAccounts[item.managedAccountName] || {}
      return {
        name: item.name,
        access: item.access,
        description: item.description,
        balances: isManaged.balances || {},
        created: isManaged.created || {} ,
        id: item.id,
        cards: 10
      }
    })

    return projects
  } else{
    return []
  }
}
