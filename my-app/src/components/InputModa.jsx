import { useState } from "react";
import styles from "./LabelModal.module.css";

const initState = {
    htmlElem: "",
    xAxis: 0,
    yAxis: 0,
    fontSize: 0,
    fontWeight: 0
};

const InputModal = ({ handleShowModal, pushNewData }) => {
    const [state, setState] = useState(initState);

    const {xAxis, yAxis, fontSize, fontWeight} = state;

    const handleChange = (e) => {
        const {value, name} = e.target;

        setState((prev) => ({...prev, [name]: +value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(fontSize && fontWeight && fontSize>=0 && fontWeight>=0 && xAxis>=0 && yAxis>=0){
            const lsData = JSON.parse(localStorage.getItem("dragableDatas")) || [];
            const id = lsData.length ? lsData[lsData.length-1]?.id + 1 : 1;
            const payload = {...state, id, htmlElem: "input"};
            lsData.push(payload);
            localStorage.setItem("dragableDatas", JSON.stringify(lsData));
            setState(initState);
            pushNewData();
            handleShowModal("");
        }

    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.labelContainer}>
                <div className={styles.labelContainerHeader}>
                    <h2>Input</h2>
                    <button className={styles.btn} onClick={()=>handleShowModal("")}>X</button>
                </div>
                <div>
                    <form action="" className={styles.labelContainerBody} onSubmit={handleSubmit}>
                        {/* <div>
                            <label htmlFor="">Text</label>
                            <br />
                            <input type="text" />
                        </div> */}
                        <div>
                            <label htmlFor="">X</label>
                            <br />
                            <input type="number" name="xAxis" onChange={handleChange} value={xAxis} />
                        </div>
                        <div>
                            <label htmlFor="">Y</label>
                            <br />
                            <input type="number" name="yAxis" onChange={handleChange} value={yAxis} />
                        </div>
                        <div>
                            <label htmlFor="">Font Size</label>
                            <br />
                            <input type="number" name="fontSize" onChange={handleChange} value={fontSize} />
                        </div>
                        <div>
                            <label htmlFor="">Font Weight</label>
                            <br />
                            <input type="number" name="fontWeight" onChange={handleChange} value={fontWeight} />
                        </div>
                        <div>
                            <input type="submit" value="Submit" className={styles.submitBtn} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputModal;