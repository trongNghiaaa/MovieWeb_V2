/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { GoEye } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Head = 'text-xs text-left text-main font-semibold px-6 py-6 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';

const Rows = (movie, i) => {
    return (
        <tr key={i}>
            <td className={`${Text}`}>
                <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                    <img src={movie?.image} alt={movie?.name} className="h-full w-full object-cover " />
                </div>
            </td>
            <td className={`${Text} truncate`}>{movie?.name} </td>
            <td className={`${Text}`}>{movie?.category} </td>
            <td className={`${Text}`}>{movie?.language} </td>
            <td className={`${Text}`}>{movie?.year} </td>
            <td className={`${Text} `}>{movie?.time} </td>
            <td className={`${Text}`}>
                <Link to={`/movies/watch/${movie?._id}`} className="bg-subMain text-white rounded flex-rows w-6 h-6 ">
                    <GoEye />
                </Link>
            </td>
        </tr>
    );
};

function Table({ data }) {
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
                        <th scope="col" className={`${Head}`}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-main divide-y divide-gray-800">{data.map((movie, i) => Rows(movie, i))}</tbody>
            </table>
        </div>
    );
}

export default Table;
