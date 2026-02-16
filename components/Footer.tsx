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
      <div className="px-5 pt-10">
        <Image src={gymivoIcon} alt="gimivo" width={120} height={50} />
      </div>

      <div className="flex justify-between">
        <div className="p-5 flex flex-col">
          <h2 className="py-4 font-bold">
            صفحات <span className="text-primary-300">جیمیوو</span>
          </h2>
          <Link className="hover:underline" href="/about"><p>درباره ما</p></Link>
          <Link className="hover:underline" href="/contact"><p>ارتباط با ما</p></Link>
          <Link className="hover:underline" href="/terms"><p>قوانین و مقررات</p></Link>
          <Link className="hover:underline" href="/faq"><p>سوالات متداول</p></Link>
          <Link className="hover:underline" href="/cooperate"><p>همکاری با جیمیوو</p></Link>
        </div>

        <div className="p-5 flex flex-col">
          <h2 className="py-4 font-bold">
            خدمات <span className="text-primary-300">جیمیوو</span>
          </h2>
          <Link className="hover:underline" href="/myprograms"><p>برنامه های من</p></Link>
          <Link className="hover:underline" href="/movements"><p>جستجوی حرکات</p></Link>
          <Link className="hover:underline" href="/createprogram"><p>ساخت برنامه شخصی</p></Link>
          <Link className="hover:underline" href="/coaches"><p>جستجوی مربیان</p></Link>
        </div>
      </div>

      <div className="p-5">
        <h2 className="font-bold">فضای مجازی</h2>
        <div className="flex gap-5 justify-end">
          <Image width={40} height={40} alt="whatsapp" src={WhatsappIcon} />
          <Image width={40} height={40} alt="gmail" src={GmailIcon} />
          <Image width={40} height={40} alt="telegram" src={TelegramIcon} />
          <Image width={40} height={40} alt="instagram" src={InstagramIcon} />
        </div>
      </div>

      <div className="p-5">
        <h2 className="font-bold">نمادها</h2>
        <div className="py-5 flex justify-between">
          <Image alt="frame1" src={FrameIcon} width={90} height={90}/>
          <Image alt="frame2" src={FrameIcon} width={90} height={90}/>
          <Image alt="frame3" src={FrameIcon} width={90} height={90}/>
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
