import { FormJob } from "../components/formJob/formJob";

export function EditJob(){
    return(
        <>
        <div 
        className='container md:w-2/3 flex flex-col items-center mx-auto mt-20 border rounded-lg bg-slate-100 shadow-md shadow-gray-300'>
            <FormJob title="Edit"/>
        </div>
        </>
    )
}