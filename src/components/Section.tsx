export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
      {children}
    </section>
  );
}
