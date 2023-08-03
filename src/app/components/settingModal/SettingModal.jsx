"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../modal/Modal";
import Input from "../input/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../button/Button";

const SettingModal = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter();
  const [loading, setIsloading] = useState(false);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });
  const image = watch("image");
  const handleUpload = (result) => {
    setValue("image", result?.info?.secure_url, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    setIsloading(true);
    axios
      .post(`/api/setting`, { ...data, currentUser })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((err) => {
        toast.error("something went wrong");
        console.log(err);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="border-b border-gray-500">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-y-0">
            <Input
              placeholder={currentUser?.name}
              disabled={loading}
              title={"Name"}
              id={"name"}
              errors={errors}
              required
              register={register}
            />
          </div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Photo
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            <Image
              height={"48"}
              width={"48"}
              className=" rounded-full"
              src={image || currentUser?.image || "/image_placeholder.jpg"}
              alt="Avatar"
            />
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onUpload={handleUpload}
              uploadPreset="xgnron4a"
            >
              <Button disabled={loading} secondery={true} type={"button"}>
                Change
              </Button>
            </CldUploadButton>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={loading} onClick={onClose} secondery={true}>
              Cancel
            </Button>
            <Button type={"submit"} disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default SettingModal;
