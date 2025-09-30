"use client";
import { useUser } from "../context/UserContext";
import OrgProfile from "./OrgProfile";

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <p className="text-center text-gray-500 text-lg sm:text-xl">
          Та эхлээд нэвтэрч эсвэл бүртгүүлнэ үү.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto lg:px-8 py-8">
      <OrgProfile org={user} />
    </div>
  );
}
