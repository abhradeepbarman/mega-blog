import { useId, forwardRef } from 'react'

// eslint-disable-next-line react/prop-types
const Select = ({ options, label, className="", ...props }, ref) => {
    const id = useId()
  return (
    <div className='w-full'>
        {
            label && <label htmlFor={id} className=''>{label}</label>
        }

        <select {...props} id={id} ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {
                options?.map((option, index) => (
                    <option key={index} value={index} className='py-11'>
                        {option}
                    </option>
                ))
            }
        </select>
    </div>
  )
}

export default forwardRef(Select)
