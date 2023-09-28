/* eslint-disable react/prop-types */

import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { formatDate, shortUppercaseId } from '../notfications/configUser';
// import imgUser from '../data/user.jpg';

const Head = 'text-xs text-left text-main font-semibold px-6 py-6 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';

const Rows = (data, i, onEditFunction, onDeleteFunction) => {
    return (
        <tr key={i}>
            <>
                <td className={`${Text} `}>{shortUppercaseId(data?._id)} </td>
                <td className={`${Text}`}>{formatDate(data?.updatedAt)} </td>
                <td className={`${Text}`}>{data?.name} </td>
                <td className={`${Text} flex-rows gap-2`}>
                    <button
                        onClick={() => onEditFunction(data)}
                        className="bg-dry border border-border  flex-rows gap-2 text-border rounded py-1 px-2"
                    >
                        Edit <FaEdit className="text-green-500" />
                    </button>
                    <button
                        onClick={() => onDeleteFunction(data?._id)}
                        className="bg-subMain text-white rounded flex-cols w-6 h-6 "
                    >
                        <MdDelete />
                    </button>
                </td>
            </>
        </tr>
    );
};

function TableCategory({ data, onEditFunction, onDeleteFunction }) {
    return (
        <div className="relative w-full overflow-x-scroll overflow-hidden">
            <table className="w-full table-auto border border-border divide-y divide-border">
                <thead>
                    <tr className="bg-dryGray">
                        <>
                            <th scope="col" className={`${Head} `}>
                                ID
                            </th>
                            <th scope="col" className={`${Head} `}>
                                Date
                            </th>
                            <th scope="col" className={`${Head}`}>
                                Name
                            </th>
                            <th scope="col" className={`${Head} text-center`}>
                                Action
                            </th>
                        </>
                    </tr>
                </thead>
                <tbody className="bg-main divide-y divide-gray-800">
                    {data.map((movie, i) => Rows(movie, i, onEditFunction, onDeleteFunction))}
                </tbody>
            </table>
        </div>
    );
}

export default TableCategory;
