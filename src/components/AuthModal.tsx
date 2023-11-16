import React, { Fragment } from 'react'

import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

const AuthModal = () => {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
    return (
        <Fragment>
            <div>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Welcome to
                        <Text b size={18}>
                            NextUI
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>

                    <Text size={14}>Remember me</Text>

                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button auto onPress={closeHandler}>
                        Sign in
                    </Button>
                </Modal.Footer>
            </div>
        </Fragment>
    )
}

export default AuthModal