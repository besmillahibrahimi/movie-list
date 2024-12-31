"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/input-field";
import { PhotoUpload } from "@/components/photo-upload";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FC, useEffect } from "react";
import { MovieFormSchema } from "../_data/create-movie";
import { Genres } from "../_data/genres.data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";

type Props = {
  movie?: IMovie | null;
  backUrl?: string;
  onSubmit?: (values: IMovie) => void;
};

export const MovieForm: FC<Props> = ({ movie, backUrl, onSubmit = () => null }) => {
  const router = useRouter();

  const form = useForm<IMovie>({
    resolver: zodResolver(MovieFormSchema),
    defaultValues: movie ?? {
      title: "",
      year: 0,
    },
  });

  useEffect(() => {
    if (movie) {
      form.reset(movie);
    }
  }, [movie]);

  return (
    <div className="flex flex-col space-y-5 md:space-y-20">
      <div className="flex items-center gap-x-3">
        {backUrl ? (
          <Link href={backUrl}>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
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
                type="select"
                options={Genres}
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
                <SubmitButton className="flex-1 bg-green-500 text-white hover:bg-green-600">Submit</SubmitButton>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
