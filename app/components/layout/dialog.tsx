import { useCallback, type ReactNode } from "react";
import { useMatches, useNavigate } from "@remix-run/react";
import { XIcon } from "../icons";
import { Button } from "../shared";

export const Dialog = ({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) => {
  const matches = useMatches();
  const prevRoute = matches[matches.length - 2];
  const navigate = useNavigate();
  const handleBackdropClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      navigate(prevRoute);
    },
    [prevRoute, navigate]
  );

  return open ? (
    <div className="dialog-backdrop" onClick={handleBackdropClose}>
      <dialog className="dialog" open={true}>
        <Button
          to={prevRoute}
          variant="link"
          className={
            "absolute right-4 top-[16px] leading-none text-gray-500 md:right-6 md:top-[26px]"
          }
        >
          <XIcon />
        </Button>
        {children}
      </dialog>
    </div>
  ) : null;
};
