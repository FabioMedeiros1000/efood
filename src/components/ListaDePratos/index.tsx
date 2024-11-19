import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Prato from '../Prato'
import Loading from '../Loading'

import fechar from '../../assets/images/close.svg'

import { trimDescription } from '../Restaurante'
import { addToCart, openCart } from '../../store/reducers/cart'
import { useGetFoodQuery } from '../../services/api'
import { convertToCurrency } from '../../utils'

import * as S from './styles'

import { cores } from '../../styles'

export interface PratoProps {
  foto: string
  preco: number
  id: number
  nome: string
  descricao: string
  porcao: string
}

interface ModalType extends PratoProps {
  visible: boolean
}

const ListaDePratos = () => {
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
    return <Loading color={cores.vermelho} height={400} />
  }

  return (
    <S.Container>
      <S.Section className="container">
        {pratos.map((prato) => (
          <Prato
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
            src={fechar}
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
            src={fechar}
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

export default ListaDePratos
