import React from 'react'

import closeImg from '../../assets/images/close.svg'

import * as S from './styles'

interface ModalProps {
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isVisible, onClose, children }: ModalProps) => {
  if (!isVisible) return null

  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.ModalWrapper>
        <S.ModalContent>
          {children}
          <S.CloseIcon onClick={onClose}>
            <img src={closeImg} alt="" />
          </S.CloseIcon>
        </S.ModalContent>
      </S.ModalWrapper>
    </>
  )
}

export default Modal
