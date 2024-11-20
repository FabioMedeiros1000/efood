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

import * as S from './styles'

import { colors } from '../../styles'

interface ModalType extends DishProps {
  visible: boolean
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

  const { data: pratos } = useGetFoodQuery(id!)

  if (id === undefined) {
    return null
  }

  const closeModal = () =>
    setModal({
      id: modal.id,
      nome: modal.nome,
      descricao: modal.descricao,
      foto: modal.foto,
      porcao: modal.porcao,
      preco: modal.preco,
      visible: false
    })

  const addCar = () => {
    dispatch(
      addToCart({
        id: modal.id,
        preco: modal.preco,
        descricao: modal.descricao,
        foto: modal.foto,
        nome: modal.nome,
        porcao: modal.porcao
      })
    )
  }

  const OpenCar = () => {
    dispatch(openCart())
  }

  if (!pratos) {
    return <Loading color={colors.red} height={400} />
  }

  return (
    <S.Container>
      <S.Section className="container">
        {pratos.map((prato) => (
          <Dish
            onClick={() => {
              setModal({
                id: prato.id,
                nome: prato.nome,
                descricao: prato.descricao,
                foto: prato.foto,
                porcao: prato.porcao,
                preco: prato.preco,
                visible: true
              })
            }}
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
            <S.Botao
              title="Clique aqui para adicionar ao carrinho"
              onClick={() => {
                addCar(), OpenCar(), closeModal()
              }}
            >
              Adicionar ao carrinho - {convertToCurrency(modal.preco)}
            </S.Botao>
          </div>
          <img
            onClick={() => closeModal()}
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
          <S.Botao
            title="Clique aqui para adicionar ao carrinho"
            onClick={() => {
              addCar(), OpenCar(), closeModal()
            }}
          >
            Adicionar ao carrinho - {convertToCurrency(modal.preco)}
          </S.Botao>
          <img
            className="close-icone-mobile"
            onClick={() => closeModal()}
            src={closeIcon}
            alt="Ícone de fechar a modal"
          />
        </S.ModalContentMobile>
      </S.ModalMobile>
      <div
        onClick={() => closeModal()}
        className={modal.visible ? 'overlay isVisible' : 'overlay'}
      ></div>
    </S.Container>
  )
}

export default DishesList
