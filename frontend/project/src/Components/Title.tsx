interface TitleProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Title( {value,onChange}: TitleProps) {
  return (

        <div>
            <input className="w-[50vw] h-[13vh] text-3xl text-4x border-l-2 border-zinc-300"
                type="text"
                placeholder="Title"
                value={value}
                onChange={onChange}
            />
        </div>
        
    
  )
}

export default Title