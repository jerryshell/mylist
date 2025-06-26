import Search from "./Search";
import FileUploader from "./FileUploader";
import LogoutButton from "./LogoutButton";
import { Suspense } from "react";

const Header = () => {
  return (
    <div className="my-4 mr-4 flex items-center justify-between gap-8">
      <Suspense>
        <Search />
      </Suspense>
      <div className="flex items-center justify-center gap-4">
        <FileUploader />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
