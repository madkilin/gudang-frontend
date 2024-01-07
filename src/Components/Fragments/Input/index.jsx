import React from 'react'

export const Input = ({type, label, placeholder, onChange}) => {
  return (
    <div>
        <label for=""
            class="text-lg font-medium text-gray-700 dark:text-gray-400">{label}</label>
        <input type={type}
            class="w-full px-4 py-3 mt-3 bg-gray-200 rounded-lg dark:text-gray-400 dark:bg-gray-800 "
            name="" placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}
