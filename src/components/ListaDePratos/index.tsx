import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Prato from '../Prato'
import { Botao, Modal, ModalContent, Section, Container } from './styles'

import fechar from '../../assets/images/close.svg'

import { trimDescription } from '../Restaurante'

interface PratoProps {
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
  const [pratos, setPratos] = useState<PratoProps[]>([])
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

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setPratos(res.cardapio))
  }, [id])

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

  const convertToCurrency = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  return (
    <Container>
      <Section className="container">
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
      </Section>
      <Modal className={modal.visible ? 'container isVisible' : 'container'}>
        <ModalContent>
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
            <Botao>
              Adicionar ao carrinho - {convertToCurrency(modal.preco)}
            </Botao>
          </div>
          <img
            onClick={() => closeModal()}
            src={fechar}
            alt="Ícone de fechar a modal"
          />
        </ModalContent>
      </Modal>
      <div
        onClick={() => closeModal()}
        className={modal.visible ? 'overlay isVisible' : 'overlay'}
      ></div>
    </Container>
  )
}

export default ListaDePratos
