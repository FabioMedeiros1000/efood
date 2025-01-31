import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Dish from '../Dish'
import Loading from '../Loading'

import closeIcon from '../../assets/images/close.svg'

import { trimDescription } from '../Restaurant'
import { addToCart, openCart } from '../../store/reducers/cart'
import { useGetFoodQuery } from '../../services/api'
import { convertToCurrency } from '../../utils'
import { Dispatch } from '@reduxjs/toolkit'

import * as S from './styles'

import { colors } from '../../styles'
import Button from '../Button'

interface ModalType extends DishProps {
  visible: boolean
}

const handleAddToCart = (
  dispatch: Dispatch,
  closeModal: () => void,
  prato: DishProps
) => {
  dispatch(addToCart(prato))
  closeModal()
  dispatch(openCart())
}

const closeModalHandler = (
  setModal: React.Dispatch<React.SetStateAction<ModalType>>
) => {
  setModal((prev) => ({ ...prev, visible: false }))
}

const DishesList = () => {
  const [modal, setModal] = useState<ModalType>({
    visible: false,
    id: 1,
    foto: '',
    preco: 0,
    nome: '',
    descricao: '',
    porcao: ''
  })
  const { id } = useParams()
  const dispatch = useDispatch()

  const { data: pratos } = useGetFoodQuery(id as string)

  if (id === undefined) {
    return null
  }

  const addCar = (prato: DishProps) =>
    handleAddToCart(dispatch, closeModal, prato)

  const closeModal = () => closeModalHandler(setModal)

  if (!pratos) {
    return <Loading color={colors.red} height={400} />
  }

  return (
    <S.Container>
      <S.Section className="container">
        {pratos.map((prato) => (
          <Dish
            onClick={() =>
              setModal({
                id: prato.id,
                nome: prato.nome,
                descricao: prato.descricao,
                foto: prato.foto,
                porcao: prato.porcao,
                preco: prato.preco,
                visible: true
              })
            }
            onAddToCart={() => addCar(prato)}
            key={prato.id}
            image={prato.foto}
            title={prato.nome}
            description={trimDescription(prato.descricao)}
          />
        ))}
      </S.Section>
      <S.Modal className={modal.visible ? 'container isVisible' : 'container'}>
        <S.ModalContent>
          <img src={modal.foto} />
          <div>
            <h1>{modal.nome}</h1>
            <p>
              {modal.descricao} <br />
              <br />
              {modal.porcao.includes('1 pessoa')
                ? 'Serve: 1 pessoa'
                : `Serve: de ${modal.porcao}`}
            </p>
            <Button
              width="adjusted"
              type="button"
              title="Clique aqui para adicionar ao carrinho"
              onClick={() => addCar(modal)}
            >
              Adicionar ao carrinho - {convertToCurrency(modal.preco)}
            </Button>
          </div>
          <img
            onClick={closeModal}
            src={closeIcon}
            alt="Ícone de fechar a modal"
          />
        </S.ModalContent>
      </S.Modal>
      <S.ModalMobile
        className={modal.visible ? 'container isVisible' : 'container'}
      >
        <S.ModalContentMobile>
          <h1>{modal.nome}</h1>
          <img src={modal.foto} className="prato-foto-mobile" />
          <p>
            {modal.descricao} <br />
            <br />
            {modal.porcao.includes('1 pessoa')
              ? 'Serve: 1 pessoa'
              : `Serve: de ${modal.porcao}`}
          </p>
          <Button
            type="button"
            title="Clique aqui para adicionar ao carrinho"
            onClick={() => addCar(modal)}
          >
            Adicionar ao carrinho - {convertToCurrency(modal.preco)}
          </Button>
          <img
            className="close-icone-mobile"
            onClick={closeModal}
            src={closeIcon}
            alt="Ícone de fechar a modal"
          />
        </S.ModalContentMobile>
      </S.ModalMobile>
      <div
        onClick={closeModal}
        className={modal.visible ? 'overlay isVisible' : 'overlay'}
      ></div>
    </S.Container>
  )
}

export default DishesList
