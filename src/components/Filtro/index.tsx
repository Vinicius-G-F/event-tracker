import React, { useState } from 'react';
import style from './Filtro.module.scss';
import { useSetRecoilState } from 'recoil';
import { filtroDeEventosState } from '../../state/atom';
import IFiltroDeEventos from '../../interfaces/IFiltroDeEventos';

const Filtro: React.FC = () => {
  
  const [data, setData] = useState('')
  const [statusEvt, setStatusEvt] = useState('Ambos')
  const setFiltroDeEvento = useSetRecoilState(filtroDeEventosState)
  
  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const eventoParaFiltrar: IFiltroDeEventos = {status: statusEvt}
    if(data){
      eventoParaFiltrar.data = new Date(data);
    } else {
      eventoParaFiltrar.data = null;
    }
    setFiltroDeEvento(eventoParaFiltrar);
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar</h3>
    <label htmlFor="data">Data</label>
    <input 
      type="date" 
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)} 
      placeholder="Por data"
      value={data} />

    <label htmlFor="status-evt">Status</label>

    <select onChange={evento => setStatusEvt(evento.target.value)} value={statusEvt} name="status-evt">
      <option>Completo</option>
      <option>Incompleto</option>
      <option>Ambos</option>
    </select>
    <button className={style.botao}>
      Filtrar
    </button>

  </form>)
}

export default Filtro