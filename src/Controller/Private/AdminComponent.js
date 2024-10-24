/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function AdminComponent() {
  const [Barstab, setBarstab] = useState(false);
  const [TabActive, SetTabActive] = useState('')
  const DataNameAdmin = [
    {
      "Name" : "Trang Chủ",
      "CodeTab":"dashboard"
    },
    {
      "Name" : "Thêm/Xóa/Sửa Banner",
      "CodeTab":"banner"
    }
  ]
  return (
    <div className="">
      {/* TabMenu */}
      <div className="flex">


        <div
          className={
            Barstab === true
              ? `hidden`
              : "bg-[#00e620] h-screen w-[300px]"
          }
        >
            <img src="https://lh3.googleusercontent.com/fife/ALs6j_ERxQk13i9bzmqkgh87gWgnwPZWKBU4f8VqKTz4yHOHK38fzCwX0-2FcEOD87BJXzZsf2_W0tTiOBWOvtg449ePo-E8CgqwewtLaqBzEYg3q20HW2LZ1Ymvn91X42GpWp6FUk_eTG146q_LOxFm7lnxncMbTE7VPDVwrF_eTcY-5nE1dSqAb90y-pzXgakPH2q5POi1RD_MRVWkjD1aoI7Q4aVVZ6UCNKI3XxvSGUQIPSDhrJAsqnz7bxzahNezXjqGuqPPxwDuhP1SUaxJACMuUoe-8iD6bJBn_X5UkbTeJdXMtau8d299ryg3JxTACJpU7iB_47d4cHXVCUw8pnDnD1rOblASjIeJ-xBikMt22WCuhQQDtPpSW-xT3dSC50MCJC5PiyggI7-BBWYNkqTAn4E4YdaCAF4PHSqBwL33alMzRLcBsvud9pv_UJfNypgXqKxfv-g_1edhT_P1sv9mGbxg3356qYNtbQbkChbSSdGJh7UNNuT56SmJMtJfKqigvMQD-v74Xj9_AfGsDH46vVjFRinx6Y0u_DYmcmfRbMmIHcb_Vk1to5g_GcerfFadR6gvxXc79vQlGGkbmEjqFGDXid3moRO2x2h1iQ_Q_8J6rhvBDSOS62fFDeb5MAGl4A4hAG2DmqPOAuFP-TRsUWCoknt8Io2dsJYkNqCup2bFeF97WgtBOncGRuGUkAI8SxL0BD-0nnB6VghyGp2Kaeoi5vkbFWuWd91E3p_d91orhBTC627jjj4kz27347OwL9eMh1YMS9Z2ils6ddN3Pfs85tt8UhzGQcbEGuEQowA099eqhZKMkqDgIN5d5sa3BQhxUYXSkLfXX9dXGHSEaJWqedIdP5GhuLsjHQ9QuURq8ogctnNHkCsBmSClvJD_7j1nqDVhfPBAaioEJb96r3pFfWhJGr1YS0ClEtyAK2yVrLcwZ1HndO0d-D0l-3DC-DTvHHmuYgyC328Wznb5XLXKNoZdXY_14nEJRgdhlCuGeDSM_Wl2sx4ZYWoiOtSP7a6zJLN2RV2j3w3ZSmCTHIHEvZjsn9nSzXZxKzm4Yoz6dh5UtspO41ebfNGhzuCOlZ64SouvSIqGyoOTpKFCegTr8fFvPCwiRZr-xU3hAK3eC2rvE9VYKh-AHtZX90H9uJOdpIZTyg7X8fBh9lUTxdQm42RcxFriIdu2DXqSR3VSRPFMiacZaqyz1a6Lm8fXv7hkKCYOVcLr2U8BhDGWfOB6ZxX9sPcd1zyTitIah1-JJ87Fv-iiD7XgbUPRZ0J7JoKcXOO2-ptWXdmQEbNRKfxqDX-M1-JZ5BUFO3p6KO6AgEOe3TgE7HhKT6zcrLKUSCAfsHLem3SfA9u7V1lCBQ2FHaq6pA-cNK97hHAaVHZbYBNF4LReIn_J5DcgdpMC33gc6xsN-tKpfH2sZvxMhjylRL_-PZ8DZoeOYXvztVnBw3M2KBffp_HWQjz80Z3on0LYwpDjEgJvLTv19j1pEZbbOg06UGdmUjGj_K2Nf5_g9IyWZuVLpWsm9LaNl6moqZXF1NILDN20hMcWXUWhrC6HGt38rnJLxNb8nQsYiEMNIYiHAwTZjIlZmpT-JTPDHe9KFlFZGPjZ6OM_G3pjkURaz5EZUhsAJ4UUMaU8LkBQoh3ugh12Q4g7emHxn496lGRgX1wZbj7MLO1dCt_n6gexpZVnButnFDubhxuIPBCedvrqaGd97ux5et1sxAc=w1876-h928" />
            <hr/>
          
          <div className="mt-6 none">
            {DataNameAdmin.map(Tab => (
              <div className={`p-3 border-b rounded-md mt-2    ${TabActive === Tab.CodeTab && "bg-white"}`} onClick={() => SetTabActive(Tab.CodeTab)}>
                    {Tab.Name}
                    
              </div>
            ))}
          </div>
          
        </div>

        <div className={`shadow-xl p-3 h-full w-screen`}>
          <button>
            <FontAwesomeIcon
              icon={faBars}
              className="text-[20px]"
              onClick={() => setBarstab(!Barstab)}
            />
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default AdminComponent;
