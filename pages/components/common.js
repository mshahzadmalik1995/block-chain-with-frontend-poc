export default function Common(){
    const onSubmit = () => {
        alert("submit data")
    }
    return(
        <div className="p-5 flex flex-col gap-1">
            <div class="flex items-center">
                <input id="default-checkbox" type="checkbox"
                value="" className="w-4 h-4 text-blue-600
                bg-gray-100 border-gray-300 rounded
                focus:ring-blue-500 dark:focus:ring-blue-600
                    dark:ring-offset-gray-800 focus:ring-2
                    dark:bg-gray-700 dark:border-gray-600"/>
                <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">CheckedBox1</label>
            </div>
            <div class="flex items-center">
                <input id="default-checkbox" type="checkbox"
                value="" className="w-4 h-4 text-blue-600
                bg-gray-100 border-gray-300 rounded
                focus:ring-blue-500 dark:focus:ring-blue-600
                    dark:ring-offset-gray-800 focus:ring-2
                    dark:bg-gray-700 dark:border-gray-600"/>
                <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">CheckedBox2</label>
            </div>
            <div class="flex items-center">
                <input id="default-checkbox" type="checkbox"
                value="" className="w-4 h-4 text-blue-600
                bg-gray-100 border-gray-300 rounded
                focus:ring-blue-500 dark:focus:ring-blue-600
                    dark:ring-offset-gray-800 focus:ring-2
                    dark:bg-gray-700 dark:border-gray-600"/>
                <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">CheckedBox3</label>
            </div>
            <button className="p-2 bg-sky-500 rounded-full w-20" onClick={onSubmit}>Click</button>
        </div>
    )
}