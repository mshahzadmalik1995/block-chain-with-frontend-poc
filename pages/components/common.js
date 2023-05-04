import { useRouter } from "next/router";
import { useState } from "react";

export default function Common({title}){

    const [boxes, setBoxes] = useState(new Array(3).fill(false));
    const router = useRouter()

    const onSubmit = () => {
        alert("submit data")
    }

    const handleChange = (event, index) => {
        const _checked = [...boxes];
        _checked[index]= event.target.checked;
        setBoxes(_checked);
    }

    function isDisabled() {
        const count = boxes.filter(box => box).length;
       var value = count === 3;
        return !value;
    };
    return(
        <div className="p-5 flex flex-col gap-2">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="font-bold">Task Mission List</h1>
                </div>
                <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox"
                    value="" onChange={(event) => handleChange(event, 0)} className="w-4 h-4 text-blue-600
                    bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600
                        dark:ring-offset-gray-800 focus:ring-2
                        dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checked-checkbox" 
                    className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Task1 Completed</label>
                </div>
                <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox"
                    value="" onChange={(event) => handleChange(event, 1)}  className="w-4 h-4 text-blue-600
                    bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600
                        dark:ring-offset-gray-800 focus:ring-2
                        dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checked-checkbox" 
                    className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Task2 Completed</label>
                </div>
                <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox"
                    value="" onChange={(event) => handleChange(event, 2)}  className="w-4 h-4 text-blue-600
                    bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600
                        dark:ring-offset-gray-800 focus:ring-2
                        dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checked-checkbox" 
                    className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Task3 Completed</label>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="p-2 bg-sky-500 rounded-full w-23 disabled:bg-sky-100"
                 disabled={isDisabled()} onClick={onSubmit}>Completed</button>
                 <button className="p-2 bg-sky-500 rounded-full w-20 disabled:bg-sky-100"
                   onClick={() => router.back()}>Back</button>

            </div>
        </div>
    )
}