import { HelpCircle, User2 } from "lucide-react";

import Hint from "@/components/shared/Hint";
import FormPopover from "@/components/Form/FormPopover";

function BoardList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2 text-neutral-700 font-semibold text-lg">
        <User2 className="h-6 w-6" />
        <p>Your Boards</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video h-full w-full bg-muted rounded-md space-y-1 hover:opacity-75 transition flex flex-col items-center justify-center relative"
          >
            <p className="text-lg font-semibold">Create new board</p>
            <p className="text-sm">5 board remaining</p>
            <Hint
              sideOffset={40}
              description="Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
            >
              <HelpCircle className="h-[14px] w-[14px] absolute bottom-2 right-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

export default BoardList;
