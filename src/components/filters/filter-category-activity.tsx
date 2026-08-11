export interface FilterCategoryActivityProps {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
  className?: string;
}

function FilterCategoryActivity({
  categories,
  value,
  onChange,
  className = "",
}: FilterCategoryActivityProps) {
  return (
    <div
      role="tablist"
      aria-label="หมวดกิจกรรม"
      className={`-mx-1 flex gap-2 overflow-x-auto px-1 py-1 scrollbar-none [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {categories.map((category) => {
        const isActive = category === value;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "border-ink-100 text-ink-600 hover:border-primary-200 hover:text-primary border bg-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default FilterCategoryActivity;
