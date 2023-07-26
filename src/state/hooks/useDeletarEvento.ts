import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { listaDeEventosState } from "../atom"

const useDeletarEvento = ()=>{
    const setListaEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)
    return (evento: IEvento)=>{
        return setListaEventos(listaAntiga => listaAntiga.filter(evt=> evt.id !== evento.id))
    }
}

export default useDeletarEvento;