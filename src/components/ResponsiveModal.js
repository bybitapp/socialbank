import React from 'react'
import Modal from 'react-modal'

class ResponsiveModal extends React.Component {
  render () {
    const {children, isOpen, onRequestClose, contentLabel} = this.props
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        className='sb-modal android-modal'
        overlayClassName='sb-modal-overlay'
      >
        {children}
      </Modal>
    )
  }
}

export default ResponsiveModal
