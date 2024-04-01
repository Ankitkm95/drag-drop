import { useState } from 'react';
import './App.css';
import LabelModal from './components/LabelModal';
import InputModal from './components/InputModa';
import ButtonModal from './components/ButtonModa';

import {DndContext, closestCorners} from "@dnd-kit/core";
import AllDatas from './components/AllDatas';
import { arrayMove } from '@dnd-kit/sortable';

const initModal = {
  LabelModal: "lab",
  InputModal: "inp",
  ButtonModal: "btn",
  default: ""
};

// const initDatas = [
//   {
//     id: 1,
//     text: "label-1",
//     xAxis: 0,
//     yAxis: 0,
//     fontSize: 12,
//     fontWeight: 10
//   },
//   {
//     id:2,
//     text: "label-2",
//     xAxis: 0,
//     yAxis: 0,
//     fontSize: 12,
//     fontWeight: 10
//   }
// ];



function App() {
  // const [showSideBar, setShowSideBar] = useState(false);
  const [datas, setDatas] = useState(()=>{
    const lsDatas = JSON.parse(localStorage.getItem("dragableDatas"));
    return lsDatas || [];
  });
  
  const [showModal, setShowModal] = useState(initModal.default);

  const handleShowModal = (val) => {
      setShowModal(val);
  };
  console.log(datas);

  const getDataPos = id => datas.findIndex(data=> data.id === id);

  const handleDragEnd = event => {
    const {active, over} = event

    if(active.id === over.id) return;

    setDatas(datas => {
      const originalPos = getDataPos(active.id);
      const newPos = getDataPos(over.id);

      return arrayMove(datas, originalPos, newPos);
    })
  };

  const pushNewData = () => {
    const lsDataAfterNewDataAdded = JSON.parse(localStorage.getItem("dragableDatas")) || [];

    setDatas(lsDataAfterNewDataAdded);
  };

  return (
    <div className={showModal ? "AppAfterModal" : "App"}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className='wrapper'>
        <div className='main'>
          {
            showModal === initModal.LabelModal ? <LabelModal handleShowModal={handleShowModal} pushNewData={pushNewData} /> : showModal === initModal.InputModal ? <InputModal handleShowModal={handleShowModal} pushNewData={pushNewData} /> : showModal === initModal.ButtonModal ? <ButtonModal handleShowModal={handleShowModal} pushNewData={pushNewData} /> : <></> 
          }
          <AllDatas datas={datas} />
        </div>
        <div className='sidebar'>
          <div>
            <button className='appBtn' onClick={()=> handleShowModal(initModal.LabelModal)}>Label</button>
          </div>
          <div>
            <button className='appBtn' onClick={()=> handleShowModal(initModal.InputModal)}>Input</button>
          </div>
          <div>
            <button className='appBtn' onClick={()=> handleShowModal(initModal.ButtonModal)}>Button</button>
          </div>
        </div>
        
      </div>
      </DndContext>
    </div>
  );
}

export default App;
