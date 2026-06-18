import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.eventLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <div>
      <h1 className="text-4xl font-black">Event log</h1>
      <div className="mt-8 overflow-hidden rounded-md border border-[var(--line)]">
        <table className="w-full border-collapse bg-white text-sm">
          <thead className="bg-[var(--background)] text-left">
            <tr>
              <th className="p-4">Type</th>
              <th className="p-4">Entity</th>
              <th className="p-4">Source</th>
              <th className="p-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr className="border-t border-[var(--line)]" key={event.id}>
                <td className="p-4 font-bold">{event.eventType}</td>
                <td className="p-4">
                  {event.entityType}:{event.entityId}
                </td>
                <td className="p-4">{event.source}</td>
                <td className="p-4">{event.createdAt.toISOString()}</td>
              </tr>
            ))}
            {events.length === 0 ? (
              <tr>
                <td className="p-4 text-[var(--muted)]" colSpan={4}>
                  No events yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
