import Link from "next/link";
import Image from "next/image";
import gymivoIcon from "@/public/svg/footer/gymivo.svg";
import WhatsappIcon from "@/public/svg/footer/Whatsapp.svg";
import TelegramIcon from "@/public/svg/footer/Telegram.svg";
import GmailIcon from "@/public/svg/footer/Gmail.svg";
import InstagramIcon from "@/public/svg/footer/Instagram.svg";
import FrameIcon from "@/public/svg/footer/picture-frame.svg";

export default function Footer() {
  return (
    <div className="bg-neutral-darker">
      <div className="p-5">
        <Image src={gymivoIcon} alt="gimivo" width={120} height={50} />
      </div>

      <div className="flex justify-between">
        <div className="p-5 flex flex-col">
          <h2 className="py-4">
            صفحات <span className="text-primary-300">جیمیوو</span>
          </h2>
          <Link className="hover:underline" href="/about"><p>درباره ما</p></Link>
          <Link className="hover:underline" href="/contact"><p>ارتباط با ما</p></Link>
          <Link className="hover:underline" href="/terms"><p>قوانین و مقررات</p></Link>
          <Link className="hover:underline" href="/faq"><p>سوالات متداول</p></Link>
          <Link className="hover:underline" href="/cooperate"><p>همکاری با جیمیوو</p></Link>
        </div>

        <div className="p-5 flex flex-col">
          <h2 className="py-4">
            خدمات <span className="text-primary-300">جیمیوو</span>
          </h2>
          <Link className="hover:underline" href="/myprograms"><p>برنامه های من</p></Link>
          <Link className="hover:underline" href="/movements"><p>جستجوی حرکات</p></Link>
          <Link className="hover:underline" href="/createprogram"><p>ساخت برنامه شخصی</p></Link>
          <Link className="hover:underline" href="/coaches"><p>جستجوی مربیان</p></Link>
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
          <Image alt="frame1" src={FrameIcon} width={110} height={110}/>
          <Image alt="frame2" src={FrameIcon} width={110} height={110}/>
          <Image alt="frame3" src={FrameIcon} width={110} height={110}/>
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
