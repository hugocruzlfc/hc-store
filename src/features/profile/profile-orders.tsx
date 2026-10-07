import { fetchUserOrders } from "@/features/orders/actions/order";
import { OrderParams } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

export default async function ProfileOrders() {
  const orders: OrderParams[] = await fetchUserOrders();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">My orders</h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {orders.length}
        </span>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-slate-500">No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                href={`/order/${o.id}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-slate-200">
                  <Image
                    src={o.image_url}
                    alt={o.product_name}
                    className="h-full w-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-slate-800">
                    {o.product_name}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {o.quantity_bought} • ${o.amount_paid}
                  </div>

                  <div className="mt-2">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium tracking-[0.12em] text-emerald-700 uppercase">
                      {o.status}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
