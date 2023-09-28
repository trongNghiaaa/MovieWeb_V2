/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
// import { categories } from '../Data/genreList';
import { CgSelect } from 'react-icons/cg';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';
import { LanguageData, RatesData, TimeData, YearData } from '../Data/filterData';

function Filters(props) {
    const { categories, category, setCategory, languages, setLanguages, years, setYears, times, setTimes, rates, setRates } =
        props.datas;

    const Filter = [
        {
            value: category,
            onChange: setCategory,
            items: categories?.length > 0 ? [{ title: 'All Categories' }, ...categories] : [{ title: 'No Category found' }],
        },
        {
            value: years,
            onChange: setYears,
            items: YearData,
        },
        {
            value: times,
            onChange: setTimes,
            items: TimeData,
        },
        {
            value: rates,
            onChange: setRates,
            items: RatesData,
        },
        {
            value: languages,
            onChange: setLanguages,
            items: LanguageData,
        },
    ];

    return (
        <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded py-6">
            {Filter?.map((item, i) => (
                <Listbox key={i} value={item.value} onChange={item.onChange}>
                    <div className="relative">
                        <Listbox.Button className="relative border border-gray-800 bg-main  w-full  text-white rounded-lg py-4 pl-6 pr-10 text-left text-xs  ">
                            <span className="block truncate">{item.value.title || item.value.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <CgSelect className="h-5 w-5 " aria-hidden="true" />
                            </span>
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveTo="opacity-0">
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white  border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {item.items.map((el, i) => (
                                    <Listbox.Option
                                        key={i}
                                        className={({ isActive }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                isActive ? 'bg-subMain text-white' : 'text-main'
                                            }`
                                        }
                                        value={el || el.name}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-semibold ' : 'font-normal'}`}>
                                                    {el.title || el.name}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                                                        <FaCheck className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            ))}
        </div>
    );
}

export default Filters;
