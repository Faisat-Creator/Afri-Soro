interface Props {
  icon: string;
  name: string;
  earned?: boolean;
}

export default function Badge({ icon, name, earned = false }: Props) {
  return (
    <div
      title={name}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition
        ${earned
          ? "bg-brand-gold border-brand-orange shadow"
          : "bg-gray-100 border-gray-200 opacity-40 grayscale"
        }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium text-center leading-tight">{name}</span>
    </div>
  );
}
