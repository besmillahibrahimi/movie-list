"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/input-field";
import { PhotoUpload } from "@/components/photo-upload";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { type FC, useEffect } from "react";
import { MovieFormSchema } from "../_data/create-movie";
import { Genres } from "../_data/genres.data";

type Props = {
  movie?: Tables<"movies">;
  backUrl?: string;
  onSubmit?: (values: Tables<"movies">) => void;
};

export const MovieForm: FC<Props> = ({ movie, backUrl, onSubmit = () => null }) => {
  const router = useRouter();

  const form = useForm<Tables<"movies">>({
    resolver: zodResolver(MovieFormSchema),
    defaultValues: movie ?? {
      title: "",
      year: 0,
      genres: [],
      is_for_children: false,
      summary: "",
      rating: 0,
    },
  });

  useEffect(() => {
    if (movie) {
      form.reset(movie);
    }
  }, [movie, form]);

  return (
    <div className="flex flex-col space-y-5 md:space-y-20">
      <div className="flex items-center gap-x-3">
        {backUrl ? (
          <Link href={backUrl} target="_self">
            <ArrowLeft />
          </Link>
        ) : (
          <button type="button" onClick={() => router.back()}>
            <ArrowLeft />
          </button>
        )}
        <h1 className="text-3xl font-bold text-white">
          {movie ? `Edit movie {${form.watch("title")}}` : "Create a new new movie"}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, console.error)} className="space-y-8 ">
          <div className="grid grid-cols-1 gap-5 md:gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <PhotoUpload />
            </div>

            <div className="h-max grid grid-cols-1 md:grid-cols-5 space-y-4 md:col-span-2">
              <InputField
                className="md:col-span-5"
                control={form.control}
                type="input"
                name="title"
                inputProps={{ placeholder: "Title" }}
              />

              <InputField
                className="md:col-span-3"
                control={form.control}
                name="year"
                type="input"
                inputProps={{ placeholder: "Publishing year", type: "number" }}
              />

              <InputField
                className="md:col-span-5"
                name="genres"
                control={form.control}
                type="b-select"
                selectProps={{
                  options: Genres,
                  multiple: true,
                  placeholder: "Genres",
                }}
              />
              <InputField
                className="md:col-span-4"
                name="rating"
                control={form.control}
                type="b-select"
                selectProps={{
                  options: [1, 2, 3, 4, 5],
                  placeholder: "Rating",
                }}
              />

              <InputField
                className="md:col-span-5"
                name="is_for_children"
                control={form.control}
                type="checkbox"
                render={(field) => (
                  <div className="flex items-center gap-x-2">
                    <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                    <Label>Is for children?</Label>
                  </div>
                )}
              />

              <div className="md:col-span-5 flex space-x-4 md:pt-8">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-600 bg-transparent text-white hover:bg-gray-800 hover:text-white"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 ">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
