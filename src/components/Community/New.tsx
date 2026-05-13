import React from "react";
import { User, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NewPage: React.FC = () => {
  const options = [
    {
      title: "Personal Community",
      description: "Create a personal space for your audience, posts and chats.",
      icon: <User size={28} strokeWidth={2.2} />,
      href: "/new/personal",
    },
    {
      title: "Business Community",
      description: "Launch a branded community with subscriptions and products.",
      icon: <Briefcase size={28} strokeWidth={2.2} />,
      href: "/new/business",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[760px]">
        <h1 className="text-[52px] font-semibold tracking-[-0.04em] text-center text-black mb-12">
          Create a community
        </h1>

        <div className="flex flex-col gap-6">
          {options.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group bg-white border border-[#e5e5e5] hover:border-[#d4d4d4] rounded-[32px] p-7 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-[64px] h-[64px] rounded-2xl bg-[#f3f3f3] flex items-center justify-center text-black">
                    {item.icon}
                  </div>

                  <div>
                    <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-black">
                      {item.title}
                    </h2>

                    <p className="text-[15px] text-[#666] mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="text-[#999] group-hover:text-black transition-all">
                  <ArrowRight size={28} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewPage;