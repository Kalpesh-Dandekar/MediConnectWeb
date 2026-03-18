"use client"

interface Props {
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

const InputField = ({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: Props) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full px-4 py-3 rounded-xl
        bg-white/5 border border-white/10
        text-white placeholder-gray-400

        focus:outline-none
        focus:border-orange-400
        focus:ring-1 focus:ring-orange-400

        transition
      "
    />
  )
}

export default InputField