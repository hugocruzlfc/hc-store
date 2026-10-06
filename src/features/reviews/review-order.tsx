"use client";

import { env } from "@/lib/env/client";
import { reviewImagesSchema, reviewSchema } from "@/lib/schema-validations";
import { OrderParams } from "@/shared/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { createReview, uploadImagesToSupabase } from "./actions/review";
import StarRating from "./star-rating";

interface ReviewOrderProps {
  order: OrderParams;
}

export default function ReviewOrder({ order }: ReviewOrderProps) {
  const [reviewImageFiles, setReviewImageFiles] = useState<
    (File | undefined)[]
  >([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [productRating, setProductRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<Array<Record<string, string>>>(
    [],
  );
  const [imagesError, setImagesError] = useState<string[]>([]);

  const colorDisabled =
    !reviewTitle || !reviewDescription || reviewImageFiles.length <= 0;

  const handleSubmitReview = async () => {
    let localError = false;
    const reviewFormValidation = reviewSchema.safeParse({
      reviewTitle,
      reviewDescription,
    });

    const reviewImagesValidation = reviewImagesSchema.safeParse({
      reviewImages: reviewImageFiles,
    });

    const reviewResult = reviewFormValidation.error?.issues.map((each) => {
      return { [each.path[0]]: each.message };
    });

    if (reviewResult) {
      localError = true;
      setFormErrors(reviewResult);
    }

    if (reviewImagesValidation.error?.issues) {
      localError = true;
      setImagesError(
        reviewImagesValidation.error.issues.map((each) => each.message),
      );
    }

    if (localError) {
      toast.error("Please fix the errors");
      return;
    }

    try {
      const imageReviewsFormData = new FormData();
      reviewImageFiles.forEach((file) => {
        if (file) {
          imageReviewsFormData.append("reviewImages", file);
        }
      });
      const imageUrlsInSupabase =
        await uploadImagesToSupabase(imageReviewsFormData);

      if (imageUrlsInSupabase.success) {
        const { reviewData } = await createReview({
          orderToReview: order,
          reviewData: {
            reviewTitle,
            reviewDescription,
            productRating,
            deliveryRating,
            reviewImageUrls: imageUrlsInSupabase.imageUrls || [],
          },
        });
        if (reviewData) {
          toast.success("Review created successfully!");
          router.push("/");
        } else {
          toast.error("Failed to create review. Please try again.");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setReviewTitle("");
      setReviewDescription("");
      setProductRating(5);
      setDeliveryRating(5);
      setReviewImageFiles([]);
    }
  };
  return (
    <>
      <div className="space-y-10 px-6 pt-14 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="mb-4 overflow-hidden rounded-lg bg-gray-500/10">
              <Image
                src={order.image_url}
                alt="alt"
                className="h-auto w-full object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="mb-4 text-3xl font-medium text-gray-800/90">
              {order.product_name}
            </h1>
            <p className="mt-6 text-3xl font-medium">
              {env.NEXT_PUBLIC_CURRENCY} {order.amount_paid}
            </p>
            <hr className="my-6 bg-gray-600" />
            <div className="overflow-x-auto">
              <table className="w-full max-w-72 table-auto border-collapse">
                <tbody>
                  <tr>
                    <td className="font-medium text-gray-600">Region</td>
                    <td className="text-gray-800/50">{order.region}</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-600">State</td>
                    <td className="text-gray-800/50">{order.state}</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-600">City</td>
                    <td className="text-gray-800/50">{order.city}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* adding the review */}
      <div className="flex min-h-screen flex-1 flex-col items-center justify-between">
        <div className="max-w-lg space-y-5 p-4 md:p-10">
          {/* image upload code begin */}
          <div>
            <label
              htmlFor="imageFiles"
              className="mx-auto mt-2 flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 bg-[#043033] p-5 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>

              <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                Upload Review Images
              </h2>

              <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                Upload or drag & drop your file SVG, PNG, JPG or GIF.{" "}
              </p>

              <input
                onChange={(e) => {
                  setImagesError([]);
                  setReviewImageFiles(
                    e.target.files ? Array.from(e.target.files) : [],
                  );
                }}
                id="imageFiles"
                type="file"
                className="hidden"
                multiple
                accept="image/*"
              />
            </label>

            <div className="flex flex-row flex-wrap">
              {reviewImageFiles &&
                reviewImageFiles.map((eachFile, index) =>
                  eachFile ? (
                    <Image
                      key={index}
                      className="m-1 max-w-32 cursor-pointer"
                      src={URL.createObjectURL(eachFile)}
                      alt=""
                      width={100}
                      height={100}
                    />
                  ) : null,
                )}
            </div>

            {imagesError &&
              imagesError.map((each, index) => (
                <p key={index} className="block text-sm text-red-400">
                  {each}
                </p>
              ))}
          </div>

          {/* end image upload */}
          <div className="flex max-w-md flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-name">
              Review Title
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Type here"
              className="rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
              onChange={(e) => {
                setFormErrors([]);
                setReviewTitle(e.target.value);
              }}
              value={reviewTitle}
              required
            />

            {formErrors &&
              formErrors.map((each, index) => {
                if (each.reviewTitle) {
                  return (
                    <p key={index} className="block text-sm text-red-400">
                      {each.reviewTitle}
                    </p>
                  );
                }
              })}
          </div>
          <div className="flex max-w-md flex-col gap-1">
            <label
              className="text-base font-medium"
              htmlFor="product-description"
            >
              Review Description
            </label>
            <textarea
              id="product-description"
              rows={4}
              className="resize-none rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
              placeholder="Type here"
              onChange={(e) => {
                setFormErrors([]);
                setReviewDescription(e.target.value);
              }}
              value={reviewDescription}
              required
            ></textarea>
            {formErrors &&
              formErrors.map((each, index) => {
                if (each.reviewDescription) {
                  return (
                    <p key={index} className="block text-sm text-red-400">
                      {each.reviewDescription}
                    </p>
                  );
                }
              })}
          </div>

          <div className="flex max-w-md flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-name">
              Product Rating
            </label>
            <StarRating rating={productRating} setRating={setProductRating} />
          </div>

          <div className="flex max-w-md flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-name">
              Delivery Rating
            </label>
            <StarRating rating={deliveryRating} setRating={setDeliveryRating} />
          </div>

          <button
            onClick={handleSubmitReview}
            type="submit"
            className={`rounded px-8 py-2.5 font-medium text-white ${
              colorDisabled ? "bg-gray-500" : "bg-[#043033]"
            }`}
          >
            Submit Review
          </button>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
