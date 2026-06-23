export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout admin sans navbar publique ni smooth scroll
  return <>{children}</>;
}
