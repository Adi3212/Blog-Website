interface ContentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Content({ value, onChange }: ContentProps) {
  return (
    <div>
      <textarea
        className="w-[50vw] h-[60vh] border-2 border-zinc-400 p-2"
        placeholder="Content"
        value={value}
        onChange={onChange}
        rows={40} 
      />
    </div>
  );
}

export default Content;
