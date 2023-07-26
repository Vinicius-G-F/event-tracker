import { useSetRecoilState } from "recoil"
import { listaDeEventosState } from "../atom"
import { IEvento } from "../../interfaces/IEvento";
import { obterID } from "../../util";

const useAdicionarEvento = ()=>{
    const setListaEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
    return (evento: IEvento)=>{
        const hoje = new Date();
        if(evento.inicio < hoje){
            throw new Error("Data de início não pode ser inferior a data de hoje, meu nobre!")
        }
        evento.id = obterID();
        console.log(evento)
        return setListaEventos(listaAntiga =>{
            console.log([...listaAntiga, evento])
            return [...listaAntiga, evento]
        })
    }
}

export default useAdicionarEvento;