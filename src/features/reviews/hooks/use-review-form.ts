import { reviewImagesSchema, reviewSchema } from "@/lib/schema-validations";
import { OrderParams } from "@/shared/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { createReview, uploadImagesToSupabase } from "../actions/review";

export type ReviewFormValues = {
  reviewTitle: string;
  reviewDescription: string;
  productRating: number;
  deliveryRating: number;
  reviewImages: File[];
};

export function useReviewForm(order: OrderParams) {
  const router = useRouter();

  const form = useForm<ReviewFormValues>({
    defaultValues: {
      reviewTitle: "",
      reviewDescription: "",
      productRating: 5,
      deliveryRating: 5,
      reviewImages: [],
    },
    mode: "onSubmit",
  });

  const reviewTitle = useWatch({
    control: form.control,
    name: "reviewTitle",
    defaultValue: "",
  });
  const reviewDescription = useWatch({
    control: form.control,
    name: "reviewDescription",
    defaultValue: "",
  });
  const productRating = useWatch({
    control: form.control,
    name: "productRating",
    defaultValue: 5,
  });
  const deliveryRating = useWatch({
    control: form.control,
    name: "deliveryRating",
    defaultValue: 5,
  });
  const reviewImages = useWatch({
    control: form.control,
    name: "reviewImages",
    defaultValue: [] as File[],
  });

  const previewUrls = useMemo(
    () => reviewImages.map((file) => URL.createObjectURL(file)),
    [reviewImages],
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    form.clearErrors("reviewImages");
    form.setValue("reviewImages", files, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    event.target.value = "";
  };

  const onSubmit = async (values: ReviewFormValues) => {
    const reviewFormValidation = reviewSchema.safeParse({
      reviewTitle: values.reviewTitle,
      reviewDescription: values.reviewDescription,
    });

    if (!reviewFormValidation.success) {
      reviewFormValidation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (fieldName === "reviewTitle" || fieldName === "reviewDescription") {
          form.setError(fieldName, {
            type: "manual",
            message: issue.message,
          });
        }
      });

      toast.error("Please fix the errors");
      return;
    }

    const reviewImagesValidation = reviewImagesSchema.safeParse({
      reviewImages: values.reviewImages,
    });

    if (!reviewImagesValidation.success) {
      reviewImagesValidation.error.issues.forEach((issue) => {
        form.setError("reviewImages", {
          type: "manual",
          message: issue.message,
        });
      });

      toast.error("Please fix the errors");
      return;
    }

    try {
      const imageReviewsFormData = new FormData();

      values.reviewImages.forEach((file) => {
        imageReviewsFormData.append("reviewImages", file);
      });

      const imageUrlsInSupabase =
        await uploadImagesToSupabase(imageReviewsFormData);

      if (!imageUrlsInSupabase.success) {
        toast.error("Failed to upload review images. Please try again.");
        return;
      }

      const { reviewData } = await createReview({
        orderToReview: order,
        reviewData: {
          reviewTitle: values.reviewTitle.trim(),
          reviewDescription: values.reviewDescription.trim(),
          productRating: values.productRating,
          deliveryRating: values.deliveryRating,
          reviewImageUrls: imageUrlsInSupabase.imageUrls ?? [],
        },
      });

      if (reviewData) {
        toast.success("Review created successfully!");
        router.push("/");
        return;
      }

      toast.error("Failed to create review. Please try again.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the review.");
    } finally {
      form.reset({
        reviewTitle: "",
        reviewDescription: "",
        productRating: 5,
        deliveryRating: 5,
        reviewImages: [],
      });
    }
  };

  return {
    form,
    reviewTitle,
    reviewDescription,
    productRating,
    deliveryRating,
    reviewImages,
    previewUrls,
    handleImageChange,
    onSubmit,
  };
}
