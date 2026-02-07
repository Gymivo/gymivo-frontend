import Button from "./Button";
import Image from "next/image";
import gymivoIcon from "@/public/svg/header/gymivo.svg";
import WhatsappIcon from "@/public/svg/social/Whatsapp.svg";
import TelegramIcon from "@/public/svg/social/Telegram.svg";
import GmailIcon from "@/public/svg/social/Gmail.svg";
import InstagramIcon from "@/public/svg/social/Instagram.svg";
import FrameIcon from "@/public/svg/social/picture-frame.svg";

export default function Footer() {
  return (
    <div className="bg-neutral-darker">
      <div className="p-5">
        <Image src={gymivoIcon} alt="gimivo" width={100} height={24} />
      </div>

      <div className="flex justify-between">
        <div className="p-5 flex flex-col">
          <h2 className="py-4">
            صفحات <span className="text-primary-300">جیمیوو</span>
          </h2>
          <p>درباره ما</p>
          <p>ارتباط با ما</p>
          <p>قوانین و مقررات</p>
          <p>سوالات متداول</p>
          <p>همکاری با جیمیوو</p>
        </div>

        <div className="p-5 flex flex-col">
          <h2 className="py-4">
            خدمات <span className="text-primary-300">جیمیوو</span>
          </h2>
          <p>برنامه های من</p>
          <p>جستجوی حرکات</p>
          <p>ساخت برنامه شخصی</p>
          <p>جستجوی مربیان</p>
        </div>
      </div>

      <div className="p-5">
        <h2>فضای مجازی</h2>
        <div className="flex gap-5 justify-end">
          <Image alt="whatsapp" src={WhatsappIcon} />
          <Image alt="gmail" src={GmailIcon} />
          <Image alt="telegram" src={TelegramIcon} />
          <Image alt="instagram" src={InstagramIcon} />
        </div>
      </div>

      <div className="p-5">
        <h2>نمادها</h2>
        <div className="py-5 flex justify-between">
          <Image alt="frame1" src={FrameIcon} />
          <Image alt="frame2" src={FrameIcon} />
          <Image alt="frame3" src={FrameIcon} />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <p className="py-5 text-sm">
          در این سایت سعی شده است سادگی کار حفظ شود.
        </p>
      </div>
    </div>
  );
}
