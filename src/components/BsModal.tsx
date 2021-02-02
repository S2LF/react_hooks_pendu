import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Label,
  Container,
} from 'reactstrap';

type BsModalType = {
  onReturn: any;
};

function BsModal({ onReturn }: BsModalType): JSX.Element {
  const [newWordInput, setNewWordInput] = useState<string>('');
  return (
    <Modal>
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        <Container className="reset">
          <Label htmlFor="word">
            Choisir le prochain mot&nbsp;
            <Input
              id="word"
              value={newWordInput}
              onChange={(e) => setNewWordInput(e.target.value)}
            />
          </Label>
          <Button type="submit" onClick={() => onReturn(newWordInput)}>
            OK
          </Button>
        </Container>
      </ModalBody>
    </Modal>
  );
}

export default BsModal;
