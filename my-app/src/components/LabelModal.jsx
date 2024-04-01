import { useState } from "react";
import styles from "./LabelModal.module.css";
/*
id: 1,
    text: "label-1",
    xAxis: 0,
    yAxis: 0,
    fontSize: 12,
    fontWeight: 10
*/

const initState = {
    text: "This is a label",
    xAxis: 0,
    yAxis: 0,
    fontSize: 0,
    fontWeight: 0
};

const LabelModal = ({ handleShowModal, pushNewData}) => {
    const [formData, setFormData] = useState(initState);

    const {text, xAxis, yAxis, fontSize, fontWeight} = formData;

    const handleChange = (e) => {
        const {name, value, type} = e.target;
        setFormData(prev => ({...prev, [name]: type === "number" ? Number(value): value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(text && fontSize && fontWeight && fontSize>=0 && fontWeight>=0 && xAxis>=0 && yAxis>=0){
            const lsData = JSON.parse(localStorage.getItem("dragableDatas")) || [];
            const id = lsData.length ? lsData[lsData.length-1]?.id + 1 : 1;
            const payload = {...formData, id};
            lsData.push(payload);
            localStorage.setItem("dragableDatas", JSON.stringify(lsData));
            setFormData(initState);
            pushNewData();
            handleShowModal("");
        }
    };


    return (
        <div className={styles.mainContainer}>
            <div className={styles.labelContainer}>
                <div className={styles.labelContainerHeader}>
                    <h2>Edit Label</h2>
                    <button className={styles.btn} onClick={()=>handleShowModal("")}>X</button>
                </div>
                <div className={styles.labelContainerBody}>
                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="">Text</label>
                            <br />
                            <input type="text" name="text" onChange={handleChange} value={text} />
                        </div>
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
                            <input type="submit" value="Save Changes" className={styles.submitBtn} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LabelModal;