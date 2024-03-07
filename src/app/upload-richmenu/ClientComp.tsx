"use client";

import ImageInput from "@/components/ImageInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  RichMenuBodyType,
  uploadRichMenuImage,
  createRichMenu,
  createRichMenuAlias,
  setDefaultRichMenu,
} from "@/lib/rich-menu-api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  isDefault: z.boolean(),
  jsonBodyKey: z.string(),
});

type Schema = z.infer<typeof schema>;

interface Props {
  channelToken: string;
  jsonBodyMap: {
    [key: string]: RichMenuBodyType;
  };
}

const ClientComp = ({ channelToken, jsonBodyMap }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageErrorMessages, setImageErrorMessages] = useState<string | null>(
    null
  );
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      isDefault: false,
    },
  });

  const onSubmit = (values: Schema) => {
    if (!image) {
      setImageErrorMessages("Image is required");
      return;
    }
    if (image.size > 1024 * 1024 * 1) {
      setImageErrorMessages("Image size must be less than 1MB");
      return;
    }
    const data = jsonBodyMap[values.jsonBodyKey];
    // const fileName = image.name.split(".")[0];
    const fileName = data.name;
    mutate({
      channelToken,
      data,
      fileName,
      image,
      isDefault: values.isDefault,
    });
  };

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["uploadRichMenu"],
    mutationFn: uploadRichMenu,
    retry: false,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload rich menu",
        className: "text-red-500 font-semibold",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Rich menu uploaded successfully",
        className: "text-green-500 font-semibold",
      });
    },
  });

  const handleRefreshPage = () => {
    // router.refresh();
    location.reload();
  };

  return (
    <div data-test="upload-richmenu-parent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-6">
            <ImageInput
              inputId="image"
              setImage={(img) => {
                setImage(img);
                setImageErrorMessages(null);
              }}
              disabled={false}
            >
              <p className="pb-5 flex gap-x-1 items-center">
                <label htmlFor="image">Rich Menu Image</label>
              </p>
            </ImageInput>
            {imageErrorMessages ? (
              <p className="text-red-500">{imageErrorMessages}</p>
            ) : null}
            {image ? (
              <div className="text-sm text-gray-600 mx-auto">
                <p>Image size: {(image.size / 1024 / 1024).toFixed(1)} MB</p>
                <p>Image name: {image.name}</p>
              </div>
            ) : null}
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Default Rich Menu ?</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jsonBodyKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Rich Menu JSON</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Json Body" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Json body</SelectLabel>
                        {Object.keys(jsonBodyMap).map((key) => (
                          <SelectItem value={key} key={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  {form.getValues("jsonBodyKey") ? (
                    <div className="border rounded-lg p-4">
                      <p className="text-gray-600">Preview JSON Body</p>
                      <RichMenuBodyPreview
                        jsonBody={jsonBodyMap[form.getValues("jsonBodyKey")]}
                      />
                    </div>
                  ) : null}
                </FormItem>
              )}
            />
            <Button
              data-test="upload-richmenu-button"
              disabled={isPending || isSuccess}
            >
              Upload
            </Button>
          </div>
        </form>
      </Form>
      {isSuccess && (
        <div className="mt-4">
          <p className="text-green-500 font-semibold">
            Rich menu uploaded successfully
          </p>
          <Button className="w-full" onClick={handleRefreshPage}>
            Upload another Richmenu
          </Button>
        </div>
      )}
      {isError && (
        <p className="text-red-500 font-semibold">Failed to upload rich menu</p>
      )}
    </div>
  );
};

export default ClientComp;

const RichMenuBodyPreview = ({
  jsonBody,
}: {
  jsonBody: RichMenuBodyType | null;
}) => {
  if (!jsonBody) return <div></div>;
  return (
    <div className="text-sm overflow-y-scroll h-40">
      <pre>{JSON.stringify(jsonBody, null, 2)}</pre>
    </div>
  );
};

const uploadRichMenu = async ({
  channelToken,
  data,
  image,
  isDefault,
  fileName,
}: {
  channelToken: string;
  data: RichMenuBodyType;
  image: File;
  isDefault: boolean;
  fileName: string;
}) => {
  try {
    //Create rich menu
    const richMenuId = await createRichMenu({ channelToken, data });
    if (!richMenuId) throw new Error("Failed to create rich menu");
    console.log("richMenuId", richMenuId);
    await uploadRichMenuImage({ channelToken, image, richMenuId });
    await createRichMenuAlias({ channelToken, fileName, richMenuId });
    // //Set default rich menu
    if (isDefault) {
      await setDefaultRichMenu({ channelToken, richMenuId });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
