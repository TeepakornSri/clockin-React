import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import EditLeaveSettingForm from "./EditLeaveSettingForm";
import SmallButton from "../../../components/SmallButton";
import ManageTable from "../../../components/ManageTable";

export default function TableLeaveSetting({
  leaveProfiles,
  leaveProfileById,
  setLeaveProfileById,
  loading,
  deleteLeaveProfile,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ManageTable
      columns={[
        { field: "leaveName", flex: 1 },
        { field: "defaultDateAmount", flex: 1 },
        {
          field: "actionButtons",
          headerName: "",
          cellRenderer: (params) => (
            <div className="flex gap-2 justify-center items-center h-full">
              <div className="p-2">
                <SmallButton
                  onClick={() => {
                    setLeaveProfileById(params.data);
                    setIsOpen(true);
                  }}
                />
              </div>
              <div className="p-2">
                <SmallButton
                  onClick={() => {
                    deleteLeaveProfile(params.data.id);
                  }}
                  bg="bg-red-600"
                  hover="hover:bg-red-400"
                  buttonName="Delete"
                />
              </div>
            </div>
          ),
        },
      ]}
      allData={leaveProfiles}
      loading={loading}
      editForm={
        <EditLeaveSettingForm
          leaveProfileById={leaveProfileById}
          onClose={() => setIsOpen(false)}
        />
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}
