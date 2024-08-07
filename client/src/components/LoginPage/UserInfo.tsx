import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/authApi";
import { IUserInfo } from "atoms/User.type";
import DoneButton from "buttons/DoneButton";
import ProfileCameraIcon from "icons/ProfileCameraIcon";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import InfoInput from "./InfoInput";
import InfoSelect from "./InfoSelect";
import { sendUserInfoState } from "atoms/UserAtoms";
import { useSetRecoilState } from "recoil";


interface UserForm {
  name: string;
  gender: string;
  th: number;
  campus: string;
  class: number;
}

interface UserInfoProps {
  next: () => void;
}

const UserInfo = ({ next }: UserInfoProps) => {
  const setSendUserInfo = useSetRecoilState(sendUserInfoState);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: {
      name: "",
      campus: "",
      gender: "",
      class: 0,

    }

  });

  const [uploadImage, setUploadImage] = useState<File | undefined>(undefined);

  const onSubmit = (data: UserForm) => {
    const form = new FormData();
    console.log(uploadImage)
    setSendUserInfo((prev) => {
      return {
        ...prev,
        name: data.name,
        gender: data.gender,
        campusSection: data.class,
        cohort: data.th,
        campusName: data.campus,
      }
    });
    if (uploadImage) {
      form.append("profileImage", uploadImage);

    }
    form.append("name", data.name);
    form.append("image", "");
    next();
    console.log(data);
  };

  const onInvalid = (errors: any) => {
    console.log("error", errors);
  };


  const { data: information, isLoading } = useQuery<IUserInfo>({
    queryKey: ["information"],
    queryFn: async () => await getUserInfo(),
  });

  useEffect(() => {
    if (!isLoading && information) {
      console.log(information);
      reset({
        name: information.name || "",
        gender: information.gender || "",
        class: information.section || 0,
        campus: information.campusName || "",
      })
    }
  }, [information, isLoading, reset])

  console.log(information);

  if (isLoading) return <div>로딩중</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="flex w-full flex-col justify-center items-center mt-10 space-y-2">
        <div className="mb-10">
          <ProfileCameraIcon defaultImage={information?.profileImage} setUploadImage={setUploadImage} />
        </div>
        <InfoInput
          name="name"
          title="이름"
          register={register("name", {
            required: "이름을 입력해주세요.",
            maxLength: { value: 10, message: "10글자이하로 입력해주세요." },
          })}
          value={information?.name}
          errors={errors}
        />

        <InfoSelect
          name="gender"
          title="성별"
          register={register("gender", {
            required: "성별을 선택해주세요.",
          })}
          setValue={(value: string) => setValue("gender", value)}
          defaultValue={information?.gender}
          errors={errors}
        />
        <InfoSelect
          name="class"
          title="반"
          register={register("class", {
            required: "반을 선택해주세요.",
          })}
          setValue={(value: number) => setValue("class", value)}
          defaultValue={information?.section}
          errors={errors}
        />

        <InfoSelect
          name="th"
          title="기수"
          register={register("th", {
            required: "기수를 선택해주세요.",
          })}
          setValue={(value: number) => setValue("th", value)}
          // defaultValue={information?.cohort}
          errors={errors}
        />

        <InfoSelect
          name="campus"
          title="캠퍼스"
          register={register("campus", {
            required: "캠퍼스를 선택해주세요.",
          })}
          setValue={(value: string) => setValue("campus", value)}
          defaultValue={information?.campusName}
          errors={errors}
        />
        <div>
          <DoneButton title="다음" />
        </div>
      </div>
    </form>
  )
};

export default UserInfo;