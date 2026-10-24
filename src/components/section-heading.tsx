export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const isDark = theme === "dark";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.25em] ${
            isDark ? "text-gold-300" : "text-gold-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl ${
          isDark ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-base leading-relaxed ${isDark ? "text-navy-100" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
