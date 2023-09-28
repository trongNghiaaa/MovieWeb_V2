/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {  FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Head = 'text-xs text-left text-main font-semibold px-6 py-6 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';

const Rows = (movie, field, onDeleteHandle) => {
    return (
        <tr key={movie._id}>
            <td className={`${Text}`}>
                <div className="w-12 p-1bg-dry border border-border h-12 rounded overflow-hidden">
                    <img src={movie?.image} alt={movie?.name} className="h-full w-full object-cover " />
                </div>
            </td>
            <td className={`${Text} truncate`}>{movie?.name} </td>
            <td className={`${Text}`}>{movie?.category} </td>
            <td className={`${Text}`}>{movie?.language} </td>
            <td className={`${Text}`}>{movie?.year} </td>
            <td className={`${Text} text-center`}>{movie?.time} </td>
            <td className={`${Text}  flex-rows gap-2`}>
                {field === 'movielist' && (
                    <>
                        <Link
                            to={`/edit-movie/${movie?._id}`}
                            className="bg-dry border border-border  flex-rows gap-2 text-border rounded py-1 px-2"
                        >
                            Edit <FaEdit className="text-green-500" />
                        </Link>
                        <button
                            onClick={() => onDeleteHandle(movie?._id)}
                            className="bg-subMain text-white rounded flex-cols w-6 h-6 "
                        >
                            <MdDelete />
                        </button>
                    </>
                )}
                {field === 'dashboard' && <td className={`${Text} float-left`}>{movie?.rate} </td>}
            </td>
        </tr>
    );
};

function Table({ data, field, onDeleteHandle }) {
    return (
        <div className="relative w-full overflow-x-scroll overflow-hidden">
            <table className="w-full table-auto border border-border divide-y divide-border">
                <thead>
                    <tr className="bg-dryGray">
                        <th scope="col" className={`${Head}`}>
                            Image
                        </th>
                        <th scope="col" className={`${Head} `}>
                            Name
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Category
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Language
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Year
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Hours
                        </th>
                        {field === 'movielist' && (
                            <th scope="col" className={`${Head}`}>
                                Actions
                            </th>
                        )}
                        {field === 'dashboard' && (
                            <th scope="col" className={`${Head}`}>
                                Rates
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-main divide-y divide-gray-800">
                    {data.map((movie, i) => Rows(movie, field, onDeleteHandle))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
