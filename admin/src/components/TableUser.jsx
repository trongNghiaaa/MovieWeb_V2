/* eslint-disable react/prop-types */

import { MdDelete } from 'react-icons/md';
import imgUser from '../data/user.jpg';
import { formatDate, shortUppercaseId } from '../notfications/configUser';

const Head = 'text-xs text-left text-main font-semibold px-6 py-6 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';

const Rows = (data, i, onDeleteUser) => {
    return (
        <tr key={i}>
            <>
                <td className={`${Text}`}>
                    <div className="w-12 p-1bg-dry border border-border h-12 rounded overflow-hidden">
                        <img
                            src={data?.image ? data.image : imgUser}
                            alt={data?.fullName}
                            className="h-full w-full object-cover "
                        />
                    </div>
                </td>
                <td className={`${Text} `}>{shortUppercaseId(data?._id)} </td>
                <td className={`${Text}`}>{formatDate(data?.createdAt)} </td>
                <td className={`${Text}`}>{data?.fullName} </td>
                <td className={`${Text}`}>{data?.email} </td>
                <td className={`${Text}  flex-rows gap-2`}>
                    {data?.isAdmin || (
                        <button
                            onClick={() => onDeleteUser(data._id)}
                            className="bg-subMain text-white rounded flex-cols w-6 h-6 "
                        >
                            <MdDelete />
                        </button>
                    )}
                </td>
            </>
        </tr>
    );
};

function TableUser({ data, onDeleteUser }) {
    return (
        <div className="relative w-full overflow-x-scroll overflow-hidden">
            <table className="w-full table-auto border border-border divide-y divide-border">
                <thead>
                    <tr className="bg-dryGray">
                        <>
                            <th scope="col" className={`${Head}`}>
                                Image
                            </th>
                            <th scope="col" className={`${Head} `}>
                                ID
                            </th>
                            <th scope="col" className={`${Head} `}>
                                Date
                            </th>
                            <th scope="col" className={`${Head}`}>
                                Fullname
                            </th>
                            <th scope="col" className={`${Head}`}>
                                Email
                            </th>
                            <th scope="col" className={`${Head}`}>
                                Action
                            </th>
                        </>
                    </tr>
                </thead>
                <tbody className="bg-main divide-y divide-gray-800">{data.map((movie, i) => Rows(movie, i, onDeleteUser))}</tbody>
            </table>
        </div>
    );
}

export default TableUser;
