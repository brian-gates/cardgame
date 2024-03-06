import { CardProps, useCard } from ".";

export function Card({
  card,
  children,
  templateId,
}: CardProps & {
  children: React.ReactNode;
}) {
  const { title, play } = useCard({ card, templateId });

  return (
    <button className="w-36 h-56 bg-slate-100 text-slate-800 rounded-md border-2 cursor-pointer flex flex-col">
      <h4 className="text-lg font-bold text-center border-b w-full">{title}</h4>
      <div className="p-1 grow gap-1 flex flex-col">
        <div className="h-20 w-full bg-slate-300 self-center rounded-sm shadow-inner"></div>
        <p className="text-sm p-2 text-left shadow-inner rounded-sm h-fit border border-slate-300 grow">
          {children}
        </p>
      </div>
    </button>
  );
}
