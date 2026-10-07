import ProfileAddresses from "@/features/profile/profile-addresses";
import ProfileHeader from "@/features/profile/profile-header";
import ProfileOrders from "@/features/profile/profile-orders";
import ProfileReviews from "@/features/profile/profile-reviews";
import { getCachedUser } from "@/lib/supabase/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getCachedUser();

  if (!user) {
    return {
      title: "Profile",
      description: "User profile page",
    };
  }

  return {
    title: `Profile for ${user.email}`,
    description: `User profile page for ${user.email}`,
  };
}

export default async function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
      <div className="space-y-6">
        <ProfileHeader />

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <ProfileOrders />

          <div className="space-y-6">
            <ProfileAddresses />
            <ProfileReviews />
          </div>
        </div>
      </div>
    </main>
  );
}
