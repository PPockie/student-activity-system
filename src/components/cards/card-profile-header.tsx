export interface CardProfileHeaderProps {
  name: string;
  /** ตัวย่อในวงกลม — ไม่ส่งมาจะตัดจากชื่อให้ */
  initial?: string;
  /** บรรทัดข้อมูลใต้ชื่อ แต่ละบรรทัดคั่นแต่ละชิ้นด้วย " · " ให้เอง */
  details?: (string | undefined)[][];
  className?: string;
}

/** หัวโปรไฟล์: วงกลมตัวย่อ + ชื่อ + บรรทัดข้อมูลย่อย */
function CardProfileHeader({
  name,
  initial,
  details = [],
  className = "",
}: CardProfileHeaderProps) {
  const avatarText = initial ?? name.trim().charAt(0);

  return (
    <section
      className={`border-ink-100 flex items-center gap-4 rounded-2xl border bg-white p-5 ${className}`}
    >
      <span className="bg-primary-100 text-primary-700 flex size-16 shrink-0 items-center justify-center rounded-full text-xl font-semibold">
        {avatarText}
      </span>

      <div className="min-w-0 flex-1">
        <h1 className="text-ink-900 truncate text-xl font-bold">{name}</h1>

        {details.map((line) => {
          const text = line.filter(Boolean).join(" · ");
          if (!text) return null;

          return (
            <p key={text} className="text-ink-400 mt-1 truncate text-xs">
              {text}
            </p>
          );
        })}
      </div>
    </section>
  );
}

export default CardProfileHeader;
