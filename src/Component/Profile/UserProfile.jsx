import React from "react";
import Container from "../Container/Container";
import useAuth from "../../Hook/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <Container>
        <div className="relative mt-[1vw] bg-linear-to-t from-[#d3e8e9] to-[#9ab3b7] w-full h-[25vw] md:h-[15vw] rounded-xl">
          <img
            className="h-[25vw] w-[25vw] md:h-[9vw] md:w-[9vw] rounded-full absolute -bottom-10 md:-bottom-15 left-8 border-4 border-white"
            src={user?.photoURL}
            alt=""
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mt-20">{user.displayName}</h1>
          <p className="text-[#b7b6b6]">{user.email}</p>
        </div>
        <div className="flex items-center gap-10 md:gap-50 mt-8">
          <div>
            <p className="font-medium text-[#b7b6b6]">First Join</p>
            <p className="font-medium">11111</p>
          </div>
          <div>
            <p className="font-medium text-[#b7b6b6]">First Post</p>
            <p className="font-medium">11111</p>
          </div>
          <div>
            <p className="font-medium text-[#b7b6b6]">Total Post</p>
            <p className="font-medium">1242</p>
          </div>
          <div>
            <p className="font-medium text-[#b7b6b6]">Mamber</p>
            <p className="font-medium">Not Premim</p>
          </div>
        </div>
        <div className="mt-6 text-xl font-bold">
          <h1>All Post</h1>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
