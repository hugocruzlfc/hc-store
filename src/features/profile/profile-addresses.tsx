import { fetchAddresses } from "@/features/address/actions/address";
import { AddressParams } from "@/shared/types";

export default async function ProfileAddresses() {
  const addresses = await fetchAddresses();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">Addresses</h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {addresses.length}
        </span>
      </div>

      {addresses.length === 0 ? (
        <p className="text-sm text-slate-500">No saved addresses.</p>
      ) : (
        <ul className="space-y-3">
          {addresses.map((a: AddressParams) => (
            <li
              key={a.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="text-sm font-medium text-slate-800">
                {a.title}
              </div>
              <div className="mt-1 text-sm text-slate-600">{a.address}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
