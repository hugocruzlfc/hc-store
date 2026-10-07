import {
  fetchReviewsByUserId,
  ReviewRecord,
} from "@/features/reviews/actions/review";

export default async function ProfileReviews() {
  const reviews: ReviewRecord[] = await fetchReviewsByUserId();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">My reviews</h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {reviews.length}
        </span>
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm text-slate-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r: ReviewRecord) => (
            <li
              key={r.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="text-sm font-medium text-slate-800">
                {r.review_title}
              </div>
              <div className="mt-1 text-sm text-slate-600">
                {r.product_name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
