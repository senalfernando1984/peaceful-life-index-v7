export default async function AdminUserPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return (
    <div className="card p-8">
      <h1 className="text-3xl font-semibold">Admin user review: {userId}</h1>
      <p className="mt-3 text-pli-slate">Starter placeholder.</p>
    </div>
  );
}
