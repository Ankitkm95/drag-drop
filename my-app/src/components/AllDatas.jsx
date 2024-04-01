import IndividualData from "./IndividualData";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

const AllDatas = ({datas}) => {
    console.log(datas);
    return (
        <SortableContext items={datas} strategy={verticalListSortingStrategy}>
        <div>{
                datas?.map(el => <IndividualData key={el.id} {...el} />)
            }
        </div>
        </SortableContext>
    );
};

export default AllDatas;