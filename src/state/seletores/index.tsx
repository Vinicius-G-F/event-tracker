import { selector } from "recoil";
import { filtroDeEventosState, listaDeEventosState } from "../atom";
import axios from "axios";
import { IEvento } from "../../interfaces/IEvento";

export const eventosFiltradosState = selector({
    key: 'eventosFiltradosState',
    get: ({get})=>{
        const todosOsEventos = get(listaDeEventosState);
        const filtro = get(filtroDeEventosState);
        const eventos = todosOsEventos.filter(evt=>{
            let filtroPorData = true
            let filtroPorStatus = true
            if(filtro.data){
                const dataInicio = evt.inicio.toISOString().slice(0, 10);
                const dataFim = evt.fim.toISOString().slice(0, 10)
                const dataFiltro = filtro.data?.toISOString().slice(0, 10)
                filtroPorData = dataInicio === dataFiltro || dataFim === dataFiltro;
            }

            if(filtro.status){
                const statusEvento = evt.completo ? "Completo" : "Incompleto"
                const statusInput = filtro.status
                if(statusEvento !== statusInput && statusInput !== "Ambos"){
                    filtroPorStatus = false
                }
            }
            return filtroPorData && filtroPorStatus
            
        })
        return eventos
    }
})

export const eventosAsync = selector({
    key: "eventosAsync",
    get: async ()=>{
        const respostaHttp = await axios.get("http://localhost:8080/eventos")
        const data: IEvento[] = respostaHttp.data
        return data.map(item=> ({...item, inicio: new Date(item.inicio), fim: new Date(item.fim)}))

    }
})