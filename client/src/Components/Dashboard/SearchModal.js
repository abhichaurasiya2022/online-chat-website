import Styles from './SearchModal.module.scss'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
const SearchModal = () => {
  const [modal, setModal] = React.useState(false);

   // Toggle for Modal
   const toggle = () => setModal(!modal);



    return (



        <Modal

        isOpen = {modal}
        centered
        fullscreen="md"
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          Modal title
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={function noRefCheck(){}}
          >
            Do Something
          </Button>
          {' '}
          <Button onClick={function noRefCheck(){}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

    )
}
export default SearchModal;
