import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const IndividualData = ({ id,text,
xAxis,
yAxis,
fontSize,
fontWeight, htmlElem}) => {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };
    return (
        <div 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        >
            <div>
            {text ? <p>{text}</p> : htmlElem === "input" ? <input placeholder="input" style={{width:"20%"}} /> : htmlElem === "button" ? <button style={{background:"#2b619e", padding:"8px 12px", color:"white", borderRadius:"7px", cursor:"pointer"}}>Button</button> : null}
            </div>
        </div>
    );
};

export default IndividualData;